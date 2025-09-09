import { ParameterSwagger } from "@baseTypes/params";
import {SpecPathSwagger} from "@baseTypes/specPath";
import {FnSwagger} from "@baseTypes/fn";
import {OperationSwagger} from "@baseTypes/operation";
import {GetComponentSwagger, GetConfigsSwagger} from "@baseTypes/getters";
import {SpecSelectorsSwagger} from "@baseTypes/specSelectorsSwagger";
import {SpecActionsSwagger} from "@baseTypes/specActions";
import {Oas3ActionsSwagger} from "@baseTypes/oas3Actions";
import {Oas3SelectorsSwagger} from "@baseTypes/oas3Selectors";

export interface GroupedParamsSwagger {
    groupValue: string;
    params: ParameterSwagger[];
}


export interface ParamsPropsSwagger {
    specPath: SpecPathSwagger;
    fn: FnSwagger;
    operation: OperationSwagger;
    onChangeKey: string[];

    onTryoutClick: () => void;
    onResetClick: (pathMethod: string[]) => void;
    parameters: ParameterSwagger[];
    allowTryItOut: boolean;
    tryItOutEnabled: boolean;
    getComponent: GetComponentSwagger;
    getConfigs: GetConfigsSwagger;
    specSelectors: SpecSelectorsSwagger;
    specActions: SpecActionsSwagger;
    pathMethod: string[];
    oas3Actions: Oas3ActionsSwagger;
    oas3Selectors: Oas3SelectorsSwagger;
    onCancelClick: () => void

}
