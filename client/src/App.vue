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
  width: 100%;
}

body {
  height: 100vh;
  padding-top: 70px;
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #1F2336;
  min-height: 100%;
  padding-top: 15px;
}

.content {
  margin-left: 270px;
  width: calc(100vw - 285px)
}
</style>
