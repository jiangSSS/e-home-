const { Router } = require("express")
const router = Router()
const categoryModel = require("../model/category")
const TypeModel = require("../model/category")
const auth = require("./auth")
router.post("/", auth, async (req, res, next) => {
    try {
        let {title} = req.body
        const category = await TypeModel.create({title})
        res.json({
            code: 200,
            data:category,
            msg: "添加分类"
        })
    } catch (err) {
        next(err)
    }
})

router.get("/",async (req,res,next)=>{
    try{
        const dataList = await categoryModel.find()
        res.json({
            code:200,
            data:dataList,
            msg:"success"
        })
    }catch(err){
        next(err)
    }
})


module.exports  = router