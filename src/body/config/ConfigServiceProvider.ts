import { Provider } from '../providers/Provider';
import { ProviderContract } from '../contracts/providers/ProviderContract';
import { ConfigContract } from '../contracts/config/ConfigContract';
import { Repository } from './Repository';

export class ConfigServiceProvider extends Provider
    implements ProviderContract {
    private configRepository: ConfigContract;

    async initialize(): Promise<void> {
        this.configRepository = new Repository(this.app);
        this.configRepository.loadFromPath(
            this.configRepository.getConfigPath()
        );
    }

    async register(): Promise<void> {
        this.app.instance('config', this.configRepository);
    }
}
