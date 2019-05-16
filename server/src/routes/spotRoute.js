import { Spots, SpotTypes } from '../providers'
import express from 'express'
const route = express.Router();

async function getByname(name) {
    return await Spots.findOne({ name })
}

route.post('/create', async (req, res, next) => {
    try {
        const food = await getByname(req.body.name);
        console.log(food);
        if (food) {
            throw new Error('已有同名的景点');
        }
        const doc = {
            name: req.body.name,
            desc: req.body.desc,
            address: req.body.address,
            type: req.body.type,
            filepath: req.body.filepath,
            phone: req.body.phone
        };
        const newDoc = await Spots.insert(doc);
        res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.post('/get', async (req, res, next) => {
    const id = req.body.id;
    try {
        const food = await Spots.findOne({ _id: id });
        if (!food) {
            throw new Error('没有这个');
        }
        res.json({ data: food })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.post('/createtype', async (req, res, next) => {
    try {
        const doc = await SpotTypes.findOne({ name: req.body.name });
        if (doc) {
            throw new Error('已有同名的分类');
        }
        const data = {
            name: req.body.name
        }
        const newDoc = await SpotTypes.insert(data);
        res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.get('/count', async (req, res, next) => {
    try {
        let data = await Spots.count({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.get('/typecount', async (req, res, next) => {
    try {
        let data = await SpotTypes.count({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/list', async (req, res, next) => {
    const limit = req.body.limit;
    const offset = req.body.offset;
    try {
        let data = await Spots.find({}, { limit: limit, skip: offset });
        for (let i in data) {
            data[i].typename = (await SpotTypes.findOne({ _id: data[i].type })).name;
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
    const limit = req.body.limit;
    const offset = req.body.offset;
    try {
        let data = await SpotTypes.find({}, { limit: limit, skip: offset });
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.get('/list', async (req, res, next) => {
    try {
        let data = await Spots.find({});
        for (let i in data) {
            data[i].typename = (await SpotTypes.findOne({ _id: data[i].type })).name;
        }
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.get('/typelist', async (req, res, next) => {
    try {
        let data = await SpotTypes.find({});
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
        let data = await Spots.removeOne({ _id: id });
        res.json({ status: 'ok' });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/deletetype', async (req, res, next) => {
    const id = req.body.id;
    try {
        let data = await SpotTypes.removeOne({ _id: id });
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
        }
        let doc = await Spots.update({ _id: id }, data);
        res.json({ status: 'ok' });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/changetype', async (req, res, next) => {
    const id = req.body._id;
    try {
        const doc = await SpotTypes.findOne({ name: req.body.name });
        if (doc) {
            throw new Error('已有同名的分类');
        }
        let data = await FoodTypes.update({ _id: id }, req.body);
        res.json({ status: 'ok' });
    } catch (e) {
        res.status(405).send(e.message);
    }
})



export default route;