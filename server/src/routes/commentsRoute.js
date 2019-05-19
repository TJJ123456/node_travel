import { Datas, DataTypes, Comments, Users } from '../providers'
import express from 'express'
const route = express.Router();

async function getByname(name) {
    return await Comments.findOne({ name })
}

//评论分类
const Comment = {};
Comment.Food = 0;
Comment.Entertainment = 1;
Comment.Spot = 2;

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
        const time = new Date();
        const data = {
            score: req.body.score,
            average: req.body.average,
            content: req.body.content,
            itemid: req.body.itemid,
            userid: req.session.user._id,
            commentType: commentType.Wait,
            createTime: time.getTime(),
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
        for (let i in data) {
            // data[i].username = (await Users.findOne({ _id: data[i].userid })).username;
            let user = await Users.findOne({ _id: data[i].userid });
            if (user) {
                data[i].username = user.username;
            } else {
                data[i].username = '用户不存在';
            }
            let doc = await Datas.findOne({ _id: data[i].itemid });
            if (doc) {
                data[i].shopname = doc.name;
                data[i].kind = doc.kind;
            }
            else data[i].shopname = '美食不存在';

        }
        res.json({
            data: data
        });
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.get('/passlist', async (req, res, next) => {
    try {
        let data = await Comments.find({ commentType: commentType.Pass });
        for (let i in data) {
            let user = await Users.findOne({ _id: data[i].userid });
            if (user) {
                data[i].username = user.username;
            } else {
                data[i].username = '用户不存在';
            }
            let doc = await Datas.findOne({ _id: data[i].itemid });
            if (doc) data[i].shopname = doc.name;
            else data[i].shopname = '美食不存在';
        }
        res.json({
            data: data
        });
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.post('/itemlist', async (req, res, next) => {
    const id = req.body.id;
    try {
        let data = await Comments.find({ itemid: id, commentType: commentType.Pass });
        for (let i in data) {
            let user = await Users.findOne({ _id: data[i].userid });
            if (user) {
                data[i].username = user.username;
            } else {
                data[i].username = '用户不存在';
            }
        }
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.get('/userlist', async (req, res, next) => {
    try {
        if (!req.session.user) {
            throw new Error('请登录');
        }
        let data = await Comments.find({ userid: req.session.user._id });
        for (let i in data) {
            let user = await Users.findOne({ _id: data[i].userid });
            if (user) {
                data[i].username = user.username;
            } else {
                data[i].username = '用户不存在';
            }
            let doc = await Datas.findOne({ _id: data[i].itemid });
            if (doc) data[i].shopname = doc.name;
            else data[i].shopname = '美食不存在';
        }
        res.json({
            data: data
        });
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.get('/checklist', async (req, res, next) => {
    try {
        let data = await Comments.find({ commentType: commentType.Wait });
        for (let i in data) {
            let user = await Users.findOne({ _id: data[i].userid });
            if (user) {
                data[i].username = user.username;
            } else {
                data[i].username = '用户不存在';
            }
            let doc = await Datas.findOne({ _id: data[i].itemid });
            if (doc) data[i].shopname = doc.name;
            else data[i].shopname = '美食不存在';
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

route.post('/pass', async (req, res, next) => {
    const id = req.body.id;
    try {
        let data = await Comments.updateOne({ _id: id }, { $set: { 'commentType': commentType.Pass } });
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/nopass', async (req, res, next) => {
    const id = req.body.id;
    try {
        let data = await Comments.updateOne({ _id: id }, { $set: { 'commentType': commentType.NoPass } });
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

function randomIndex(count) {
    return Math.round(Math.random() * (count - 1));
}



// createCommentRandom();

export default route;
