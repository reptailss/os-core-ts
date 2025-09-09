import React, {useMemo} from 'react';
import StatCard from "@ui/statCard/StatCard";
import Grid2 from '@mui/material/Grid2';
import {StatCardInfo} from "@ui/statCard/types";
import {getStatCardTypesByRequestStatusCode} from "./helpers/getStatCardTypesByRequestStatusCode";
import {getStatCardIntervalByRequestGrouped} from "./helpers/getStatCardIntervalByRequestGrouped";
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import Divider from '@mui/material/Divider';
import {ServerRequestGroupedByErrorCode, ServerRequestGroupedByStatus} from "@containers/requests/types/grouped";

interface Props {
    requestsGroupedByStatus: ServerRequestGroupedByStatus[],
    requestsGroupedByErrorCode: ServerRequestGroupedByErrorCode[],
}

const RequestsBaseInfo = ({
                              requestsGroupedByStatus,
                              requestsGroupedByErrorCode,
                          }: Props) => {

    const data: {
        statusCodes: StatCardInfo[],
        errorCodes: StatCardInfo[],
    } = useMemo(() => {

        return {
            statusCodes: requestsGroupedByStatus?.map((request) => {
                return {
                    title: `статус: ${request.statusCode?.toString()} `,
                    data: request.counts,
                    interval: getStatCardIntervalByRequestGrouped(request.days),
                    trend: getStatCardTypesByRequestStatusCode(request.statusCode),
                    trendValue: `avg ${request.averageResponseTime} ms`,
                    days: request.days,
                    value: request.totalFormatted,
                }
            }),
            errorCodes: requestsGroupedByErrorCode?.map((request) => {
                return {
                    title: `Помилка: ${request.errorCode?.toString()} `,
                    data: request.counts,
                    interval: getStatCardIntervalByRequestGrouped(request.days),
                    trend: 'down',
                    trendValue: `avg ${request.averageResponseTime} ms`,
                    days: request.days,
                    value: request.totalFormatted,
                }
            }),
        }
    }, [requestsGroupedByStatus])
    return (
        <Stack>
            {data?.statusCodes?.length >= 1 && <Divider
                sx={sx.divider}
            >
                Статуси
            </Divider>}

            <Grid2
                container
                sx={sx.root}
            >
                {data?.statusCodes.map((statCard, index) => (
                    <Grid2
                        key={index}
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 4,
                        }}

                    >
                        <StatCard
                            statCard={statCard}
                        />
                    </Grid2>
                ))}
            </Grid2>


            {data?.errorCodes?.length >= 1 && <Divider
                sx={sx.divider}
            >
                Помилки
            </Divider>}

            <Grid2
                container
                sx={sx.root}
            >
                {data?.errorCodes.map((statCard, index) => (
                    <Grid2
                        key={index}
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 4,
                        }}
                    >
                        <StatCard
                            statCard={statCard}
                        />
                    </Grid2>
                ))}
            </Grid2>
        </Stack>
    );
};

export default RequestsBaseInfo;
