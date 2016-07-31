var hx = require('hxdx').hx

module.exports = function (state) {

  var style = {
    list: {
      width: '60%'
    },
    dataset: {
      backgroundColor: 'rgb(235,235,235)',
      paddingLeft: '5px',
      paddingRight: '5px',
      marginLeft: '5px',
      marginRight: '5px',
      marginBottom: '5px',
      display: 'inline-block'
    },
    datasetInline: {
      backgroundColor: 'rgb(235,235,235)',
      paddingLeft: '5px',
      paddingRight: '5px',
      marginLeft: '5px',
      marginRight: '5px',
      display: 'inline-block'
    }
  }

  function training () {
    var ids = ['00.00', '00.01','01.00', '01.01']
    return ids.map(function (id) {
      return hx`<span style=${style.dataset}><a href=${'https://s3.amazonaws.com/neuro.datasets/challenges/spikefinder/spikefinder.' + id + '.zip'}>${id}</a></span>`
    })
  }

  function testing () {
    var ids = ['00.00.test', '00.01.test','01.00.test', '01.01.test','all.test']
    return ids.map(function (id) {
      return hx`<span style=${style.dataset}><a href=${'https://s3.amazonaws.com/neuro.datasets/challenges/spikefinder/spikefinder.' + id + '.zip'}>${id}</a></span>`
    })
  }

  return hx`<div>
    <div>
      Data has been generously provided by LIST NAMES OF LABS.
    </div>
    <br>
    <div>
      Each dataset is available as a zip file, and includes DESCRIBE DATA FORMAT, metadata, and code for loading the data in python, and matlab. The code examples are also on <a href='https://github.com/codeneuro/spikefinder-datasets'>github</a>. ANY FURTHER DATA DESCRIPTION Labels are provided only for training data.
    </div>
    <br>
    <div>
      EXPLANATION OF HOW GROUND TRUTH LABELS WERE OBTAINED
    </div>
    <br>
    <div>
      Training datasets (including labels) POINT TO REAL DATA
    </div>
    <br>
    <div style=${style.list}>${training()}</div>
    <br>
    <div>
      Testing datasets (no labels) POINT TO REAL DATA
    </div>
    <br>
    <div style=${style.list}>${testing()}</div>
  </div>`
}