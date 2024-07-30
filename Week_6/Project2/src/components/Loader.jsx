import { Box, CircularProgress, Stack } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <div>
      <Box  minHeight="95vh"  >
        <Stack  direction='row' justifyContent='center' alignItems='center' height='80vh'>
            <CircularProgress />
        </Stack>

      </Box>
    </div>
  )
}

export default Loader
