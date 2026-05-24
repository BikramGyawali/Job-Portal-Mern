import multer from "multer";
import path from 'path'
import fs from "fs"
const uploadDir = path.join(process.cwd(), "public/uploads/images")
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true })
}
// Use memory storage so the file is only written to disk if profile creation succeeds
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
	const allowTypes = ['image/jpeg', 'image/jpg', 'image/png'];
	if (!allowTypes.includes(file.mimetype)) {
		return cb(new Error("Only JPG/JPEG/PNG images are accepted"), false)
	}
	cb(null, true)
}
export const uploadImage = multer({
	storage,
	fileFilter
})




