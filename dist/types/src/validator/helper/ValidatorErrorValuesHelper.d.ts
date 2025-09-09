import { ErrorValue } from "../../appError";
import { ErrorValidator } from "../core";
export declare class ValidatorErrorValuesHelper {
    static buildErrorValuesBySchema(errors: ErrorValidator): ErrorValue[];
    private static buildErrorUnion;
    private static buildErrorDefault;
}
