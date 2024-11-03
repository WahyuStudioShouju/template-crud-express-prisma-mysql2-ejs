import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import userRoutes from "./routes/userRoutes.js"

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// setup ejs
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// setup static
app.use("/static", express.static(path.join(__dirname, "public")))

// home routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"))
})

// rout /users and edit
app.use("/users", userRoutes)

// middleware untuk page not found
app.use((req, res, next) => {
    res.status(404)
    res.sendFile(path.join(__dirname, "views", "404.html"))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})