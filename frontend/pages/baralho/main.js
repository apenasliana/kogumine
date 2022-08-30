function redirectDeck() {
  window.location.href = './criarBaralho/criarBaralho.html'
}
function searchDeck() {
  window.location.href = './buscarBaralho/buscarBaralho.html'
}

async function getBaralho(idBaralho) {
  const response = await fetch(`http://localhost:3000/colecao/${idBaralho}/`)
  const data = await response.json()

  return data
}

async function getBaralhosUsuario() {
  const Usuario = JSON.parse(localStorage.getItem('Usuario'))
  const response = await fetch(`http://localhost:3000/baralho/${Usuario.id}`)
  const data = await response.json()
  // console.log('fData ', data)
  data.forEach(element => {
    mostrarBaralhos(element)
  })
}

async function mostrarBaralhos(data) {
  // if (document.getElementsByClassName(`${nomeClass[0]}`)) {
  //   const elementoExiste = document.getElementsByClassName(`${nomeClass[0]}`)
  //   console.log(elementoExiste)
  //   elementoExiste.remove()
  // }

  const listItem = document.createElement('li')
  const listNome = document.createElement('p')

  const inspectButton = document.createElement('button')
  const deleteButton = document.createElement('button')

  const listaDeCartas = document.getElementById('listaDeCartas')
  listItem.classList.add('list-item')

  inspectButton.innerText = 'Inspecionar'
  inspectButton.onclick = function () {
    // visitarDeck(data.id)
    visitarDeck()
  }
  deleteButton.innerText = 'Deletar'
  deleteButton.onclick = function () {
    // visitarDeck(data.id)
    deletarDeck(data.id)
  }

  listNome.innerText =
    'Deck Name: ' +
    data.nome +
    ' |   Preço: ' +
    data.custoTotal +
    ' |   Num Cartas: ' +
    data.numCartas +
    '  |ID: ' +
    data.id +
    '|' +
    '|Likes: ' +
    data.qtdGostei +
    '|'
  // listNome.setAttribute('id', `${nomeId[0]}`)

  listItem.append(listNome, inspectButton, deleteButton) //append delete
  listaDeCartas.append(listItem)
}
async function deletarDeck(idBaralho) {
  const Usuario = JSON.parse(localStorage.getItem('Usuario'))

  await fetch(`http://localhost:3000/baralho/${idBaralho}/${Usuario.id}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
  })

  // document.location.reload()
}

window.addEventListener('load', event => {
  getBaralhosUsuario()
})
