const express=require("express")
const router=express.Router()
const verifyJWT =require("../middleware/verifyJWT")
const vacationController=require("../controllers/vacationController")
const multer=require('multer')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads')

    },
    filename:function(req,file,cb){
        const uniqeSuffix=Date.now()+'-'+Math.round(Math.random()*100)
        cb(null,uniqeSuffix+"-"+file.originalname)
    }
})
const upload=multer({storage:storage})
    router.get("/",vacationController.getAllVacation)
    router.get("/:id",vacationController.getVacationById)
    router.post("/",upload.array('images'),verifyJWT,vacationController.createNewVacation)
    router.delete("/",verifyJWT,vacationController.deleteVacation)
    router.put("/",verifyJWT,upload.array('images'),verifyJWT,vacationController.updateVacation)
    router.put("/1",verifyJWT,vacationController.one)
    router.delete("/deleteImageFromImages",verifyJWT,vacationController.deleteImageFromImages)
 
module.exports=router
