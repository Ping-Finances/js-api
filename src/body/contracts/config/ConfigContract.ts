import { ConfigMap } from '../../config/ConfigMap';

export interface ConfigContract {
    /**
     * Get an item at the given path, or return the default
     * value of the path is not valid
     *
     * @since 1.0.0
     */
    get(path: string, defaultValue?: any): any;

    /**
     * Gets the config path
     *
     * @since 1.0.0
     */
    getConfigPath(): string;

    /**
     * Loads all config files from the given path
     *
     * @since 1.0.0
     */
    loadFromPath(path: string): void;

    /**
     * Get all items in the config
     *
     * @since 1.0.0
     */
    getItems(): ConfigMap;
}
