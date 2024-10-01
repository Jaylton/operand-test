# Gerenciador de Tarefas com Firebase e Vue.js 3

Esta aplicação é um gerenciador de tarefas simples desenvolvido com Vue.js 3 no frontend e Firebase (Auth e Firestore) no backend. A aplicação permite aos usuários se registrarem, fazerem login e gerenciarem suas tarefas (CRUD).

## Funcionalidades

- Autenticação de usuários usando Firebase Authentication (email e senha).
- Recuperação de senha através do Firebase.
- Gerenciamento de tarefas: criar, ler, atualizar e excluir (CRUD) tarefas pessoais.
- Tarefas associadas ao usuário autenticado.
- Interface simples com Vue.js 3 para interagir com o backend.

---

## Instruções de Instalação

### 1. Pré-requisitos

Certifique-se de que você tenha instalado:

- [Node.js](https://nodejs.org/en/download/) (versão 14.x ou superior)
- [Vue CLI](https://cli.vuejs.org/guide/installation.html)

### 2. Clonar o Repositório e Configurar o Projeto

1 - Clone o repositório localmente:
````
git clone https://github.com/Jaylton/task-manager.git
cd task-manager
````

2 - Instale as dependências do projeto:
````
cd backend
npm install
````
````
cd frontend
npm install
````

3 - Obtenha as credenciais

- Acesse o seguinte link(https://drive.google.com/drive/folders/1fbfOqyqDosSvsOcjYcnNE7K7Ivdzt2-R?usp=sharing) e baixe os arquivos .env para o frontend e firebase-service-account.json para o backend

### 3. Executar o Projeto:
````
cd backend
node index.js
````
````
cd frontend
npm run serve
````