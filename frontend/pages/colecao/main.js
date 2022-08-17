async function getColecao(){
    const Usuario = JSON.parse(localStorage.getItem('Usuario'))
    const response = await fetch(`http://localhost:3000/colecao/${Usuario.idColecao}`)
    const data = await response.json()

    console.log("fData ",data)
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
async function addCarta(){
    const Usuario = JSON.parse(localStorage.getItem('Usuario'))
    const nomeDaCarta = document.getElementById("adicionarCarta").value
    const qtdCarta = document.getElementById("qtdCarta").value

    const data = await searchCard()

    const nome = data.name
    const raridade = data.rarity
    console.log(data.prices.usd)
    let preco = data.prices.usd
        if(preco == null){
            preco = 0.01
        }

    await fetch(`http://localhost:3000/colecao/${Usuario.idColecao}`,{method:"POST",headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},body:JSON.stringify({"nome": nome,"raridade": raridade, "preco":preco,"qtdCarta": qtdCarta})})

    document.location.reload()
}
async function searchCard(){

    const nomeDaCarta = document.getElementById("adicionarCarta").value.split(" ").join("+")
    console.log(nomeDaCarta)

    const scryfall = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${nomeDaCarta}`)



    return await scryfall.json()
   
}

// document.getElementById("adicionarCarta").addEventListener("change", (event)=>{
//     searchCard()
// })

document.getElementById("qtdCarta").value = 1
window.addEventListener('load', (event)=>{
    getColecao()
})

