import { collectionFactory, modelFactory } from './utils/database'

const idIndex = {
  fieldName: '_id',
  unique: true,
}

export const Users = modelFactory(collectionFactory('users', idIndex))

export const Foods = modelFactory(collectionFactory('foods', idIndex))
export const FoodTypes = modelFactory(collectionFactory('foodTypes', idIndex))

export const Entertainments = modelFactory(collectionFactory('entertainments', idIndex))
export const EntertainmentTypes = modelFactory(collectionFactory('entertainmentTypes', idIndex))

export const Spots = modelFactory(collectionFactory('spots', idIndex))
export const Plans = modelFactory(collectionFactory('plans', idIndex))
export const Comments = modelFactory(collectionFactory('comments', idIndex))

const randomFoodType = ['下午茶', '早餐', '午餐', '夜宵', '特色小吃', '便当', '火锅'];
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

const randomFoodFirstname = [
  '马大姐', '张大哥', '光头佬', '十三哥', '少林寺', '木村', '秋林', '魔幻', '五彩', '妙香', '三宝',
  '香榭丽舍', '天使之语', '田园牧歌', '淘气猫', '特香', '开口乐', '味雅园', '大快乐', '胜达', '好百客'
]

const randomFoodFamilyname = [
  '桂林米粉', '螺蛳粉', '饺子', '炒饭', '小吃', '烘培', '烧烤', '面包', '早餐', '奶茶', '蛋糕', '快餐',
  '自助', '西餐厅', '中餐', '日料', '老友粉', '餐厅', '酒店', '饭店'
]

function randomIndex(count) {
  return Math.round(Math.random() * (count - 1));
}

async function createFoodType() {
  for (let i in randomFoodType) {
    const data = {
      name: randomFoodType[i]
    };
    const newDoc = await FoodTypes.insert(data);
  }
}

async function createFood() {
  const typeList = await FoodTypes.find({});
  for (let i = 0; i < 40; ++i) {
    let name = randomFoodFirstname[randomIndex(randomFoodFirstname.length)] + randomFoodFamilyname[randomIndex(randomFoodFamilyname.length)];
    let desc = randomDesc[randomIndex(randomDesc.length)];
    let address = randomRoad[randomIndex(randomIndex.length)] + randomIndex(100) + '号';
    let type = typeList[randomIndex(typeList.length)]._id;
    let phone = randomIndex(1000);
    const doc = {
      name: name,
      desc: desc,
      address: address,
      type: type,
      filepath: '',
      phone: phone
    };
    const newDoc = await Foods.insert(doc);
  }
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
    let count = Math.round(Math.random() * 100) + 200;
    for (let j = 0; j < count; ++j) {
      let userIndex = randomIndex(userList.length - 1);
      let userid = userList[userIndex]._id;
      let itemIndex = randomIndex(foodList.length - 1);
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
        commentType: 1,
        createTime: time,
      }
      const newDoc = await Comments.insert(data);

    }
  }
}

async function createCommentRandomEn() {
  const start = new Date(new Date().toLocaleDateString()).getTime();
  const foodList = await Entertainments.find({});
  const userList = await Users.find({});
  if (foodList.length === 0 || userList.length === 0) {
    return;
  }

  for (let i = 6; i > -1; i--) {
    let count = Math.round(Math.random() * 20);
    for (let j = 0; j < count; ++j) {
      let userIndex = randomIndex(userList.length - 1);
      let userid = userList[userIndex]._id;
      let itemIndex = randomIndex(foodList.length - 1);
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
        commentType: 1,
        createTime: time,
      }
      const newDoc = await Comments.insert(data);

    }
  }
}

async function initData() {
  // await createFoodType();
  // await createFood();
  await createCommentRandom();
}

// initData();