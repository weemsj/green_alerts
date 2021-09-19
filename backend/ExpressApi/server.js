/*
  Filename: server.js
  Description: 
    Dead-simple express JSON server to store user data. 
    This was made in a few hours for a hackathon and is in no ways intended
    for *actual* production use or storing sensitive user data.
*/

const express = require("express")
const app = express()
const path = require("path")
const fs = require('fs')

const DATASTORE_FILENAME = 'datastore.json'

// even in a hackathon server under crunch time I refuse to store plaintext passwords
const HASH = (pwd) => require('crypto').createHash('md5').update(pwd).digest("hex")

app.use(express.json())

// Read JSON data from file
const dataStore = JSON.parse(fs.readFileSync(DATASTORE_FILENAME,{encoding:'utf8', flag:'r'}))

function readTips () {
  return fs.readFileSync('tips.tsv', {encoding: 'utf8', flag: 'r'})
    .replace(/\r/g, '')
    .split('\n')
    .slice(1)
    .map(ln => ln.split('\t'))
    .map((pair) => { return { category: pair[0], tip: pair[1] } })
}

// Read tip data from .tsv 
const tips = readTips()


// in case we need to reset the file
function resetFile() {
  fs.writeFileSync(DATASTORE_FILENAME, JSON.stringify({
    'users': {},
    'notifications': {}
  }))
}


// add user data (just name, password, email for now...)
app.post("/addUser", (req, res) => {

  const {name, password, email} = req.body

  if (Object.keys(dataStore.users).includes(name)) {
    return res.status(400).send('User already exists.')
  }

  // Added to database (magic!)
  dataStore.users[name] = {password: HASH(password), email}
  
  // doing a blocking file write here because I hate the 
  // cloud and I want this VM to suffer
  fs.writeFileSync(DATASTORE_FILENAME, JSON.stringify(dataStore))

  res.status(200).send('User added')
})

// Return User Data
app.get("/getUser", (req, res) => {
  const { name, password } = req.body

  if (dataStore.users[name]) {
    if (dataStore.users[name].password === HASH(password)) {
      // found user, return data
      return res.status(200).send(JSON.stringify({
        name: name,
        email: dataStore.users[name].email
      }))
    }
  }

  return res.status(400).send('User does not exist and/or bad credentials')
})

// route to obtain tip data
app.get("/getTips", (req, res) => {
  return res.status(200).send(JSON.stringify(tips))
})

const PORT = process.env.PORT || 5000
app.listen(PORT,
  () => console.log(`Server Running on Port ${PORT}`)
)