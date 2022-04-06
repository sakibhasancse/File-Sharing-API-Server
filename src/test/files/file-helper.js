import mongoose from "mongoose";
import File from '../../modules/files/files-model'

const fileData = {
    "name" : "1647999219534-650096664.jpeg",
    "path" : "1649263107161-226524803.jpeg",
    "active" : true,
    "size" : 82841,
    "author" : "6236acc0ae3b656f28e334a8",
}

const seedFilesData = async ()=>{
    try {
        const newFile = new File(fileData)
        const result = await newFile.save()
        return result
    }catch (e) {
        return {error: e?.message}
    }
}
const clearFiles = async ()=>{
    const file = File.remove({})
    return file
}
export {seedFilesData, clearFiles}