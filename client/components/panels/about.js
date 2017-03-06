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
		  Calcium <a href='https://en.wikipedia.org/wiki/Calcium_imaging'>imaging</a> is a dominant technique in modern neuroscience for measuring the activity of large populations of neurons. But measured calcium flouresence is an indirect measure of neuronal spiking — action potentials are associated with a fast rise in calcium fluorescence, followed by a slow decay with a time constant of hundreds of milliseconds. It remains an open problem how to infer spike times from flouresence data.
    </div>
    <br>
    <img style=${{width: '350px'}} src='./components/assets/images/2p.png'>
    <br>
    <br>
    <div>
		  We have assembled a collection of datasets with simultaneously measured calcium traces and action potentials (ground truth) for benchmarking spike inference algorithms. You can download the data, develop your algorithm in the language of your choice, and submit a file to this website with your results. The leaderboard will rank algorithm performance across datasets. We will close submissions on 30th of April 2017 (new deadline!).
    </div>
    <br>
    <div>
      By participating, you get to advance the field and help the neuroscience community! The best algorithms will also receive an award, kindly sponspored by <a href="http://www.zeiss.com/corporate/en_de/careers.html">Carl Zeiss AG</a>. The winning team will receive 1200€, the second place 500€ and the third place 300€. The winner will also be invited to visit the Zeiss AG research departement in Germany. We will report on the challenge in an article featuring any algorithms that beat current state of the art (STM/oopsi).
    </div>
    <br>
    <div>
      See the 'download' and 'submit' tabs to get started. If you have any problems you can open an issue on <a href='https://github.com/codeneuro/spikefinder'>github</a> or come talk to us in the <a href='https://gitter.im/codeneuro/spikefinder'>chatroom</a>!
    </div>
    <br>
    <div>Organized by <a href="http://www.berenslab.org" target=_blank>Philipp Berens</a>, <a href="http://thefreemanlab.com" target=_blank>Jeremy Freeman</a>, <a href="http://www.bethgelab.org" target=_blank>Matthias Bethge</a>, <a href="http://www.jovo.me" target=_blank>Joshua Vogelstein</a>, <a href="http://www.toliaslab.org" target=_blank>Andreas Tolias</a>, <a href="http://www.eulerlab.org" target=_blank>Thomas Euler</a>, <a href="" target=_blank>Lucas Theis</a>, and many community contributiors!
    </div>
    <br>
    <div style=${{textAlign: 'right'}}>Award sponsored by Zeiss<a href="http://www.zeiss.com/corporate/en_de/careers.html" target=_blank><img style='margin-top: 10px; margin-left: 15px' src="./components/assets/images/zeiss.logo.png"></img></a>
    </div>
  </div>`
}