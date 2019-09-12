import { ProviderContract } from '../contracts/providers/ProviderContract';
import { ApplicationContract } from '../contracts/application/ApplicationContract';

export class Provider implements ProviderContract {
    app: ApplicationContract;

    constructor(app: ApplicationContract) {
        this.app = app;
    }
}
