const express = require('express')
const UsuarioController = require('../src/main/kogumine/controller/UsuarioController')
const ColecaoController = require('../src/main/kogumine/controller/ColecaoController')
const BaralhoController = require('../src/main/kogumine/controller/BaralhoController')

const router = express.Router()

/////////////////////// usuario ////////////////////////
router.post('/usuarios', UsuarioController.postUsuario) //criar usuario
router.delete('/usuarios/:id', UsuarioController.deleteUsuario) // deletar usuario
router.get('/usuarios/:id', UsuarioController.getUsuario) // get usuario

// confirmar se o email ou username existe antes de fazer a alteracao
router.put('/usuarios/user/:id', UsuarioController.putUsuarioUsername) // atualizar dados USERNAME
router.put('/usuarios/senha/:id', UsuarioController.putUsuarioSenha) // atualizar dados SENHA
router.put('/usuarios/email/:id', UsuarioController.putUsuarioEmail) // atualizar dados EMAIL

router.post('/auth', UsuarioController.autenticar) // autenticador

router.put('/usuarios/:id', UsuarioController.putUsuario) // atualizar TODOS os dados
router.get('/usuarios', UsuarioController.listUsuario) //listar usuario

///////////////////// colecao //////////////////

router.post('/colecao/:id', ColecaoController.adicionarCarta) //adiciona carta na coleccao
router.get('/colecao/:id', ColecaoController.listarCartasColecao) // lista todas as cartas da colecao
router.get('/colecao/:id/carta', ColecaoController.getCartasColecao) // lista uma carta da colecao
router.get('/colecao/:id/data', ColecaoController.getColecaoData) // busca o DATA da colecao

router.delete('/colecao/:id/carta/:idC', ColecaoController.decrementarCarta) //remove uma UNIDADE da carta X
router.patch('/colecao/:id/carta/:idC', ColecaoController.incrementarCarta) //adiciona uma UNIDADE da carta X
router.delete('/colecao/:id/delcarta/:idC', ColecaoController.deletarCarta) //remove TODAS as cartas X

// baralho //

router.post('/baralho/:id', BaralhoController.postBaralho) // criar baralho // DONE
router.get('/baralho/:id', BaralhoController.getBaralhosUsuario) // get baralho do usuario // DONE
router.get('/baralho/:idB/search', BaralhoController.getBaralho) // get baralho x
router.delete('/baralho/:idB/:id', BaralhoController.deleteBaralho) // delete baralho x

router.get('/baralho/:idB/data', BaralhoController.getBaralhoDados) // get baralho DATA

// router.put('/baralho/:idB', BaralhoController.putBaralho)

// router.put("/usuarios/:id/baralho/:idG/add", BaralhoController.adicionarGostei)
// router.put("/usuarios/:id/baralho/:idG/rem", BaralhoController.removerGostei)

module.exports = router
