import { v2 as cloudinary} from 'cloudinary'
import logger from './logger.js'
import fs from 'fs'

// configure
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_CLOUD_KEY!,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET!
})

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if(!localFilePath) return null
    const response = await cloudinary.uploader.upload(
      localFilePath, {
        resource_type: "auto"
      }
    )
    logger.info(`File uploaded on cloudinary. File src: ${response.url}`)
    // once the file is uploaded, we would like to delete it from our server
    fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
    fs.unlinkSync(localFilePath)
    return null
  }
}