const modelos = [
    require('../rotas/fornecedores/ModeloTabelaFornecedor'),
    require('../rotas/fornecedores/produtos/ModeloTabelaProduto')
] 


async function criaTabelas () {
    for( let contador = 0; contador < modelos.length; contador++ ){
        const modelo = modelos[contador] 
        await modelo.sync ()        
    }
}
criaTabelas()