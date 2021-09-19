/*
  Filename: test.js
  Description:
    basic sanity HTTP tests to make sure the express
    server logic kinda-sorta-works. 
*/

const axios = require('axios')

const HOST = 'localhost'
const PORT = 5000
const ENDPOINT = `http://${HOST}:${PORT}`

const fakeUsers = [
  {name: 'AAA', email: 'A@A.net', password: 'AAA'},
  {name: 'BBB', email: 'B@B.org', password: 'BBB'},
  {name: 'CCC', email: 'whitehouse.gov', password: 'CH#WR'}
]

async function runTests () {
  console.log(`Running tests on ${ENDPOINT}`)


  // Check add User!
  /*
  axios ( {
    method: 'post',
    url: ENDPOINT + '/addUser',
    data: fakeUsers[2]
  }).then(res => {
    console.log(`Response should be 200: actually is ${res.status}`)
    console.log(`Response reads: ${res.data}`)
  }).catch(res => {
    console.log(res.status)
    console.log(res.data)
    console.log('fail--maybe already added?')
  })

  // Check duplicate user add!
  axios ( {
    method: 'post',
    url: ENDPOINT + '/addUser',
    data: fakeUsers[1]
  }).catch(res => {
    console.log(`Response should be 400: actually is ${res.status}`)
    console.log(`Response reads: ${res.data}`)
  })
  */
  // Check get User 
  axios ( {
    method: 'GET',
    url: ENDPOINT + '/getUser',
    data: { name: fakeUsers[0].name, password: fakeUsers[0].password }
  }).then(res => {
    console.log(`Response should be 200: actually is ${res.status}`)
    console.log(res.data)
  }).catch(err => {
    console.log(`we got an unexpected error: ${err}`)
  })

  axios({
    method: 'GET',
    url: ENDPOINT + '/getTips'
  }).then(res => {
    console.log('get tips response')
    console.log(res.data)
  })

}

runTests()