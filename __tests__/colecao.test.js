//testes unitario para a colecao//
const supertest = require('supertest')
const router = require('../server/routes')
const UsuarioController = require('../src/main/kogumine/controller/UsuarioController')

//adicionar cartas na colecao//
test('nao foi possivel cadastrar carta', async () => {
  const nomeCarta = 'Fog'

  const response = await fetch(`http://localhost:3000/colecao/${idUsuario}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: nomeCarta })
  })
  const cadastroData = await response.json()

  const idUsuario = cadastroData.insertId

  const getUsuario = await fetch(`http://localhost:3000/usuarios/${idUsuario}`)
  const usuarioData = await getUsuario.json()

  expect(response.status).toBe(200)
  expect(usuarioData[0].id).toEqual(idUsuario)
})

//deletar cartas na colecao//

//incrementar ou decrementar carta na colecao//
//deletar TODAS as unidades de uma carta na colecao//

//conferir se os dados da colecao estao corretos?//
