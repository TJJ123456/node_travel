import { Foods, FoodTypes, Entertainments, EntertainmentTypes } from '../providers'
import express from 'express'
const route = express.Router();

route.post('/', async (req, res, next) => {
    try {
        const keyword = req.body.keyword;
        console.log('关键字', keyword);
        let regex = new RegExp(keyword);
        let data1 = await Foods.find({
            $or: [
                { "name": regex }, { "desc": regex }, { "address": regex }
            ]
        });
        console.log('美食', data1);
        for (let i = 0; i < data1.length; ++i) {
            data1[i].typename = (await FoodTypes.findOne({ _id: data1[i].type })).name;
        }
        let data2 = await Entertainments.find({
            $or: [
                { "name": regex }, { "desc": regex }, { "address": regex }
            ]
        });
        for (let i = 0; i < data2.length; ++i) {
            data2[i].typename = (await EntertainmentTypes.findOne({ _id: data2[i].type })).name;
        }
        console.log('娱乐', data2);
        let data = data1.concat(data2);
        console.log('结果', data);
        res.json({ data: data });
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

export default route;