const prod = process.env.NODE_ENV === 'production'
module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
    return config
}
}