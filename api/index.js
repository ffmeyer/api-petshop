const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./Erros/NaoEncontrado')
const CampoInvalido = require('./Erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const roteador = require('./rotas/fornecedores')
const { status } = require('express/lib/response')


app.use('/api/fornecedores', roteador)

app.use((erro, requisicao, resposta, proximo ) => {
    let status = 500
    if (erro instanceof NaoEncontrado){
        status = 404
    } 
    
    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos ){
        status = 400
    }

    resposta.status(status)

    resposta.send(
        JSON.stringify({ 
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

app.listen(config.get('api.porta'), () => console.log('api rodando'))
