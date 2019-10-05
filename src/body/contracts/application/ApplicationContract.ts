import { interfaces } from 'inversify';
import { ProviderContract } from '../providers/ProviderContract';
import { Newable } from '../../support/interfaces/Newable';
import Container = interfaces.Container;

export interface ApplicationContract {
    /**
     * Bind a service to the container, so it
     * can be injected in services later on.
     *
     * @since 1.0.0
     */
    bind<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: Newable<T>
    ): Promise<ApplicationContract>;

    /**
     * Binds a class factory to the container
     *
     * @since 1.0.0
     */
    bindFactory<T>(
        provider: interfaces.ServiceIdentifier<T>,
        factory: (context: interfaces.Context) => T
    ): Promise<ApplicationContract>;

    /**
     * Register an instance to the container.
     * When resolving, all returned objects are the same.
     *
     * @since 1.0.0
     */
    instance<T>(
        provider: interfaces.ServiceIdentifier<T>,
        instance: T
    ): Promise<ApplicationContract>;

    /**
     * Binds a singleton instance to the container
     *
     * @since 1.0.0
     */
    singleton<T>(
        provider: interfaces.ServiceIdentifier<T>,
        constructor: Newable<T>
    ): Promise<ApplicationContract>;

    /**
     * Gets a binding out of the container
     *
     * @since 1.0.0
     */
    get<T>(provider: interfaces.ServiceIdentifier<T>): T;

    /**
     * Register a service provider in the application.
     *
     * @since 1.0.0
     */
    registerProvider(provider: ProviderContract): Promise<void>;

    /**
     * Emits an event on the application
     *
     * @since 1.0.0
     */
    emit(event: string | symbol, ...args: any[]): boolean;

    /**
     * Gets the container
     *
     * @since 1.0.0
     */
    getContainer(): Container;

    /**
     * Sets the root folder path of the application
     *
     * @since 1.0.0
     */
    setRoothPath(path: string): void;

    /**
     * Returns the root folder path of the application
     *
     * @since 1.0.0
     */
    getRootPath(): string | null;

    /**
     * Returns the head path
     *
     * @since 1.0.0
     */
    getHeadPath(): string | null;
}
