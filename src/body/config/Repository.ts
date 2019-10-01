import { inject, injectable } from 'inversify';
import { ConfigContract } from '../contracts/config/ConfigContract';
import { FileSystemContract } from '../contracts/filesystem/FileSystemContract';
import { Item } from '../filesystem/Item';
import { File } from '../filesystem/File';
import { ApplicationContract } from '../contracts/application/ApplicationContract';
import { ConfigMap } from './ConfigMap';
import {ConfigLoader} from './ConfigLoader';

@injectable()
export class Repository implements ConfigContract {
    /**
     * All config items
     */
    private static items: ConfigMap = {};

    private loader: ConfigLoader;

    public constructor(items: ConfigMap) {
        Repository.items = items;

        this.loader = new ConfigLoader();
    }

    /**
     * Get an item at the given path, or return the default
     * value of the path is not valid
     *
     * @since 1.0.0
     */
    public get(path: string, defaultValue = false): any {
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
     * Sets a value at the given key in the config
     *
     * @since 1.0.0
     */
    set(key: string, value: {}): void {
        Repository.items[key] = value;
    }

    // /**
    //  * Sets a value on the given path
    //  *
    //  * @since 1.0.0
    //  */
    // set(key: string, value: any) {
    //
    // }

    public loadFromPath(path: string): void {
        this.setConfig(this.loader.load(path));
    }

    public getItems(): ConfigMap {
        return Repository.items;
    }
}
