import React, {useMemo, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import {sx} from './sx'
import LogItem from "@containers/serverLogs/logItem/LogItem";
import Stack from '@mui/material/Stack';
import RefetchLogs from "@containers/serverLogs/refetchLogs/RefetchLogs";
import Spinner from '@ui/spinner/Spinner';
import {usePaginationCustom} from "@hooks/usePaginationCustom";
import {Pagination, TextField} from "@mui/material";
import {useDebounce} from "@hooks/useDebounce";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {addQueryParamsWithoutRouter, getQueryParams} from "@helpers/searchParams";
import {getInitialPageParamServerLogs} from "@containers/serverLogs/helpers/getInitialPageParam";
import NotFoundMessage from "@ui/notFoundMesssage/NotFoundMessage";
import {ServerLog} from "@containers/serverLogs/types";


const ROWS_PER_PAGE = 200

interface Props {
    isLoading?: boolean,
    refetch?: (prop: {
        dateStart: Date,
        dateEnd: Date
    }) => Promise<void>,
    logs: ServerLog[],
}

const ServerLogsView = ({
                            logs,
                            refetch,
                            isLoading,
                        }: Props) => {

    const [page, setPage] = React.useState<number>(() => getInitialPageParamServerLogs());
    const [searchValue, setSearchValue] = useState<string>(() => getQueryParams('searchValue') || '')

    const {debouncedValue} = useDebounce({
        value: searchValue,
        delay: 800
    })

    const ref = useRef<HTMLElement>()

    const filteredData = useMemo(() => {
        if (!searchValue) {
            return logs
        }
        return logs.filter((serverLog) => serverLog?.log?.trim()?.toLowerCase().includes(searchValue.toLowerCase()))
    }, [searchValue, logs])

    const {
        paginationData,
        totalPage,
    } = usePaginationCustom({
        data: filteredData,
        page,
        perPage: ROWS_PER_PAGE
    })

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        addQueryParamsWithoutRouter({
            page: newPage.toString()
        })
        ref?.current?.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

    const handleSearch = (searchValue: string) => {
        setSearchValue(searchValue)
        addQueryParamsWithoutRouter({
            searchValue: searchValue.trim()
        })
        if (page !== 1) {
            handleChangePage(null, 1)
        }
    }

    const onClear = () => {
        handleSearch('')
    }

    const list = paginationData?.map((log, index) => {
        return (
            <LogItem
                serverLog={log}
                key={log.id}
            />
        )
    })

    return (
        <Box
            sx={sx.root}
            ref={ref}
        >
            {isLoading && <Spinner variant={'overlay'}/>}

            {refetch && <RefetchLogs
                sx={sx.refetch}
                refetch={refetch}
            />}

            <TextField
                size={'small'}
                fullWidth
                value={searchValue}
                onChange={(event) => handleSearch(event.target.value)}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">
                            {debouncedValue ? <IconButton>
                                <CloseIcon onClick={onClear}/>
                            </IconButton> : <SearchIcon/>}
                        </InputAdornment>,
                    },
                }}
                sx={sx.input}
                placeholder={'Пошук'}
            />
            <Stack
                gap={'5px'}
            >
                {list}
            </Stack>

            {(!logs?.length && !isLoading) && <NotFoundMessage/>}

            <Pagination
                count={totalPage}
                page={page > totalPage ? totalPage : page}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
                sx={sx.pagination}
            />
        </Box>
    );
};

export default ServerLogsView;
