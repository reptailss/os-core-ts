import React, {useMemo, useState} from 'react'
import Button from '@mui/material/Button'
import {Divider} from '@mui/material'
import {OnClickContentSearchResult} from '@docsSearch/types/events'
import {ContentSearchResult} from '@docsSearch/types'
import SearchResultContentItemView from '@docsSearch/view/SearchResultContentItemView'
import sx from './sx'

const MAX_CONTENT_COUNT = 5

const BaseContentSearchList = ({
                                   contents,
                                   onClickContentSearchResult,
                               }: {
    contents: ContentSearchResult[]
    onClickContentSearchResult: OnClickContentSearchResult
}) => {
    return (
        <>
            {
                contents?.length >= 1 && contents.map((content, index, array) => {
                    return (
                        <SearchResultContentItemView
                            key={content.path}
                            content={content}
                            onClickContentSearchResult={onClickContentSearchResult}
                            isLastItem={index === array.length - 1}
                        />
                    )
                })
            }
        </>
    )
}

const ContentSearchListWithAccor = ({
                                        contents,
                                        onClickContentSearchResult,
                                    }: {
    contents: ContentSearchResult[]
    onClickContentSearchResult: OnClickContentSearchResult
}) => {
    const [visible, setVisible] = useState(false)
    
    const data = useMemo(() => {
        return {
            base: contents.slice(0, MAX_CONTENT_COUNT),
            rest: contents.slice(MAX_CONTENT_COUNT, contents.length),
        }
    }, [contents])
    
    const toggleVisible = () => {
        setVisible((prev) => !prev)
    }
    return (
        <>
            <BaseContentSearchList
                contents={data.base}
                onClickContentSearchResult={onClickContentSearchResult}
            />
            {!visible && <Button
                size={'small'}
                variant={'text'}
                onClick={toggleVisible}
            >
                та ще {contents.length - MAX_CONTENT_COUNT}...
            </Button>}
            {visible && <BaseContentSearchList
                contents={data.rest}
                onClickContentSearchResult={onClickContentSearchResult}
            />}
            <Divider sx={sx.searchResultContentSearchListDivider} />
        </>
    )
}

const SearchResultContentSearchListView = ({
                                               contents,
                                               onClickContentSearchResult,
                                           }: {
    contents: ContentSearchResult[]
    onClickContentSearchResult: OnClickContentSearchResult
}) => {
    if (contents.length > MAX_CONTENT_COUNT) {
        return (
            <ContentSearchListWithAccor
                contents={contents}
                onClickContentSearchResult={onClickContentSearchResult}
            />
        )
    }
    return (
        <BaseContentSearchList
            contents={contents}
            onClickContentSearchResult={onClickContentSearchResult}
        />
    )
}

export default SearchResultContentSearchListView
