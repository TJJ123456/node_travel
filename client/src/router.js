// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import state from './main/state'

// Vue.use(VueRouter);

// const routes = [
//     { path: '/', name: 'home', component: Home },
//     { path: '/faq', name: 'faq', component: FAQ },
//     { path: '/login', name: 'login', component: Login, meta: { guest: true } },
//     {
//         path: '/tickets', name: 'tickets', component: TicketsLayout, meta: { private: true }, children: [
//             { path: '', name: 'tickets', component: Tickets },
//             { path: 'new', name: 'new-ticket', component: NewTicket },
//             { path: ':id', name: 'ticket', component: Ticket, props: true }
//         ]
//     },
//     { path: '*', component: NotFound },
// ]

// const router = new VueRouter({
//     routes,
//     mode: 'history',
//     scrollBehavior(to, from, savedPosition) {
//         if (savedPosition) {
//             return savedPosition
//         }
//         if (to.hash) {
//             return { selector: to.hash }
//         }
//         return { x: 0, y: 0 }
//     },
// })

// router.beforeEach((to, from, next) => {
//     console.log('to', to.name, to.meta);
//     // if (to.meta.private && !state.user) {
//     if (to.matched.some(r => r.meta.private) && !state.user) {
//         next({ name: 'login', params: { wantedRoute: to.fullPath } });
//         return;
//     }
//     if (to.matched.some(r => r.meta.guest) && state.user) {
//         next({ name: 'home' });
//         return;
//     }
//     next();
// })

// export default router;