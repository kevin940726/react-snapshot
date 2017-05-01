const path = require('path')
const fs = require('fs')
const url = require('url')
const Server = require('./Server')
const Crawler = require('./Crawler')
const Writer = require('./Writer')


const pkg = require(path.join(process.cwd(), 'package.json'))
const publicPath = pkg.homepage ? url.parse(pkg.homepage).pathname : '/'

module.exports = () => {
  const baseDir = path.resolve('./build')
  const writer = new Writer(baseDir)
  writer.move('index.html', '200.html')

  getPort(2999)
    .then(port => {
      const server = new Server(baseDir, publicPath, port)
      return server.start().then(() => new Crawler(`http://localhost:${port}${publicPath}`))
    })
    .then(crawler => crawler.crawl(({ path, html }) => {
      const filename = path === publicPath ?
        'index.html' :
        `${path}${path.endsWith('/') ? 'index' : ''}.html`
      console.log(`✏️   Saving ${path} as ${filename}`)
      writer.write(filename, html)
    }))
    .then(() => server.stop(), err => console.error(err))
}
