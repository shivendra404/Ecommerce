import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//routes

// import healtcheckRouter from './routes/healtcheck.routes.js'
import adminRoute from './routes/admin.route.js'
import brandRoute from './routes/brand.route.js'
import productRoute from './routes/product.route.js'
import categoryRoute from './routes/category.route.js'
import userRoute from './routes/user.route.js'
import addToCardRoute from './routes/addToCard.route.js'
import wishListRoute from './routes/wishList.route.js'
import orderRoute from './routes/order.route.js'

app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/brand", brandRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/category", categoryRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/addToCart", addToCardRoute)
app.use("/api/v1/wishList", wishListRoute)
app.use("/api/v1/order", orderRoute)



app.use("/tests", (req, res) => {


    res.send("i am shivendra kumar")
})



export { app }