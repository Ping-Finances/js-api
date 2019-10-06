import { injectable } from 'inversify';
import { ConfigContract } from '../contracts/config/ConfigContract';
import { ApplicationContract } from '../contracts/application/ApplicationContract';
import { ConfigMap } from './ConfigMap';
import { ConfigLoader } from './ConfigLoader';

@injectable()
export class Repository implements ConfigContract {
    private static items: ConfigMap = {};

    private readonly loader: ConfigLoader;

    private readonly app: ApplicationContract;

    public constructor(app: ApplicationContract) {
        this.app = app;
        this.loader = new ConfigLoader(this.app);
    }

    /**
     * Get an item at the given path, or return the default
     * value of the path is not valid
     *
     * @since 1.0.0
     */
    public get(path: string, defaultValue: any = null): any {
        const pathParts = path.split('.');
        let copiedConfig = Repository.items;

        for (let i = 0; i < pathParts.length; i += 1) {
            if (typeof copiedConfig[pathParts[i]] !== 'undefined') {
                copiedConfig = copiedConfig[pathParts[i]];
            } else {
                return defaultValue;
            }
        }

        return copiedConfig;
    }

    /**
     * Gets the config path
     *
     * @since 1.0.0
     */
    public getConfigPath(): string {
        return `${this.app.getHeadPath()}/config`;
    }

    /**
     * Loads all config files from the given path
     *
     * @since 1.0.0
     */
    public loadFromPath(path: string): void {
        this.setConfig(this.loader.load(path));
    }

    /**
     * Sets the main config
     *
     * @since 1.0.0
     */
    private setConfig(config: any): void {
        Repository.items = config;
    }

    /**
     * Get all items in the config
     *
     * @since 1.0.0
     */
    public getItems(): ConfigMap {
        return Repository.items;
    }
}
