import { Users } from '../providers'
import express from 'express'
const route = express.Router();
import bcrypt from 'bcryptjs'

async function getByname(name) {
    return await Users.findOne({ name })
}


const SALT_ROUNDS = 10

function sendUserInfo(req, res) {
    res.json({
        _id: req.session.user._id,
        username: req.session.user.username,
    })
}

async function getById(id) {
    return await Users.findOne({ _id: id })
}

async function getByUsername(username) {
    return await Users.findOne({ username })
}

async function isPasswordMatching(user, password) {
    return await bcrypt.compare(password, user.password)
}

async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

async function createUser({ username, password }) {
    const user = await getByUsername(username)
    if (user) {
        throw new Error('用户名已注册')
    } else {
        let time = new Date();
        const hash = await hashPassword(password)
        const result = await Users.insert({
            username,
            password: hash,
            createTime: time.getTime(),
        })

        return result
    }
}

route.get('/', (req, res) => {
    if (!req.session.user) {
        res.send('null')
    } else {
        return sendUserInfo(req, res)
    }
})

route.post('/signup', async (req, res, next) => {
    try {
        const newDoc = await createUser(req.body);
        res.json({ status: 'ok' })
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.post('/login', async (req, res, next) => {
    try {
        const user = await getByUsername(req.body.username);
        let valid = false;
        if (user) {
            valid = await isPasswordMatching(user, req.body.password)
        } else {
            throw new Error('用户名不存在')
        }
        if (!valid) {
            throw new Error('密码错误')
        }
        req.session.user = user;
        sendUserInfo(req, res);
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.get('/logout', async (req, res, next) => {
    req.session.user = null;
    res.send('null');
})

route.get('/count', async (req, res, next) => {
    try {
        let data = await Users.count({});
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }

})

route.get('/todaycount', async (req, res, next) => {
    try {
        const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
        let data = await Users.count({}, { $gt: { createTime: start } });
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }

})

route.get('/list', async (req, res, next) => {
    try {
        let data = await Users.find({});
        res.json({
            data: data
        });
    } catch (e) {
        console.log(e.message);
        res.status(405).send(e.message);
    }
})

route.post('/list', async (req, res, next) => {
    const limit = req.body.limit;
    const offset = req.body.offset;
    try {
        let data = await Users.find({}, { limit: limit, skip: offset });
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})
function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
async function createUserRandom() {
    const start = new Date(new Date().toLocaleDateString()).getTime();
    for (let i = 6; i > -1; i--) {
        let count = Math.round(Math.random() * 30) + 10;
        for (let j = 0; j < count; ++j) {
            const username = rand(1000, 9999);
            const user = await getByUsername(username);
            if (!user) {
                let time = start - 86400000 * i + rand(0, 99999);
                const hash = await hashPassword('123')
                const result = await Users.insert({
                    username,
                    password: hash,
                    createTime: time,
                })
            }
        }
    }
}

// createUserRandom();

export default route;