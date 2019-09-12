import { FileList } from '../../heart/filesystem/FileList';

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
}
