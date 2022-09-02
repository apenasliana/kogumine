const listaDeCartas = []

async function addCarta() {
  const qtdCarta = document.getElementById('qtdCarta').value

  const data = await searchCard()
  // console.log(data.prices.usd)
  let novoPreco = data.prices.usd
  if (novoPreco == null) {
    novoPreco = 0.01
  }

  inserirNaLista(
    data.name,
    data.rarity,
    parseFloat(novoPreco),
    parseInt(qtdCarta)
  )

  // console.log(listaDeCartas)

  // await fetch(`http://localhost:3000/colecao/${Usuario.idColecao}`, {
  //   method: 'POST',
  //   headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     nome: nome,
  //     raridade: raridade,
  //     preco: preco,
  //     qtdCarta: qtdCarta
  //   })
  // })
}

async function inserirNaLista(nome, raridade, preco, qtdCarta) {
  const found = listaDeCartas.findIndex(element => element.nome === nome)
  if (found >= 0) {
    listaDeCartas[found].qtdCarta += qtdCarta
    listaDeCartas[found].preco = preco
  } else {
    listaDeCartas.push({
      nome: nome,
      raridade: raridade,
      preco: preco,
      qtdCarta: qtdCarta
    })
  }
  cardsInDeck(listaDeCartas[listaDeCartas.length - 1])
}
async function searchCard() {
  const nomeDaCarta = document
    .getElementById('adicionarCarta')
    .value.split(' ')
    .join('+')

  const scryfall = await fetch(
    `https://api.scryfall.com/cards/named?fuzzy=${nomeDaCarta}`
  )

  return await scryfall.json()
}

function cardsInDeck(cartaAdicionada) {
  const nomeId = cartaAdicionada.nome.split(' ')

  // if (document.getElementsByClassName(`${nomeClass[0]}`)) {
  //   const elementoExiste = document.getElementsByClassName(`${nomeClass[0]}`)
  //   console.log(elementoExiste)
  //   elementoExiste.remove()
  // }
  const listNome = document.createElement('p')

  const deleteButton = document.createElement('button')
  const addButton = document.createElement('button')
  const removeButton = document.createElement('button')

  const listaDeCartas = document.getElementById('listaDeCartas')
  listaDeCartas.classList.add('list-item')

  // listRaridade.innerText = 'Raridade: ' + cartaAdicionada.raridade
  // listPreco.innerText = 'USD:' + cartaAdicionada.preco
  // listQtdCarta.innerText = 'Quantidade: ' + cartaAdicionada.qtdCarta

  deleteButton.innerText = 'X'
  deleteButton.onclick = function () {
    deletarCarta(data)
  }

  addButton.innerText = '+1'
  addButton.onclick = function () {
    incrementarCarta(data)
  }

  removeButton.innerText = '-1'
  removeButton.onclick = function () {
    decrementarCarta(data)
  }

  listNome.innerText =
    'Carta: ' +
    cartaAdicionada.nome +
    ' |   Raridade: ' +
    cartaAdicionada.raridade +
    ' |   Quantidade: ' +
    cartaAdicionada.qtdCarta
  listNome.setAttribute('id', `${nomeId[0]}`)

  listaDeCartas.append(listNome, deleteButton, addButton, removeButton)
}

function getDados() {
  const nomeDeck = document.getElementById('nomeDeck').value

  if (nomeDeck == '' && listaDeCartas == []) {
    document.getElementById('nomeDeck').classList.add('loginError')
  } else {
    let custoTotal = 0
    let qtdCartas = 0
    listaDeCartas.forEach(carta => {
      custoTotal += carta.preco * carta.qtdCarta
      qtdCartas += carta.qtdCarta
      criarDeck(nomeDeck, custoTotal, qtdCartas)
    })

    // console.log(custoTotal, qtdCartas)
  }
}

async function criarDeck(nomeDeck, custoTotal, qtdCartas) {
  const Usuario = JSON.parse(localStorage.getItem('Usuario'))

  await fetch(`http://localhost:3000/baralho/${Usuario.id}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: nomeDeck,
      preco: custoTotal,
      numCartas: qtdCartas,
      listaDeCartas: listaDeCartas
    })
  })
  document.location.reload()
}

document.getElementById('qtdCarta').value = 1
