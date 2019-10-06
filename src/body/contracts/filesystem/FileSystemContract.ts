import { FileList } from '../../filesystem/FileList';
import { ItemList } from '../../filesystem/ItemList';

export interface FileSystemContract {
    /**
     * Indicates whether the given path is a directory
     *
     * @since 1.0.0
     */
    isDirectory(path: string): boolean;

    /**
     * Indicates whether the given path is a file
     *
     * @since 1.0.0
     */
    isFile(path: string): boolean;

    /**
     * Returns a list of files found in the given path
     *
     * @since 1.0.0
     */
    getFiles(path: string): FileList;

    /**
     * Returns a list of entries (files and/or directories found in the given
     * path
     *
     * @since 1.0.0
     */
    getItems(path: string): ItemList;
}
