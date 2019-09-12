import fs from 'fs';
import path from 'path';

export class File {
    /**
     * Direction entity to work with
     */
    private direntFile: fs.Dirent;

    /**
     * File constructor
     */
    constructor(file: fs.Dirent) {
        this.direntFile = file;
    }

    /**
     * Gets the name of the file
     *
     * @since 1.0.0
     */
    public getName(): string {
        const parts = this.direntFile.name.split('.');
        parts.pop();
        return parts.join('.');
    }

    /**
     * Gets the extension of the file
     *
     * @since 1.0.0
     */
    public getExtension(): string {
        return path.extname(this.direntFile.name).replace('.', '');
    }
}
