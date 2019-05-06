import { Foods, FoodTypes } from '../providers'
import express from 'express'
const route = express.Router();

async function getByname(name) {
    return await Foods.findOne({ name })
}

route.post('/create', async (req, res, next) => {
    try {
        const food = await getByname(req.body.name);
        console.log(food);
        if (food) {
            throw new Error('已有同名的食品');
        }
        const newDoc = await Foods.insert(req.body);
        res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.post('/getfood', async (req, res, next) => {
    const id = req.body.id;
    try {
        const food = await Foods.findOne({ _id: id });
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
        const doc = await FoodTypes.findOne({ name: req.body.name });
        if (doc) {
            throw new Error('已有同名的分类');
        }
        const data = {
            name: req.body.name
        }
        const newDoc = await FoodTypes.insert(data);
        res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.get('/foodcount', async (req, res, next) => {
    try {
        let data = await Foods.count({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.get('/foodtypecount', async (req, res, next) => {
    try {
        let data = await FoodTypes.count({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/foodlist', async (req, res, next) => {
    const limit = req.body.limit;
    const offset = req.body.offset;
    try {
        let data = await Foods.find({}, { limit: limit, skip: offset });
        for (let i in data) {
            data[i].typename = (await FoodTypes.findOne({ _id: data[i].type })).name;
        }
        res.json({
            data: data
        });
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.post('/foodtypelist', async (req, res, next) => {
    const limit = req.body.limit;
    const offset = req.body.offset;
    try {
        let data = await FoodTypes.find({}, { limit: limit, skip: offset });
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.get('/foodlist', async (req, res, next) => {
    try {
        let data = await Foods.find({});
        for (let i in data) {
            data[i].typename = (await FoodTypes.findOne({ _id: data[i].type })).name;
        }
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.get('/foodtypelist', async (req, res, next) => {
    try {
        let data = await FoodTypes.find({});
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
        let data = await Foods.removeOne({ _id: id });
        res.json({ status: 'ok' });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/deletetype', async (req, res, next) => {
    const id = req.body.id;
    try {
        let data = await FoodTypes.removeOne({ _id: id });
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
            phone: req.body.phone,
        }
        let doc = await Foods.update({ _id: id }, data);
        res.json({ status: 'ok' });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/changetype', async (req, res, next) => {
    const id = req.body._id;
    try {
        const doc = await FoodTypes.findOne({ name: req.body.name });
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