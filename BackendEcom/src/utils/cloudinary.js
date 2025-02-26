import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET  
})


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        console.log(localFilePath);

        const response = await cloudinary.uploader.upload(localFilePath,
            {
                resource_type: "image"
            }
        )
        console.log(response);
        console.log("hii");


        //file has been upload successfully
        console.log("file uploaded on cloudinary.");
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        console.log("hii2");
        console.log("Cloudinary upload error", error);

        fs.unlinkSync(localFilePath)
        console.log("hii3");

        return null;
    }
}

const deleteFromCloudinary = async (publicId, resource_type = "image") => {

    try {
        if (!publicId) return null;

        // delete file from cloudinary
        const response = await cloudinary.uploader.destroy(publicId, { resource_type: `${resource_type}` })     // { resource_type: `${resource_type}` } take as argument
        // console.log(response);

        console.log("File Delete from cloudnary");

        return response;

    } catch (error) {

        return error;
    }
}


export { uploadOnCloudinary, deleteFromCloudinary }