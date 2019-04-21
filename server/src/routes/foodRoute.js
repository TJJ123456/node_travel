import { Foods } from '../providers'
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

route.post('/foodlist', async (req, res, next) => {
    const limit = req.body.limit;
    const offset = req.body.offset;
    try {
        let data = await Foods.find({}, { limit: limit, skip: offset });
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

route.post('/change', async (req, res, next) => {
    const id = req.body._id;
    try {
        let data = await Foods.update({ _id: id }, req.body);
        res.json({ status: 'ok' });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

export default route;