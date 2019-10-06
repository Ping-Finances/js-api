import { Application } from '../../src/body/app/Application';
import { ConfigContract } from '../../src/body/contracts/config/ConfigContract';

describe('config get test', () => {
    test('config resolved by path', async () => {
        // arrange
        const application = new Application();
        application.onBooted(async () => {
            const config = await application.get<ConfigContract>('config');

            // act
            config.loadFromPath(`${__dirname}/testconfigmap/`);

            // asssert
            expect(config.getItems()).toEqual({
                config: { foo: 'bar' },
                baz: {
                    bar: {
                        foo: 'bar'
                    }
                }
            });

            expect(config.get('config.foo')).toEqual('bar');
        });
    });
});
