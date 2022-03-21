import { Storage } from "@google-cloud/storage"
const storage = new Storage({ keyFilename: "" });
const bucket = storage.bucket("bezkoder-e-commerce");
import format from "util";
import File from './files-model'

export const googleCloudStorage = {
  fileUpload: (req, res) => {
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });
    blobStream.on("finish", async (data) => {
      // Create URL for directly file access via HTTP.
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      try {
        // Make the file public
        await bucket.file(req.file.originalname).makePublic();
      } catch {
        return res.status(500).send({
          message:
            `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
          url: publicUrl,
        });
      }
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
        url: publicUrl,
      });
    });
    blobStream.end(req.file.buffer);
  },
  fileDownload: async (req, res) => {
    const [metaData] = await bucket.file(req.params.name).getMetadata();
    res.redirect(metaData.mediaLink);
  },
  fileDelete: async (req, res) => {
    const [metaData] = await bucket.file(req.params.name).getMetadata();
    res.redirect(metaData.mediaLink);
  },
  fileList: async (req, res) => {
    const [files] = await bucket.getFiles();
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file.name,
        url: file.metadata.mediaLink,
      });
    });
    res.status(200).send(fileInfos);
  }
}

export const saveAnFile = async (formData) => {
  const newFile = new File(formData);
  const file = await newFile.save();
  return file;
}
export const getFile = async (query) => {
  const file = await File.findOne(query);
  return file;
}
export const removeFile = async (query) => {
  const file = await File.remove(query);
  return file;
}