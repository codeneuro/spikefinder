var hx = require('hxdx').hx

module.exports = function (state) {
  var style = {
    image: {
      width: '225px',
      marginRight: '15px'
    }
  }
  return hx`<div>
    <div>
      Calcium <a href='https://en.wikipedia.org/wiki/Calcium_imaging'>imaging</a> is a dominant technique in modern neuroscience for measuring the activity of large populations of neurons. But the resulting flouresence signal is only an indirect measure of neuronal spiking. How to best identify the timing of individual spiking events from flouresence time courses remains an open problem.
    </div>
    <br>
    <div>
    EXPLAIN MORE ABOUT THE PROBELM
    </div>
    <br>
    <div>
      We have assembled a collection of datasets with ground truth for benchmarking algorithms. You can download the data, develop your algorithm in the language of your choice, and submit a file to this website with your results. The leaderboard will rank algorithm performance across datasets. See the 'download' and 'submit' tabs to get started. If you have any problems you can open an issue on <a href='https://github.com/codeneuro/spikefinder'>github</a> or come talk to us in the <a href='https://gitter.im/codeneuro/spikefinder'>chatroom</a>!
    </div>
  </div>`
}