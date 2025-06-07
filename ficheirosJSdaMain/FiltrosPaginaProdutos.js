/*
    Este ficheiro JavaScript vai buscar o elemento HTML com id "opcoes" e altera quando se escolhe uma opção das existentes
    Quando uma das opcoes escolhidas tiver valor "3d", a pagina apenas irá mostrar os produtos que possuam o dataset "3d",
    quando se seleciona qualquer outra opção irão aparecer todos os produtos outra vez 
*/

document.getElementById("opcoes").addEventListener('change',function(){
    const opcaoSelecionada = this.value;
    const produtosGrelha = document.querySelector(".produtosGrelha");
    const produtos = Array.from(produtosGrelha.children);

    if(opcaoSelecionada === '3d'){
        produtos.forEach(produto => {
            if(produto.dataset['3d'] === 'true'){
                produto.style.display = 'block';
            }else{
                produto.style.display = 'none';
            }
        });
        return ;
    }

    produtos.forEach(produto => (produto.style.display = 'block'));

    produtos.forEach(produto => produtosGrelha.appendChild(produto));
});