export const buildGlobalServiceEndpointsFilters = ({
                                                       serviceKey,
                                                       type,
                                                   }: {
    serviceKey?: string
    type?: string
}) => {
    return {
        where: {
            ...(type ? {type} : {}),
            ...(serviceKey ? {'service_key LIKE': `%${serviceKey?.trim()}%`} : {}),
        }
    }
}