import { ProviderContract } from '../contracts/providers/ProviderContract';
import { ApplicationContract } from '../contracts/application/ApplicationContract';
import { inject } from 'inversify';

export default class Provider implements ProviderContract {
    app: ApplicationContract;

    constructor(@inject('app') app: ApplicationContract) {
        this.app = app;
    }

    boot(): Promise<void> {
        throw new Error(
            `Boot method should be implemented in class ${this.constructor.name}`
        );
    }
}
