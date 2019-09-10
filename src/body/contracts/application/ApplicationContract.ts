import { interfaces } from 'inversify';
import { ProviderContract } from '../providers/ProviderContract';
import { Newable } from '../../heart/support/interfaces/Newable';
export interface ApplicationContract {
    isBooted(): boolean;

    bind<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: Newable<T>
    ): ApplicationContract;

    bindFactory<T>(
        provider: interfaces.ServiceIdentifier<T>,
        factory: (context: interfaces.Context) => T
    ): ApplicationContract;

    instance<T>(
        provider: interfaces.ServiceIdentifier<T>,
        instance: T
    ): ApplicationContract;

    singleton<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: Newable<T>
    ): ApplicationContract;

    get<T>(provider: interfaces.ServiceIdentifier<T>): T;

    registerProvider(provider: ProviderContract): Promise<void>;

    emit(event: string | symbol, ...args: any[]): boolean;

    onBooted(callback: (...args: any[]) => void): void;
}
