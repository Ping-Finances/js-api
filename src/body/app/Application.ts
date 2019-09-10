import 'reflect-metadata';
import EventsEmitter from 'events';
import { Container, interfaces } from 'inversify';
import { ApplicationContract } from '../contracts/application/ApplicationContract';
import { ProviderContract } from '../contracts/providers/ProviderContract';
import LoggingServiceProvider from '../heart/logging/LoggingServiceProvider';
import { Newable } from '../heart/support/interfaces/Newable';

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
        constructor: Newable<T>
    ): Application {
        const identifier = Application.convertToSymbolIfString(provider);

        if (this.getContainer().isBound(identifier)) {
            this.getContainer()
                .rebind<T>(identifier)
                .to(constructor);
        } else {
            this.getContainer()
                .bind<T>(identifier)
                .to(constructor);
        }

        return this;
    }

    public bindFactory<T>(
        provider: interfaces.ServiceIdentifier<T>,
        factory: (context: interfaces.Context) => T
    ): Application {
        const identifier = Application.convertToSymbolIfString(provider);

        this.getContainer()
            .bind<T>(identifier)
            .toDynamicValue(factory);

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

        if (this.getContainer().isBound(identifier)) {
            this.getContainer()
                .rebind<T>(identifier)
                .toConstantValue(instance);
        } else {
            this.getContainer()
                .bind<T>(identifier)
                .toConstantValue(instance);
        }

        return this;
    }

    public singleton<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: Newable<T>
    ): Application {
        const identifier = Application.convertToSymbolIfString(provider);

        if (this.getContainer().isBound(identifier)) {
            this.getContainer()
                .rebind<T>(identifier)
                .to(constructor)
                .inSingletonScope();
        } else {
            this.getContainer()
                .bind<T>(identifier)
                .to(constructor)
                .inSingletonScope();
        }

        return this;
    }

    public get<T>(provider: interfaces.ServiceIdentifier<T>): T {
        const identifier = Application.convertToSymbolIfString(provider);

        return this.getContainer().get<T>(identifier);
    }

    private static convertToSymbolIfString(provider: any): symbol {
        if (typeof provider === 'string') {
            return Symbol.for(provider);
        }

        return provider;
    }

    public getContainer(): Container {
        return Application.container;
    }

    public isBooted(): boolean {
        return this.booted;
    }

    public onBooted(callback: (...args: any[]) => void): void {
        this.on('booted', callback);
    }
}
