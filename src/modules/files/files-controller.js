import { processFile } from "./files-helper"
import { googleCloudStorage, saveAnFile } from "./files-service";

export const uploadNewFile = async (req, res) => {
    try {
        await processFile(req, res)
        if (!req.file) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        const file = req.file;
        const user = req.user;
        const fileData = {
            name: req.body.title ? req.body.title : file.originalname,
            size: file.size,
            author: user.userId,
            path: file.filename,
        }
        await saveAnFile(fileData)
        // await googleCloudStorage.fileUploadasync(req, res)
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file. ${err && err.message}`,
        });
    }
};
export const getListFiles = async (req, res) => {
    try {
        await googleCloudStorage.fileListasync(req, res)
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Unable to read list of files!",
        });
    }
};

export const downloadFile = async (req, res) => {
    try {
        await googleCloudStorage.fileDownloadasync(req, res)

    } catch (err) {
        res.status(500).send({
            message: "Could not download the file. " + err,
        });
    }
};

export const deleteFile = async (req, res) => {
    try {
        await googleCloudStorage.fileDeleteasync(req, res)

    } catch (err) {
        res.status(500).send({
            message: "Could not download the file. " + err,
        });
    }
};
