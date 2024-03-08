const cloudinary = require("cloudinary");
require("dotenv").config();
cloudinary.v2;

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

const uploadFile = async (file, res) => {
    try {
      const upload = await cloudinary.uploader.upload(file.path);
      return upload;
    } catch (error) {
      return res.status(500).send(error);
    }
};

module.exports = uploadFile;
