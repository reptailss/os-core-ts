import {sx} from './sx'
import React, {ChangeEvent} from 'react'
import ErrorBlock from "@ui/errors/errorBlock/ErrorBlock";
import {Autocomplete, CircularProgress, FormControl, FormHelperText, TextField} from "@mui/material";
import {classNames} from "@helpers/classNames";
import {useGetSelectData} from "@ui/select/hooks/useGetSelectData";
import {ISelectProps} from "@ui/select/types";


interface IProps<T> extends ISelectProps<T> {
}

function SelectSearch<T>({
                             data,
                             value,
                             initialValue,
                             onChange,
                             setPage,

                             isLoading,
                             isError,
                             error,
                             errorMessage,
                             disabled,
                             disabledPointerEvents,

                             placeholder,
                             width,
                             label,
                             size = 'small',
                             keyValue,
                         }: IProps<T>) {
    const {arr, obj} = useGetSelectData<T>({data, keyValue})
    const handleChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {
        if (setPage) {
            setPage(1)
        }
        onChange(value)
    }

    if (isError) {
        return <ErrorBlock/>
    }

    return (
        <FormControl
            className={classNames(disabledPointerEvents && 'disabledPointerEvents', (disabled || isLoading) && 'disabledSelect')}
            error={error}
            sx={{
                width: width ? width : '100%',
                position: 'relative'
            }}
            size={size}
        >
            {isLoading && <CircularProgress sx={sx.spinner} size={20}/>}

            <Autocomplete
                sx={sx.root}
                disabled={disabled}
                className={classNames(error && 'error')}
                size={size}
                value={value}
                defaultValue={initialValue}
                noOptionsText={'Нічого не знайдено...'}
                onChange={handleChange as any}
                loading={isLoading}
                options={arr}
                getOptionLabel={(item: string) => {
                    if (obj?.hasOwnProperty(item)) {
                        const info = obj[item]
                        return info?.label
                    }
                    return item
                }}
                renderOption={(props, option: string) => {
                    if (obj.hasOwnProperty(option)) {
                        const info = obj[option]
                        return <li {...props}>
                            {info?.label}
                        </li>
                    }
                    return <li {...props}>
                        {option}
                    </li>
                }}
                renderInput={(props) => (
                    <TextField
                        {...props}
                        error={error}
                        size={size}
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


export default SelectSearch