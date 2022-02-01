const ModeloTabela = require('../rotas/fornecedores/ModeloTabelaFornecedor')

ModeloTabela
    .sync()
    .then(() => console.log('modelo criado com sucesso'))
    .catch(console.log('deu pau'))