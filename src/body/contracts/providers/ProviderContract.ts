import { ApplicationContract } from '../application/ApplicationContract';

export interface ProviderContract {
    app: ApplicationContract;
    /**
     * Initializes the provider. This method is called before the register
     * method, of both exist
     *
     * @since 1.0.0
     */
    initialize?: () => Promise<void>;

    /**
     * Called to register instances or classes in the application container
     *
     * @since 1.0.0
     */
    register?: () => Promise<void> | void;
}
