const db = require ('../../../../server/database.js')
const util = require('util')

class BaralhoServico{
    
    static async postBaralho(baralho){
        const query = util.promisify(db.query).bind(db)

        const sqlInsert = "INSERT INTO baralho (nome,idUsuario,custoTotal,numCartas,qtdGostei) VALUES (?,?,?,?,0)"
        

        try{
            const newBaralho = await query(sqlInsert, [baralho.nome, baralho.idUsuario, baralho.custoTotal, baralho.numCartas])
            console.log(baralho.listaCartas)
            await baralho.listaCartas.forEach(async(element) => {
                const result = await query("SELECT nome FROM carta WHERE nome = (?)",[element.nome])
                console.log(result)

                if(result.length == 0){
                    const sqlInsert = "INSERT INTO carta (nome,raridade,preco) VALUE (?,?,?)"

                    const resulte = await query(sqlInsert,[element.nome, element.raridade, element.preco])
                    console.log(resulte)
                    const idCarta = resulte.insertId

                    const resultado = await query("INSERT INTO carta_baralho (idCarta,idBaralho) VALUE (?,?)",[idCarta,newBaralho.insertId])
                }else{
                    const idCarta = result[0].id
                    const resulte = await query("INSERT INTO carta_baralho (idCarta,idBaralho) VALUE (?,?)",[idCarta,newBaralho.insertId])
                }
                
            });
            return newBaralho
        }catch(err){
            return err
        }
    }

    static async deleteBaralho(idBaralho, idUsuario){
        const query = util.promisify(db.query).bind(db)

        const sqlDelete = "DELETE FROM baralho WHERE id = ? AND idUsuario = ?"
        try{
            const result = await query(sqlDelete, [idBaralho,idUsuario])
            return result
        }catch(err){
            return err
        }
    }

    static async putBaralho(baralho,idBaralho){
        const query = util.promisify(db.query).bind(db)

        const sqlUpdate = "UPDATE baralho SET nome = ?, custoTotal = ?, numCartas = ? WHERE id = ? AND idUsuario = ?"
    
        try{
            const result = await query(sqlUpdate, [baralho.nome,baralho.custoTotal,baralho.numCartas,idBaralho, baralho.idUsuario])
            return result
        }catch(err){
            return err
        }
    }

    static async getBaralho(idBaralho){
        const query = util.promisify(db.query).bind(db)
        console.log(idBaralho)
        const sqlSelectBaralho = "SELECT baralho.*,carta.* FROM baralho JOIN carta_baralho ON carta_baralho.idBaralho = baralho.id JOIN carta ON carta.id = carta_baralho.idCarta WHERE baralho.id = (?)"
        try{
            const result = await query(sqlSelectBaralho,idBaralho)
            return result
        }catch(err){
            return err
        }
    
    }

    listBaralho(){

    }
}


module.exports = BaralhoServico