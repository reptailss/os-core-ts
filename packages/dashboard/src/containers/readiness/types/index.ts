import {Readiness} from "./readiness";

export type ReadinessResult = {
    code: 200 | 500,
    status: 'ok' | 'bad',
    info: Readiness,
}


export interface LivenessResult {
    status: 'ok',
    code: 200,
};
