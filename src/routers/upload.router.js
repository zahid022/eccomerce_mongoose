const express = require('express');
const multer = require('multer');
const config = require('../config');
const uploadController = require('../controllers/upload.controller');
const cloudinary = require('cloudinary').v2;

const uploadRouter = express.Router();

cloudinary.config({
  cloud_name: config.cloudNAME,
  api_key: config.cloudKey,
  api_secret: config.cloudSECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });


uploadRouter.post('/', upload.single('image'), uploadController.uploadImage)

module.exports = uploadRouter;
