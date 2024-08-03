const plugin = new UnityTonPlugin.default({
  manifestUrl:
    "https://catb.io/tonconnect-manifest.json",
    onWalletConnected: () => {
      unityInstanceRef.SendMessage("GameElement", "OnWalletConnectSuccess", plugin.getAccount()); 
    }
});
