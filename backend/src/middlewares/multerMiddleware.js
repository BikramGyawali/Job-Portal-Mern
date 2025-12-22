import multer from "multer";
import multerImages from '../public/multerImages'
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, multerImages)
	},
	filename: function (req, file, cb) {
		const newFileName = `${Date.now()}-${path.extname(file.originalname)}`
		cb(null, newFileName)
	}
})

export const uploadImage = multer({
	storage
})