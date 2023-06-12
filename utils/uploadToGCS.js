const { Storage } = require("@google-cloud/storage");

// const pathKey = path.resolve("./credentials.json");
require('dotenv').config({path: __dirname+ '/../.env'});

const storage = new Storage({
  projectId: process.env.PROJECTID,
  keyFilename: "./credentials.json",
});

const bucket = storage.bucket(process.env.BUCKET);

function getPublicUrl(filename) {
  return "https://storage.googleapis.com/" + bucketName + "/" + filename;
}

const uploadSingleImageToStorage = (req, res, next) => {
  if (req.file === undefined || !req.file) {
    console.log("file not found");
    return next(new Error("File not found"));
  }

  const image = req.file;
  const blob = bucket.file("image-" + Date.now() + "-" + image.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on("error", (err) => {
    next(err);
  });

  blobStream.on("finish", () => {
    // Set the public URL for the image
    const publicUrl = `https://storage.googleapis.com/${bucket}/${blob}`;
    req.publicUrl = publicUrl;
    console.log(req.publicUrl);
    next();
  });

  blobStream.end(image.buffer);
};

const uploadArrayImagesToGCS = (req, res, next) => {
  if (req.file === undefined || !req.file) {
    console.log("file not found");
    return next(new Error("File not found"));
  }
  let promises = [];
  req.files.forEach((image, index) => {
    const blob = bucket.file("image-" + Date.now() + "-" + image.originalname);

    const promise = new Promise((resolve, reject) => {
      const blobStream = file.createWriteStream({
        metadata: {
          contentType: image.mimetype,
        },
      });

      blobStream.on("error", (err) => {
        req.files[index].cloudStorageError = err;
        reject(err);
      });

      blobStream.on("finish", async () => {
        try {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          req.publicUrl[index] = publicUrl;
          resolve();
        } catch (error) {
          reject(error);
        }
      });

      blobStream.end(image.buffer);
    });

    promises.push(promise);
  });

  Promise.all(promises)
    .then((_) => {
      promises = [];
      next();
    })
    .catch(next);
};


const pushSingleImageToStorage = (fileBuffer) => {
    if (fileBuffer === undefined || !fileBuffer) {
      console.log("file not found");
      return next(new Error("File not found"));
    }
  
    const image = fileBuffer;
    const blob = bucket.file("image-" + Date.now());
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: 'image/png',
      },
    });
  
    blobStream.on("error", (err) => {
      next(err);
    });
  
    blobStream.on("finish", () => {
      // Set the public URL for the image
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      console.log(publicUrl);
      return publicUrl;
    });
  
    blobStream.end(fileBuffer);
  };
  

module.exports = { uploadSingleImageToStorage, uploadArrayImagesToGCS, pushSingleImageToStorage };
