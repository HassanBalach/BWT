import { IconButton, Paper } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const onhandleSubmit = (e)=>{
    e.preventDefault()
    if(searchTerm){
      navigate(`/search/${searchTerm}`)
      setSearchTerm("")
    }
  }

  return (
    <div>
      <Paper 
      component='form'
      onSubmit={onhandleSubmit}
      sx={{
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        pl: 2,
        boxShadow: 'none',
        mr: { sm: 5 },
      }}>
        <input
         className='search-bar'
         placeholder='Search...'
         value={searchTerm}
         onChange={(e)=> setSearchTerm(e.target.value)}
         
         type="text" />
         <IconButton type='submit' sx={{ p: '10px', color: 'red' }} aria-label='search'>
            <SearchIcon />
         </IconButton>
      </Paper>
    </div>
  )
}

export default Searchbar
