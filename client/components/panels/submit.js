var hx = require('hxdx').hx
var dx = require('hxdx').dx
var ax = require('../../reducers/actions')
var connect = require('hxdx').connect
var gh = require('parse-github-url')

function submit (state) {
  var style = {
    form: {
      width: '60%',
      display: 'inline-block',
      textAlign: 'right'
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
    input: {
      fontFamily: 'Abel',
      fontSize: '18px',
      border: 'none',
      borderBottom: 'solid 1px black',
      marginBottom: '14px',
      marginLeft: '5px',
      width: '60%'
    },
    label: {
      color: 'rgb(130,130,130)'
    },
    dropzone: {
      marginLeft: '10%',
      width: '125px',
      height: '125px',
      border: 'dotted 4px rgb(242, 112, 108)',
      display: 'inline-block',
      verticalAlign: 'bottom',
      textAlign: 'center',
      padding: '20px'
    },
    droptext: {
      fontSize: '150%',
      color: 'rgb(242, 112, 108)',
      pointerEvents: 'none'
    },
    code: {
      color: 'rgb(120,120,120)',
      fontSize: '16px'
    },
    message: {
      marginTop: '15px',
      pointerEvents: 'none'
    }
  }

  function status () {
    if (state.upload.submitting) return hx`<div className='loader loader-green'></div>`
    else if (state.upload.error) return hx`<div style=${style.message}>${state.upload.message}</div>`
    else if (state.upload.completed) return hx`<div style=${style.message}>completed!</div>`
    else return hx`<div style=${style.message}></div>`
  }

  function ondrop (event, data) {
    event.stopPropagation()
    event.preventDefault()

    dx({ type: 'UPLOAD_STARTED' })

    var failed = false
    var message = ''

    try {
      var reader = new FileReader()
      reader.onloadend = function () {
        try {
          var answers = JSON.parse(this.result)
        } catch (e) {
          failed = true
          message = 'error parsing file!'
        }
        var payload = {
          repository: document.querySelector('#repository').value,
          name: document.querySelector('#name').value,
          contact: document.querySelector('#contact').value,
          algorithm: document.querySelector('#algorithm').value,
          answers: answers
        }

        Array('name', 'contact', 'algorithm').forEach(function (field) {
          console.log(payload[field])
          if (!payload[field] || payload[field] == '') {
            failed = true
            message = 'forget a form?'
          }
        })
        if (!failed) {
          ax.submit(payload)(dx)
        } else {
          dx({ type: 'UPLOAD_ERROR', message: message })
        }
      }
      reader.readAsText(event.dataTransfer.files[0])
    } catch (err) {
      dx({ type: 'UPLOAD_ERROR', message: 'error reading file!' })
    }
    document.querySelector('#dropzone').style.border = 'dotted 4px rgb(242, 112, 108)'
  }

  function ondragover (event) {
    event.stopPropagation()    
    event.preventDefault()
  }

  function ondragenter (event) {
    document.querySelector('#dropzone').style.border = 'solid 4px rgb(242, 112, 108)'
  }

  function ondragleave (event) {
    document.querySelector('#dropzone').style.border = 'dotted 4px rgb(242, 112, 108)'
  }

  return hx`
  <div>
    <div>
      <div>
        To submit your algorithm, run it locally on the test datasets and generate CSV files with inferred spiking! 
      </div>
      <br>
      <div>The format of each CSV file should be the same as for the training data sets: columns correspond to neurons and rows are time points sampled at 100 Hz. You should submit one file for each training and testing dataset e.g. 1.train.spikes.csv, 2.train.spikes.csv, etc. and 1.test.spikes.csv, 2.test.spikes.csv, etc. In each file, each column should contain the predicted spike rate or count for the neuron in the same column in the corresponding calcium file. See <a href='https://github.com/codeneuro/spikefinder'>here</a> for examples of saving results from python or matlab, and see <a href='https://github.com/codeneuro/spikefinder-python'>here</a> for detailed info and code for the metrics used to evaluate results.
      </div>
	  <br>
      <div>The leaderboard will show multiple evaluation metrics, but the competition will be scored on pearson correlation between the true and infered spike trains resampled to 25 Hz as in Theis et al. (2016). 
  	  </div>
      
      <br>
      <div>To create a submission, fill out the form below and drag your CSV files into the well. Multiple submissions from the same group are fine. Submissions must include predictions for all trianing and testing data. We will show training set performance on the leaderboard until the official end of the challenge (January 31st, 2017) to prevent overfitting on the test set.
  	  </div>
      <br>
      <div style=${style.form}>
      	<div>
          <span style=${style.label}>submitter name</span> 
          <input id='members' style=${style.input}>
        </div>
        <div>
          <span style=${style.label}>algorithm name</span>
          <input id='algorithm' style=${style.input}>
        </div>
        <div>
          <span style=${style.label}>contact info</span>
          <input placeholder='email or github name' id='contact' style=${style.input}>
        </div>
        <div>
          <span style=${style.label}>code repository</span>
          <input placeholder='optional' id='repository' style=${style.input}>
        </div>
      </div>
    
      <div id='dropzone' ondrop=${ondrop} ondragover=${ondragover} ondragenter=${ondragenter} ondragleave=${ondragleave} style=${style.dropzone}>
        <span style=${style.droptext}>drop result files here</span>
        ${status()}
      </div>
	  <br>
	  <div> <i>Disclaimer & Terms: By submitting you agree to cooperate with us in preparing an article describing the results of this challenge, by making a complete description of your algorithm and executable code in Matlab or Python available. Included in the article will be all algorithms beating the current state of the art (STM/oopsi) and their contributors will be co-authors on the paper. We will award the price money for winning the benchmark with respect to mean pearson correlation between true and inferred spike trains at 25 HZ computed on the test set. You data will not be shared with anyone without your consent, in particular not with our sponsor.
  	  </div>
      
      
    </div>
  </div>
  `
}

module.exports = connect({ upload: 'upload' }, submit)