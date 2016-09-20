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

  return hx`<div>
  <div>
    The data are simultaneously measured calcium traces and spike trains, and cover a range of applications, including different calcium indicators (GCamp6s, rGECO, OGB), different circuits (V1, retina), and different scanning technologies (AOD, galvo, resonant). Spike trains were obtained by performing single cell electrophysiological recordings simultaneous with imaging. 
  </div>
	<br>
  Dataset download links
  <br>
  <div style='margin-top: 8px'>
    <span style=${style.dataset}><a href=${'https://s3.amazonaws.com/neuro.datasets/challenges/spikefinder/spikefinder.training.zip'}>01-09 training data</a></span>
  </div>
  <div>
    <span style=${style.dataset}><a href=${'https://s3.amazonaws.com/neuro.datasets/challenges/spikefinder/spikefinder.testing.zip'}>01-05 testing data</a></span>
  </div>
  <br>
	<div>
    For each training dataset there is a CSV file named 'calciium' with calcium flouresence signals, and a CSV file named 'spikes' with spike rates. For test datasets, there are only calcium files. The columns of each table are neurons, and the rows are time points. In a given dataset, some neurons will have slightly different numbers of time points than others, this is expected. 
  </div>
  <br>
  <div>
    Calcium and spiking data has been resampled to a common sampling rate of 100 Hz, and linear trends were removed from calcium traces using robust regression (see <a href="http://linkinghub.elsevier.com/retrieve/pii/S0896627316300733">Theis et al. 2016</a> for details of preprocessing). Along with the data itself, each download includes example loading scripts in python and matlab, the source code of which is in this reposistory. The code examples are also on <a href='https://github.com/codeneuro/spikefinder-datasets'>github</a>. 
  </div>
  <br>
  <div>
    Dataset info
  </div>
  <div style='margin-top: 8px'>
    <span style=${style.dataset}>01</span> training + testing
    <br>
    <span style=${style.dataset}>02</span> training + testing
    <br>
    <span style=${style.dataset}>03</span> training + testing
    <br>
    <span style=${style.dataset}>04</span> training + testing
    <br>
    <span style=${style.dataset}>05</span> training + testing
    <br>
    <span style=${style.dataset}>06</span> training only
    <br>
    <span style=${style.dataset}>07</span> trianing only
    <br>
    <span style=${style.dataset}>08</span> training only
    <br>
    <span style=${style.dataset}>09</span> training only
  </div>
  </div>`
}