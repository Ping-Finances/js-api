import EventEmitter from 'events';
import fs from 'fs';
import { injectable } from 'inversify';
import { FileSystemContract } from '../contracts/filesystem/FileSystemContract';
import { FileList } from './FileList';
import { File } from './File';
import { ItemList } from './ItemList';
import { Item } from './Item';

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
    public getFiles(path: string): FileList {
        const files = new FileList();

        try {
            fs.readdirSync(path, {
                withFileTypes: true
            }).forEach((file: fs.Dirent) => {
                if (file.isFile()) {
                    files.push(new File(file));
                }
            });
        } catch (e) {
            //
        }

        return files;
    }

    /**
     * Returns a list of entries (files and/or directories
     * found in the given path
     *
     * @since 1.0.0
     */
    public getItems(path: string): ItemList {
        const items = new ItemList();

        try {
            fs.readdirSync(path, {
                withFileTypes: true
            }).forEach((item: fs.Dirent) => {
                items.push(new Item(item));
            });
        } catch (e) {
            //
        }

        return items;
    }
}
