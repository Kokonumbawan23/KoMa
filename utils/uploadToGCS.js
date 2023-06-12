const { Storage } = require("@google-cloud/storage");

// const pathKey = path.resolve("./credentials.json");
require("dotenv").config({ path: __dirname + "/../.env" });

const storage = new Storage({
  projectId: process.env.PROJECTID,
  credentials: {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.client_x09_cert_url,
  }
});

const bucket = storage.bucket(process.env.BUCKET);
const bucketRecipe = storage.bucket(process.env.BUCKET_RECIPE);

function getPublicUrl(filename) {
  return "https://storage.googleapis.com/" + bucketName + "/" + filename;
}

const uploadSingleImageToStorage = async (req, res, next) => {
  if (req.file === undefined || !req.file) {
    console.log("file not found");
    return next(new Error("File not found"));
  }

  const image = req.file;
  const blob = bucket.file("image-" + Date.now());
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

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    req.publicUrl = publicUrl;
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
    const blob = bucket.file("image-" + Date.now());

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

const pushSingleImageToStorage = async (fileBuffer) => {
//   if (fileBuffer === undefined || !fileBuffer) {
//     console.log("file not found");
//     return next(new Error("File not found"));
//   }

//   const image = fileBuffer;
  const blob = bucketRecipe.file("image-" + Date.now());
  const publicUrl = `https://storage.googleapis.com/${bucketRecipe.name}/${blob.name}`;
  const blobStream = blob.createWriteStream({
    metadata: {
        contentType: "image/png",
      },
  }).end(fileBuffer);
    return publicUrl;
//   blobStream.on("error", (err) => {
//     next(err);
//   });

//   blobStream.on("finish", () => {
//     // Set the public URL for the image
//     const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//     console.log(publicUrl);
//     return publicUrl;
//   });

//   blobStream.end(fileBuffer);
};

const deleteOptions = {};

const deleteSingleImage = async (fileName) => {
  const file = fileName.split("/")[4];
  const bucketName = fileName.split("/")[3];
  await storage.bucket(bucketName).file(file).delete();
};

module.exports = {
  uploadSingleImageToStorage,
  uploadArrayImagesToGCS,
  pushSingleImageToStorage,
  deleteSingleImage,
};
