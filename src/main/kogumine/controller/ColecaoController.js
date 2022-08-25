const db = require ('../../../../server/database')
const Colecao = require('../model/Colecao')
const ColecaoServico = require('../services/ColecaoServico')
const Carta = require('../model/Carta')


class ColecaoController{
    Colecao
    ColecaoServico


    static listarCartasColecao(req,res){
        const idColecao = req.params.id
        ColecaoServico.listarCartasColecao(idColecao).then((result)=>{
            res.send(result)
        })
    }

    // static listColecao(req,res){
    //     const sqlSelectAll = "SELECT * FROM colecao"
    //     db.query(sqlSelectAll, (err,result)=>{
    //         res.send(result)
    //     })
    // }



    static getCartasColecao(req,res){
        const nome = req.query.nome
        const idColecao = req.params.id
        ColecaoServico.getCartasColecao(nome,idColecao).then((result)=>{
            res.send(result)
        })
    }
    
    // static getCartasColecao(req,res){
    //     const idCarta = req.params.idC
    //     const idColecao = req.params.id
    //     ColecaoServico.getCartasColecao(idCarta,idColecao).then((result)=>{
    //         res.send(result)
    //     })
    // }
    

    static getColecaoData(req,res){
        const idColecao = req.params.id

        ColecaoServico.getColecaoData(idColecao).then((result)=>{
            res.send(result)
        })
    }


    static adicionarCarta(req,res){
        const idColecao = req.params.id
        const nomeCarta = req.body.nome
        const raridadeCarta = req.body.raridade
        const precoCarta = req.body.preco
        const qtdCarta = req.body.qtdCarta

        const carta = new Carta(nomeCarta,raridadeCarta,precoCarta)

        ColecaoServico.adicionarCarta(carta, idColecao,qtdCarta).then((result)=>{
            res.send(result)
        })
    }
    
    static removerCarta(req,res){
        const idColecao = req.params.id
        const idCarta = req.params.idC
        ColecaoServico.removerCarta(idColecao, idCarta).then((result)=>{
            res.send(result)
        })

      }
}


module.exports = ColecaoController
