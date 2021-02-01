import express from 'express'
import cors from 'cors'

import {stringify, v4 as uuid} from 'uuid'

const app = express()
const PORT = 3333

//Aceitar informações req.body 
app.use(express.json())
app.use(cors({origin: '*'}))


// Method HTTP -> GET | POST | PUT | DELETE

//Banco de Dados Fictício

interface User {
    id: string,
    name: string,
    email: string
}

const users: User[] = []

// Routes
app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/user', (request, response) => {
    //Pegar as informações do usuário através do body
    const { name, email } = request.body

    //Colocar as informações dentro de uma variável e criar o ID único com UUID
    const user = {id: uuid(), name, email}

    //Passar o usuário criado pro array de users (banco de dados)
    users.push(user)

    //Retornar o array de usuários para recuperação no front-end
    response.json(user)
})

app.put('/user/:id', (request, response) => {
    //Pegar o ID e as atualizações no body
    const { id } = request.params
    const { name, email } = request.body

    //Consultar par ver se o ID passado no params retorna no array de usuários (banco de dados)
    const userIndex = users.findIndex((user) => user.id === id);

    //Passar as novas informações do usuário para a variável user
    const user = {id, name, email}

    //Verificar se o usuário existe (-1)
    if(userIndex < 0) {
        return response.status(404).json({'error': 'User not found'})
    }

    //Atualizar o usuário na base de dados
    users[userIndex] = user

    //Retornar os dados do usuário atualizado
    return response.json(user)
})

app.delete('/user/:id', (request, response) => {
    //Pegar o ID do usuário que será deletado
    const { id } = request.params

    //Localizar o usuário na base de dados
    const userIndex = users.findIndex((user) => user.id === id);

    //Se o usuário não existir, retornar um erro
    if(userIndex < 0) {
        return response.status(404).json({'error': 'User not found'})
    }

    //Excluir usuário na base de dados
    users.splice(userIndex, 1)

    //Retornar status de sucesso
    return response.status(204).json({'message': 'User successfully deleted'})

})

//Server 
app.listen(PORT, () => {
    console.log(`Back-end start in port ${PORT}`)
})