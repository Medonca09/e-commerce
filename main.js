import { renderizarCatalogo } from "./src/cartaoProduto";
import { atualizarPrecoCarrinho, inicializarCarrinho, renderizarProdutoCarrinho } from "./src/menuCarrinho";

inicializarCarrinho();
renderizarCatalogo();
atualizarPrecoCarrinho();
renderizarProdutoCarrinho();