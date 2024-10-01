import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../components/LoginView.vue';
import SignupView from '../components/SignupView.vue';
import TasksView from '../components/TasksView.vue';

const routes = [
    { path: '/', redirect: '/tasks' },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/signup', name: 'signup', component: SignupView },
    { path: '/tasks', name: 'tasks', component: TasksView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
