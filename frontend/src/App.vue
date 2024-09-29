<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Tarefas</router-link></li>
          <li><router-link v-if="!isAuthenticated" to="/login">Login</router-link></li>
          <li><router-link v-if="!isAuthenticated" to="/signup">Cadastro</router-link></li>
          <li><button v-if="isAuthenticated" @click="logout">Logout</button></li>
        </ul>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
    };
  },
  mounted() {
    this.checkAuth();
  },
  watch: {
    // Monitora mudanças na rota para atualizar o estado de autenticação
    $route() {
      this.checkAuth();
    },
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('userToken');
      this.isAuthenticated = !!token;
    },
    logout() {
      // Limpa o token de autenticação e redireciona para a página de login
      localStorage.removeItem('userToken');
      this.isAuthenticated = false;
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
header {
  background-color: #282c34;
  padding: 10px;
  color: white;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 20px;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

footer {
  text-align: center;
  padding: 20px;
  background-color: #f1f1f1;
}
</style>
