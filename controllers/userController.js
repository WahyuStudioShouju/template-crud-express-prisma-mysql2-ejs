import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

//get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.render("index", { users })
    } catch (eror) {
        res.status(500).send("server error")
    }
}

// get user by ID for editing
export const getUserForEdit = async (req, res) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({
        where: { id: parseInt(id, 10) }
    })
    if (user) {
        res.render("edit", { user })
    } else {
        res.redirect("/users")
    }
}

// create a new user
export const createUser = async (req, res) => {
    try{
        const { name, username, password, email } = req.body
        await prisma.user.create({
            data: { name, username, password, email },
        })
        res.redirect("/users")
    } catch (error) {
        res.status(500).send("server error")
    }
}

// update user
export const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, username, password, email } = req.body
    await prisma.user.update({
        where: { id: parseInt(id, 10) },
        data: { name, username, password, email }
    })
    res.redirect("/users")
}

//delete a user by id
export const deleteUser = async (req, res) => {
    const { id } = req.params
    await prisma.user.delete({
        where: { id: parseInt(id, 10)}
    })
    res.redirect("/users")
}