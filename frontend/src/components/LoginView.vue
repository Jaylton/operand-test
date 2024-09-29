<template>
    <div class="auth-container">
        <div class="auth-box">
            <h2>Login</h2>
            <form @submit.prevent="loginUser">
                <input v-model="email" type="email" placeholder="Email" class="input-field" required />
                <input v-model="password" type="password" placeholder="Senha" class="input-field" required />
                <button type="submit" class="auth-button">Entrar</button>
            </form>
            <p class="auth-footer">
                Não tem uma conta? <router-link to="/signup">Cadastre-se</router-link>
            </p>
        </div>
    </div>
</template>

<script>

import { signIn } from "../firebase";

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async loginUser() {
            try {
                const userCredential = await signIn(this.email, this.password);
                const token = await userCredential.user.getIdToken();

                // Armazene o token no localStorage e redirecione para a página de tarefas
                localStorage.setItem('userToken', token);
                this.$router.push('/tasks');
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Falha no login. Verifique suas credenciais.');
            }
        },
    },
};
</script>


<style scoped>
.auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.auth-box {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 300px;
}

h2 {
    margin-bottom: 20px;
    color: #333;
}

.input-field {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 4px;
    border: 1px solid #ddd;
    box-sizing: border-box;
}

.input-field:focus {
    outline: none;
    border-color: #007bff;
}

.auth-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.auth-button:hover {
    background-color: #0056b3;
}

.auth-footer {
    margin-top: 15px;
    font-size: 14px;
}

.auth-footer a {
    color: #007bff;
    text-decoration: none;
}

.auth-footer a:hover {
    text-decoration: underline;
}
</style>