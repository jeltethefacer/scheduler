const info = (...params) => {
    console.log(...params)
  }
  
  const error = (...params) => {
    const time = new Date()
    console.error(time, " ERROR:", ...params)
  }
  
  module.exports = {
    info, error
  }