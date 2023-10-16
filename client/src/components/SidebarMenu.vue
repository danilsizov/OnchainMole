<template>
  <div class="sidebar">
    <div class="sidebar_menu">
      <div class="sidebar_menu_item active">Yield Aggregators</div>
      <div class="sidebar_menu_item soon">DEX (Soon)</div>
      <div class="sidebar_menu_item soon">Lending Protocol (Soon)</div>
      <div class="sidebar_menu_item">Reports (0)</div>
    </div>
  </div>
</template>

<style>
  .sidebar{
    height: calc(100vh - 90px);
    width: 230px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    box-shadow: 0 0 45px 0 rgba(0,0,0,.6);
    margin-top: 82px;
    margin-left: 20px;
    border-radius: 5px;
    display: block;
    background: linear-gradient(0deg,#389466,#42b883);
  }
  .sidebar_menu {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: left;
      color: white;
      min-height: 100%;
      max-height: calc(100vh - 705px);
      position: relative;
      padding: 0px 10px 20px 10px;
  }
  .sidebar_menu_item{
    padding: 20px 0;
  }
</style>