import express from 'express'
import EmployeeRoutes from './employee.js'

const router = express.Router()

router.get('/',(req,res)=>{
    res.status(200).send(`
    <h1 style="text-align:center">Welcome to Backend of Blog App</h1>`)
})

router.use('/employee',EmployeeRoutes)


export default router