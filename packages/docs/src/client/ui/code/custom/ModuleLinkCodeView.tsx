import React from 'react'


const ModuleLinkCodeView = (props: {
    before: string
    label: string
    module: string
    section: string
    after: string
    id: string
}) => {

    return (
        <>
            
            {props?.before && props.before}
            
            <a
                href={`${props.module}#${props.section}`}
                className="link link-code"
                id={props.id}
                data-block={props.id}
            >
                {props.label || '(див.)'}
            </a>
            {props?.after && props.after}
        </>
    )
}

export default ModuleLinkCodeView
