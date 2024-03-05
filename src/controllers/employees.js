import employeeModel from '../models/employees.js'
import Auth from '../common/auth.js'
import fs from 'fs';
import path from 'path';

const create = async(req,res)=>{
    try {
        let employee = await employeeModel.findOne({email:req.body.email})
        if(!employee){
            let image = '';
            if (req.file) {
                image = req.file.path;
            }
            req.body.password = await Auth.hashPassword(req.body.password)
            await employeeModel.create({...req.body,image})
            res.status(201).send({
                message:"Employee Created Successfully"
             })
        }
        else
        {
            res.status(400).send({message:`Employee with ${req.body.email} already exists`})
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}
const signup = async(req,res)=>{
    try {
        let employee = await employeeModel.findOne({email:req.body.email})
        if(!employee){
            req.body.password = await Auth.hashPassword(req.body.password)
            await employeeModel.create(req.body)
            res.status(201).send({
                message:"Employee Created Successfully"
             })
        }
        else
        {
            res.status(400).send({message:`Employee with ${req.body.email} already exists`})
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const login = async(req,res)=>{
    try {
        let employee = await employeeModel.findOne({email:req.body.email})
        if(employee)
        {
            let hashCompare = await Auth.hashCompare(req.body.password,employee.password)
            if(hashCompare)
            {
                let token = await Auth.createToken({
                    id:employee._id,
                    name:employee.name,
                    email:employee.email,
                    designation:employee.designation
                })
                let employeeData = await employeeModel.findOne({email:req.body.email},{_id:0,password:0,status:0,createdAt:0,email:0})
                res.status(200).send({
                    message:"Login Successfull",
                    token,
                    employeeData
                })
            }
            else
            {
                res.status(400).send({
                    message:`Invalid Password`
                })
            }
        }
        else
        {
            res.status(400).send({
                message:`Account with ${req.body.email} does not exists!`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const getAllEmployees = async (req, res) => {
    try {
        let employees = await employeeModel.find();
       
        
        res.status(200).send({
            message: "Employees retrieved successfully",
            employees
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
}
const editEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const { name, email, mobile, course, designation, gender } = req.body;
        let employee = await employeeModel.findById(employeeId);
        let imgURL = "";

        if (req.file) {
            imgURL = `storage/images/${req.file.filename}`;
        }

        if (employee) {
            if (req.file) {
                const filename = employee.image.split('/').pop();
                const filePath = `path/to/storage/${filename}`; 

                try {
             
                    if (fs.existsSync(filePath)) {
                     
                        fs.unlinkSync(filePath);
                        console.log(`Previous image ${filename} deleted successfully`);
                    } else {
                        console.log(`Previous image ${filename} not found`);
                    }
                } catch (err) {
                    console.error(`Error deleting previous image ${filename}:`, err);
                }
            }

            employee.name = name;
            employee.email = email;
            employee.mobile = mobile;
            employee.designation = designation;
            employee.gender = gender;
            employee.course = course;
            employee.image = imgURL;
            employee.modifiedAt = Date.now();

            await employee.save();

            res.status(200).send({
                message: "employee Edited Successfully"
            });
        } else {
            res.status(400).send({ message: "employee Id Not found" });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

const deleteEmployeeById = async (req, res) => {
    try {
      const employeeId = req.params.id;
        const employee = await employeeModel.findByIdAndDelete(employeeId);

        if (employee) {
            res.status(200).send({
                message: "Employee Deleted Successfully"
            });
        } else {
            res.status(404).send({ message: "Employee Not found" });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await employeeModel.findById(employeeId, { password: 0, status: 0, createdAt: 0 }); // Excluding sensitive fields

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).send({
        message: 'Employee retrieved successfully',
        employee
    });

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};




export default {
    create,
    signup,
    login,
    getAllEmployees,
    getEmployeeById ,
    editEmployee,
    deleteEmployeeById
}