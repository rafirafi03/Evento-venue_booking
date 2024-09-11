// import multer from 'multer'
// import path from 'path';


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.resolve(__dirname, '../../../../frontend/public/assets/multerImages'));
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   });


// const fileFilter = (req, file, cb) => {
  
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Not an image! Please upload an image.'), false);
//   }
// };


// const upload = multer({ storage: storage, fileFilter: fileFilter });

// module.exports = upload;
