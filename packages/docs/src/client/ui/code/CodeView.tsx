import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React, {memo} from 'react'
import {atomOneDark, atomOneLight} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter'
import sx from './sx'
import createElement from '@ui/code/custom/CreateElementCode'
import {usAppClientThemeContext} from '@appClient/hooks'


const BaseCode = memo(({
                           code,
                           anchor
                       }: {
    code: string
    anchor?: string | null
    fileName?: string | null
}) => {
    
    const {theme} = usAppClientThemeContext()
    return (
        <SyntaxHighlighter
            language="typescript"
            style={theme === 'light' ? atomOneLight : atomOneDark}
            id={anchor}
            renderer={(props) => {
                return props.rows.map((node, index) => {
                    return createElement({
                        node,
                        key: index?.toString(),
                        stylesheet: props.stylesheet,
                        useInlineStyles: props.useInlineStyles
                    })
                })
            }}
        >
            {code}
        </SyntaxHighlighter>
    )
})

const CodeView = memo(({
                           code,
                           anchor,
                           fileName
                       }: {
    code: string
    anchor?: string | null
    fileName?: string | null
}) => {
    
    if (!fileName) {
        return (
            <BaseCode
                code={code}
                anchor={anchor}
                fileName={fileName}
            />
        )
    }
    return (
        <Box
            sx={sx.inner}
        >
            <Typography
                sx={sx.fileName}
            >
                {fileName}
            </Typography>
            
            <BaseCode
                code={code}
                anchor={anchor}
                fileName={fileName}
            />
        </Box>
    )
})

export default CodeView
