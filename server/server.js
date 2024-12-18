const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const fs = require('fs')
const path = require('path')

const packageDefinition = protoLoader.loadSync('notes.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})
const notesProto = grpc.loadPackageDefinition(packageDefinition).NoteService

const NOTES_FILE = path.resolve(__dirname, 'notes.json')

function loadNotes() {
  if (!fs.existsSync(NOTES_FILE)) {
    return []
  }
  return JSON.parse(fs.readFileSync(NOTES_FILE, 'utf8'))
}

function saveNotes(notes) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2))
  console.log('Nota salvas com sucesso!')
}

const notes = loadNotes()

const server = new grpc.Server()

server.addService(notesProto.service, {
  CreateNote: (call, callback) => {
    const newNote = call.request
    notes.push(newNote)
    saveNotes(notes)
    callback(null, {})
  },
  UpdateNote: (call, callback) => {
    const updatedNote = call.request
    const index = notes.findIndex((note) => note.id === updatedNote.id)
    if (index !== -1) {
      notes[index] = updatedNote
      saveNotes(notes)
      callback(null, {})
    } else {
      callback(new Error('Nota não encontrada'))
    }
  },
  DeleteNote: (call, callback) => {
    const { id } = call.request
    const index = notes.findIndex((note) => note.id === id)
    if (index !== -1) {
      notes.splice(index, 1)
      saveNotes(notes)
      callback(null, {})
    } else {
      callback(new Error('Nota não encontrada'))
    }
  },
  ListNotes: (call, callback) => {
    callback(null, { notes })
  },
})

const PORT = 50051
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`gRPC server running at http://localhost:${PORT}`)
    server.start()
  }
)
