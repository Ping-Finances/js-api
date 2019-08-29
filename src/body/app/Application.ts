import EventsEmitter from 'events';
import { Container, interfaces } from 'inversify';
import { ApplicationContract } from '../contracts/application/ApplicationContract';
import { ProviderContract } from '../contracts/providers/ProviderContract';

export default class Application extends EventsEmitter
    implements ApplicationContract {
    private booted = false;

    private static instance: Application;

    private readonly container: Container;

    private constructor() {
        super();

        this.emit('boot:before');

        this.container = new Container();

        this.initialize().then(() => {
            this.booted = true;
            this.emit('boot:after');
        });
    }

    private async initialize(): Promise<void> {
        return new Promise(
            (resolve: (value?: void | PromiseLike<void>) => void) => {
                resolve();
            }
        );
    }

    public registerProvider(provider: ProviderContract): void {
        if (provider.boot && typeof provider.boot === 'function') {
            provider.boot.call(provider);
        }

        this.emit('provider:registered', provider.constructor.name);
    }

    public bind<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: {
            new (...args: any[]): T;
        }
    ): Application {
        const identifier = this.convertToSymbolIfString(provider);
        this.getContainer()
            .rebind<T>(identifier)
            .to(constructor);

        return this;
    }

    public instance<T>(
        provider: interfaces.ServiceIdentifier<T>,
        instance: T
    ): Application {
        const identifier = this.convertToSymbolIfString(provider);
        this.getContainer()
            .rebind<T>(identifier)
            .toConstantValue(instance);

        return this;
    }

    public singleton<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: {
            new (...args: any[]): T;
        }
    ): Application {
        const identifier = this.convertToSymbolIfString(provider);
        this.getContainer()
            .rebind<T>(identifier)
            .to(constructor)
            .inSingletonScope();

        return this;
    }

    private convertToSymbolIfString(provider: any): symbol {
        if (typeof provider === 'string') {
            return Symbol.for(provider);
        }

        return provider;
    }

    public getContainer(): Container {
        return this.container;
    }

    public static getInstance(): Application {
        if (!Application.instance) {
            Application.instance = new Application();
        }

        return Application.instance;
    }

    public isBooted(): boolean {
        return this.booted;
    }
}
