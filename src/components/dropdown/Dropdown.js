import React from 'react';

import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

const Dropdown = ({
    className,
    list,
    onChange,
    selectedvalue,
    placeholder,
    label,
    labelId,
    dropdownName,
    error,
    helperText
}) => {
    const handleChange = (event) => {
        onChange(event);
    };

    return (
        <Box>
            <FormControl error={error && error}>
                <InputLabel id="demo-simple-select-label">{label ?? ''}</InputLabel>
                <Select
                    // labelId={labelId ?? ""}
                    id="demo-simple-select-label"
                    name={dropdownName ?? undefined}
                    sx={{ height: 36, marginBottom: 2 }}
                    value={selectedvalue || ''}
                    label={label ?? ''}
                    displayEmpty
                    renderValue={(value) => (value ? value : placeholder)}
                    // value={value}
                    onChange={handleChange}
                    className={className ?? 'dropdown '}
                    // placeholder={placeholder ?? ""}
                >
                    {list?.map((item, index) => (
                        <MenuItem key={index} value={item}>
                            {item ?? 'N/A'}
                        </MenuItem>
                    ))}
                </Select>
                {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
        </Box>
    );
};
export default Dropdown;
