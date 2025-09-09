import { ErrorValidator } from "../core";
export type SafeParseSuccessValidatorZod<Output> = {
    success: true;
    data: Output;
    error?: never;
};
export type SafeParseErrorValidatorZod<Input> = {
    success: false;
    error: ErrorValidator;
    data?: never;
};
export type SafeParseResultZodValidator<Output, Input = Output> = SafeParseSuccessValidatorZod<Output> | SafeParseErrorValidatorZod<Input>;
export interface ValidatorOptionalZod<T extends ValidatorZodTypeAny> extends ValidatorZodType<T['_output'] | undefined, any, T['_input'] | undefined> {
}
export interface ValidatorZodType<Output = any, Def = any, Input = Output> {
    readonly _type: Output;
    readonly _output: Output;
    readonly _input: Input;
    safeParse(data: unknown): SafeParseResultZodValidator<Output, Input>;
    optional(): ValidatorOptionalZod<this>;
    refine<RefinedOutput extends Output>(checkCb: (arg: Output) => boolean, message?: string): this;
    refine<RefinedOutput extends Output>(checkCb: (arg: Output) => arg is RefinedOutput, message?: string): this;
    _parse(input: any): any;
    _parseSync(input: any): any;
}
export type ValidatorZodTypeAny = ValidatorZodType<any, any, any>;
