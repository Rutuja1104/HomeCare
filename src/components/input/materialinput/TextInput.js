import React from 'react'

import { InputAdornment, TextField } from '@mui/material'
import { SearchRounded } from '@mui/icons-material'

const TextInput2 = () => {
    return (
        <TextField
            className='form-control'
            id="outlined-basic"
            placeholder='Search'
            variant="outlined"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchRounded />
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default TextInput2