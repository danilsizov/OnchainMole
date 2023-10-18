<template>
  <div class="sidebar">
    <div class="sidebar_menu">
      <h2 class="logo">OnChainMole</h2>
      <div class="sidebar_menu_item active">
        <span>
          Yield Aggregators
        </span>
      </div>
      <div class="sidebar_menu_item soon">
        <span>
          DEX (Soon)
        </span>
      </div>
      <div class="sidebar_menu_item soon">
        <span>
          Lending Protocol (Soon)
        </span>
      </div>
      <div class="sidebar_menu_item">
        <span>
          Reports (0)
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.logo {
  font-size: 32px;
  color: white;
  font-weight: 800;
  font-family: 'Pixelify Sans';
}

.sidebar {
  height: 100vh;
  width: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  // box-shadow: 0 0 45px 0 rgba(0, 0, 0, .6);
  border-radius: 5px;
  display: block;
  background: #1F2336;
  padding: 15px 15px 0 15px;

  &::after {
    display: block;
    position: absolute;
    top: 1%;
    right: 0;
    height: 98%;
    background: #2c3148;
    content: '';
    width: 1px;
  }
}

.sidebar_menu {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  height: 100vh;
  position: relative;
  padding: 0px 10px 20px 10px;
  z-index: 3;
}

.sidebar_menu_item {
  padding: 20px 0;

  span {
    color: white;
  }

  &.soon span {
    cursor: default;
    color: #767FA1;

    &:hover {
      color: #767FA1;
    }
  }

  span {
    cursor: pointer;

    &:hover {
      color: #6D73FE;
    }
  }
}
</style>