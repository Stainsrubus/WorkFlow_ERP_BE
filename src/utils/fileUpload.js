import multer from 'multer';
import path from 'path';

const storage = (destination) => multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileUpload = (destination) => {
    const upload = multer({
        storage: storage(destination),
        limits: {
            fileSize: 2 * 1024 * 1024,
        },
        fileFilter: (req, file, cb) => {
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
                cb(null, true);
            } else {
                cb(new Error('Only .png, .jpg, .jpeg format allowed'), false);
            }
        }
    });
    
    return upload.single('image');
};

export default fileUpload;
