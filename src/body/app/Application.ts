import 'reflect-metadata';
import EventsEmitter from 'events';
import { Container, interfaces } from 'inversify';
import { ApplicationContract } from '../contracts/application/ApplicationContract';
import { ProviderContract } from '../contracts/providers/ProviderContract';
import { LoggingServiceProvider } from '../logging/LoggingServiceProvider';
import { Newable } from '../support/interfaces/Newable';
import { FilesystemServiceProvider } from '../filesystem/FilesystemServiceProvider';
import { NotBoundError } from './NotBoundError';
import { ConfigContract } from '../contracts/config/ConfigContract';
import { Repository } from '../config/Repository';

export class Application extends EventsEmitter implements ApplicationContract {
    private booted = false;

    private static container: Container;

    private rootPath: string | undefined;

    public constructor(root?: string) {
        super();

        this.emit('boot:before');

        this.rootPath = root;
        Application.container = new Container();

        this.initialize().then(() => {
            this.booted = true;
            this.emit('booted');
        });
    }

    private initialize(): Promise<void[]> {
        return Promise.all([
            this.registerBaseBindings(),
            this.registerProvider(new LoggingServiceProvider(this)),
            this.registerProvider(new FilesystemServiceProvider(this))
        ]);
    }

    /**
     * Registers basic services in the container.
     * These bindings are needed when booting the application.
     *
     * @return {void}
     *
     * @since 1.0.0
     */
    private async registerBaseBindings(): Promise<void> {
        this.instance<ApplicationContract>('app', this);
        this.singleton<ConfigContract>('config', Repository);
    }

    /**
     * Register a service provider in the application.
     *
     * @since 1.0.0
     */
    public async registerProvider(provider: ProviderContract): Promise<void> {
        if (provider.boot && typeof provider.boot === 'function') {
            await provider.boot();
        }

        if (provider.register && typeof provider.register === 'function') {
            await provider.register();
        }

        this.emit('provider:registered', provider.constructor.name);
    }

    /**
     * Bind a service to the container, so it
     * can be injected in services later on.
     *
     * @since 1.0.0
     */
    public async bind<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: Newable<T>
    ): Promise<ApplicationContract> {
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

    public async bindFactory<T>(
        provider: interfaces.ServiceIdentifier<T>,
        factory: (context: interfaces.Context) => T
    ): Promise<ApplicationContract> {
        const identifier = Application.convertToSymbolIfString(
            provider
        );

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
    public async instance<T>(
        provider: interfaces.ServiceIdentifier<T>,
        instance: T
    ): Promise<ApplicationContract> {
        const identifier = Application.convertToSymbolIfString(
            provider
        );

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

    public async singleton<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: Newable<T>
    ): Promise<ApplicationContract> {
        const identifier = Application.convertToSymbolIfString(
            provider
        );

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

        if (!this.getContainer().isBound(identifier)) {
            throw new NotBoundError(
                `${String(provider)} not bound to container`
            );
        } else {
            return this.getContainer().get<T>(identifier);
        }
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

    public setRoothPath(path: string): void {
        this.rootPath = path;
    }

    public getRootPath(): string {
        return this.rootPath || '';
    }
}
