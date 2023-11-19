import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useState,  useEffect } from 'react';
import { Box, Input, Typography,InputAdornment } from '@mui/material';
import {Button, Paper, InputBase, Divider, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useCallback } from 'react';

// import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';

export default function Search({onChange, onClickSearch}) {
  const [inn, setInn] = useState()
  const handleSearchClick = useCallback(() => {
    onChange(inn)
    onClickSearch()
  }, [onChange, onClickSearch, inn])

return (
    <div className='search'>
     <Typography variant="h5" pb='24px'>Найти поставщика</Typography>
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
     <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
      <InputBase
        onChange={(event) => {
          setInn(event.target.value)
        }}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Введите ИНН поставщика"
        inputProps={{ 'aria-label': 'search google maps' }}>
    </InputBase>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Button variant="contained" onClick={handleSearchClick}>Найти</Button>
    </Paper>
    </div>
  );
}