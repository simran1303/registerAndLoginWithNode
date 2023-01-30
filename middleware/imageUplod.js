const multer = require('multer');

const fileStorage =  multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'imageFile');
    },
    filename:(req,file,cb)=>{
        // console.log('file...',file)
        cb(null, Date.now()+'-'+file.originalname );
    }
});


const fileFilter =(req,file,cb)=>{
    if (file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'){
        cb(null,true);
        
    }
    else{
        cb(null,false);
    }
};

const upload = multer({
    storage: fileStorage,
    fileFilter:fileFilter
}).single('userPhoto');



module.exports =  {upload};