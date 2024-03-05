import express from "express";
import EmployeeController from "../controllers/employees.js";
import Auth from "../common/auth.js";
import fileUpload from "../utils/fileUpload.js";

const router = express.Router();

router.post(
  "/signup",
  fileUpload("./storage/images"),
  EmployeeController.signup
);
router.post(
  "/create",
  fileUpload("./storage/images"),
  EmployeeController.create
);
router.post("/login", EmployeeController.login);
router.get(
  "/getallemployees",
  Auth.validate,
  Auth.adminGaurd,
  EmployeeController.getAllEmployees
);
router.get(
  "/getemployees/:id",
  Auth.validate,
  Auth.adminGaurd,
  EmployeeController.getEmployeeById
);
router.put(
  "/editemployee/:id",
  fileUpload("./storage/images"),
  Auth.validate,

  EmployeeController.editEmployee
);
router.delete(
  "/deleteemployee/:id",
  Auth.validate,
  Auth.adminGaurd,
  EmployeeController.deleteEmployeeById
);

export default router;
