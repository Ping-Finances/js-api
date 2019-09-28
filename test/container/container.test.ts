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
        // arrange
        const application = new Application();
        await application.bind<ResolvableClassInterface>(
            'shouldResolve',
            ResolvableClass
        );

        // act
        const firstResolved = await application.get<ResolvableClassInterface>(
            'shouldResolve'
        );

        const secondResolved = await application.get<ResolvableClassInterface>(
            'shouldResolve'
        );

        // assert
        expect(firstResolved.testMethod()).toEqual(true);
        expect(firstResolved).not.toBe(secondResolved);
    });

    test('should bind and resolve a singleton of a class', async () => {
        // arrange
        const application = new Application();
        await application.singleton<ResolvableClassInterface>(
            'shouldResolve',
            ResolvableClass
        );

        // act
        const firstResolved = await application.get<ResolvableClassInterface>(
            'shouldResolve'
        );
        const secondResolved = await application.get<ResolvableClassInterface>(
            'shouldResolve'
        );

        // assert
        expect(firstResolved.testMethod()).toEqual(true);
        expect(firstResolved).toBe(secondResolved);
    });
});
