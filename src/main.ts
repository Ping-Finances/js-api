import { Application } from './body/app/Application';
import * as winston from 'winston';

const application = new Application();

application.onBooted(() => {
    application.get<winston.Logger>('log');
});
