import * as winston from 'winston';
import { Provider } from '../../providers/Provider';
import { ProviderContract } from '../../contracts/providers/ProviderContract';

export class LoggingServiceProvider extends Provider
    implements ProviderContract {
    private logger: winston.Logger;

    public boot(): Promise<void> {
        return new Promise<void>((resolve: () => void): void => {
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

            resolve();
        });
    }

    public register(): void {
        this.app.instance<winston.Logger>('log', this.logger);
    }
}
