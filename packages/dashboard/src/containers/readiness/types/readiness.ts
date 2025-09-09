export interface Readiness {
    redis_db?: StatusReadiness,
    redis?: StatusReadiness,
    aws?: StatusReadiness,
    mongo_db?: StatusReadiness,
    mysql?: StatusReadiness,
}

export type StatusReadiness = 'error' | 'success'

