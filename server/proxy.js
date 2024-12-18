const express = require('express')
const bodyParser = require('body-parser')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const packageDefinition = protoLoader.loadSync('notes.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})
const notesProto = grpc.loadPackageDefinition(packageDefinition).NoteService

const client = new notesProto(
  'localhost:50051',
  grpc.credentials.createInsecure()
)

app.post('/notes', (req, res) => {
  client.CreateNote(req.body, (err) => {
    if (err) res.status(500).send(err)
    else res.sendStatus(200)
  })
})

app.put('/notes/:id', (req, res) => {
  client.UpdateNote(req.body, (err) => {
    if (err) res.status(500).send(err)
    else res.sendStatus(200)
  })
})

app.delete('/notes/:id', (req, res) => {
  client.DeleteNote({ id: req.params.id }, (err) => {
    if (err) res.status(500).send(err)
    else res.sendStatus(200)
  })
})

app.get('/notes', (req, res) => {
  client.ListNotes({}, (err, response) => {
    if (err) res.status(500).send(err)
    else res.json(response.notes)
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Proxy REST running at http://localhost:${PORT}`)
})
