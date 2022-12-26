import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
const SearchBar = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
          <TextField id="outlined-basic" label="search patient" variant="outlined" 
          sx= {{width:'300px',height:'50px','& fieldset':{borderRadius:'30px'},marginBottom:1}}
          InputProps= {{
            endAdornment:<InputAdornment>
                <IconButton
                >
                <SearchIcon/>
                </IconButton>
              </InputAdornment>
          }}
          />
      </div>
    </Box>
  );
}

export default SearchBar