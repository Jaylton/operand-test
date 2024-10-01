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
            <p class="auth-footer">
                Esqueceu sua senha? <a @click="showPasswordReset">Recuperar Senha</a>
            </p>
        </div>
    </div>

    <!-- Modal para recuperação de senha -->
    <div v-if="showResetModal" class="modal-overlay">
        <div class="modal-box">
            <h3>Recuperar Senha</h3>
            <form @submit.prevent="resetPassword">
                <input v-model="resetEmail" type="email" placeholder="Digite seu email" class="input-field" required />
                <button type="submit" class="auth-button">Enviar email de recuperação</button>
            </form>
            <button class="close-button" @click="closeResetModal">Fechar</button>
        </div>
    </div>
</template>

<script>

import { signIn, passwordResetEmail } from "../firebase";

export default {
    data() {
        return {
            email: '',
            password: '',
            showResetModal: false
        };
    },
    methods: {
        // Função para fazer login
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
        // Função para exibir o modal de recuperação de senha
        showPasswordReset() {
            this.showResetModal = true;
        },
        // Função para fechar o modal de recuperação de senha
        closeResetModal() {
            this.showResetModal = false;
        },
        // Função para enviar o email de recuperação de senha
        async resetPassword() {
            try {
                await passwordResetEmail(this.resetEmail);
                alert('Email de recuperação enviado. Verifique sua caixa de entrada.');
                this.closeResetModal(); // Fecha o modal após enviar o email
            } catch (error) {
                console.error('Erro ao enviar email de recuperação:', error);
                alert('Falha ao enviar o email de recuperação. Verifique se o email está correto.');
            }
        }
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

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-box {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
}

.input-field {
    margin-bottom: 15px;
    padding: 10px;
    width: 100%;
}

.auth-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

.close-button {
    margin-top: 5px;
    padding: 10px 20px;
    background-color: #dc3545;
    width: 100%;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.close-button:hover {
    background-color: #c82333;
}
</style>