const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
require('firebase/auth');

// Inicializa o Firebase Admin SDK
const serviceAccount = require('./firebase-service-account.json'); // Arquivo JSON da chave privada

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://test-task-a9a26.firebaseio.com', // Substitua pelo URL do banco de dados Firebase
});

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Middleware para verificar autenticação
async function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) return res.status(403).send('Token não fornecido');

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).send('Autenticação falhou');
    }
}

// Rota de Cadastro (Signup)
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email e senha são obrigatórios');
    }

    try {
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
        });

        res.status(201).send({ message: 'Usuário criado com sucesso', userId: userRecord.uid });
    } catch (error) {
        res.status(500).send('Erro ao criar usuário: ' + error.message);
    }
});

// Rota para criar uma nova tarefa
app.post('/tasks', authenticateToken, async (req, res) => {
    const { title, description, status } = req.body;

    if (!title || !status) {
        return res.status(400).send('Dados inválidos');
    }

    const task = {
        title,
        description,
        status,
        userId: req.user.uid,
        createdAt: new Date().toISOString(),
    };

    try {
        const docRef = await db.collection('tasks').add(task);
        res.status(201).send({ id: docRef.id });
    } catch (error) {
        res.status(500).send('Erro ao criar tarefa');
    }
});

// Rota para listar as tarefas do usuário autenticado
app.get('/tasks', authenticateToken, async (req, res) => {
    try {
        const tasksSnapshot = await db.collection('tasks')
            .where('userId', '==', req.user.uid)
            .get();

        const tasks = tasksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).send('Erro ao buscar tarefas');
    }
});

// Rota para atualizar uma tarefa
app.put('/tasks/:id', authenticateToken, async (req, res) => {
    const { title, description, status } = req.body;
    const taskId = req.params.id;

    try {
        const taskRef = db.collection('tasks').doc(taskId);
        const taskSnapshot = await taskRef.get();

        if (!taskSnapshot.exists || taskSnapshot.data().userId !== req.user.uid) {
            return res.status(404).send('Tarefa não encontrada ou acesso negado');
        }

        await taskRef.update({
            title,
            description,
            status,
        });

        res.status(200).send('Tarefa atualizada');
    } catch (error) {
        res.status(500).send('Erro ao atualizar tarefa');
    }
});

// Rota para deletar uma tarefa
app.delete('/tasks/:id', authenticateToken, async (req, res) => {
    const taskId = req.params.id;

    try {
        const taskRef = db.collection('tasks').doc(taskId);
        const taskSnapshot = await taskRef.get();

        if (!taskSnapshot.exists || taskSnapshot.data().userId !== req.user.uid) {
            return res.status(404).send('Tarefa não encontrada ou acesso negado');
        }

        await taskRef.delete();
        res.status(200).send('Tarefa excluída');
    } catch (error) {
        res.status(500).send('Erro ao excluir tarefa');
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
