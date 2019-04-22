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
import foodList from './views/foodList.vue';
import hotelList from './views/hotelList.vue';
import planList from './views/planList.vue';
import spotList from './views/spotList.vue';
import userList from './views/userList.vue';
import manage from './views/manage.vue';
import home from './views/home.vue';

import userhome from './userviews/userhome.vue';
import userLayout from './userviews/userLayout.vue';
import userPlanList from './userviews/userPlanList.vue';
import userLogin from './userviews/login.vue';
import myOrder from './userviews/myOrder.vue';

const routes = [
    {
        path: '/', name: 'userhome', component: userLayout,
        children: [{
            path: '/',
            component: userhome,
            meta: [],
        },
        {
            path: '/home/userPlanList',
            component: userPlanList,
            meta: [],
        },
        {
            path: '/home/login',
            component: userLogin,
            meta: [],
        },
        {
            path: '/home/myOrder',
            component: myOrder,
            meta: [],
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
            path: '/addHotel',
            component: addHotel,
            meta: ['添加数据', '添加酒店'],
        }, {
            path: '/addSpot',
            component: addSpot,
            meta: ['添加数据', '添加景点'],
        }, {
            path: '/addPlan',
            component: addPlan,
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
            path: '/hotelList',
            component: hotelList,
            meta: ['数据管理', '酒店列表'],
        }, {
            path: '/spotList',
            component: spotList,
            meta: ['数据管理', '景点列表'],
        }, {
            path: '/planList',
            component: planList,
            meta: ['数据管理', '方案列表'],
        }]
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
    console.log('to', to.name, to.meta, to.fullPath);
    // if (to.meta.private && !state.user) {
    if (to.matched.some(r => r.meta.manager) && !state.manager) {
        next({ name: 'managerlogin', params: { wantedRoute: to.fullPath } });
        return;
    }
    if (to.matched.some(r => r.meta.private) && !state.user) {
        next({ name: 'login', params: { wantedRoute: to.fullPath } });
        return;
    }
    if (to.matched.some(r => r.meta.guest) && state.user) {
        next({ name: 'home' });
        return;
    }
    next();
})

export default router;