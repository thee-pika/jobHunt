"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
const uploadImageToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            resource_type: "auto",
        }, (error, result) => {
            if (error) {
                console.log("error", error);
                return reject(error);
            }
            if (result) {
                console.log("result", result);
                const data = {
                    url: result.secure_url,
                    id: result.public_id,
                };
                resolve(JSON.stringify(data));
            }
        });
        stream_1.Readable.from(file).pipe(stream);
    });
};
exports.uploadImageToCloudinary = uploadImageToCloudinary;
