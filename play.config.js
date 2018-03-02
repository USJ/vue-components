module.exports = {
  entry: {
    app: 'play/app.js',
    preview: ['play/preview.js']
  },
  dist: 'dist-play',
  port: process.env.PORT || 5000,
  // compile Vue template
  templateCompiler: true,
  // no code split for 3rd party libraries
  vendor: false,
  html: [
    {
      chunks: ['app'],
      filename: 'index.html'
    },
    {
      chunks: ['preview'],
      filename: 'preview.html'
    }
  ]
}
