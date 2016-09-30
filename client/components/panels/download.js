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
    The data are simultaneously measured calcium traces and spike trains, and cover a range of applications, including different calcium indicators (GCaMP5, GCaMP6, jRCAMP, jRGECO, OGB), different circuits (V1, retina), and different scanning technologies (AOD, galvo, resonant). Spike trains were obtained by performing single cell electrophysiological recordings simultaneous with imaging. 
  </div>
	<br>
  <span style=${style.dataset}>DATASET DOWNLOADS</span>
  <br>
  <div style='margin-top: 8px'>
    <span style=${style.dataset}><a href=${'https://s3.amazonaws.com/neuro.datasets/challenges/spikefinder/spikefinder.training.zip'}>01-10 training data</a></span>
  </div>
  <div>
    <span style=${style.dataset}><a href=${'https://s3.amazonaws.com/neuro.datasets/challenges/spikefinder/spikefinder.testing.zip'}>01-05 testing data</a></span>
  </div>
  <br>
	<div>
    For each training dataset there is a CSV file named 'calcium' with calcium flouresence signals, and a CSV file named 'spikes' with spike rates. For test datasets, there are only calcium files. The columns of each table are neurons, and the rows are time points. In a given dataset, some neurons will have slightly different numbers of time points than others, this is expected. 
  </div>
  <br>
  <div>
    Calcium and spiking data has been resampled to a common sampling rate of 100 Hz, and linear trends were removed from calcium traces using robust regression (see <a href="http://linkinghub.elsevier.com/retrieve/pii/S0896627316300733">Theis et al. 2016</a> for details of preprocessing). Each download also includes example loading scripts in python and matlab, which can also be found on <a href='https://github.com/codeneuro/spikefinder-datasets'>github</a>. 
  </div>
  <br>
  <div>
    <span style=${style.dataset}>DATASET INFO</span>
  </div>
  <div style='margin-top: 8px'>
    <span style=${style.dataset}>01</span> OGB-1, V1, Theis et al. 2016, training + testing
    <br>
    <span style=${style.dataset}>02</span> OGB-1, V1, Theis et al. 2016, training + testing
    <br>
    <span style=${style.dataset}>03</span> GCamp6s, V1, Theis et al. 2016, training + testing
    <br>
    <span style=${style.dataset}>04</span> OGB-1, Retina, Theis et al. 2016, training + testing
    <br>
    <span style=${style.dataset}>05</span> GCamp6s, V1, Theis et al. 2016, training + testing
    <br>
    <span style=${style.dataset}>06</span> GCaMP5k, V1, Akerboom et al. 2012, training only [<a href='https://crcns.org/data-sets/methods/cai-1'>source</a>]
    <br>
    <span style=${style.dataset}>07</span> GCaMP6f, V1, Chen et al. 2013, trianing only [<a href='https://crcns.org/data-sets/methods/cai-1'>source</a>]
    <br>
    <span style=${style.dataset}>08</span> GCaMP6s, V1, Chen et al. 2013, training only [<a href='https://crcns.org/data-sets/methods/cai-2'>source</a>]
    <br>
    <span style=${style.dataset}>09</span> jRCAMP1a, V1, Dana et al. 2016, training only [<a href='https://crcns.org/data-sets/methods/cai-2'>source</a>]
    <br>
    <span style=${style.dataset}>10</span> jRGECO1a, V1, Dana et al. 2016, training only [<a href='https://crcns.org/data-sets/methods/cai-2'>source</a>]
  </div>
  </div>`
}