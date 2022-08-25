function visitarAdicionarCartas(){
    window.location.href = "./adicionarCartas/adicionarCartas.html"
}
function visitarPesquisarCartas(){
    window.location.href = "./pesquisarCartas/pesquisarCartas.html"
}


async function getColecao(){
    const Usuario = JSON.parse(localStorage.getItem('Usuario'))
    const response = await fetch(`http://localhost:3000/colecao/${Usuario.idColecao}`)
    const data = await response.json()
    
    data.forEach(element => {
        mostrarColecao(element)
    });
}


function mostrarColecao(data){
    const listItem = document.createElement("li")
    const listNome = document.createElement("p")
    const listRaridade = document.createElement("p")
    const listPreco = document.createElement("p")
    const listQtdCarta = document.createElement("p")


    
    const listaDeCartas = document.getElementById("listaDeCartas")

    listNome.innerText = "Carta: " + data.nome
    listRaridade.innerText = "Raridade: " + data.raridade
    listPreco.innerText = "USD:" + data.preco
    listQtdCarta.innerText = "Quantidade: "+ data.qtdCarta
    listItem.classList.add("list-item")


    listItem.append(listNome,listRaridade,listPreco,listQtdCarta)
    listaDeCartas.append(listItem)
    
    
}



window.addEventListener('load', (event)=>{
    getColecao()
})

