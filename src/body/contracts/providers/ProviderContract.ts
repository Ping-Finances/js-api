import { ApplicationContract } from '../application/ApplicationContract';

export interface ProviderContract {
    app: ApplicationContract;
    boot: () => Promise<any>;
    register?: () => void;
}
