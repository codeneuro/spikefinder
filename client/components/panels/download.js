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
      The data provided here consists of simultaneously measured calcium traces and spike trains. They were obtained using different calcium indicators (OGB, GCamp6s), in different neural tissues (V1, retina) using different scanning technologies (AOD, galvo, resonant) and cover therefore quite a range of applications. Importantly, all cells were recorded in "population imaging" mode instead of zooming in on individual cells. For details regarding the dataset, please refer to Theis et al. (2016).
    </div>
	<br>
    
	<div>
      Data has been generously provided by the <a href="http://www.toliaslab.org" target=_blank>Andreas Tolias lab</a> (Baylor College of Medicine, Houston, USA) and the <a href="http://www.eulerlab.org" target=_blank>Euler lab</a> (University of Tübingen, Germany).
    </div>
    <br>   

    <div>
      Ground truth spike trains were obtained by performing single cell electrophysiological recordings simultaneous with the two-photon imaging. Calcium and spiking data has been resampled to a common sampling rate of 100 Hz. We removed any linear trends from the calcium trace using robust regression. 
	</div>
    <br>

	
	<div>
      Each dataset is available as a zip file, and includes DESCRIBE DATA FORMAT, metadata, and code for loading the data in python, and matlab. The code examples are also on <a href='https://github.com/codeneuro/spikefinder-datasets'>github</a>. ANY FURTHER DATA DESCRIPTION Labels are provided only for training data.
    </div>
    
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
	
	<br>
    <div>
      WE COULD ADD TABLE 1 FROM THE PAPER HERE
    </div>
    <br>
	
	
	<div>
      References: <br>
	  Theis, Berens, Froudarakis, Reimer, Roman-Roson, Euler, Tolias, Bethge (2016):  Benchmarking Spike Rate Inference in Population Calcium Imaging, Neuron, <a href="http://linkinghub.elsevier.com/retrieve/pii/S0896627316300733">Link</a>
    </div>
    <br>
    
  </div>`
}