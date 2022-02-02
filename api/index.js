const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./Erros/NaoEncontrado')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

app.use((erro, requisicao, resposta, proximo ) => {
    if (erro instanceof NaoEncontrado){
        resposta.status(404)
    } else {
         resposta.status(400)
    }        
    resposta.send(
        JSON.stringify({ 
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

app.listen(config.get('api.porta'), () => console.log('api rodando'))
