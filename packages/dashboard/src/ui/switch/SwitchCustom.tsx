import React from 'react';
import {FormControlLabel, Switch} from "@mui/material";

interface Props {
    value: boolean
    onChange: (value: boolean) => void
    label: string
}

const SwitchCustom = ({
                          value,
                          onChange,
                          label,
                      }: Props) => {
    return (
        <FormControlLabel
            control={<Switch checked={value} onChange={(e, checked) => onChange(checked)}/>}
            label={label}
        />
    );
};

export default SwitchCustom;