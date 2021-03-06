import { Application } from '../../src/body/app/Application';
import { FileSystemContract } from '../../src/body/contracts/filesystem/FileSystemContract';
import { Filesystem } from '../../src/body/filesystem/Filesystem';
import { FileList } from '../../src/body/filesystem/FileList';
import { File } from '../../src/body/filesystem/File';

describe('filesystem container test', () => {
    test('filesystem should be resolvable', async () => {
        const application = new Application();
        const filesystem = await application.get<FileSystemContract>(
            'filesystem'
        );

        expect(filesystem).toBeInstanceOf(Filesystem);
    });

    test('Filesystem should fetch files', async () => {
        const application = new Application();
        const filesystem = await application.get<FileSystemContract>(
            'filesystem'
        );
        const files = filesystem.getFiles('./test/filesystem/testfiles');

        expect(files).toBeInstanceOf(FileList);

        const file = files[0];

        expect(file).toBeInstanceOf(File);
        expect(file.getName()).toEqual('test');
        expect(file.getExtension()).toEqual('txt');
    });
});
