import { injectable } from 'inversify';
import { Application } from '../../src/body/app/Application';

interface ResolvableClassInterface {
    testMethod(): boolean;
}

@injectable()
class ResolvableClass implements ResolvableClassInterface {
    testMethod(): boolean {
        return true;
    }
}

describe('container bind and resolve test', () => {
    test('should bind and resolve a class', async () => {
        const application = new Application();
        await application.bind<ResolvableClassInterface>(
            'shouldResolve',
            ResolvableClass
        );
        const resolved = await application.get<ResolvableClassInterface>(
            'shouldResolve'
        );

        expect(resolved.testMethod()).toEqual(true);
    });
});
