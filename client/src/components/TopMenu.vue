<template>
  <div class="menu">
    <div class="logo">
      OnChainMole
    </div>
    <div class="wallet_connect">
      Connect Wallet
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans&family=Poppins:wght@300;600&display=swap');

.menu {
  width: 100%;
  height: 70px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  padding: 0 45px;
  position: fixed;
  top: 0;
  left: 0;
  background: #1F2336;
  z-index: 2;
}

.wallet_connect {
  padding: 7px 15px;
  background: rgb(70, 83, 211);
  background: linear-gradient(45deg, rgba(70, 83, 211, 1) 0%, rgba(73, 159, 206, 1) 78%);
  color: white;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
}
</style>