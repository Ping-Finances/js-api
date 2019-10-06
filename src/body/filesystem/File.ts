import fs from 'fs';
import path from 'path';

export class File {
    /**
     * Direction entity to work with
     */
    private dirent: fs.Dirent;

    /**
     * File constructor
     */
    constructor(file: fs.Dirent) {
        this.dirent = file;
    }

    /**
     * Gets the name of the file
     *
     * @since 1.0.0
     */
    public getName(ext = false): string {
        if (!ext) {
            const parts = this.dirent.name.split('.');
            parts.pop();
            return parts.join('.');
        }

        return this.dirent.name;
    }

    /**
     * Gets the extension of the file
     *
     * @since 1.0.0
     */
    public getExtension(): string {
        return path.extname(this.dirent.name).replace('.', '');
    }
}
