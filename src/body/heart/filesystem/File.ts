import * as fs from 'fs';
import * as path from 'path';

export class File {
    private direntFile: fs.Dirent;

    constructor(file: fs.Dirent) {
        this.direntFile = file;
    }

    public getName(): string {
        return this.direntFile.name;
    }

    public getExtension(): string {
        return path.extname(this.getName());
    }
}