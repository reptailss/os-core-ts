export const buildSystemOsInfoLogsFilters = ({
                                                 serviceKeys,
                                             }: {
    serviceKeys: string[]
}) => {
    if (!serviceKeys?.length) {
        return {}
    }
    if (serviceKeys.length === 1) {
        return {
            where: {
                'service_key': serviceKeys[0],
            }
        }
    }
    return {
        where: {
            'service_key IN': serviceKeys,
        }
    }
}