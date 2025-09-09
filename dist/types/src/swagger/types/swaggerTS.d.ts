import { Definition } from 'typescript-json-schema';
export interface MethodInfoBuildTSSchema {
    className: string;
    methods: {
        name: string;
        hasReturnType: boolean;
    }[];
    filePath: string;
}
export type SwaggerTsSchemas = Record<string, Definition | Definition[]>;
