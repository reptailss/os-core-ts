export  interface FnSwagger{
    jsonSchema2020: {
        isExpandable: boolean;
        hasKeyword: Function;
        useFn: Function;
        useConfig: Function;
        useComponent: Function;
    };
    jsonSchema5: {
        inferSchema: Function;
        sampleFromSchema: Function;
        sampleFromSchemaGeneric: Function;
        createXMLExample: Function;
        memoizedSampleFromSchema: Function;
    };
    opsFilter: (filter: string) => unknown;
    buildRequest: (options: any) => unknown;
    fetch: (req: any) => unknown;
    resolveSubtree: (asyncFunc: any, root: any) => Promise<unknown>;
    resolve: (options: any) => unknown;
    opId: (
        operation: string,
        pathName: string,
        method: string,
        options?: { v2OperationIdCompatibilityMode?: boolean }
    ) => string;
    requestSnippetGenerator_curl_bash: (params: any) => string;
    requestSnippetGenerator_curl_cmd: (params: any) => string;
    requestSnippetGenerator_curl_powershell: (params: any) => string;
    getDisplayName: (name: string) => string;
    sampleFromSchema: (schema: any) => unknown;
    mergeJsonSchema: (schema1: any, schema2: any) => any;
    serializeRes: (
        serializedResponse: any,
        url: string,
        options?: { loadSpec?: boolean }
    ) => unknown;
    useFn: (...args: any[]) => any;
    useComponent: (...args: any[]) => any;
    useConfig: (...args: any[]) => any;
    getScrollParent: (element: HTMLElement) => HTMLElement | null;
    withErrorBoundary: <T>(component: T) => T;
}
