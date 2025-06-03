const originalConsole = {
  log: console.log,
  debug: console.debug
};

beforeEach(() => {
  console.debug = () => {};
  console.log = (message, ...args) => {
    if (message && typeof message === 'string' && 
        (message.includes('test') || message.includes('тест') || 
         message.includes('PASS') || message.includes('FAIL'))) {
      originalConsole.log(message, ...args);
    }
  };
});

afterAll(() => {
  console.log = originalConsole.log;
  console.debug = originalConsole.debug;
});
