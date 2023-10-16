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
  .menu{
    width: 100%;
    height: 60px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  .logo{
    font-size: 20px;
    color: white;
    font-weight: 800;
  }
  .wallet_connect{
    padding: 7px 15px;
    background: linear-gradient(0deg,#389466,#42b883);
    color: white;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 600;
  }
</style>