import axios from 'axios';
import router from '@/router';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api'
});

// Intercepta todas as requisições HTTP e adiciona o token de autenticação
apiClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('userToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

// Intercepta todas as respostas HTTP e redireciona para a tela de login caso o token seja inválido
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('userToken');
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default {
    async createTask(task) {
        try {
            const response = await apiClient.post('/tasks', task);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            throw error;
        }
    },

    async fetchTasks() {
        try {
            const response = await apiClient.get('/tasks');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            throw error;
        }
    },

    async updateTask(taskId, updatedTask) {
        try {
            const response = await apiClient.put(`/tasks/${taskId}`, updatedTask);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            throw error;
        }
    },

    async deleteTask(taskId) {
        try {
            const response = await apiClient.delete(`/tasks/${taskId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
            throw error;
        }
    }
};
