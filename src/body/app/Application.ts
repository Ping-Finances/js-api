import 'reflect-metadata';
import EventsEmitter from 'events';
import { Container, interfaces } from 'inversify';
import { ApplicationContract } from '../contracts/application/ApplicationContract';
import { ProviderContract } from '../contracts/providers/ProviderContract';
import LoggingServiceProvider from '../services/logging/LoggingServiceProvider';

export default class Application extends EventsEmitter
    implements ApplicationContract {
    private booted = false;

    private static container: Container;

    public constructor() {
        super();

        this.emit('boot:before');

        Application.container = new Container();

        this.initialize().then(() => {
            this.booted = true;
            this.emit('booted');
        });
    }

    private initialize(): Promise<void> {
        return new Promise(
            (resolve: (value?: void | PromiseLike<void>) => void): void => {
                this.registerBaseBindings();
                this.registerProvider(new LoggingServiceProvider(this)).then(
                    () => {
                        resolve();
                    }
                );
            }
        );
    }

    /**
     * Registers basic services in the container.
     * These bindings are needed when booting the application.
     *
     * @return {void}
     *
     * @since 1.0.0
     */
    private registerBaseBindings(): void {
        this.instance<ApplicationContract>('app', this);
    }

    /**
     * Register a service provider in the application.
     *
     * @since 1.0.0
     */
    public async registerProvider(provider: ProviderContract): Promise<void> {
        await provider.boot();

        if (provider.register && typeof provider.register === 'function') {
            provider.register();
        }

        this.emit('provider:registered', provider.constructor.name);
    }

    /**
     * Bind a service to the container, so it
     * can be injected in services later on.
     *
     * @since 1.0.0
     */
    public bind<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: {
            new (...args: any[]): T;
        }
    ): Application {
        const identifier = Application.convertToSymbolIfString(provider);

        if (Application.getContainer().isBound(identifier)) {
            Application.getContainer()
                .rebind<T>(identifier)
                .to(constructor);
        } else {
            Application.getContainer()
                .bind<T>(identifier)
                .to(constructor);
        }

        return this;
    }

    /**
     * Register an instance to the container.
     * When resolving, all returned objects are the same.
     *
     * @since 1.0.0
     */
    public instance<T>(
        provider: interfaces.ServiceIdentifier<T>,
        instance: T
    ): Application {
        const identifier = Application.convertToSymbolIfString(provider);

        if (Application.getContainer().isBound(identifier)) {
            Application.getContainer()
                .rebind<T>(identifier)
                .toConstantValue(instance);
        } else {
            Application.getContainer()
                .bind<T>(identifier)
                .toConstantValue(instance);
        }

        return this;
    }

    public singleton<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: {
            new (...args: any[]): T;
        }
    ): Application {
        const identifier = Application.convertToSymbolIfString(provider);

        if (Application.getContainer().isBound(identifier)) {
            Application.getContainer()
                .rebind<T>(identifier)
                .to(constructor)
                .inSingletonScope();
        } else {
            Application.getContainer()
                .bind<T>(identifier)
                .to(constructor)
                .inSingletonScope();
        }

        return this;
    }

    public get<T>(provider: interfaces.ServiceIdentifier<T>): T {
        const identifier = Application.convertToSymbolIfString(provider);

        return Application.getContainer().get<T>(identifier);
    }

    private static convertToSymbolIfString(provider: any): symbol {
        if (typeof provider === 'string') {
            return Symbol.for(provider);
        }

        return provider;
    }

    public static getContainer(): Container {
        return Application.container;
    }

    public isBooted(): boolean {
        return this.booted;
    }

    public onBooted(callback: (...args: any[]) => void): void {
        this.on('booted', callback);
    }
}
