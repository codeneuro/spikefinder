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
		Over the last two decades, calcium <a href='https://en.wikipedia.org/wiki/Calcium_imaging'>imaging</a> has become a dominant technique in modern neuroscience for measuring the activity of large populations of neurons. A calcium indicator such as the synthetic dye Oregon green BAPTA-1 or the genetically encoded GCaMP-reporters is used to image a large fraction of cells in a neural tissue. Individual action potentials are associated with a fast rise in fluorescence, followed by a slow decay with a time constant of typically hundreds of milliseconds. Therefore, the measured fluorescence signal is only an indirect measure of neuronal spiking activity. How to best identify the timing of individual spiking events from flouresence time courses remains an open problem.
    </div>
	<br>
    <div>
		<b>Here is the challenge</b>: We have assembled a collection of datasets of simultaneously measured calcium traces and action potentials (ground truth) for benchmarking algorithms. You can download the data, develop your algorithm in the language of your choice, and submit a file to this website with your results. The leaderboard will rank algorithm performance across datasets. We will close submissions on X.X.2017.
		
    </div>
    
    <br>
    <div>
		<b>What's in it for you</b>: 
			<ul>
				<li>You get to advance the field and do a servive to the community.</li>
				<li>The best three algorithms will receive an award, kindly sponspored by <a href="">Zeiss AG</a>. The winner will receive 1200€, the second place 500€ and the third place 300€.</li>
				<li>We will compile a review paper detailing the advances made and reviewing the current state in spike inference for calcium imaging. It will feature the top five entries and include you as co-authors. </li>  
		
    </div>
    <br>
    <div>
        See the 'download' and 'submit' tabs to get started. 
	  
	  If you have any problems you can open an issue on <a href='https://github.com/codeneuro/spikefinder'>github</a> or come talk to us in the <a href='https://gitter.im/codeneuro/spikefinder'>chatroom</a>!
    </div>
	
	<br>
    <div>
        <a href="http://www.berenslab.org" target=_blank>Philipp Berens (University of Tübingen)</a>
		<a href="http://thefreemanlab.com" target=_blank>Jeremy Freeman (Janelia Research Campus)
		<a href="http://www.bethgelab.org" target=_blank>Matthias Bethge (University of Tübingen)
		<a href="http://www.jovo.me" target=_blank>Joshua Vogelstein (Johns Hopkins)
		<a href="" target=_blank>Lucas Theis (Magic Pony Technology / Twitter)
		
    </div>
	
	
	
	
	
	
  </div>`
}