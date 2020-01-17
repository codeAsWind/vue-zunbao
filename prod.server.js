var express = require('express')
var compression = require('compression')
// var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || 9000

var app = express()

let apiRouter = express.Router()
let fs = require('fs')
apiRouter.route('/:apiName').all((req, res) => {
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) throw err
    data = JSON.parse(data)
    if (data[req.params.apiName]) {
      res.json(data[req.params.apiName])
    } else {
      res.send('no such api name')
    }
  })
})
app.use('/api', apiRouter)

app.use(compression())

app.use(express.static('../dist'))


module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})