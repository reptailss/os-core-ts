import { ReadinessInfo } from "..";
export declare class ReadinessService {
    getReadiness(): Promise<{
        code: 200 | 500;
        status: 'ok' | 'bad';
        info: ReadinessInfo;
    }>;
    private checkSqlDbReadiness;
    private checkDynamicDbSql;
    private checkStaticDbSql;
    private checkRedisReadiness;
    private checkRedisDynamicReadiness;
    private checkRedisStaticReadiness;
    private checkAwsS3;
}
