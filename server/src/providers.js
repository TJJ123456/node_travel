import { collectionFactory, modelFactory } from './utils/database'

const idIndex = {
  fieldName: '_id',
  unique: true,
}

export const Users = modelFactory(collectionFactory('users', idIndex))

export const Datas = modelFactory(collectionFactory('datas', idIndex))
export const DataTypes = modelFactory(collectionFactory('dataTypes', idIndex))

// export const Foods = modelFactory(collectionFactory('foods', idIndex))
// export const FoodTypes = modelFactory(collectionFactory('foodTypes', idIndex))

// export const Entertainments = modelFactory(collectionFactory('entertainments', idIndex))
// export const EntertainmentTypes = modelFactory(collectionFactory('entertainmentTypes', idIndex))

// export const Spots = modelFactory(collectionFactory('spots', idIndex))
// export const SpotTypes = modelFactory(collectionFactory('spottypes', idIndex))
// export const Plans = modelFactory(collectionFactory('plans', idIndex))
export const Comments = modelFactory(collectionFactory('comments', idIndex))

const randomDataType = [
  ['下午茶', '早餐', '午餐', '夜宵', '特色小吃', '便当', '火锅'],
  ['酒吧', 'KTV', '游戏厅', '按摩推拿'],
  ['公园', '名胜', '古迹', '游乐场'],
]
// const randomFoodType = ['下午茶', '早餐', '午餐', '夜宵', '特色小吃', '便当', '火锅'];
// const randomEntertainmentType = ['酒吧', 'KTV', '游戏厅', '按摩推拿'];
// const randomSpotType = ['公园', '名胜', '古迹', '游乐场'];
const randomDesc = [
  `明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间？(何似 一作：何时；又恐 一作：惟 / 唯恐)
  转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。(长向 一作：偏向)`,
  `驿外断桥边，寂寞开无主。已是黄昏独自愁，更著风和雨。 
  无意苦争春，一任群芳妒。零落成泥碾作尘，只有香如故。`,
  `寻寻觅觅，冷冷清清，凄凄惨惨戚戚。乍暖还寒时候，最难将息。三杯两盏淡酒，怎敌他、晚来风急？雁过也，正伤心，却是旧时相识。
  满地黄花堆积。憔悴损，如今有谁堪摘？守着窗儿，独自怎生得黑？梧桐更兼细雨，到黄昏、点点滴滴。这次第，怎一个愁字了得！（守着窗儿 一作：守著窗儿）`,
  `风住尘香花已尽，日晚倦梳头。物是人非事事休，欲语泪先流。
  闻说双溪春尚好，也拟泛轻舟。只恐双溪舴艋舟，载不动许多愁。`,
  `寒蝉凄切，对长亭晚，骤雨初歇。都门帐饮无绪，留恋处，兰舟催发。执手相看泪眼，竟无语凝噎。念去去，千里烟波，暮霭沉沉楚天阔。
  多情自古伤离别，更那堪，冷落清秋节！今宵酒醒何处？杨柳岸，晓风残月。此去经年，应是良辰好景虚设。便纵有千种风情，更与何人说？(好景 一作：美景)`,
  `一曲新词酒一杯，去年天气旧亭台。夕阳西下几时回？
  无可奈何花落去，似曾相识燕归来。小园香径独徘徊。`
]
const randomRoad = [
  '百花深处',
  '灵境胡同',
  '寺贝通津',
  '帘官公所街',
  '芙蓉街',
  '甜爱路',
  '琅琊路',
  '日月星街',
  '十月初五马路',
]

const randomDataFirstname = [
  [
    '马大姐', '张大哥', '光头佬', '十三哥', '少林寺', '木村', '秋林', '魔幻', '五彩', '妙香', '三宝',
    '香榭丽舍', '天使之语', '田园牧歌', '淘气猫', '特香', '开口乐', '味雅园', '大快乐', '胜达', '好百客'
  ],
  [
    '锦鲤', '喜鹊音乐', '工藤', '日光纪', '晴天', '八度空间', '吉木', '芊羽芊寻', '可可派', '派工仿',
    '琥珀', '创意', '红河谷', '味典', '世界之窗', '氧气', '美之道', '爱麦克', '哥巢',
  ],
  [
    '桂林圆环', '象山', '希宇', '兴安', '桂林漓江', '红溪', '逍遥楼', '卡乐', '尚水', '葡萄山', '乐满地', '香草', '虞山',
  ],
]

