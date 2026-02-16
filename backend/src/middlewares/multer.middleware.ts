import multer from "multer";
import type { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, './public/temp')
  },
  filename: function(req: Request, file:Express.Multer.File, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
    cb(null, file.filename + "-" + uniqueSuffix)
  }
})

export const upload = multer({storage})