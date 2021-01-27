import express from 'express'

const app = express()
const PORT = 3333

// Method HTTP -> GET | POST | PUT | DELETE


//Server 
app.listen(PORT, () => {
    console.log(`Back-end start in port ${PORT}`)
})