const randomDatafamilyname = [
  [
    '桂林米粉', '螺蛳粉', '饺子', '炒饭', '小吃', '烘培', '烧烤', '面包', '早餐', '奶茶', '蛋糕', '快餐',
    '自助', '西餐厅', '中餐', '日料', '老友粉', '餐厅', '酒店', '饭店'
  ],
  [
    '酒吧', '酒馆', '剧本体验馆', '创意手工坊', '密室逃脱', '手作', 'KTV', 'NPC密室', '野战俱乐部', '电玩城', '轰趴馆',
    '水疗', '清吧', '养生堂', '推拿', '休闲会所', '康复馆',
  ],
  [
    '水上乐园', '主题公园', '古镇', '景区', '欢乐城', '广场', '温泉', '遗址公园', '观光古寨', '逍遥湖', '度假区',
    '画廊', '星球', '漂流', '动物园',
  ]
]

const dataImg = [
  [
    '/public/food/1.jpg',
    '/public/food/2.jpg',
    '/public/food/3.jpg',
    '/public/food/4.jpg',
    '/public/food/5.jpg',
    '/public/food/6.jpg',
    '/public/food/7.jpg',
    '/public/food/8.jpg',
    '/public/food/9.jpg',
    '/public/food/10.jpg',
    '/public/food/11.jpg',
  ], [
    '/public/entertainment/1.png',
    '/public/entertainment/2.png',
    '/public/entertainment/3.png',
    '/public/entertainment/4.png',
    '/public/entertainment/5.png',
    '/public/entertainment/6.png',
    '/public/entertainment/7.png',
    '/public/entertainment/8.png',
    '/public/entertainment/9.png',
    '/public/entertainment/10.png',
    '/public/entertainment/11.png',
  ],
  [
    '/public/spot/1.jpg',
    '/public/spot/2.jpg',
    '/public/spot/3.jpg',
    '/public/spot/4.jpg',
    '/public/spot/5.jpg',
    '/public/spot/6.jpg',
    '/public/spot/7.jpg',
    '/public/spot/8.jpg',
    '/public/spot/9.jpg',
    '/public/spot/10.jpg',
    '/public/spot/11.jpg',
  ]
]

function randomIndex(count) {
  return Math.round(Math.random() * (count - 1));
}

async function createDataType() {
  for (let i = 0; i < randomDataType.length; ++i) {
    const arr = randomDataType[i];
    console.log(arr);
    for (let j = 0; j < arr.length; ++j) {
      const doc = {
        name: arr[j],
        kind: i
      };
      const newDoc = await DataTypes.insert(doc);
    }
  }
}

async function createData() {
  for (let i = 0; i < 3; ++i) {
    const typeList = await DataTypes.find({ kind: i });
    for (let j = 0; j < 40; ++j) {
      let name = randomDataFirstname[i][randomIndex(randomDataFirstname[i].length)] + randomDatafamilyname[i][randomIndex(randomDatafamilyname[i].length)];
      let desc = randomDesc[randomIndex(randomDesc.length)];
      let address = randomRoad[randomIndex(randomIndex.length)] + randomIndex(100) + '号';
      let type = typeList[randomIndex(typeList.length)]._id;
      let phone = randomIndex(1000);
      let filepath = dataImg[i][randomIndex(dataImg[i].length)];
      const doc = {
        name: name,
        desc: desc,
        address: address,
        type: type,
        filepath: filepath,
        phone: phone,
        kind: i
      };
      const newDoc = await Datas.insert(doc);
    }
  }
}

