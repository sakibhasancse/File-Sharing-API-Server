import processFile from "./files-helper"
import { googleCloudStorage } from "./files-service";

export const uploadNewFile = async (req, res) => {
    try {
        await processFile(req, res);
        if (!req.file) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        await googleCloudStorage.fileUpload(req, res)
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};
export const getListFiles = async (req, res) => {
    try {
        await googleCloudStorage.fileList(req, res)
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Unable to read list of files!",
        });
    }
};

export const downloadFile = async (req, res) => {
    try {
      await googleCloudStorage.fileDownload(req, res)

    } catch (err) {
        res.status(500).send({
            message: "Could not download the file. " + err,
        });
    }
};

export const deleteFile = async (req, res) => {
    try {
       await googleCloudStorage.fileDelete(req,res)

    } catch (err) {
        res.status(500).send({
            message: "Could not download the file. " + err,
        });
    }
};
