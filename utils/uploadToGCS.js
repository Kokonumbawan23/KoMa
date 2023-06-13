const { Storage } = require("@google-cloud/storage");

// const pathKey = path.resolve("./credentials.json");
require("dotenv").config({ path: __dirname + "/../.env" });

// const storage = new Storage({
//   projectId: process.env.PROJECTID,
//   credentials: {
//     type: process.env.type,
//     project_id: process.env.project_id,
//     private_key_id: process.env.private_key_id,
//     private_key: process.env.private_key.split(String.raw`\n`).join('\n'),
//     client_email: process.env.client_email,
//     client_id: process.env.client_id,
//     auth_uri: 'https://accounts.google.com/o/oauth2/auth',
//     token_uri: 'https://oauth2.googleapis.com/token',
//     auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
//     client_x509_cert_url: process.env.client_x09_cert_url,
//   }
// });
// const text = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEzUpeOy9wN8OT\n1trjaqc/iQzSr/T5qSrG4IoGHPh5dNsGDaVnnkITP+7W3PAAoSxF5arw/adgDK9T\nHJ+waA7io2L16vXuacPEkSZzQQsKztPyZ57Z8OntjCOB1oftphdsfIdMdgFIdXMu\nZOuitzIALDaYivbHjAGZ4hc2+brnkwvXS4n8Ojhyz8kfvkNelTHS9JcpBKXJD/+b\nOLsX+ywnaqkRVZh6BdM6erCZswRQvZB+zE3JEhov//JKAFY33j0Nw/gPT4rJ8/wt\nFSXcwbljn2FcN32vfhsxjkWftTqY17GclzCqi1F5geIWdxq6tBgiYytntFfYeHh0\n1t1ott/5AgMBAAECggEAEifWOoc/Qx0B3/usSdqm/0eHdVBiSz3+AkbotNOrYJkV\nM6PCpKKG+ful7xCG26gCy5f6gy0DaesBqas0WDPhW6szD/jTI2GCe/ngEDXp7N9T\n0kMY9oYxLocFJ49BDv2Jn6qFWNpyF9st+xO4YVSBOl7Z0ozPY21ZIHcpKRs00PQo\nb/a84Zf6ET7gqU5VwdOJk/gCtFbEQ7EW2b1vwu8k7rUNe4Q/JrpW4GPCZDHP5FaQ\n43OjPEw3TjtCogUGloCI+AnPVPGZ24jFNeDjK5KwqIivs/Po3USqdSfyXSE8LkC0\nbqNtb9or1FZUE9aCwt+48tcm8Tq3BxtRMpwpATf24QKBgQDmOHPmgDzofKWwMEeX\nlpR57h7WKH0EYaOVzjQzkGr7dUtA7LbAvGyMz1x4oFwCk4XjW1+gZI2354dvWM3z\nY2coQgJRkO3bBXF1WjYoK1xBWje0w++Q6l0Se4hU3B18edMEW6bflWo0cmuehdl+\nbA9axn7EnCMHxAwBictEy95NBQKBgQDa1tp7aitlFLIE8TMh/lCvckZa8WTMvirY\nR0oTfyQjk3e5amlg+OYvWn43ox9zS0xJjJRzIfqI9vsOyT2J46km5N/oxPf3iBqA\nyJ7BjDnYx2EPDi14BoZpmN/wCn2FENaqEEBXCnnKhhs+I1kpFAWKhlCNZR1I46GM\nblUz8xkZZQKBgQCe23luJjLhIZGa/9WGzkrpz9vLXujVKyKb7kurAQ4xMYCZ7j00\nxVAJ4dQnEFAtHuqWNajInloD+mlD9f024vJ9nv7GlcDrDth5Z6RTF4hzN/OUcldO\noclTRZaPJ8vY5p8rNKrzQMCmLAYCvs2TJLF7q9gxhqPNagP208RFVn+wmQKBgFv2\n0GfuzP+0e78x8ZAGhLfGKSTMrtSP0geDpfCdjH1a2oRT4Kb80hbyS3psFapo6U07\nQ6NCkzt9tzGWhkLtJkePBT2XkLE4RBL8vCKQIDsmRnaCOb9n1pKHyQviDK+fzOY4\n4CDz6Qyf4NDzH+PwYwe8vBs/c9gOuPP/5dRoA5M1AoGAS85b0X7lm+BsE3DG42/r\nxGF9o9yhfK8XXFvlSvOhkP+kEmYYnT5jnIQlYum+ITu+2PcOt/VEuJE9lpZ4BOkU\nYVtPI7PyLVlzvBWYkYOoriGce2uvSfBWG6WKRVledHzvFVgpuSfRgngGRoRba0WJ\nKWXF7nIDT6KV6cB42vPwXGs=\n-----END PRIVATE KEY-----\n"
// const encoded = Buffer.from(text, 'utf8').toString('base64')
// console.log(encoded)
// const valueStorage = Buffer.from(process.env.encode, 'base64').toString('utf8')
// console.log(valueStorage)
// console.log(process.env.encode.toString('ascii'));
const storage = new Storage({
    projectId: process.env.PROJECTID,
    credentials: {
      type: process.env.type,
      project_id: process.env.project_id,
      private_key_id: process.env.private_key_id,
      private_key: Buffer.from(process.env.private_key, 'base64').toString('utf8'),
      client_email:"cloud-storage-create@capstone-koma.iam.gserviceaccount.com",
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
