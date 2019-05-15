import { Comments, Users, Foods, Entertainments } from '../providers'
import express from 'express'
const route = express.Router();

async function getByname(name) {
    return await Comments.findOne({ name })
}

//评论分类
const Comment = {};
Comment.Food = 0;
Comment.Entertainment = 1;

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
            type: req.body.type,
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
            switch (data[i].type) {
                case Comment.Food:
                    let food = await Foods.findOne({ _id: data[i].itemid });
                    if (food) data[i].shopname = food.name;
                    else data[i].shopname = '美食不存在'
                    break;
                case Comment.Entertainment:
                    data[i].shopname = (await Entertainments.findOne({ _id: data[i].itemid })).name;
                    break;
            }
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
            switch (data[i].type) {
                case Comment.Food:
                    data[i].shopname = (await Foods.findOne({ _id: data[i].itemid })).name;
                    break;
                case Comment.Entertainment:
                    data[i].shopname = (await Entertainments.findOne({ _id: data[i].itemid })).name;
                    break;
            }
        }
        res.json({
            data: data
        });
    } catch (e) {
        res.status(405).send(e.message);
    }
})

route.post('/itemlist', async (req, res, next) => {
    const type = req.body.type;
    const id = req.body.id;
    try {
        let data = await Comments.find({ type: type, itemid: id, commentType: commentType.Pass });
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
            switch (data[i].type) {
                case Comment.Food:
                    let food = await Foods.findOne({ _id: data[i].itemid });
                    data[i].shopname = food.name;
                    data[i].shopaddress = food.address;
                    break;
                case Comment.Entertainment:
                    let shop = await Entertainments.findOne({ _id: data[i].itemid });
                    data[i].shopname = shop.name;
                    data[i].shopaddress = shop.address;
                    break;
            }
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
            switch (data[i].type) {
                case Comment.Food:
                    data[i].shopname = (await Foods.findOne({ _id: data[i].itemid })).name;
                    break;
                case Comment.Entertainment:
                    let shop = await Entertainments.findOne({ _id: data[i].itemid });
                    data[i].shopname = shop.name;
                    break;
            }
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
        console.log('审核一次', id);
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
    return Math.round(Math.random() * count);
}

const fakeContent = [
    '质量非常好，与卖家描述的完全一致，非常满意,真的很喜欢，完全超出期望值，发货速度非常快，包装非常仔细、严实，物流公司服务态度很好，运送速度很快，很满意的一次购物',
    '终于收到我需要的宝贝了，东西很好，价美物廉，谢谢掌柜的！说实在，这是我淘宝购物来让我最满意的一次购物。无论是掌柜的态度还是对物品，我都非常满意的。掌柜态度很专业热情，有问必答，回复也很快，我问了不少问题，他都不觉得烦，都会认真回答我，这点我向掌柜表示由衷的敬意，这样的好掌柜可不多。再说宝贝，正是我需要的，收到的时候包装完整，打开后让我惊喜的是，宝贝比我想象中的还要好！不得不得竖起大拇指。下次需要的时候我还会再来的，到时候麻烦掌柜给个优惠哦！',
    '包装很完整，没有破损。迫不及待的拆开，发现完全超乎我的想象，入手以后竟然这么顺滑，没有一点褶皱，这种柔顺，一摸，就知道是我想要的。插入耳机插孔的时候，没有任何阻碍，一插到底，尽显我真男人本色。戴上耳机，听到 嗨啦 酷狗，我的心已经如痴如醉，整个世界没有了别的声音。顺利点开我最爱听的AV8D摇起来，尽情徜徉在音乐的海洋，我的能量，超乎你的想象。',
    '和此卖家交流，不由得精神为之一振，自觉七经八脉为之一畅，我在淘宝买了这么多年，所谓阅商无数，但与卖家您交流，我只想说，老板你实在是太好了，你的高尚情操太让人感动了，本人对此卖家之仰慕如滔滔江水连绵不绝，海枯石烂，天崩地裂，永不变心。'
]

function randomContent() {
    return fakeContent[randomIndex(fakeContent.length)];
}

async function createCommentRandom() {
    const start = new Date(new Date().toLocaleDateString()).getTime();
    const foodList = await Foods.find({});
    const userList = await Users.find({});
    if (foodList.length === 0 || userList.length === 0) {
        return;
    }

    for (let i = 6; i > -1; i--) {
        let count = Math.round(Math.random() * 20);
        for (let j = 0; j < count; ++j) {
            let userIndex = randomIndex(userList.length-1);
            let userid = userList[userIndex]._id;
            let itemIndex = randomIndex(foodList.length-1);
            console.log('itemindex', itemIndex, foodList[itemIndex]);
            let itemid = foodList[itemIndex]._id;
            let score = randomIndex(5);
            let average = randomIndex(200);
            let content = randomContent();
            let time = start - 86400000 * i + randomIndex(99999);
            const data = {
                score: score,
                average: average,
                content: content,
                type: 0,
                itemid: itemid,
                userid: userid,
                commentType: commentType.Pass,
                createTime: time,
            }
            const newDoc = await Comments.insert(data);

        }
    }
}

// createCommentRandom();

export default route;
