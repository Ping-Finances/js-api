import { ApplicationContract } from '../application/ApplicationContract';

export interface ProviderContract {
    app: ApplicationContract;
    boot: () => void;
    register?: () => void;
}
