import { Item } from '../filesystem/Item';
import { File } from '../filesystem/File';
import { ConfigMap } from './ConfigMap';

export class ConfigLoader {
    private config: ConfigMap;

    // public loadFromPath(path: string): void {
    //     this.filesystem.getItems(path).forEach((item: Item) => {
    //         if (item.isDirectory()) {
    //             this.set(item.getName(), {});
    //
    //         } else {
    //             const file = item.getFile() as File;
    //             // eslint-disable-next-line @typescript-eslint/no-var-requires
    //             this.set(
    //                 item.getName(),
    //                 // eslint-disable-next-line @typescript-eslint/no-var-requires
    //                 require(`${path}/${file.getName(true)}`)
    //             );
    //         }
    //     });
    // }

    public load(path: string): ConfigMap {
        let deeperConfig = this.config;
    }
}