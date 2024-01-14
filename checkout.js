import { desenharProdutoNoCarrinhoSimples, lerLocalStorage, apagarDoLocalStorage, salvarLocalStorage } from './src/utilidades';

function desenharProdutosChekout(){
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    for( const idProduto in idsProdutoCarrinhoComQuantidade ){
        desenharProdutoNoCarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutoCarrinhoComQuantidade[idProduto]);
    }
}

function finalizarCompra(evento){
    evento.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0){
        return;
    }
    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade
    }
    const historicoDePedidos = lerLocalStorage('historico') ?? [];
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

    salvarLocalStorage('historico', historicoDePedidosAtualizado);
    apagarDoLocalStorage('carrinho');
    
    window.location.href = window.location.origin + "/pedidos.html";
}

desenharProdutosChekout();

document.addEventListener('submit', (evt) => finalizarCompra(evt));