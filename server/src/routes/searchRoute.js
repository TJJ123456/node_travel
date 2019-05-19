import { Datas, DataTypes } from '../providers'
import express from 'express'
const route = express.Router();

route.post('/', async (req, res, next) => {
    try {
        const keyword = req.body.keyword;
        let regex = new RegExp(keyword);
        let data = await Datas.find({
            $or: [
                { "name": regex }, { "desc": regex }, { "address": regex }
            ]
        });
        for (let i = 0; i < data.length; ++i) {
            let type = await DataTypes.findOne({ _id: data[i].type });
            data[i].typename = type.name;
        }
        res.json({ data: data });
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

export default route;