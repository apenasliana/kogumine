async function getBaralho() {
  const idBaralho = 20 // de onde vem??
  const response = await fetch(
    `http://localhost:3000/baralho/${idBaralho}/search`
  )
  const data = await response.json()
  // console.log(data)
  mostrarBaralhoData(data)
  getBaralhoDados()

  return data
}
async function getBaralhoDados() {
  const idBaralho = 20 // de onde vem??
  const response = await fetch(
    `http://localhost:3000/baralho/${idBaralho}/data`
  )
  const data = await response.json()

  // console.log(data)
  data.forEach(carta => {
    mostrarBaralho(carta)
  })
}
function mostrarBaralhoData(data) {
  const listNome = document.createElement('p')
  const listPreco = document.createElement('p')
  const listData = document.createElement('p')
  const baralhoData = document.getElementById('baralhoData')

  listNome.innerText = data.nome

  listNome.innerText = 'Deck Name: ' + data[0].nome
  listPreco.innerText =
    ' |   Preço: $' +
    data[0].custoTotal +
    ' |   Cartas: ' +
    data[0].numCartas +
    '|'

  listData.innerText =
    '  |ID: ' + data[0].id + ' |' + 'Likes: ' + data[0].qtdGostei + ' |'
  baralhoData.append(listNome, listPreco, listData)
}

function mostrarBaralho(data) {
  const listNome = document.createElement('p')

  const listaDeCartas = document.getElementById('listaDeCartas')

  listNome.innerText =
    'Carta: ' +
    data.nome +
    ' |   ' +
    data.raridade +
    ' |   $' +
    data.preco +
    ' |   ' +
    data.numCartas +
    ' |'

  listaDeCartas.classList.add('list-item')

  listaDeCartas.append(listNome)
  // listaDeCartas.append(listItem)
}

window.addEventListener('load', event => {
  getBaralho()
})
