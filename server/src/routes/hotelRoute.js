import { Hotels } from '../providers'
import express from 'express'
const route = express.Router();

async function getByname(name) {
    return await Hotels.findOne({ name })
}

route.post('/create', async (req, res, next) => {
    try {
        const food = await getByname(req.body.name);
        console.log(food);
        if (food) {
            throw new Error('已有同名的酒店');
        }
        const newDoc = await Hotels.insert(req.body);
        res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.get('/hotelcount', async (req, res, next) => {
    try {
        let data = await Hotels.count({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }

})

route.post('/hotellist', async (req, res, next) => {
    const limit = req.body.limit;
    const offset = req.body.offset;
    try {
        let data = await Hotels.find({}, { limit: limit, skip: offset });
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.get('/hotellist', async (req, res, next) => {
    try {
        let data = await Hotels.find({});
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
        let data = await Hotels.removeOne({ _id: id });
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/change', async (req, res, next) => {
    const id = req.body._id;
    try {
        let data = await Hotels.updateOne({ _id: id }, req.body);
        res.json({ status: 'ok' })
    } catch (e) {
        res.status(405).send(e.message);
    }
})

export default route;
