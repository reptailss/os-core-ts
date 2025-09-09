import {List} from 'immutable'

export type getParamSwagger = <T extends keyof ParameterValuesSwagger>(key: T) => ParameterValuesSwagger[T] ;


export interface ParameterSwagger {
    get: getParamSwagger;
}

type Test = List<ParameterValuesSwagger>


const a:Test  = [] as any as Test

a.

export interface ParameterValuesSwagger{
    in:string,
    required:boolean,
    errors:any,
    name:string,
}
