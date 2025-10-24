import React from 'react';
import ModuleLinkCodeView from "@ui/code/custom/ModuleLinkCodeView";
import {parseLinkArgumentsCode} from "@ui/code/custom/helpers/parseLinkArguments";
import {getTagNamePropsCode} from "@ui/code/custom/helpers/getTagNameProps";


interface rendererNode {
    type: "element" | "text";
    value?: string | number | undefined;
    tagName?: keyof React.JSX.IntrinsicElements | React.ComponentType<any> | undefined;
    properties?: { className: string[] | any; [key: string]: any };
    children?: rendererNode[];
}

interface Props {
    node: rendererNode
    style?: { [key: string]: React.CSSProperties } | undefined;
    stylesheet: { [key: string]: React.CSSProperties };
    useInlineStyles: boolean;
    key: string

}

function createChildrenCode(
    stylesheet: { [key: string]: React.CSSProperties },
    useInlineStyles: boolean
) {
    let childrenCount = 0;
    return children => {
        childrenCount += 1;
        return children.map((child, i) =>
            createElement({
                node: child,
                stylesheet,
                useInlineStyles,
                key: `code-segment-${childrenCount}-${i}`
            })
        );
    };
}


const parseArray = (input: string) => {
    return input.split(/(#linkModule\([^()]*\))/).filter(Boolean);
}

export function CodeLink({value}:{
    value:string
}){
    if (value.includes('#linkModule(')) {
        const arr = value.split('#linkModule(')
        if (arr.length > 1) {
            const normalArray = parseArray(value)
            return normalArray.map((val, index) => {
                if (val.includes('#linkModule(')) {
                    const args = parseLinkArgumentsCode(val)
                    
                    return (
                        <ModuleLinkCodeView
                            key={index}
                            module={args.module}
                            section={args.section}
                            label={args.label}
                            after={args.after}
                            before={args.before}
                            id={args.id}
                        />
                    )
                }
                return val
            })
        }
        const args = parseLinkArgumentsCode(value)
        if (!args.module || !args.label) {
            return value
        }
        return (
            <ModuleLinkCodeView
                module={args.module}
                section={args.section}
                label={args.label}
                after={args.after}
                before={args.before}
                id={args.id}
            />
        )
    }
    return value;
}

export default function createElement({
                                          node,
                                          stylesheet,
                                          style = {},
                                          useInlineStyles,
                                          key
                                      }: Props) {
    const {
        properties,
        type,
        tagName: TagName,
        value
    } = node;
    if (type === 'text') {
      
        if (typeof value === 'string' && value.includes('#linkModule(')) {
            const arr = value.split('#linkModule(')
            if (arr.length > 1) {
                const normalArray = parseArray(value)
                return normalArray.map((val, index) => {
                    if (val.includes('#linkModule(')) {
                        const args = parseLinkArgumentsCode(val)
                  
                        return (
                            <ModuleLinkCodeView
                                key={index}
                                module={args.module}
                                section={args.section}
                                label={args.label}
                                after={args.after}
                                before={args.before}
                                id={args.id}
                            />
                        )
                    }
                    return val
                })
            }
            const args = parseLinkArgumentsCode(value)
            if (!args.module || !args.label) {
                return value
            }
            return (
                <ModuleLinkCodeView
                    module={args.module}
                    section={args.section}
                    label={args.label}
                    after={args.after}
                    before={args.before}
                    id={args.id}
                />
            )
        }
        return value;
    }
    if (TagName) {
        const childrenCreator = createChildrenCode(stylesheet, useInlineStyles);
        const children = childrenCreator(node.children);

        return (
            <TagName
                key={key}
                {...getTagNamePropsCode({
                    style,
                    stylesheet,
                    properties,
                    useInlineStyles,
                })}
            >
                {children}
            </TagName>
        );
    }
}
