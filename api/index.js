const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./Erros/NaoEncontrado')
const CampoInvalido = require('./Erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const Serializador = require('./Serializador').SerializadorErro


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((requisicao, resposta, proximo) => {
    let formatoRequisitado = requisicao.header('Accept')

    if(formatoRequisitado === '*/*'){
        formatoRequisitado = 'application/json'
    }

    if (formatosAceitos.indexOf(formatoRequisitado) === -1)  {
        resposta.status(406)
        resposta.end()
    }

    resposta.setHeader('Content-Type',formatoRequisitado)
    proximo()
})




const roteador = require('./rotas/fornecedores')
const { status } = require('express/lib/response')
const res = require('express/lib/response')
const { SerializadorErro } = require('./Serializador')


app.use('/api/fornecedores', roteador)

app.use((erro, requisicao, resposta, proximo ) => {
    let status = 500
    if (erro instanceof NaoEncontrado){
        status = 404
    } 
    
    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos ){
        status = 400
    }

    if (erro instanceof ValorNaoSuportado ){
        status = 406
    } 
    const serializador = new SerializadorErro(
        resposta.getHeader('Content-type')
    )
    
    resposta.status(status)

    resposta.send(
        serializador.serializar({ 
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

app.listen(config.get('api.porta'), () => console.log('api rodando'))
