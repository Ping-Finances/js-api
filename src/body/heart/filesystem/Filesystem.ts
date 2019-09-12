import EventEmitter from 'events';
import fs from 'fs';
import { injectable } from 'inversify';
import { FileSystemContract } from '../../contracts/filesystem/FileSystemContract';
import { FileList } from './FileList';
import { File } from './File';

@injectable()
export class Filesystem extends EventEmitter implements FileSystemContract {
    /**
     * Instance of Node's fs library
     */
    private fs: any;

    /**
     * Filesystem constructor
     */
    public constructor() {
        super();

        this.fs = fs;
    }

    /**
     * Indicates whether the given path is a directory
     *
     * @since 1.0.0
     */
    public isDirectory(path: string): boolean {
        return fs.lstatSync(path).isDirectory();
    }

    /**
     * Indicates whether the given path is a file
     *
     * @since 1.0.0
     */
    public isFile(path: string): boolean {
        return fs.lstatSync(path).isFile();
    }

    /**
     * Returns a list of files found in the given path
     *
     * @since 1.0.0
     */
    public getFiles(path: string, sync = false): FileList {
        const files = new FileList();
        if (!sync) {
            fs.readdirSync(path, {
                withFileTypes: true
            }).forEach((file: fs.Dirent) => {
                if (file.isFile()) {
                    files.push(new File(file));
                }
            });
        } else {
            fs.readdirSync(path, {
                withFileTypes: true
            }).forEach((file: fs.Dirent) => {
                if (file.isFile()) {
                    files.push(new File(file));
                }
            });
        }

        return files;
    }
}
