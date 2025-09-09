export type SpecActionsSwagger = {
    updateSpec: (newSpec: any) => void;
    validateSpec: () => boolean;
    [key: string]: any;
};
