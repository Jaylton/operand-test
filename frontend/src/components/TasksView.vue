<template>
	<div class="task-manager">
		<h1>Minhas Tarefas</h1>

		<form class="task-form" @submit.prevent="submitTask">
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

			<button class="submit-btn" type="submit">
				{{ isEditing ? 'Salvar Alterações' : 'Criar Tarefa' }}
			</button>

			<button v-if="isEditing" class="cancel-btn" @click="cancelEdit">
				Cancelar Edição
			</button>
		</form>

		<div v-if="tasks.length" class="task-list">
			<h2>Suas Tarefas</h2>
			<ul>
				<li v-for="task in tasks" :key="task.id" class="task-item">
					<span>{{ task.title }} - {{ statusMap[task.status] }}</span>
					<button class="edit-btn" @click="editTask(task)">Editar</button>
					<button class="delete-btn" @click="deleteTask(task.id)">Deletar</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import taskService from '@/services/taskService.js';

export default {
	data() {
		return {
			tasks: [],
			title: '',
			description: '',
			status: 'pending',
			isEditing: false,
			taskIdToEdit: null,
			statusMap: {
				pending: 'Pendente',
				'in-progress': 'Em Progresso',
				completed: 'Concluída',
			}
		};
	},
	async mounted() {
		await this.fetchTasks();
	},
	methods: {
		async submitTask() {
			try {
				if (this.isEditing) {
					await taskService.updateTask(this.taskIdToEdit, {
						title: this.title,
						description: this.description,
						status: this.status,
					});
					alert('Tarefa atualizada com sucesso!');
				} else {
					await taskService.createTask({
						title: this.title,
						description: this.description,
						status: this.status,
					});
					alert('Tarefa criada com sucesso!');
				}

				this.resetForm();
				this.fetchTasks();
			} catch (error) {
				console.error('Erro ao enviar tarefa:', error);
			}
		},
		async fetchTasks() {
			try {
				const data = await taskService.fetchTasks();

				this.tasks = data;
			} catch (error) {
				console.error('Erro ao buscar tarefas:', error);
			}
		},
		async deleteTask(taskId) {
			try {
				await taskService.deleteTask(taskId);
				alert('Tarefa excluída!');
				this.fetchTasks();
			} catch (error) {
				console.error('Erro ao excluir tarefa:', error);
			}
		},
		editTask(task) {
			this.title = task.title;
			this.description = task.description;
			this.status = task.status;
			this.isEditing = true;
			this.taskIdToEdit = task.id;
		},
		cancelEdit() {
			this.resetForm();
		},
		resetForm() {
			this.title = '';
			this.description = '';
			this.status = 'pending';
			this.isEditing = false;
			this.taskIdToEdit = null;
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

.cancel-btn,
.delete-btn {
	padding: 5px 10px;
	background-color: #dc3545;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.cancel-btn:hover,
.delete-btn:hover {
	background-color: #c82333;
}

.edit-btn {
	padding: 5px 10px;
	background-color: #1c66dd;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

.edit-btn:hover {
	background-color: #134c8a;
}
</style>