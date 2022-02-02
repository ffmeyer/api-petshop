const ValorNaoSuportado = require('./Erros/ValorNaoSuportado')

class Serializador {
    json(){
        return JSON.stringify(dados)
    }

    serializar (dados) {
        if (this.contentType === 'application/json') {
            return this.json(dados)
        }
        throw new ValorNaoSuportado(this.contentType)
    }
}

module.exports = Serializador