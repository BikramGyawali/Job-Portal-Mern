import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../public/multerImages')
	},
	filename: function (req, file, cb) {
		const newFileName = `${Date.now()}-${path.extname(file.originalname)}`
		cb(null, newFileName)
	}
})

export const uploadImage = multer({
	storage
})