const express = require ('express')
const UsuarioController = require ('../src/main/kogumine/controller/UsuarioController')
const ColecaoController = require ('../src/main/kogumine/controller/ColecaoController')
const BaralhoController = require ('../src/main/kogumine/controller/BaralhoController')

const router = express.Router()


router.get("/", (req, res)=>{
    res.send("hello world")
})
// usuario //
router.post("/usuarios", UsuarioController.postUsuario)
router.delete("/usuarios/:id", UsuarioController.deleteUsuario)
router.get("/usuarios", UsuarioController.listUsuario)
router.get("/usuarios/:id", UsuarioController.getUsuario)
router.put("/usuarios/:id", UsuarioController.putUsuario)
router.post("/auth", UsuarioController.autenticar)

// colecao //

router.get("/colecao/:id", ColecaoController.listarCartasColecao)
router.delete("/colecao/:id/carta/:idC", ColecaoController.removerCarta)
router.post("/colecao/:id", ColecaoController.adicionarCarta)


// baralho //

router.post("/usuarios/:id/baralho", BaralhoController.postBaralho)
router.delete("/baralho/:idB", BaralhoController.deleteBaralho)
router.get("/baralho/:id", BaralhoController.getBaralho)
router.put("/baralho/:idB",BaralhoController.putBaralho)

// router.put("/usuarios/:id/baralho/:idG/add", BaralhoController.adicionarGostei)
// router.put("/usuarios/:id/baralho/:idG/rem", BaralhoController.removerGostei)




module.exports = router