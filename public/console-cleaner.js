// Console cleaner para erros de extensões de carteira
(function() {
  const originalError = console.error;
  const originalWarn = console.warn;
  
  console.error = function(...args) {
    const message = args.join(' ');
    
    // Ignorar erros específicos de carteiras e extensões
    if (
      message.includes('Cannot assign to read only property \'ethereum\'') ||
      message.includes('MetaMask encountered an error') ||
      message.includes('TronWeb is already initiated') ||
      message.includes('TronLink will overwrite') ||
      message.includes('Source map failed to load') ||
      message.includes('chrome-extension://') ||
      message.includes('ethereum.js.map') ||
      message.includes('ERR_BLOCKED_BY_CLIENT')
    ) {
      return; // Não exibir esses erros
    }
    
    // Exibir outros erros normalmente
    originalError.apply(console, args);
  };
  
  console.warn = function(...args) {
    const message = args.join(' ');
    
    // Ignorar warnings de extensões
    if (
      message.includes('Source map failed to load') ||
      message.includes('chrome-extension://') ||
      message.includes('ethereum.js.map')
    ) {
      return;
    }
    
    // Exibir outros warnings normalmente
    originalWarn.apply(console, args);
  };
})();