const fakeContent = [
  '路过的时候专门跑下来吃，真的是很多人啊，不过老板速度很快。',
  '桂林市中心城区中心广场四通八达，城市处在山水世界包围中，花花草草都非常不错。',
  '由于是第一次来，人数也不齐，但是服务员还是热心的帮我组了玩家拼团。',
  '这里一到晚上就热热闹闹的，有很多餐吧都相当的有特色，比之前有了很大的不同。',
  '店里的环境挺好，就是一开始有点难找，和朋友玩得很开心。',
  '一进去就是喜欢的环境，给人的感觉特别舒服。',
  '位置和人流还可以，不远处就是景区。地方很好找，环境很优美。',
  '这里环境很好，人很多几乎每天都是爆满的，里面也有空调。',
  '跟朋友聚聚随便唱两首歌，聊聊天什么的足够了。但如果真的专门为了唱歌来的话就比较让人失望了。',
  '交通方便，地点就近，价格便宜，服务还行！！',
  '休闲手工的好去处，很好很棒。猫猫很多但店主姐姐卫生做得好很干净，没有异味，环境不错，撸猫撸得好开,相册全是猫猫的美照，怎么能这么可爱心都酥了(>﹏<) 之前一直想做汤姆这次终于做了，效果还不错，自己的劳动成果总觉得可爱哈哈哈哈。',
  '自己做的真的很好看！温柔的小姐姐也会在旁边指导怎么做～猫咪真的很好撸！！',
  '地理位置非常优越，就在漓江边上，对着解放桥，可惜去的时候连连下雨，所以漓江的水是浑浊的。地点在七楼，正对着漓江，江景不错。因为是周末，找技师按摩需要排队，所以洗澡之后先吃点东西，然后让服务员带领着进房间看会电视。技师的手法挺好的，一整套下来从头到脚，从前到后，能感觉到技师手法挺专业。不过建议继续加强理论学习，因为在问到为什么按到某些部位会痛的时候，技师答不出来。既然是养生馆，作为最直接服务客户的技师，除了手上功夫要有，理论也得有不是么？在饮食上，虽然每一样食物品种不多，但是种类很全。手机点餐方便，服务员上菜及时，收盘也很及时。',
  '好，在桂林最后一晚让我刮目相看了。90元的服务让我知道这个世界竟然可以这样享受',
  '这家店的位置特别好，我从酒店走路过来的。先是洗澡，水流特别大，热水很足，洗澡完特别的舒服。然后进去做推拿，很舒服的。最后，关键是最后的吃的完全免费！！！太爽了 。',
  '环境不错，内部有点旧。但是没有异味。可以汗蒸，按摩，东西免费吃。强烈推荐59号技师。手法非常好。语气温柔。适合休息的时候来。我是一个人来的，整体的服务态度非常好。',
  '挺好的，服务态度很好！按摩也不错',
  '环境很好，有很多免费自助小吃，可以看江景，服务生态度很好，很有礼貌，逢人打招呼！',
  '经理态度诚恳，有诚意，希望今后能一如既往的做好出品和服务！其实老技师的技术还是不错的。',
  '好久没来,不过现在这店里装修的要比其它棋牌桌游装修的好 小包要比别人家的中包还要大，最重要的是干净整洁，性价比也很高 挺划算的 生意挺好 每次来 都是爆满的情况 服务员服务挺好的 一如既往好评',
  '果汁都是鲜榨果汁很新鲜,跟朋友玩桌游很开心 哈哈哈',
  '地理位置很好，环境很清雅，没有烟味，可以选对应价格的饮料茶水，老板服务很热情很周到，很适合朋友小聚聊天，桌游种类很多，是步行街难得的清幽之地，强推哦！',
  '地方比较偏，晚上在那里待了几个钟，大多顾客都是成年男子，烟雾缭绕，虽然只是听歌聊天吃东西喝酒，但是身为一个不吸烟的人，想去清吧的人来说，还是不喜欢，感觉烟味太重，可能是比较廉价的烟，，，但是不可否认套餐很便宜',
  '今天过生日，过来坐坐。恰逢冬至日，老板贴心的送了饺子。听着歌突然想起在大学时玩乐队的时光，下次来一定要自己唱一下。',
]

function randomContent() {
  return fakeContent[randomIndex(fakeContent.length)];
}

async function createCommentRandom() {
  const start = new Date(new Date().toLocaleDateString()).getTime();
  const dataList = await Datas.find({});
  const userList = await Users.find({});
  if (dataList.length === 0 || userList.length === 0) {
    return;
  }

  for (let i = 6; i > -1; i--) {
    let count = Math.round(Math.random() * 100) + 200;
    for (let j = 0; j < count; ++j) {
      let userIndex = randomIndex(userList.length - 1);
      let userid = userList[userIndex]._id;
      let itemIndex = randomIndex(dataList.length - 1);
      let itemid = dataList[itemIndex]._id;
      let score = randomIndex(2) + 3;
      let average = randomIndex(200);
      let content = randomContent();
      let time = start - 86400000 * i + randomIndex(99999);
      const data = {
        score: score,
        average: average,
        content: content,
        itemid: itemid,
        userid: userid,
        commentType: 1,
        createTime: time,
      }
      const newDoc = await Comments.insert(data);
    }
  }
}

async function initData() {
  // await createDataType();
  await createData();
  await createCommentRandom();
}

// initData();