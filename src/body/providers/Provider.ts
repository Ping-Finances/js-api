import { ProviderContract } from '../contracts/providers/ProviderContract';
import { ApplicationContract } from '../contracts/application/ApplicationContract';

export class Provider implements ProviderContract {
    public app: ApplicationContract;

    constructor(app: ApplicationContract) {
        this.app = app;
    }
}
