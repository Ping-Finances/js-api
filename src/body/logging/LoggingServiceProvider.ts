import * as winston from 'winston';
import { Provider } from '../providers/Provider';
import { ProviderContract } from '../contracts/providers/ProviderContract';

export class LoggingServiceProvider extends Provider
    implements ProviderContract {
    private logger: winston.Logger;

    public async initialize(): Promise<void> {
        this.logger = winston.createLogger({
            level: 'error',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({
                    filename: 'error.log',
                    level: 'info'
                })
            ]
        });

        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(
                new winston.transports.Console({
                    level: 'info',
                    format: winston.format.simple()
                })
            );
        }
    }

    public async register(): Promise<void> {
        await this.app.instance<winston.Logger>('log', this.logger);
    }
}
