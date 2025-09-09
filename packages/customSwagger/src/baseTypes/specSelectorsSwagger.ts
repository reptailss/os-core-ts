export type SpecSelectorsSwagger = {
    getSpec: () => any;
    isOAS3: () => boolean;
    [key: string]: (...args: any[]) => any;
};
