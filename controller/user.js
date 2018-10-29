const { Router } = require("express")
const router = Router()
const adminModel = require("../model/user")
const auth = require("../controller/auth")

// 添加管理员
router.post("/", auth, async (req, res, next) => {
    try {
        let {
            username,
            idcardNumber,
            password,
            avatar,
            nickname,
            desc,
            job,
            phone,
            sex,
        } = req.body
        const data = await adminModel.create({
            username,
            idcardNumber,
            password,
            avatar,
            nickname,
            desc,
            job,
            phone,
            sex,
        })
        res.json({
            code: 200,
            data,
            msg: "新建用户成功"
        })
    } catch (err) {
        next(err)
    }
})

// 管理员登录
router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        if (username && password) {
            const user = await adminModel.findOne({ username })
            if (user) {
                if (password == user.password) {
                    req.session.user = user             //将用户的信息存到session里
                    res.json({
                        code: 200,
                        msg: "登录成功"
                    })
                } else {
                    res.json({
                        code: 401,
                        msg: "密码错误"
                    })
                }
            } else {
                res.json({
                    code: 401,
                    msg: "用户不存在"
                })
            }
        } else {
            res.json({
                code: 400,
                msg: "缺少必要参数"
            })
        }
    } catch (err) {
        next(err)
    }
})

//  获取全部管理员
router.get("/", async (req, res, next) => {
    try {
        let { page = 1, size = 10 } = req.body
        page = parseInt(page)
        size = parseInt(size)
        const dataList = await adminModel.find().skip((page - 1) * size).limit(size).sort("_id = -1").select("-password")
        res.json({
            code: 200,
            data: dataList,
            msg: "success"
        })
    } catch (err) {
        next(err)
    }
})

// 查看单个管理员
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await adminModel.findById({ _id: id })
        res.json({
            code: 200,
            data,
            msg: "success"
        })
    } catch (err) {
        next(err)
    }
})

// 修改个人信息
router.patch("/:id", auth, async (req, res, next) => {
    try {
        let { id } = req.params
        let { username,
            idcardNumber,
            password,
            avatar,
            nickname,
            desc,
            job,
            phone,
            sex, } = req.body
        await adminModel.update([{ _id: id }, {
            $set: {
                username,
                idcardNumber,
                password,
                avatar,
                nickname,
                desc,
                job,
                phone,
                sex,
            }
        }])
        res.json({
            code: 200,
            msg: "success"
        })
    } catch (err) {
        next(err)
    }
})

// 删除一位管理员
router.post("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await adminModel.deleteOne({ _id: id })
        res.json({
            code: 200,
            data,
            msg: "成功删除一位管理员"
        })
    } catch (err) {
        next(err)
    }
})

// 退出登录
router.get("/logout", auth, (req, res) => {
    if (req.session.user) {
        req.session.user = user
        res.json({
            code: 200,
            msg: "您已退出登录"
        })
    } else {
        res.json({
            code: 403,
            msg: "不能在未登录下退出~"
        })
    }
})

module.exports = router
