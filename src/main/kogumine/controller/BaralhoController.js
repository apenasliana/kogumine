const req = require('express/lib/request')
const res = require('express/lib/response')
const db = require ('../../../../server/database')
const Baralho = require('../model/Baralho')
const BaralhoServico = require('../services/BaralhoServico')

class BaralhoController {
    Baralho
    BaralhoServico

    static postBaralho(req,res){
        const listaCartas = req.body.listaCartas




        const nome = req.body.nome
        const idUsuario = parseInt(req.params.id)
        const custoTotal = req.body.custoTotal
        const numCartas = req.body.numCartas

        const baralho = new Baralho(nome,idUsuario,custoTotal,numCartas,listaCartas)

        BaralhoServico.postBaralho(baralho).then((result)=>{
            res.send(result)
        })
    }
    static deleteBaralho(req,res){
        const idUsuario = req.body.id
        const idBaralho = req.params.idB

        BaralhoServico.deleteBaralho(idBaralho,idUsuario).then((result)=>{
            res.send(result)
        })
    }
    static putBaralho(req,res){
        const idBaralho = req.params.idB
        
        const nome = req.body.nome
        const idUsuario = req.body.id
        const custoTotal = req.body.custoTotal
        const numCartas = req.body.numCartas

        const baralho = new Baralho(nome,idUsuario,custoTotal,numCartas)

        BaralhoServico.putBaralho(baralho,idBaralho).then((result)=>{
            res.send(result)
        })
    }

    static getBaralho(req,res){
        const idBaralho = req.params.id
        BaralhoServico.getBaralho(idBaralho).then((result)=>{
            res.send(result)
        })


    }
    
    listBaralho(){

    }
    listBaralhoUsuario(idUsuario){

    }

    static adicionarGostei(req,res){
        const idBaralho = req.params.idG

        const sqlUpdate = "UPDATE baralho SET qtdGostei = ? WHERE id = ?"
        db.query("SELECT qtdGostei FROM baralho WHERE id = ?", [idBaralho], (err,result)=>{
            if(err){console.log(err)}
            const qtdGosteiNew = result+1
            db.query(sqlUpdate, [qtdGosteiNew,idBaralho] , (err,result) => {
                if(err) console.log(err)
                res.send(result)
            })
        })
        

    }
    static removerGostei(req,res){
        const idBaralho = req.params.idG

        const sqlUpdate = "UPDATE baralho SET qtdGostei = ? WHERE id = ?"
        db.query("SELECT qtdGostei FROM baralho WHERE id = ?", [idBaralho], (err,result)=>{
            if(err){console.log(err)}
            console.log(result)
            const qtdGosteiNew = result-1
            if (qtdGosteiNew >=0){
                db.query(sqlUpdate, [qtdGosteiNew,idBaralho] , (err,resultado) => {
                    if(err) console.log(err)
                    res.send(resultado)
                })
                res.send(result)
            }
        })

    }
}


module.exports = BaralhoController