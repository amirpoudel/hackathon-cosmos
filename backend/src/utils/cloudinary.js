const  { v2 : cloudinary }  =  require('cloudinary');
const fs = require('fs');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        console.log('Calling Upload on Cloudinary');
        const uploadedResponse = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: 'auto',
            }
        );
        fs.unlinkSync(localFilePath);
        return uploadedResponse;
    } catch (error) {
        console.log(error);

        return null;
    }
};


const deleteFromCloudinary = async (link) => {
    if (!link) {
        return null;
    }
    try {
        const splittedLink = link.split('/');
        const publicId = splittedLink[splittedLink.length - 1].split('.')[0];
        const deleteResponse = await cloudinary.uploader.destroy(publicId);
        return deleteResponse;
    } catch (error) {
        console.log(error);
        return null;
    }
};


const updateOnClodinary = async (localFilePath, existingImageLink) => {
  
    try {
        const deleteResponse = await deleteFromCloudinary(existingImageLink);
        if(!deleteResponse)return null;
        const uploadResponse = await uploadOnCloudinary(localFilePath);
        if(!uploadResponse)return null;
        return uploadResponse;
    } catch (error) {
        return null;
    }
};


module.exports = {
    uploadOnCloudinary,
    deleteFromCloudinary,
    updateOnClodinary
}