import Application from '../app/Application';
import { ProviderContract } from '../contracts/providers/ProviderContract';

export default class Provider implements ProviderContract {
    app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    boot(): void {
        throw new Error(
            `Boot method should be implemented in class ${this.constructor.name}`
        );
    }
}
