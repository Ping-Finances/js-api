import { Provider } from '../providers/Provider';
import { ProviderContract } from '../contracts/providers/ProviderContract';
import { FileSystemContract } from '../contracts/filesystem/FileSystemContract';
import { Filesystem } from './Filesystem';

export class FilesystemServiceProvider extends Provider
    implements ProviderContract {
    public async register(): Promise<void> {
        await this.app.bind<FileSystemContract>('filesystem', Filesystem);
    }
}
