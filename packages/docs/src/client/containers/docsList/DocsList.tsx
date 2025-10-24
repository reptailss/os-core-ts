import React from 'react'
import {useGetDocsByPagePath} from '@docsList/hooks/useGetDocsByPagePath'
import DocPageView from '@docsList/view/DocPageView'
import Typography from '@mui/material/Typography'

const DocsList = ({
                      pagePath,
                  }: {
    pagePath: string
}) => {
    
    const docPage = useGetDocsByPagePath(pagePath)
    
    if(!docPage){
        return  (
            <Typography>
                Нічого не знайдено...
            </Typography>
        )
    }
    
    return (
        <DocPageView
            docPage={docPage}
        />
    )
}

export default DocsList