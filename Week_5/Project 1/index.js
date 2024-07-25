import express from 'express';
import Router from './Routes/user.route.js '
const app  = express()
const PORT = 5000;

app.use(express.json())
app.use('/api/user', Router )

app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`))