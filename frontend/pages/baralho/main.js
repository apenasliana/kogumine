
function redirectDeck(){
    window.location.href = './criarBaralho.html'
}



async function getBaralho(){
    const Usuario = JSON.parse(localStorage.getItem('Usuario'))
    const response = await fetch(`http://localhost:3000/colecao/${Usuario.idColecao}`)
    const data = await response.json()

    console.log("fData ",data)
    data.forEach(element => {
        mostrarColecao(element)
    });
}

function mostrarBaralho(data){
    const listItem = document.createElement("li")
    const listNome = document.createElement("p")
    const listRaridade = document.createElement("p")
    const listPreco = document.createElement("p")
    const listQtdCarta = document.createElement("p")

    
    const listaDeCartas = document.getElementById("listaDeCartas")

    listNome.innerText = data.nome
    listRaridade.innerText = data.raridade
    listPreco.innerText = data.preco
    listQtdCarta.innerText = data.qtdCarta


    listItem.append(listNome,listRaridade,listPreco,listQtdCarta)
    listaDeCartas.append(listItem)
}


window.addEventListener('load', (event)=>{
    getBaralho()
})