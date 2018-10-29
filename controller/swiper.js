 const { Router } = require("express")
const router = Router()
const swiperModel = require("../model/swiper")
const auth = require("../controller/auth")

// 添加轮播图
router.post("/", auth, async (req, res, next) => {
    try {
        let {
            title,
            img,
            newsId,
            status,
            sort
        } = req.body
        const swiper = await swiperModel.create({
            title,
            img,
            newsId,
            status,
            sort
        })
        res.json({
            code: 200,
            data:swiper,
            msg: "添加轮播图成功"
        })
    } catch (err) {
        next(err)
    }
})

//获取所以轮播图
router.get("/", async (req, res, next) => {
    try {
        let { page = 1, size  = 10 } = req.query
        page = parseInt(page)
        size = parseInt(size)
        const dataList = await swiperModel
            .find()
            .skip((page - 1) * size)
            .limit(size)
            .sort("_id:-1")
            .populate({
                path: "newsId",
            })
        res.json({
            code: 200,
            data: dataList,
            msg: "success"
        })
    } catch (err) {
        next(err)
    }
})
// 获取单个轮播图
router.get("/:id",async (req, res, next) => {   
    try{
        let { id } = req.params
        const data = await swiperModel.findById(id)        
        res.json({
            code: 200,
            data,
            msg: "success"
    })
    }catch(err){
        next(err)
    }
})
// 修改轮播图
router.patch("/:id",auth,async (req, res, next) => {   
    try{
        let { id } = req.params
        let {title,img,newsId, status, sort} = req.body
        const data = await swiperModel.update([{_id:id},{$set:{title,img,newsId, status, sort}}])       
        res.json({
            code: 200,
            data,
            msg: "修改轮播图成功"
        })
    }catch(err){
        next(err)
    }
})

// 删除轮播图
router.post("/:id",auth,async (req, res, next) => {   
    try{
        let { id } = req.params
        const data = await swiperModel.deleteOne({_id:id})        
        res.json({
            code: 200,
            data,
            msg: "删除轮播图成功"
        })
    }catch(err){
        next(err)
    }
})


module.exports = router