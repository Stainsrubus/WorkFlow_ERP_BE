import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import AppRoutes from './src/routes/index.js'
import path from 'path'

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use('/',AppRoutes)
app.use(express.static('public'));

app.listen(PORT,()=>console.log(`App is listening ${PORT}`))