// import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import {getFilenameAfterRemoveType, getImagePathFromImageName} from '../../../lib/utils/helper'

export default function handler(req, res) {
 
  const { filename } = req.query;
  console.log({filename})
const {type,cameraName,formattedDate } = getImagePathFromImageName(filename);

  const filePath = path.join(
    process.cwd(), "..", "human_detection",`${type}`, "Processed", `${formattedDate}`, `${getFilenameAfterRemoveType(filename)}`
  );
  console.log("server url >>>>",filePath)
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  const fileStream = fs.createReadStream(filePath);
  res.setHeader("Content-Type", "image/jpeg"); // or detect based on file type
  fileStream.pipe(res);
}
