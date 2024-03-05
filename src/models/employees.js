import mongoose from "./index.js";

const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email); 
};

const validateMobile = (mobile) => {
    const mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(mobile);
};

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"], validate: { validator: validateEmail, message: "Invalid email format" } },
    mobile: { type: String, required: [true, "Mobile Number is required"], validate: { validator: validateMobile, message: "Invalid mobile number" } },
    designation: { type: String, required: [true, "Designation is required"] },
    gender: { type: String, required: [true, "Gender is required"] }, 
    course: { type: String, required: [true, "Course is required"] },
    image: { type: String,required: [true, "Image is required"] },
    password: { type: String, required: [true, "Password is required"] },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }
}, {
    collection: 'employees',
    versionKey: false
});

const employeeModel = mongoose.model('employees', employeeSchema);
export default employeeModel;
