import multer from "multer";



const storage = multer.memoryStorage()
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
const cvStorage = multer.memoryStorage()
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