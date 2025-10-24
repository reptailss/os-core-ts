export type getParamSwagger = <T extends keyof ParameterValuesSwagger>(key: T) => ParameterValuesSwagger[T];


export interface ParameterSwagger {
    get: getParamSwagger;
}


export interface ParameterValuesSwagger {
    in: string,
    required: boolean,
    errors: any,
    name: string,
}
