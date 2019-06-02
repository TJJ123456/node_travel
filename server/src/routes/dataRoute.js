import { Datas, DataTypes, Comments } from '../providers'
import express from 'express'
const route = express.Router();

async function getByname(name) {
    return await Foods.findOne({ name })
}

//数据分类
const DataKind = {};
DataKind.Food = 0;
DataKind.Entertainment = 1;
DataKind.Spot = 2;

route.post('/create', async (req, res, next) => {
    try {
        const item = await Datas.findOne({ kind: req.body.kind, name: req.body.name });
        if (item) {
            throw new Error('已有同名的商家');
        }
        const doc = {
            name: req.body.name,
            desc: req.body.desc,
            address: req.body.address,
            type: req.body.type,
            filepath: req.body.filepath,
            phone: req.body.phone,
            kind: req.body.kind
        };
        const newDoc = await Datas.insert(doc);
        res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.post('/get', async (req, res, next) => {
    const id = req.body.id;
    try {
        const data = await Datas.findOne({ _id: id });
        if (!data) {
            throw new Error('没有这个');
        }

        let str = data.address.slice(0, 3);
        let regex = new RegExp(str);
        let nearbyList = await Datas.find({
            $or: [
                { "name": regex }, { "desc": regex }, { "address": regex }
            ]
        }, { limit: 5 });
        res.json({ data: data, nearbyList: nearbyList })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.post('/createtype', async (req, res, next) => {
    try {
        const doc = await DataTypes.findOne({ name: req.body.name, kind: req.body.kind });
        if (doc) {
            throw new Error('已有同名的分类');
        }
        const data = {
            name: req.body.name
        }
        const newDoc = await DataTypes.insert(data);
        res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.get('/count', async (req, res, next) => {
    try {
        let data = await Datas.count({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.get('/typecount', async (req, res, next) => {
    try {
        let data = await DataTypes.count({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/list', async (req, res, next) => {
    const kind = req.body.kind;
    try {
        let data = await Datas.find({ kind: kind }, {});
        for (let i in data) {
            data[i].typename = (await DataTypes.findOne({ _id: data[i].type })).name;
            data[i].commentCount = await Comments.count({ itemid: data[i]._id });
        }
        res.json({
            data: data
        });
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.post('/typelist', async (req, res, next) => {
    const kind = req.body.kind;
    try {
        let data = await DataTypes.find({ kind: kind }, {});
        for (let i in data) {
            data[i].count = await Datas.count({ type: data[i]._id });
        }
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.get('/list', async (req, res, next) => {
    try {
        let data = await Datas.find({});
        for (let i in data) {
            let type = await DataTypes.findOne({ _id: data[i].type });
            data[i].typename = type.name;
            data[i].commentCount = await Comments.count({ itemid: data[i]._id });
        }
        res.json({
            data: data
        });
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.get('/typelist', async (req, res, next) => {
    try {
        let data = await DataTypes.find({});
        for (let i in data) {
            data[i].count = await Datas.count({ type: data[i]._id });
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
        let data = await Datas.removeOne({ _id: id });
        res.json({ status: 'ok' });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/deletetype', async (req, res, next) => {
    const id = req.body.id;
    try {
        let data = await DataTypes.removeOne({ _id: id });
        res.json({ status: 'ok' });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/change', async (req, res, next) => {
    const id = req.body._id;
    try {
        const data = {
            name: req.body.name,
            desc: req.body.desc,
            address: req.body.address,
            type: req.body.type,
            filepath: req.body.filepath || '',
            phone: req.body.phone,
            kind: req.body.kind
        }
        let doc = await Datas.update({ _id: id }, data);
        res.json({ status: 'ok' });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/changetype', async (req, res, next) => {
    const id = req.body._id;
    try {
        const doc = await DataTypes.findOne({ name: req.body.name, kind: req.body.kind });
        if (doc) {
            throw new Error('已有同名的分类');
        }
        let data = await DataTypes.update({ _id: id }, req.body);
        res.json({ status: 'ok' });
    } catch (e) {
        res.status(405).send(e.message);
    }
})



export default route;