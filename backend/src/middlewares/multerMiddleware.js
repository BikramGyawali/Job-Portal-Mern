import multer from "multer";
import path from 'path'
import fs from "fs"
const uploadDir = path.join(process.cwd(), "public/uploads/images")
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true })
}
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDir)
	},
	filename: function (req, file, cb) {
		const safeName = file.originalname.replace(/\s+/g, "-")
		const newFileName = `${Date.now()}-${safeName}`
		cb(null, newFileName)
	}
})
const fileFilter = (req, file, cb) => {
	const allowTypes = ['image/jpeg', 'image/jpg', 'image/png'];
	if (!allowTypes.includes(file.mimetype)) {
		return cb(new Error("Only accept jpg,jpeg,png file"), false)
	}
	cb(null, true)
}
export const uploadImage = multer({
	storage,
	fileFilter
})




//for cv multer 
const cvUploadDir = path.join(process.cwd(), "public/uploads/cvs")
if (!fs.existsSync(cvUploadDir)) {
	fs.mkdirSync(cvUploadDir, { recursive: true })
}

const cvStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'cvUploadDir')
	},
	filename: function (req, file, cb) {
		const safeName = file.originalname.replace(/\s+/g, "-")
		const newFileName = `${Date.now()}-${safeName}`
		cb(null, newFileName)

	}
})
const cvFileFilter = (req, file, cb) => {

	if (file.mimetype !== "application/pdf") {
		return cb(new Error("Only accept pdf file"), false)
	}
	cb(null, true)
}

export const uploadCv = multer({
	storage: cvStorage,
	fileFilter: cvFileFilter
})