import { Comments, Users } from '../providers'
import express from 'express'
const route = express.Router();

async function getByname(name) {
    return await Comments.findOne({ name })
}

//评论分类
const Comment = {};
Comment.Food = 0;
Comment.Entertainment = 1;

//评论审核状态
const commentType = {};
commentType.Wait = 0;
commentType.Pass = 1;
commentType.NoPass = 2;

route.post('/create', async (req, res, next) => {
    try {
        if (!req.session.user) {
            throw new Error('请登录');
        }
        const data = {
            score: req.body.score,
            average: req.body.average,
            content: req.body.content,
            type: req.body.type,
            itemid: req.body.itemid,
            userid: req.session.user._id,
            commentType: commentType.Wait
        }
        const newDoc = await Comments.insert(data);
        res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.get('/count', async (req, res, next) => {
    try {
        let data = await Comments.count({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }

})

route.get('/list', async (req, res, next) => {
    try {
        let data = await Comments.find({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/itemlist', async (req, res, next) => {
    const type = req.body.type;
    const id = req.body.id;
    try {
        let data = await Comments.find({}, { type: type, itemid: id, commentType: commentType.Wait });
        for (let i in data) {
            console.log(data[i]);
            data[i].username = (await Users.findOne({ _id: data[i].userid })).username;
        }
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/delete', async (req, res, next) => {
    const id = req.body.id;
    try {
        let data = await Comments.removeOne({ _id: id });
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/change', async (req, res, next) => {
    const id = req.body._id;
    try {
        let data = await Comments.updateOne({ _id: id }, req.body);
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

export default route;
