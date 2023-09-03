import { catalogo } from "./utilidades";

const idsProdutoCarrinhoComQuantidade = {


}

function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("right-[0px]");
    document.getElementById("carrinho").classList.remove("right-[-360px]");
}

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("right-[0px]");
    document.getElementById("carrinho").classList.add("right-[-360px]");
}

export function inicializarCarrinho() {
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");

    botaoFecharCarrinho.addEventListener('click', fecharCarrinho);
    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
}

function removerDoCarrinho(idProduto){
  delete idsProdutoCarrinhoComQuantidade[idProduto];
  renderizarProdutoCarrinho();
}

function incrementarQuantidadeProduto(idProduto){
  idsProdutoCarrinhoComQuantidade[idProduto]++;
  atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto){
  if(idsProdutoCarrinhoComQuantidade[idProduto] === 1){
    removerDoCarrinho(idProduto);
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto]--;
  atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto){
  document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto){
  const produto = catalogo.find(p => p.id === idProduto);

    const containerProdutosCarrinho = 
    document.getElementById('produtos-carrinho');

    const elementoArticle = document.createElement('article');

    const articleClasses = [
     'flex',
     'bg-slate-100', 
     'rounded-lg', 
     'p-1', 
     'relative'
    ];

    for(const articleClass of articleClasses){
      elementoArticle.classList.add(articleClass)
    } 

    const cartaoProdutoCarrinho = `<button id="remover-item-${produto.id}" class="absolute top-0 right-2">
      <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-red-700"></i>
    </button>
    <img src="./assets/img/${produto.imagem}" alt="${produto.nome}" class="h-24 rounded-lg"/>
    <div class="p-2 flex flex-col justify-between">
      <P class="text-slate-900 text-xs">${produto.nome}</P>
      <p class="text-slate-400">Tamanho: M</p>
      <p class="text-green-700 text-lg">$${produto.preco}</p>
    </div>
    <div class='flex text-slate-950 items-end absolute bottom-0 right-2'>
        <button id='decrementar-produto-${produto.id}'>-</button>
        <p id='quantidade-${produto.id}' class='ml-2'>${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
        <button class='ml-2' id='incrementar-produto-${produto.id}'>+</button>
    </div>`

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  document
  .getElementById(`decrementar-produto-${produto.id}`)
  .addEventListener('click', () => decrementarQuantidadeProduto(produto.id));
  
  document
  .getElementById(`incrementar-produto-${produto.id}`)
  .addEventListener('click', () => incrementarQuantidadeProduto(produto.id));
  
  document
  .getElementById(`remover-item-${produto.id}`)
  .addEventListener('click', () => removerDoCarrinho(produto.id));
}

function renderizarProdutoCarrinho(){
  const containerProdutosCarrinho = 
    document.getElementById('produtos-carrinho');
    containerProdutosCarrinho.innerHTML = '';

    for(const idProduto in idsProdutoCarrinhoComQuantidade){
      desenharProdutoNoCarrinho(idProduto);
    }
    
}

export function adicionarAoCarrinho(idProduto) {
    if(idProduto in idsProdutoCarrinhoComQuantidade){
      incrementarQuantidadeProduto(idProduto);
      return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    desenharProdutoNoCarrinho(idProduto);
    
}