import multer from "multer";
import path from 'path'
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../public/uploads/images')
	},
	filename: function (req, file, cb) {
		const newFileName = `${Date.now()}-${path.extname(file.originalname)}`
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
const cvStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../public/uploads/cvs')
	},
	filename: function (req, file, cb) {
		const newFileName = `${Date.now()}-${path.extname(file.originalname)}`
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