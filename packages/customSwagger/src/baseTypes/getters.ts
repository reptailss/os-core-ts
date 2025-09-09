import {FC, ReactElement, ReactNode} from "react";

export type GetComponentSwagger = (componentName: string, fallback?: any) => FC<any>;

export type GetConfigsSwagger = () => Record<string, any>;

