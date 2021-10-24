import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const home = () => import('@/views/home.vue')
const test = () => import('../views/test')

const resolvePath = (path: string) => `/${path}`

const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: { name: 'home' } },
    {
        path: resolvePath('home'),
        name: 'home',
        component: home
    },
    {
        path: resolvePath('test'),
        name: 'test',
        component: test
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
