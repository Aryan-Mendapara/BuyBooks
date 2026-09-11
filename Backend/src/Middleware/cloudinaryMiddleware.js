import cloudinary from "../Config/cloudinary.js";
import { Readable } from "node:stream";

export const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {

    const folder =
      process.env.NODE_ENV === "production"
        ? "buy-books/books"
        : "buybooks/books";

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      }
    );

    Readable.from([buffer]).pipe(uploadStream);
  });
};