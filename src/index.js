const ReactDOM = require('react-dom')
const ReactDOMServer = require('react-dom/server')

exports.render = (rootComponent, domElement) => {
  if (navigator.userAgent.match(/Node\.js/i)) {
    domElement.innerHTML = ReactDOMServer.renderToString(rootComponent)
  } else {
    ReactDOM.render(rootComponent, domElement)
  }
}
