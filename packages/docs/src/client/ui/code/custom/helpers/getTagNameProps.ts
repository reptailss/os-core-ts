import React from "react";
import {createClassNameStringCode} from "@ui/code/custom/helpers/createClassNameString";
import {createStyleObjectCode} from "@ui/code/custom/helpers/createStyleObject";

export const getTagNamePropsCode = ({
                                        stylesheet,
                                        useInlineStyles,
                                        properties,
                                        style,
                                    }: {
    stylesheet: { [key: string]: React.CSSProperties };
    useInlineStyles: boolean;
    properties: any,
    style?: { [key: string]: React.CSSProperties } | undefined;
}) => {


    const allStylesheetSelectors = Object.keys(stylesheet).reduce(
        (classes, selector) => {
            selector.split('.').forEach(className => {
                //@ts-ignore
                if (!classes.includes(className)) {
                    //@ts-ignore
                    classes.push(className)
                };
            });
            return classes;
        },
        []
    );
    const startingClassName = properties.className && properties.className.includes('token') ? ['token'] : [];

    const className =
        properties.className &&
        startingClassName.concat(
            //@ts-ignore
            properties.className.filter(className => !allStylesheetSelectors.includes(className))
        );

    return {
        ...properties,
        className: createClassNameStringCode(className) || undefined,
        style: createStyleObjectCode(
            properties.className,
            Object.assign({}, properties.style, style),
            stylesheet
        )
    };
}
