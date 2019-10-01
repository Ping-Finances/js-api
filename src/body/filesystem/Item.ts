import * as fs from 'fs';
import * as path from 'path';
import { File } from './File';

export class Item {
    private dirent: fs.Dirent;

    public constructor(item: fs.Dirent) {
        this.dirent = item;
    }

    public isDirectory(): boolean {
        return this.dirent.isDirectory();
    }

    /**
     * Checks whether the dirent entry is a file
     *
     * @since 1.0.0
     */
    public isFile(): boolean {
        return this.dirent.isFile();
    }

    /**
     * Gets the file representation of the dirent entry
     *
     * @since 1.0.0
     */
    public getFile(): File | null {
        if (this.isFile()) {
            return new File(this.dirent);
        }

        return null;
    }

    /**
     * Gets the name of the dirent entry
     *
     * @since 1.0.0
     */
    public getName(): string {
        if (this.isFile()) {
            const file = this.getFile() as File;
            return file.getName();
        }

        return this.dirent.name;
    }
}
