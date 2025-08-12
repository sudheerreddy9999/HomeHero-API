'use strict';
import cloudinary from '../config/cloud/cloudinary.js';
import logger from './logger.utility.js';

const uploadToCloudinary = async (file, folderName) => {
  try {
    logger.info({ message: 'Image Upload started' });
    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: `car-rental/${folderName}` }, (error, result) => {
        if (error) {
          reject(new Error('Cloudinary Upload Failed: ' + error.message));
        } else {
          logger.info({ message: 'Image uploaded successfully' });
          resolve(result.secure_url);
        }
      });
      stream.end(file.buffer);
    });
  } catch (error) {
    throw new Error('Upload Failed: ' + error.message);
  }
};

const deleteUserImageService = async (imageUrl) => {
  try {
    if (!imageUrl) throw new Error('Image URL is required for deletion');
    logger.info({ message: 'Image deleting started' });
    const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract public_id
    await cloudinary.uploader.destroy(`car-rental/users/${publicId}`);
    logger.info({ message: 'Image deleted successfully' });
    return { message: 'Image deleted successfully' };
  } catch (error) {
    logger.error({ deleteUserImageService: error.message });
    //throw new Error('Delete Failed: ' + error.message);
  }
};

const cloudinaryUtils = { uploadToCloudinary, deleteUserImageService };

export default cloudinaryUtils;
