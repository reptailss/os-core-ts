export type Oas3ActionsSwagger = {
    addOperation: (operation: any) => void;
    removeOperation: (operationId: string) => void;
    [key: string]: (...args: any[]) => any;
};
