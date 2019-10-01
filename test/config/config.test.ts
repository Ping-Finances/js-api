import { decorate, injectable } from 'inversify';
import { Application } from '../../src/body/app/Application';
import { ConfigContract } from '../../src/body/contracts/config/ConfigContract';
import EventEmitter from 'events';

Object.getPrototypeOf(EventEmitter.prototype).constructor = Object;
decorate(injectable(), EventEmitter);

describe('config get test', () => {
    test('config resolved by path', async () => {
        // arrange
        const application = new Application();
        await application.initialize();
        const config = await application.get<ConfigContract>('config');
        config.loadFromPath(`${__dirname}/testconfigmap/`);

        // act

        // asssert
        expect(config.getConfig()).toEqual({
            config: { foo: 'bar' },
            baz: {
                bar: {
                    foo: 'bar'
                }
            }
        });
    });
})
