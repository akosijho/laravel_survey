import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue';
import Login from '../views/login/Login.vue';
import Register from '../views/register/Register.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';
import Survey from '../views/survey/Survey.vue';
import store from "../store";
import AuthLayout from '../components/AuthLayout.vue';

/// create routes for routing
const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
        meta: { requiresAuth: true }, ///requires routes to have authentication or already authenticated
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: '/survey',
                name: 'Survey',
                component: Survey
            }
        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            },
        ]
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: 'Login' });
    } else if (store.state.user.token && (to.meta.isGuest)) {
        next({ name: 'Dashboard' });
    }
    else {
        next();
    }
});

export default router;