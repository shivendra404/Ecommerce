import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: {
                public_id: String,
                url: String //cloudinary url
            }, //take from cloud,aws
        },
        phoneNumber: {
            type: String,
            required: false
        },
        role: {
            type: String,
            default: 'user'
        },
        password: {
            type: String,
            required: [true, 'password is required'],
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
)



userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    console.log(password, "password");


    // const istrue = await bcrypt.compare(password, "$2b$10$xVZ7tGbITSYZuoal/DlRveYP7TezMPVpPB531OFAgEk.5ug8m07oS")
    const istrue = await bcrypt.compare(password, this.password)
    // console.log(istrue, "istrue");

    return istrue
}

userSchema.methods.generateAccessToken = function () {
    // console.log(process.env.ACCESS_TOKEN_SECRET);
    // console.log(process.env.ACCESS_TOKEN_EXPITY);
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFERESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFERESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)



