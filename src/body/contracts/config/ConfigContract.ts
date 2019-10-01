import { ConfigMap } from '../../config/ConfigMap';

export interface ConfigContract {
    get(path: string, defaultValue: any): any;
    loadFromPath(path: string): void;
    getItems(): ConfigMap;
}
