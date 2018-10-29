const { Router } = require("express")
const router = Router()
const newsModel = require("../model/news")
const auth = require("../controller/auth")

// 添加一条新闻
router.post("/", auth, async (req, res, next) => {
    try {
        let {
            title,
            content,
            contentText,
            img,
            author,
            category,
            lookNum
        } = req.body
        const news = await newsModel.create({
            title,
            content,
            contentText,
            img,
            author,
            category,
            lookNum
        })
        res.json({
            code: 200,
            data:news,
            msg: "添加新闻成功"
        })
    } catch (err) {
        next(err)
    }
})
// 获取所有新闻
router.get("/", async (req, res, next) => {
    try {
        let { page = 1, size  =10 } = req.query
        page = parseInt(page)
        size = parseInt(size)
        const dataList = await newsModel
            .find()
            .skip((page - 1) * size)
            .limit(size)
            .sort("_id:-1")
            .populate({
                path: "user",
                select: "-password"
            })
            .populate({
                path: "category"
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

// 获取单个新闻
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await newsModel
            .findById(id)
            .populate({
                path: "user",
                select: "-password"
            })
            .populate({
                path: "category"
            })
        res.json({
            code: 200,
            data,
            msg: "success"
        })
    } catch (err) {
        next(err)
    }
})

// 删除一条新闻
router.post("/:id",auth,async(req,res,next)=>{
    try{
        let {id} = req.params
        const data = await newsModel
        .deleteOne({_id:id})
        res.json({
            code:200,
            data,
            msg:"删除新闻成功"
        })
    }catch(err){
        next(err)
    }
})

module.exports = router