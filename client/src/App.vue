<template>
  <TopMenu />
  <SidebarMenu />
  <div class="content">
    <ContractInput />
  </div>
</template>

<script>
import SidebarMenu from './components/SidebarMenu.vue'
import ContractInput from './components/ContractInput.vue'
import TopMenu from './components/TopMenu.vue'

export default {
  name: 'App',
  components: {
    SidebarMenu,
    ContractInput,
    TopMenu
  }
}
</script>

<style>
body,
html {
  margin: 0;
  min-height: 100%;
  overflow: auto;
}

body {
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #1e1e2f;
  min-height: 100%;
}

.content {
  margin-left: 270px;
  margin-top: 22px;
  width: calc(100vw - 285px)
}
</style>
