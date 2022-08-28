async function searchId(){
    const dadosUsuario = JSON.parse(localStorage.getItem('Usuario'))
    const data = await searchCard()
    //console.log(data)


    const nome = data.name

    const resposta  = await fetch(`http://localhost:3000/colecao/${dadosUsuario.idColecao}/carta?nome=${nome}`,{method:"GET",headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'}})

    const arrayCartas = await resposta.json()

    return mostrarPesquisa(arrayCartas[0])
    // arrayCartas.forEach(element => {
    //     return mostrarPesquisa(element)
    // });
}


async function searchCard(){

    const nomeDaCarta = document.getElementById("pesquisarCarta").value.split(" ").join("+")
    // console.log(nomeDaCarta)

    const scryfall = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${nomeDaCarta}`)



    return await scryfall.json()
 
}


function mostrarPesquisa(data){
    
    
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



    listItem.classList.add("list-item")


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





// async function getCartaColecao(){
//     const Usuario = JSON.parse(localStorage.getItem('Usuario'))
//     const response = await fetch(`http://localhost:3000/colecao/${Usuario.idColecao}/carta`)
//     const data = await response.json()

//     console.log("fData ",data)
//     data.forEach(element => {
//         mostrarColecao(element)
//     });
// }


// function mostrarColecao(data){
//     const listItem = document.createElement("li")
//     const listNome = document.createElement("p")
//     const listRaridade = document.createElement("p")
//     const listPreco = document.createElement("p")
//     const listQtdCarta = document.createElement("p")


    
//     const listaDeCartas = document.getElementById("listaDeCartas")

//     listNome.innerText = "Carta: " + data.nome
//     listRaridade.innerText = "Raridade: " + data.raridade
//     listPreco.innerText = "USD:" + data.preco
//     listQtdCarta.innerText = "Quantidade: "+ data.qtdCarta
//     listItem.classList.add("list-item")


//     listItem.append(listNome,listRaridade,listPreco,listQtdCarta)
//     listaDeCartas.append(listItem)
    
    
// }



// window.addEventListener('load', (event)=>{
//     getCartaColecao()
// })