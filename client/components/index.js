var hx = require('hxdx').hx
var dx = require('hxdx').dx

var panels = require('./panels')
var results = require('./results')

module.exports = function (state) {
  var style = {
    main: {
      width: (window.innerWidth > 1200) ? '60%' : '70%',
      marginLeft: (window.innerWidth > 1200) ? '20%' : '15%',
      marginRight: (window.innerWidth > 1200) ? '20%' : '15%'
    },
    header: {
      width: '80%',
      marginLeft: '10%',
      marginRight: '10%',
      textAlign: 'center',
      marginBottom: '7%',
      paddingTop: '7%',
      height: '75px'
    },
    tabs: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    tab: {
      display: 'inline-block',
      border: 'solid 3px rgb(242, 112, 108)',
      color: 'rgb(242, 112, 108)',
      width: '30%',
      fontSize: '175%',
      textAlign: 'center',
      cursor: 'pointer',
      paddingLeft: '0.5%',
      paddingRight: '0.5%',
      paddingLeft: '6px',
      paddingTop: '8px',
      paddingBottom: '10px',
      borderRadius: '2px'
    },
    logo: {
      width: '475px'
    },
    footer: {
      marginTop: '50px',
      color: 'rgb(100,100,100)',
      fontSize: '150%',
      textAlign: 'center',
      paddingBottom: '50px'
    }
  }

  Array('download-tab', 'submit-tab', 'about-tab').forEach(function (item) {
    style[item] = Object.assign({}, style.tab, {
      backgroundColor: backgroundColor(item),
      color: color(item)
    })
  })

  function color (name) {
    if (name === state.tab) return 'white'
    else return 'rgb(242, 112, 108)'
  }

  function backgroundColor (name) {
    if (name === state.tab) return 'rgb(242, 112, 108)'
    else return 'white'
  }

  function onclick (e) {
    console.log(e.target.id)
    if (state.tab === e.target.id) dx({ type: 'DESELECT_TAB' })
    else dx({ type: 'SELECT_TAB', value: e.target.id })
  }

  var logo = hx`
  <div style=${style.header}>
    <img style=${style.logo} src='./components/assets/images/logo.svg'></img>
  </div>`

  var tabs = hx`
  <div style=${style.tabs}>
    <div id='about-tab' className='tab' style=${style['about-tab']} onclick=${onclick}>about</div>
    <div id='download-tab' className='tab' style=${style['download-tab']} onclick=${onclick}>download data</div>
    <div id='submit-tab' className='tab' style=${style['submit-tab']} onclick=${onclick}>submit results</div>
  </div>`

  return hx`
    <div style=${style.main}>
      ${logo}
      ${tabs}
      ${panels(state.tab)}
      ${results(state.results)}
      <div style=${style.footer}>questions? see the <a href='https://github.com/codeneuro/spikefinder'>code</a>, join the <a href='https://gitter.im/codeneuro/spikefinder'>chat</a></div>
    </div>`
}