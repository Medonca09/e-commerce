import { adicionarAoCarrinho } from "./menuCarrinho";
import { catalogo } from "./utilidades";

export function renderizarCatalogo(){

    for (const produtoCatalago of catalogo){
        const cartaoProduto = `<div class="border-solid w-48 m-2 flex flex-col p-2 justify-between shadow-xl shadow-zinc-400 rounded-lg group ${produtoCatalago.feminino ? 'feminino' : 'masculino'}" id="card-produto-${produtoCatalago.id}">
        <img 
        src="./assets/img/${produtoCatalago.imagem}" 
        alt="Produto 1 do Magazine Hashtag;"
        class='group-hover:scale-110 duration-300 my-3 rounded-lg'
        />
        <p class='text-sm'>${produtoCatalago.marca}</p>
        <p class='text-sm'>${produtoCatalago.nome}</p>
        <p class='text-sm text-green-700'>$${produtoCatalago.preco}</p>
        <button id='adicionar-${produtoCatalago.id}'class='bg-zinc-950 text-slate-200 hover:bg-zinc-800'><i class="fa-solid fa-cart-plus"></i></button>
        </div>`;
        
        document.getElementById("container-produto").innerHTML += cartaoProduto;
        
    }

    for (const produtoCatalago of catalogo){
        document.getElementById(`adicionar-${produtoCatalago.id}`).addEventListener('click', () => adicionarAoCarrinho(produtoCatalago.id));
    }
}

