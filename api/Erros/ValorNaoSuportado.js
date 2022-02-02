class ValorNaoSuportado extends Error {
    constructor (contentType){
        super(`O tipo de conteudo '${contentType}' nao é suportado`)
        this.name = 'ValorNaoSuportado'
        this.idErro = 3
    }
}