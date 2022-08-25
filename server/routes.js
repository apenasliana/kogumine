const express = require ('express')
const UsuarioController = require ('../src/main/kogumine/controller/UsuarioController')
const ColecaoController = require ('../src/main/kogumine/controller/ColecaoController')
const BaralhoController = require ('../src/main/kogumine/controller/BaralhoController')

const router = express.Router()


router.get("/", (req, res)=>{
    res.send("hello world")
})
// usuario //
router.post("/usuarios", UsuarioController.postUsuario) //criar usuario
router.delete("/usuarios/:id", UsuarioController.deleteUsuario) // deletar usuario
router.get("/usuarios", UsuarioController.listUsuario) //listar usuario
router.get("/usuarios/:id", UsuarioController.getUsuario) // get usuario
router.put("/usuarios/:id", UsuarioController.putUsuario) // atualizar TODOS os dados

// confirmar se o email ou username existe antes de fazer a alteracao
router.put("/usuarios/user/:id", UsuarioController.putUsuarioUsername) // atualizar dados USERNAME
router.put("/usuarios/senha/:id", UsuarioController.putUsuarioSenha) // atualizar dados SENHA
router.put("/usuarios/email/:id", UsuarioController.putUsuarioEmail) // atualizar dados EMAIL

router.post("/auth", UsuarioController.autenticar) // autenticador



// colecao //

router.post("/colecao/:id", ColecaoController.adicionarCarta)
router.get("/colecao/:id", ColecaoController.listarCartasColecao)
router.get("/colecao/:id/carta", ColecaoController.getCartasColecao) // 
// router.get("/colecao/:id/:idC", ColecaoController.getCartasColecao)

router.delete("/colecao/:id/carta/:idC", ColecaoController.removerCarta)


// baralho //

router.post("/usuarios/:id/baralho", BaralhoController.postBaralho)
router.delete("/baralho/:idB", BaralhoController.deleteBaralho)
router.get("/baralho/:id", BaralhoController.getBaralho)
router.put("/baralho/:idB",BaralhoController.putBaralho)

// router.put("/usuarios/:id/baralho/:idG/add", BaralhoController.adicionarGostei)
// router.put("/usuarios/:id/baralho/:idG/rem", BaralhoController.removerGostei)




module.exports = router