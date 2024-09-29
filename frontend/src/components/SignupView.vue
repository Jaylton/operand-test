<template>
    <div class="auth-container">
        <div class="auth-box">
            <h2>Cadastro</h2>
            <form @submit.prevent="signupUser">
                <input v-model="email" type="email" placeholder="Email" class="input-field" required />
                <input v-model="password" type="password" placeholder="Senha" class="input-field" required />
                <input v-model="confirmPassword" type="password" placeholder="Confirme a Senha" class="input-field"
                    required />
                <button type="submit" class="auth-button">Cadastrar</button>
            </form>
            <p class="auth-footer">
                Já tem uma conta? <router-link to="/login">Faça login</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import { signUp } from '../firebase';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async signupUser() {
            if (this.password !== this.confirmPassword) {
                alert('As senhas não conferem. Tente novamente.');
                return;
            }
            try {
                console.log('signUp :>> ', signUp);
                await signUp(this.email, this.password);
                alert('Usuário cadastrado com sucesso!');
                this.$router.push('/login');
            } catch (error) {
                console.error('Erro ao cadastrar usuário:', error);
                alert('Falha ao cadastrar. Tente novamente.');
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
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.auth-button:hover {
    background-color: #218838;
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