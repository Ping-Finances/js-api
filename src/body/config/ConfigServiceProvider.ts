import { Provider } from '../providers/Provider';
import { ProviderContract } from '../contracts/providers/ProviderContract';
import { ConfigContract } from '../contracts/config/ConfigContract';
import { Repository } from './Repository';

export class ConfigServiceProvider extends Provider
    implements ProviderContract {
    private configRepository: ConfigContract;

    async register(): Promise<void> {
        await this.app.bindFactory<ConfigContract>('config', () => {
            return new Repository(this.app);
        });
    }
}
