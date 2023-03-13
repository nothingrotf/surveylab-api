module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '5.1.0',
      skipMD5: true
    },
    autoStart: false
  }
}
