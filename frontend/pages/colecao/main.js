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

//atualizar com react
function mostrarColecao(data){
    const listItem = document.createElement("li")
    const listNome = document.createElement("p")
    const listRaridade = document.createElement("p")
    const listPreco = document.createElement("p")
    const listQtdCarta = document.createElement("p")



    const deleteButton = document.createElement("button")
    const addButton = document.createElement("button")
    const removeButton = document.createElement("button")


    
    const listaDeCartas = document.getElementById("listaDeCartas")

    listNome.innerText = "Carta: " + data.nome
    listRaridade.innerText = "Raridade: " + data.raridade
    listPreco.innerText = "USD:" + data.preco
    listQtdCarta.innerText = "Quantidade: "+ data.qtdCarta
    listItem.classList.add("list-item")


    deleteButton.innerText = "X"
    deleteButton.onclick = function (){
        deletarCarta(data)
    }


    addButton.innerText = "+1"
    addButton.onclick = function (){
        incrementarCarta(data)
    }


    removeButton.innerText = "-1"
    removeButton.onclick =  function (){
        decrementarCarta(data)
    }



    listItem.append(listNome,listRaridade,listPreco,listQtdCarta,deleteButton,addButton,removeButton)
    listaDeCartas.append(listItem)
    
    
}


async function decrementarCarta(data){
    const dadosUsuario = JSON.parse(localStorage.getItem('Usuario'))


    await fetch(`http://localhost:3000/colecao/${dadosUsuario.idColecao}/carta/${data.id}`,{method:"DELETE",headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'}})

    // document.location.reload()
}
async function incrementarCarta(data){
    const dadosUsuario = JSON.parse(localStorage.getItem('Usuario'))


    await fetch(`http://localhost:3000/colecao/${dadosUsuario.idColecao}/carta/${data.id}`,{method:"PATCH",headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'}})

    // document.location.reload()
}

async function deletarCarta(data){
    const dadosUsuario = JSON.parse(localStorage.getItem('Usuario'))


    await fetch(`http://localhost:3000/colecao/${dadosUsuario.idColecao}/delcarta/${data.id}`,{method:"DELETE",headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'}})

    // document.location.reload()


}


async function getColecaoDados(){
    const Usuario = JSON.parse(localStorage.getItem('Usuario'))
    const response = await fetch(`http://localhost:3000/colecao/${Usuario.idColecao}/data`)
    const data = await response.json()


    mostrarColecaoData(data)
}

//atualizar com react
async function mostrarColecaoData(data){

    const listItem = document.createElement("li")
    const listCusto = document.createElement("p")
    const listQtdCarta = document.createElement("p")

    const listRaridade = document.createElement("p")
    const listMythic = document.createElement("p")
    const listRare = document.createElement("p")
    const listUncommon = document.createElement("p")
    const listCommon = document.createElement("p")




    const listaDeCartas = document.getElementById("dadosColecao")

    listCusto.innerText = "Custo da Coleção: $" + data[0].custoTotal
    listQtdCarta.innerText = "Quantidade de Cartas: "+ data[0].totalCards

    listRaridade.innerText = " ---- Cartas por Raridade ---- "
    listMythic.innerText = "Mythic: " + data[0].qtd_mythic
    listRare.innerText = "Rare: " + data[0].qtd_rare
    listUncommon.innerText = "Uncommon: " + data[0].qtd_uncommon
    listCommon.innerText = "Common: " + data[0].qtd_common



    listItem.classList.add("list-item")


    listItem.append(listCusto,listQtdCarta,listRaridade,listMythic,listRare, listUncommon, listCommon)
    listaDeCartas.append(listItem)

}


window.addEventListener('load', (event)=>{
    getColecao()
    getColecaoDados()
})

