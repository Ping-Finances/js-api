import {interfaces} from 'inversify';
import {ProviderContract} from '../providers/ProviderContract';
export interface ApplicationContract {
    isBooted(): boolean;

    bind<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: {
            new (...args: any[]): T;
        }
    ): ApplicationContract;

    instance<T>(
        provider: interfaces.ServiceIdentifier<T>,
        instance: T
    ): ApplicationContract;

    singleton<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: {
            new (...args: any[]): T;
        }
    ): ApplicationContract;

    get<T>(provider: interfaces.ServiceIdentifier<T>): T;

    registerProvider(provider: ProviderContract): Promise<void>;

    emit(event: string | symbol, ...args: any[]): boolean;

    onBooted(callback: (...args: any[]) => void): void;
}
