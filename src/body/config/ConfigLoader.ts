import { ConfigMap } from './ConfigMap';
import { FileSystemContract } from '../contracts/filesystem/FileSystemContract';
import { ApplicationContract } from '../contracts/application/ApplicationContract';
import { Item } from '../filesystem/Item';
import { File } from '../filesystem/File';

export class ConfigLoader {
    private readonly app: ApplicationContract;

    private readonly filesystem: FileSystemContract;

    public constructor(app: ApplicationContract) {
        this.app = app;
        this.filesystem = this.app.get<FileSystemContract>('filesystem');
    }

    /**
     * Loads all (nested) config items from the map on the given path
     *
     * @since 1.0.0
     */
    public load(path: string, nestedConfig: ConfigMap = {}): ConfigMap {
        let config: ConfigMap = {};

        this.filesystem.getItems(path).forEach((item: Item) => {
            const nestedConfigCopy = nestedConfig;

            if (item.isDirectory()) {
                nestedConfigCopy[item.getName()] = {};
                nestedConfigCopy[item.getName()] = this.load(
                    `${path}/${item.getName()}`,
                    nestedConfigCopy[item.getName()]
                );
            } else {
                const file = item.getFile() as File;

                if (
                    file.getExtension() === 'ts' ||
                    file.getExtension() === 'js'
                ) {
                    nestedConfigCopy[
                        file.getName()
                    ] = require(`${path}/${file.getName(true)}`);
                }
            }

            config = { ...config, ...nestedConfigCopy };
        });

        return config;
    }
}
