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
      The data provided here consists of simultaneously measured calcium traces and spike trains. They were obtained using different calcium indicators (OGB, GCamp6s), in different neural tissues (V1, retina) using different scanning technologies (AOD, galvo, resonant) and cover therefore quite a range of applications. Importantly, all cells were recorded in "population imaging" mode instead of zooming in on individual cells. For details regarding the dataset, please refer to table 1 in Theis et al. (2016).
    </div>
	<br>
    
	<div>
      Data has been recorded in the <a href="http://www.toliaslab.org" target=_blank>Andreas Tolias lab</a> (Baylor College of Medicine, Houston, USA) and the <a href="http://www.eulerlab.org" target=_blank>Euler lab</a> (University of Tübingen, Germany).
    </div>
    <br>   

    <div>
      Ground truth spike trains were obtained by performing single cell electrophysiological recordings simultaneous with the two-photon imaging. Calcium and spiking data has been resampled to a common sampling rate of 100 Hz. . 
	</div>
    <br>

	
	<div>
      Training datasets are provided with ground truth in CSV format. There are five datasets numbered 1-5. For each one there is a calcium file with calcium flouresence signals, and a spike file with spike rates. For test datasets, there is only a calcium file. <br>
	  All data has been resampled at a common rate of 100 Hz. We removed any linear trends from the calcium trace using robust regression (see Theis et al. 2016 for details of preprocessing).<br>
	  The columns of each table are neurons, and the rows are time points. In a given dataset, some neurons will have slightly different numbers of time points than others, this is expected. Along with the data itself, each download includes example loading scripts in python and matlab, the source code of which is in this reposistory. The code examples are also on <a href='https://github.com/codeneuro/spikefinder-datasets'>github</a>. 
    </div>
    
	<div>
      Training datasets (including spikes) POINT TO REAL DATA
    </div>
    <br>
    <div style=${style.list}>${training()}</div>
    <br>
    <div>
      Testing datasets (not including spikes) POINT TO REAL DATA
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