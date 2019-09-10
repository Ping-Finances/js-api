import { ProviderContract } from '../contracts/providers/ProviderContract';
import { ApplicationContract } from '../contracts/application/ApplicationContract';

export class Provider implements ProviderContract {
    app: ApplicationContract;

    constructor(app: ApplicationContract) {
        this.app = app;
    }

    boot(): Promise<void> {
        throw new Error(
            `Boot method should be implemented in class ${this.constructor.name}`
        );
    }
}
