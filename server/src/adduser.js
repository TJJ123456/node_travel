import { Users } from './providers'

import bcrypt from 'bcryptjs'
import { create } from 'domain';

const SALT_ROUNDS1 = 10

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

async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS1)
}


// console.log('hello')
