var hx = require('hxdx').hx
var dx = require('hxdx').dx
var _ = require('lodash')
var d3 = require('d3-scale')
var meta = require('../../metadata.js')

module.exports = function (state) {

  var style = {
    box: {
      border: 'solid 3px rgb(136, 138, 140)',
      padding: '2%',
      marginBottom: '2%',
      position: 'relative',
      cursor: 'pointer',
      paddingLeft: '6px',
      borderRadius: '2px'
    },
    info: {
      display: 'inline-table',
      textAlign: 'right',
      fontSize: '125%',
      width: '26%',
      color: 'rgb(81,82,84)'
    },
    detail: {
      display: 'inline-block',
      textAlign: 'right',
      width: '26%',
      verticalAlign: 'super',
      color: 'rgb(141,144,146)',
      display: state.detail ? 'inline-block' : 'none'
    },
    field: {
      color: 'rgb(141,144,146)',
      width: '13%',
      textAlign: 'left',
      marginLeft: '1%',
      marginTop: '2%'
    },
    number: {
      marginTop: '10px',
      marginLeft: '-22px',
      position: 'absolute',
      pointerEvents: 'none'
    },
    header: {
      marginLeft: '4%',
      width: '69%',
      display: 'inline-block',
      verticalAlign: 'bottom'
    },
    matrix: {
      marginTop: '40px',
      marginLeft: '4%',
      width: '69%',
      display: state.detail ? 'inline-block' : 'none',
    },
    row: {
      width: '100%',
      display: 'inline-flex',
      justifyContent: 'space-between',
      marginBottom: '5px'
    },
    cell: {
      width: (28 / state.contents.length) + '%',
      height: '50px',
      paddingLeft: '5%',
      backgroundColor: 'rgb(100,100,100)',
      borderRadius: '2px'
    },
    icon: {
      position: 'absolute',
      display: 'inline-block',
      marginLeft: '-29px',
      marginTop: '4px'
    },
    byline: {
      fontSize: '80%',
      color: 'rgb(150,150,150)',
      paddingBottom: '5px'
    }
  }

  var scales = {
    corr: d3.scaleLinear().domain([0, 1]).range(["rgb(95, 54, 53)", "rgb(224, 104, 100)"]),
    rank: d3.scaleLinear().domain([0, 1]).range(["rgb(95, 54, 53)", "rgb(224, 104, 100)"]),
    loglik: d3.scaleLinear().domain([-1000, 10]).range(["rgb(95, 54, 53)", "rgb(224, 104, 100)"]),
    info: d3.scaleLinear().domain([-1000, 20]).range(["rgb(95, 54, 53)", "rgb(224, 104, 100)"])
  }

  function onclick () {
    if (state.detail) dx({type: 'HIDE_DETAIL', _id: state._id})
    else dx({type: 'SHOW_DETAIL', _id: state._id})
  }

  var fields = state.contents[0].scores.map(function (score) {
    return score.label
  }).filter(function (label) {return label !== 'combined'})

  function row (field) {
    var selected = state.contents.map(function (result) {
      return result.scores.filter(function (score) {
        return score.label === field
      }).map(function (score) {return {value: score.value, field: field, lab: result.lab, dataset: result.dataset}})
    })

    selected = _.sortBy(selected, function (item) {return item[0].dataset.replace('10', 'Z')})
    return selected.map(function (item) {
      var value = item[0].value.toFixed(2)
      value = value.slice(0, 4)
      var cell = Object.assign({}, style.cell, {backgroundColor: scales[field](value)})
      return hx`<div data-info=${item[0]} style=${cell} onmouseover=${onmouseover} onmouseout=${onmouseout}>
        <span style=${style.number}>${value}</span>
      </div>`
    }).concat([hx`<span style=${style.field}>${state.detail ? field : ''}</span>`])
  }

  function header () {
    return hx`<div style=${style.row}>${row('corr')}</div>`
  }

  function matrix () {
    return Array('rank', 'info', 'loglik').map(function (field) {
      return hx`<div style=${style.row}>${row(field)}</div>`
    })
  }

  var timeout

  function onmouseover (e) {
    clearTimeout(timeout)
    var target = e.target || e.srcElement
    var info = target['data-info']
    dx({type: 'SET_INFO', _id: state._id, info: info})
  }

  function onmouseout (e) {
    timeout = setTimeout(function () {
      dx({type: 'REMOVE_INFO', _id: state._id})
    }, 50)
  }

  function detail () {
    if (state.info) {
      var info = meta[state.info.dataset]
      return hx`<div><div>dataset ${info.display}</div><div>${info.indicator} in ${info.area}</div><div>${info.source}</div></div>`
    }
    else return hx`<div><div>mouse over</div><div>for dataset info</div></div>`
  }

  function contact (value) {
    if (value.indexOf('@') === 0) return 'https://github.com/' + value.replace('@', '')
    else if (value.indexOf('@') > 0) return 'mailto:' + value
    else if (value.indexOf('http') === 0) return value
    else return 'https://github.com/' + value
  }

  function repository (value) {
    if (value.indexOf('http') === 0) return value
    else if (value.indexOf('github.com') === 0) return 'https://' + value
    else return value
  }

  function link (href) {
    if (state.detail && href !== '') return hx`
    <a onclick=${clickLink} href=${href}>
      <img className='link-icon' width=25 height=25 style=${style.icon} src='components/assets/images/link.svg'>
    </a>`
  }

  function clickLink (e) {
    e.stopPropagation()
  }

  return hx`<div className='entry' style=${style.box} onclick=${onclick}>
    <div style=${style.info}>
      ${link(repository(state.repository))}
      <span>${state.algorithm}</span>
      <br>
      ${link(contact(state.contact))}
      <span style=${style.byline}>by ${state.name}</span>
    </div>
    <div style=${style.header}>${header()}</div>
    <div style=${style.detail}>${detail()}</div>
    <div style=${style.matrix}>${matrix()}</div>
  </div>`
}