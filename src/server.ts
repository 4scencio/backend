import express from 'express'

const app = express()
const PORT = 3333

// Method HTTP -> GET | POST | PUT | DELETE

// Routes

app.get('/users', (request, response) => {
    return response.json(['User 1', 'User 2'])
})

app.post('/user', (request, response) => {

})

app.put('/user/:id', (request, response) => {

})

app.delete('/user/:id', (request, response) => {

})

//Server 
app.listen(PORT, () => {
    console.log(`Back-end start in port ${PORT}`)
})