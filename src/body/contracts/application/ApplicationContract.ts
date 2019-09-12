import { interfaces } from 'inversify';
import { ProviderContract } from '../providers/ProviderContract';
import { Newable } from '../../support/interfaces/Newable';

export interface ApplicationContract {
    isBooted(): boolean;

    bind<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: Newable<T>
    ): Promise<ApplicationContract>;

    bindFactory<T>(
        provider: interfaces.ServiceIdentifier<T>,
        factory: (context: interfaces.Context) => T
    ): Promise<ApplicationContract>;

    instance<T>(
        provider: interfaces.ServiceIdentifier<T>,
        instance: T
    ): Promise<ApplicationContract>;

    singleton<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: Newable<T>
    ): Promise<ApplicationContract>;

    get<T>(provider: interfaces.ServiceIdentifier<T>): Promise<T>;

    registerProvider(provider: ProviderContract): Promise<void>;

    emit(event: string | symbol, ...args: any[]): boolean;

    onBooted(callback: (...args: any[]) => void): void;
}
