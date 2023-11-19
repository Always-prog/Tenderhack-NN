import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useState,  useEffect } from 'react';
import { Box, Input, Typography,InputAdornment } from '@mui/material';
import {Button, Paper, InputBase, Divider, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';

export default function Search() {
// const [item, SetItem] = useState([]);

//     const handleSearch = (evt) => {
//         const { value } = evt.target;
//         if (value === '') { dispatch(clearSearch()); }
//         else { dispatch(changeUsersField({ search: value })); }
//     };
//     const hasQuery = search.trim() !== '';


//    const search = async () => {
//         const params = new
//             URLSearchParams({ q: search, sort: 'repositories'});
    
//         const response = await
//             fetch(`${import.meta.env.VITE_APP_SEARCH_URL}?${params}`);
//         if (!response.ok) {
//             throw new
//                 Error("Ошибка!");
//         }
//         return await response.json();
//     }

//   useEffect(()=>{

//   })

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
        sx={{ ml: 1, flex: 1 }}
        placeholder="Введите ИНН поставщика"
        inputProps={{ 'aria-label': 'search google maps' }}>
    </InputBase>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Button variant="contained">Найти</Button>
    </Paper>
    </div>
  );
}