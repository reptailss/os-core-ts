import { GmExport } from "../../core";
export interface IGmService {
    serviceType: 'fn' | 'class';
    getExport(): GmExport;
    getServiceName(): string;
}
