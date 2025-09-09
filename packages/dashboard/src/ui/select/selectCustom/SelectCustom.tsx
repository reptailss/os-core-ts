import {sx} from './sx'

import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {classNames} from "@helpers/classNames";
import {ISelectProps} from "@ui/select/types";


function SelectCustom<T extends any>({
                                         data,
                                         isLoading,
                                         value,
                                         onChange,
                                         setPage,
                                         label,
                                         disabled,
                                         className,
                                         width,
                                         notItemsText,
                                         error,
                                     }: ISelectProps<T>) {

    const handleChange = (event: any) => {
        if (setPage) {
            setPage(1)
        }
        onChange(event.target.value as string)
    };

    const items = data?.length >= 1 && data.map((item) => {
        const currentValue = item.value;
        const currentTitle = item.label;
        const active = currentValue?.toString() === value?.toString();
        return (
            <MenuItem
                sx={sx.item}
                autoFocus={false}
                key={item?.value}
                value={currentValue}
                className={classNames(active && 'active', error && 'error')}
            >
                {currentTitle}
            </MenuItem>
        )
    })

    return (
        <FormControl
            error={error}
            sx={{
                width: width || '100%',
                ...sx.control,
            }}
            className={className}
            size={'small'}
        >
            <InputLabel size={'small'}>{label}</InputLabel>
            <Select
                <string>
                error={error}
                size={'small'}
                disabled={disabled || isLoading}
                value={value ?? ''}
                onChange={handleChange}
                label={label}
                sx={sx.root}
            >
                {items && items?.length >= 1 ? items :
                    <Typography
                        sx={sx.notItems}
                        variant={'body2'}
                    >
                        {notItemsText || 'Нічого не знайдено..'}
                    </Typography>}
            </Select>
        </FormControl>
    )
}


export default SelectCustom
