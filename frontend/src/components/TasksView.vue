<template>
  <div class="task-manager">
    <h1>Minhas Tarefas</h1>

    <form class="task-form" @submit.prevent="createTask">
      <div class="form-group">
        <label for="title">Título:</label>
        <input type="text" id="title" v-model="title" required />
      </div>

      <div class="form-group">
        <label for="description">Descrição:</label>
        <textarea id="description" v-model="description"></textarea>
      </div>

      <div class="form-group">
        <label for="status">Status:</label>
        <select id="status" v-model="status">
          <option value="pending">Pendente</option>
          <option value="in-progress">Em Progresso</option>
          <option value="completed">Concluída</option>
        </select>
      </div>

      <button class="submit-btn" type="submit">Criar Tarefa</button>
    </form>

    <div v-if="tasks.length" class="task-list">
      <h2>Suas Tarefas</h2>
      <ul>
        <li v-for="task in tasks" :key="task.id" class="task-item">
          <span>{{ task.title }} - {{ task.status }}</span>
          <button class="delete-btn" @click="deleteTask(task.id)">Deletar</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      title: '',
      description: '',
      status: 'pending',
    };
  },
  async mounted() {
    await this.fetchTasks();
  },
  methods: {
    async createTask() {
      const token = localStorage.getItem('userToken');
      try {
        await axios.post('http://localhost:3000/tasks', {
          title: this.title,
          description: this.description,
          status: this.status,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Tarefa criada com sucesso!');
        this.title = '';
        this.description = '';
        this.status = 'pending';
        this.fetchTasks();
      } catch (error) {
        console.error('Erro ao criar tarefa:', error);
      }
    },
    async fetchTasks() {
      const token = localStorage.getItem('userToken');
      try {
        const response = await axios.get('http://localhost:3000/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const statusMap = {
          pending: 'Pendente',
          'in-progress': 'Em Progresso',
          completed: 'Concluída',
        };

        this.tasks = response.data.map(x => ({
          id: x.id,
          title: x.title,
          description: x.description,
          status: statusMap[x.status],
        }));
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    },
    async deleteTask(taskId) {
      const token = localStorage.getItem('userToken');
      try {
        await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Tarefa excluída!');
        this.fetchTasks();
      } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
      }
    },
  },
};
</script>


<style scoped>
.task-manager {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

input,
textarea,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #218838;
}

.task-list {
  margin-top: 20px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #fff;
}

.delete-btn {
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>