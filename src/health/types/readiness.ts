export type ReadinessInfo  = {
    redis_db?: ReadinessStatus,
    redis?: ReadinessStatus,
    aws?: ReadinessStatus,
    mongo_db?: ReadinessStatus,
    mysql?: ReadinessStatus,
}

export type ReadinessStatus = 'error' | 'success'

