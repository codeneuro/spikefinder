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
    To submit your algorithm, just run it locally on all the test datasets and generate a JSON file with the results! The format should be an EXPLAIN SUBMISSION FORMAT See <a href='https://github.com/codeneuro/spikefinder'>here</a> for examples of saving results from python or matlab, and see <a href='https://github.com/codeneuro/spikefinder-python'>here</a> for detailed info and code for the metrics used to evaluate results.
  </div>
  <br>
  <div>
  JSON STRUCTURE FOR SUBMISSION
  </div>
  <br>
  <div>
    Fill out the form below and drag your JSON file into the well. Multiple submissions from the same team are fine. Fun team names are also fine. Bonus points for including a link to a code repository!
  </div>
  <br>

  <div style=${style.form}>
    <div>
    <span style=${style.label}>team name</span> <input id='name' style=${style.input}>
    </div>
    <div>
    <span style=${style.label}>algorithm name</span> <input id='algorithm' style=${style.input}>
    </div>
    <div>
    <span style=${style.label}>contact info</span> <input placeholder='email, github name, or website' id='contact' style=${style.input}>
    </div>
    <div>
    <span style=${style.label}>code repository</span> <input placeholder='optional' id='repository' style=${style.input}>
    </div>
  </div>

  <div id='dropzone' ondrop=${ondrop} ondragover=${ondragover} ondragenter=${ondragenter} ondragleave=${ondragleave} style=${style.dropzone}>
    <span style=${style.droptext}>drop result file here</span>
    ${status()}
  </div>

  </div>
  `
}

module.exports = connect({ upload: 'upload' }, submit)