var ReactDOM = require('react-dom')
var ReactDOMServer = require('react-dom/server')

var render = function(rootComponent, domElement) {
  if (navigator.userAgent.match(/Node\.js/i)) {
    domElement.innerHTML = ReactDOMServer.renderToString(rootComponent)
  } else {
    ReactDOM.render(rootComponent, domElement)
  }
}

module.exports = {
  render: render,
}
