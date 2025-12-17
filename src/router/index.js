import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../components/pages/HomePage.vue'
import LoginPage from '../components/pages/LoginPage.vue'
import SignupPage from '../components/pages/SignupPage.vue'
import DetailPage from '@/components/pages/DetailPage.vue'
import UserPage from '@/components/pages/UserPage.vue'
import EditRecipePage from '@/components/pages/EditRecipePage.vue'
import NewRecipePage from '@/components/pages/NewRecipePage.vue'
import Cookies from 'js-cookie'

const checkAuth = (to, from, next) => {
    const token = Cookies.get('accessToken');
    if (token) {
        next();
    } else {
        next({ name: 'login' });
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupPage
        },
        {
            path: '/recipe/new',
            name: 'new-recipe',
            component: NewRecipePage,
            beforeEnter: checkAuth
        },
        {
            path: '/recipe/:id',
            name: 'recipe-detail',
            component: DetailPage
        },
        {
            path: '/recipe/edit/:id',
            name: 'edit-recipe',
            component: EditRecipePage,
            beforeEnter: checkAuth
        },
        {
            path: '/user/:id',
            name: 'user-page',
            component: UserPage,
            beforeEnter: checkAuth
        }
    ]
})

export default router