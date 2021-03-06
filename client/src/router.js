import Vue from 'vue';
import VueRouter from 'vue-router';
import state from './main/state'

Vue.use(VueRouter);


import mangerHome from './components/managerHome.vue';
import mangerLogin from './components/mangerLogin.vue';

import addFood from './views/addFood.vue';
import addHotel from './views/addHotel.vue';
import addPlan from './views/addPlan.vue';
import addSpot from './views/addSpot.vue';
import enChart from './views/enChart.vue';
import commentChart from './views/commentChart.vue';
import userChart from './views/userChart.vue';
import spotChart from './views/spotChart.vue';
import addSpotType from './views/addSpotType.vue';
import addFoodType from './views/addFoodType.vue';
import foodList from './views/foodList.vue';
import foodChart from './views/foodChart.vue';
import hotelList from './views/hotelList.vue';
import planList from './views/planList.vue';
import spotList from './views/spotList.vue';
import spotTypesList from './views/spotTypesList.vue';
import userList from './views/userList.vue';
import foodTypeList from './views/foodTypeList.vue';
import manage from './views/manage.vue';
import home from './views/home.vue';
import checkList from './views/checkList.vue';
import commentList from './views/commentList.vue';
import entertainmentsList from './views/entertainmentsList.vue';
import entertainmentTypesList from './views/entertainmentTypesList.vue';
import addEntertainment from './views/addEntertainment.vue';
import addEntertainmentType from './views/addEntertainmentType.vue';

import userhome from './userviews/userhome.vue';
import userLayout from './userviews/userLayout.vue';
import userPlanList from './userviews/userPlanList.vue';
import userLogin from './userviews/login.vue';
import fortgetPassword from './userviews/fortgetPassword.vue';
import myview from './userviews/myview.vue';
import planDetail from './userviews/planDetail.vue';
import uplanList from './userviews/planList.vue';
import itemDetail from './userviews/itemDetail.vue';
import comment from './userviews/comment.vue';
import shopList from './userviews/shopList.vue';
import searchview from './userviews/searchview.vue';

const routes = [
    {
        path: '/', name: 'uhome', component: userLayout,
        children: [{
            path: '/',
            component: userhome,
            meta: [],
        },
        {
            path: '/home/userPlanList',
            component: userPlanList,
            meta: [],
            children: [{
                path: '/',
                name: '',
                component: uplanList,
            },
            {
                path: 'planDetail/:id',
                name: 'planDetail',
                component: planDetail,
                props: true,
                meta: ['计划细节']
            },
            ]
        },
        {
            path: '/home/login',
            name: 'userLogin',
            component: userLogin,
            meta: [],
        },
        {
            path: '/home/fortgetpassword',
            name: 'fortgetPassword',
            component: fortgetPassword,
            meta: [],
        },
        {
            path: '/home/myview',
            component: myview,
            meta: { private: true, },
        },
        {
            path: 'Detail/:type/:id',
            name: 'itemDetail',
            component: itemDetail,
            props: true,
        },
        {
            path: 'Detail/:type/:id/comment',
            name: 'comment',
            component: comment,
            meta: { private: true },
            props: true
        },
        {
            path: '/:type/shoplist',
            name: 'shoplist',
            component: shopList,
            props: true,
        },
        {
            path: '/home/search/:keyword',
            name: 'search',
            component: searchview,
            props: true
        },
        ]
    },
    { path: '/managerlogin', name: 'managerlogin', component: mangerLogin },
    {
        path: '/manager',
        name: '',
        component: manage,
        meta: { manager: true },
        children: [{
            path: '',
            component: home,
            meta: [],
        }, {
            path: '/addFood',
            component: addFood,
            meta: ['添加数据', '添加美食'],
        }, {
            path: '/addFoodType',
            component: addFoodType,
            meta: ['添加数据', '添加美食分类'],
        }, {
            path: '/addHotel',
            component: addHotel,
            meta: ['添加数据', '添加酒店'],
        }, {
            path: '/addSpotType',
            component: addSpotType,
            meta: ['添加数据', '添加景点类型'],
        }, {
            path: '/addSpot',
            component: addSpot,
            meta: ['添加数据', '添加景点'],
        }, {
            path: '/addPlan',
            component: addPlan,
            meta: ['添加数据', '添加方案'],
        }, {
            path: '/userList',
            component: userList,
            meta: ['数据管理', '用户列表'],
        }, {
            path: '/foodList',
            component: foodList,
            meta: ['数据管理', '美食列表'],
        }, {
            path: '/foodChart',
            component: foodChart,
            meta: ['数据管理', '美食数据图表'],
        },
        {
            path: '/enChart',
            component: enChart,
            meta: ['数据管理', '娱乐数据图表'],
        },
        {
            path: '/commentChart',
            component: commentChart,
            meta: ['数据管理', '评论数据图表'],
        },
        {
            path: '/userChart',
            component: userChart,
            meta: ['数据管理', '用户数据图表'],
        },
        {
            path: '/spotChart',
            component: spotChart,
            meta: ['数据管理', '景点数据图表'],
        }, {
            path: '/foodtypeList',
            component: foodTypeList,
            meta: ['数据管理', '美食分类列表'],
        }, {
            path: '/hotelList',
            component: hotelList,
            meta: ['数据管理', '酒店列表'],
        }, {
            path: '/spotList',
            component: spotList,
            meta: ['数据管理', '景点列表'],
        }, {
            path: '/spotTypesList',
            component: spotTypesList,
            meta: ['数据管理', '景点类型列表'],
        },
        {
            path: '/checkList',
            component: checkList,
            meta: ['评论管理', '评论列表'],
        },
        {
            path: '/commentList',
            component: commentList,
            meta: ['评论管理', '评论列表'],
        },
        {
            path: '/entertainmentsList',
            component: entertainmentsList,
            meta: ['数据管理', '娱乐列表'],
        },
        {
            path: '/entertainmentTypesList',
            component: entertainmentTypesList,
            meta: ['数据管理', '娱乐列表'],
        },
        {
            path: '/addEntertainment',
            component: addEntertainment,
            meta: ['数据管理', '添加娱乐'],
        },
        {
            path: '/addEntertainmentType',
            component: addEntertainmentType,
            meta: ['数据管理', '添加娱乐分类'],
        },
        ]
    },

]

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        if (to.hash) {
            return { selector: to.hash }
        }
        return { x: 0, y: 0 }
    },
})

router.beforeEach((to, from, next) => {
    console.log('路由', to.matched.some(r => r.meta.private), state.user, to.matched.some(r => r.meta.private) && !state.user);
    // if (to.meta.private && !state.user) {
    if (to.matched.some(r => r.meta.manager) && !state.manager) {
        next({ name: 'managerlogin', params: { wantedRoute: to.fullPath } });
        return;
    }
    if (to.matched.some(r => r.meta.private) && !state.user) {
        next({ name: 'userLogin', params: { wantedRoute: to.fullPath } });
        return;
    }
    if (to.matched.some(r => r.meta.guest) && state.user) {
        next({ name: 'home' });
        return;
    }
    next();
})

export default router;