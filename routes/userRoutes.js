import express from "express"
import { getAllUsers, createUser, getUserForEdit, updateUser, deleteUser } from "../controllers/userController.js"

const router = express.Router()

router.get("/", getAllUsers)
router.post("/create", createUser)
router.get("/edit/:id", getUserForEdit)
router.post("/update/:id", updateUser)
router.post("/delete/:id", deleteUser)

export default router