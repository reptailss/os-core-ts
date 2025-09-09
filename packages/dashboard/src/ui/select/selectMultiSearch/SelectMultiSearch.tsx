import {sx} from './sx'

import React, {ChangeEvent} from 'react'
import ErrorBlock from "@ui/errors/errorBlock/ErrorBlock";
import {Autocomplete, Checkbox, CircularProgress, FormControl, FormHelperText, TextField} from "@mui/material";
import {classNames} from "@helpers/classNames";
import {ISelectMultiProps} from "@ui/select/types";
import {useGetSelectData} from "@ui/select/hooks/useGetSelectData";

function SelectMultiSearch<T = any>({
                                        data,
                                        value,
                                        onChange,
                                        initialValue,
                                        isLoading,
                                        isError,
                                        error,
                                        errorMessage,
                                        disabled,

                                        placeholder,
                                        width,
                                        label,
                                        setPage,
                                        keyValue,
                                    }: ISelectMultiProps<T>) {
    const {arr, obj} = useGetSelectData<T>({data, keyValue})

    const handleChange = (event: ChangeEvent<HTMLInputElement>, newValue: string[]) => {
        if (setPage) {
            setPage(1)
        }
        onChange(newValue)
    }


    if (isError) {
        return <ErrorBlock/>
    }

    return (
        <FormControl
            error={error}
            sx={{
                width: width ? width : '100%',
                position: 'relative'
            }}
            size={'small'}
        >
            {isLoading && <CircularProgress sx={sx.spinner} size={20}/>}

            <Autocomplete
                noOptionsText={'Нічого не знайдено...'}
                sx={sx.root}
                multiple
                disabled={disabled}
                className={classNames(error && 'error')}
                size={'small'}
                onChange={handleChange as any}
                defaultValue={initialValue}
                value={value || []}
                loading={isLoading}
                options={arr || []}
                disableCloseOnSelect={true}
                getOptionLabel={(item: string) => {
                    if (obj?.hasOwnProperty(item)) {
                        return obj[item]?.label
                    }
                    return item
                }}
                renderOption={(props, option: string, {selected}) => {
                    let label = option;
                    if (option in obj) {
                        label = obj[option]?.label;
                    }
                    return <li {...props}>
                        <Checkbox
                            style={{marginRight: 8}}
                            checked={selected}
                        />
                        {label}
                    </li>
                }}

                renderInput={(props) => (
                    <TextField
                        {...props}
                        error={error}
                        size={'small'}
                        label={label}
                        placeholder={placeholder}
                    />
                )}
            />

            {error && errorMessage && <FormHelperText error>
                {errorMessage}
            </FormHelperText>}
        </FormControl>
    )

}

export default SelectMultiSearch