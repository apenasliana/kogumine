//testes unitarios para usuario//
const supertest = require('supertest')
const router = require('../server/routes')
const UsuarioController = require('../src/main/kogumine/controller/UsuarioController')

const request = supertest('http://localhost:3000')

/////////////////////  usuario cadastra uma conta   ///////////////////////////
test('nao foi possivel cadastrar usuario', async () => {
  const username = 'nomeTeste2'
  const senha = 'senhaTeste2'
  const email = 'emailTeste2'

  const response = await fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, email: email, senha: senha })
  })
  const cadastroData = await response.json()
  const idUsuario = cadastroData.insertId

  const getUsuario = await fetch(`http://localhost:3000/usuarios/${idUsuario}`)
  const usuarioData = await getUsuario.json()

  expect(response.status).toBe(200)
  expect(cadastroData.affectedRows).toBe(1)
  expect(usuarioData[0].id).toEqual(idUsuario)
})

/////////////////////  usuario tenta logar sem ter conta cadastrada   ///////////////////////////

test('usuario nao tem conta cadastrada', async () => {
  // const result = await fetch(`http://localhost:3000/usuarios/user/${Usuario.id}`, {method: "GET",headers: {'Accept': 'application/json',
  // 'Content-Type': 'application/json'}})
  const response = await fetch(`http://localhost:3000/usuarios/37`)
  const data = await response.json()
  // console.log(data)

  expect(data[0].username).toBe('teste')
  expect(data[0].senha).toBe('teste')
  expect(data[0].email).toBe('teste')
})

// usuario consegue logar//

/////////////////////  Editar dados do usuario   ///////////////////////////

describe('nao foi possivel', () => {
  // nome de usuario //
  it('alterar o usuario', async () => {
    const idUsuario = 57 //precisava ser dinamico

    const novoUsername = 'nomeTeste_alterado'
    // const novoUsername= "nomeTeste"

    const responseUser = await fetch(
      `http://localhost:3000/usuarios/user/${idUsuario}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: novoUsername })
      }
    )
    const updateData = await responseUser.json()

    const getUsuario = await fetch(
      `http://localhost:3000/usuarios/${idUsuario}`
    )
    const usuarioData = await getUsuario.json()

    expect(responseUser.status).toBe(200)
    expect(usuarioData[0].username).toEqual(novoUsername)
  })

  // email do usuario//
  it('alterar a senha', async () => {
    const idUsuario = 57

    const novaSenha = 'senhaTeste_alterado'
    // const novaSenha = "senhaTeste"

    const responseSenha = await fetch(
      `http://localhost:3000/usuarios/senha/${idUsuario}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ senha: novaSenha })
      }
    )
    const updateData = await responseSenha.json()

    const getUsuario = await fetch(
      `http://localhost:3000/usuarios/${idUsuario}`
    )
    const usuarioData = await getUsuario.json()

    expect(responseSenha.status).toBe(200)
    expect(usuarioData[0].senha).toEqual(novaSenha)
  })

  // senha do usuario//
  it('alterar o email', async () => {
    const idUsuario = 57

    const novoEmail = 'emailTeste_alterado'
    // const novoEmail = "emailTeste"

    const responseEmail = await fetch(
      `http://localhost:3000/usuarios/email/${idUsuario}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: novoEmail })
      }
    )
    const updateData = await responseEmail.json()

    const getUsuario = await fetch(
      `http://localhost:3000/usuarios/${idUsuario}`
    )
    const usuarioData = await getUsuario.json()

    expect(responseEmail.status).toBe(200)
    expect(usuarioData[0].email).toEqual(novoEmail)
  })
})

// usuario consegue deletar a sua conta//
test('nao foi possivel deletar a conta', async () => {
  const idUsuario = 63

  const responseDelete = await fetch(
    `http://localhost:3000/usuarios/${idUsuario}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )

  console.log(responseDelete)
  const updateData = await responseDelete.json()
  console.log(updateData)

  const getUsuario = await fetch(`http://localhost:3000/usuarios/${idUsuario}`)
  console.log(getUsuario)

  const usuarioData = await getUsuario.json()

  console.log(usuarioData)

  expect(responseDelete.status).toBe(200)
  expect(usuarioData).toEqual([])
})
