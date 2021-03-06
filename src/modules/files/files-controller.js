import { verifyToken } from '../../core/jwtToken'
import { fileTokens, getFileSizeAndResolvedPath, processFile } from './files-helper'
import { googleCloudStorage, saveAnFile, getFile, getFileLists, removeFile } from './files-service'
import fs from 'fs'
import { size } from 'loadsh'

export const uploadNewFile = async (req, res) => {
  try {
    const { user = {}, body = {} } = req
    if (!user.userId) {
      return res.status(400).send({ message: '`author` is required.' })
    }
    await processFile(req, res)

    const { file = {} } = req

    if (!size(file)) {
      return res.status(400).send({ message: 'Please upload a file!' })
    }
    const fileData = {
      name: body.title ? body.title : file.originalname,
      size: file.size,
      author: user.userId,
      path: file.filename
    }
    const result = await saveAnFile(fileData)
    if (result) {
      const tokens = await fileTokens(result)
      res.send(tokens)
    }
    // await googleCloudStorage.fileUploadasync(req, res)
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file. ${err && err.message}`
    })
  }
}
export const getListFiles = async (req, res) => {
  try {
    const { user = {}, body = {} } = req
    if (!user.userId) {
      return res.status(503).send({ message: 'Unauthorize user!' })
    }
    const files = await getFileLists({ author: user.userId })
    res.status(200).send(files)
    // await googleCloudStorage.fileListasync(req, res)
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: 'Unable to read list of files!'
    })
  }
}

export const downloadFile = async (req, res) => {
  try {
    const { publicToken } = req.params
    const tokenResult = await verifyToken({ token: publicToken, type: 'File' })

    if (tokenResult && tokenResult.error || !tokenResult) {
      return res.status(401).json({
        success: false,
        message: tokenResult.error
      })
    }

    const file = await getFile({ path: tokenResult.data.path })
    // Link expired
    if (!file) {
      return res.json({ error: 'Link has been expired.' })
    }
    const filePath = `${__dirname}/../../../assets/upload/${file.path}`
    res.download(filePath)

    // await googleCloudStorage.fileDownloadasync(req, res)
  } catch (err) {
    res.status(500).send({
      message: 'Could not download the file. ' + err
    })
  }
}

export const deleteFile = async (req, res) => {
  try {
    const { publicToken } = req.params
    const tokenResult = await verifyToken({ token: publicToken, type: 'File' })

    if (tokenResult && tokenResult.error || !tokenResult || (tokenResult && tokenResult.data && !tokenResult.data._id)) {
      return res.status(401).json({
        success: false,
        message: tokenResult.error || 'Unauthenticated request'
      })
    }

    const file = await removeFile({ path: tokenResult.data.path })

    // Link expired
    if (!file) {
      return res.json({ error: 'Link has been expired.' })
    }
    await fs.unlinkSync(`${__dirname}/../../../assets/upload/${tokenResult.data.path}`)

    return res.json({
      success: true,
      message: 'File successfully removed'
    })
    // await googleCloudStorage.fileDeleteasync(req, res)
  } catch (err) {
    res.status(500).send({
      message: 'Could not download the file. ' + err
    })
  }
}

export const streamFile = async (req, res) => {
  try {
    // const { publicToken } = req.params
    // const tokenResult = await verifyToken({ token: publicToken, type: 'File' })
    //
    // if (tokenResult && tokenResult.error || !tokenResult) {
    //   return res.status(401).json({
    //     success: false,
    //     message: tokenResult.error
    //   })
    // }

    // const file = await getFile({ path: tokenResult.data.path })

    const file = await getFile({ })
    // Link expired
    if (!file) {
      return res.json({ error: 'Link has been expired.' })
    }

    const filePath = `${__dirname}/../../../assets/upload/${file.path}`

    const { fileSize, resolvedPath } = getFileSizeAndResolvedPath(filePath)

    const requestRangeHeader = req.headers.range

    if (!requestRangeHeader) {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4'
      })
      fs.createReadStream(resolvedPath).pipe(res)
    } else {

    }
  } catch (e) {
    throw new Error(e.message)
  }
}
