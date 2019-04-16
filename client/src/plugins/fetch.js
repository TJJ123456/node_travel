import state from '../main/state'
import router from '../router'

let baseUrl;

export async function $fetch(url, options) {
    const finalOptions = Object.assign({}, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }, options)
    console.log(`${baseUrl}${url}`, finalOptions);
    const response = await fetch(`${baseUrl}${url}`, finalOptions);
    console.log('333333', response.json);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else if (response.status === 403) {
        console.log('403了?', router.currentRoute.fullPath)
        state.user = null;
        if (router.currentRoute.matched.some(r => r.meta.private)) {
            router.replace({
                name: 'login', params: {
                    wantedRoute: router.currentRoute.fullPath
                }
            })
        }
    } else {
        const message = await response.text();
        const error = new Error('error');
        error.response = message;
        throw error;
    }
}

export default {
    install(Vue, options) {
        baseUrl = options.baseUrl;
        Vue.prototype.$fetch = $fetch;
    }
}