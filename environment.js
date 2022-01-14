module.exports = {
  development: {
    port: 4000, // assign your own port no
    mongoUri: 'mongodb://localhost/deu-event',
    logs: 'dev'
  },
  production: {
    port: 3000, // assign your own port no
    mongoUri: 'mongodb+srv://ihpwtnp:CBqcdXY9RUChVifr@deu-event.rxhlv.mongodb.net/deu-event?retryWrites=true&w=majority',
    logs: 'combined'
  }
};

