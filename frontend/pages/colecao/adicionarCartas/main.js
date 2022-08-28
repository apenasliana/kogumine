async function addCarta(){
    const Usuario = JSON.parse(localStorage.getItem('Usuario'))
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

    const scryfall = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${nomeDaCarta}`)



    return await scryfall.json()
   
}

document.getElementById("qtdCarta").value = 1
