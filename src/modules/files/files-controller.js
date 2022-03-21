import { fileTokens, processFile } from "./files-helper"
import { googleCloudStorage, saveAnFile, getFile, getFileLists } from "./files-service";

export const uploadNewFile = async (req, res) => {
    try {
        await processFile(req, res);
        const { file = {}, user = {}, body = {} } = req

        if (file.lenght) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        const fileData = {
            name: body.title ? body.title : file.originalname,
            size: file.size,
            author: user.userId,
            path: file.filename,
        }
        const result = await saveAnFile(fileData);
        if (result) {
            const tokens = await fileTokens(result)
            res.send(tokens)
        }
        // await googleCloudStorage.fileUploadasync(req, res)
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file. ${err && err.message}`,
        });
    }
};
export const getListFiles = async (req, res) => {
    try {
        const { user = {}, body = {} } = req
        if (!user.userId) {
            return res.status(503).send({ message: "Unauthorize user!" });
        }
        const files = await getFileLists({ author: user.userId });
        res.status(200).send(files)
        // await googleCloudStorage.fileListasync(req, res)
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Unable to read list of files!",
        });
    }
};

export const downloadFile = async (req, res) => {
    try {
        const { user = {}, body = {} } = req
        if (!user.userId) {
            return res.status(503).send({ message: "Unauthorize user!" });
        }
        // await googleCloudStorage.fileDownloadasync(req, res)

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
