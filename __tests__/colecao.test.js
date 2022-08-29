//testes unitario para a colecao//
const supertest = require('supertest')
const router = require('../server/routes')
const UsuarioController = require ('../src/main/kogumine/controller/UsuarioController')



//adicionar cartas na colecao//
// test('nao foi possivel cadastrat carta', async ()=>{

//     const username= "nomeTeste2"
//     const senha = "senhaTeste2"
//     const email = "emailTeste2"



//     const response = await fetch("http://localhost:3000/usuarios", {method: "POST",headers: {'Accept': 'application/json',
//     'Content-Type': 'application/json'},body:JSON.stringify({"username" :username, "email": email,"senha":senha})})
//     const cadastroData = await response.json()
//     const idUsuario = cadastroData.insertId



//     const getUsuario = await fetch(`http://localhost:3000/usuarios/${idUsuario}`)
//     const usuarioData = await getUsuario.json()

  
    
//     expect(response.status).toBe(200)
//     expect(cadastroData.affectedRows).toBe(1)
//     expect(usuarioData[0].id).toEqual(idUsuario)

// })

//deletar cartas na colecao//

//incrementar ou decrementar carta na colecao//
//deletar TODAS as unidades de uma carta na colecao//

//conferir se os dados da colecao estao corretos?//