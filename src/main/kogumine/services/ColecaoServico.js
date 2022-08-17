const db = require ('../../../../server/database.js')
const util = require('util')

class ColecaoServico{
    static async listarCartasColecao(idColecao){
        const query = util.promisify(db.query).bind(db)
        
        const sqlSelectCartaColecao = "SELECT colecao.id,colecao.idUsuario,carta.*, carta_colecao.qtdCarta FROM colecao JOIN carta_colecao ON carta_colecao.idColecao = colecao.id JOIN carta ON carta.id = carta_colecao.idCarta WHERE colecao.id = (?)"
        try{
            const result = await query(sqlSelectCartaColecao,idColecao)
            return result
        }catch(err){
            return err
        }
    }

    static async adicionarCarta(carta, idColecao,qtdCarta){
        const query = util.promisify(db.query).bind(db)


        try{
            const result = await query("SELECT * FROM carta WHERE nome = (?)",[carta.nome])
            if(result.length == 0){
                const sqlInsert = "INSERT INTO carta (nome,raridade,preco) VALUE (?,?,?)"

                const resulte = await query(sqlInsert,[carta.nome, carta.raridade, carta.preco])
                const idCarta = resulte.insertId
                const cartaExiste = await query("SELECT * FROM carta_colecao WHERE idCarta = (?) AND idColecao = (?) ",[idCarta,idColecao])
                if(cartaExiste.length != 0){
                    let novaQtdCarta = parseInt(cartaExiste[0].qtdCarta) + parseInt(qtdCarta)
                    await query("UPDATE carta_colecao SET qtdCarta = (?) WHERE idCarta = (?) AND idColecao = (?)",[novaQtdCarta,idCarta,idColecao])
                }else{
                    const resultado = await query("INSERT INTO carta_colecao (idCarta,idColecao,qtdCarta) VALUE (?,?,?)",[idCarta,idColecao,qtdCarta])
                    return resultado
                }
            }else{
                const idCarta = result[0].id

                const cartaExiste = await query("SELECT * FROM carta_colecao WHERE idCarta = (?) AND idColecao = (?) ",[idCarta,idColecao])
                if(cartaExiste.length != 0){
                    let novaQtdCarta = parseInt(cartaExiste[0].qtdCarta) + parseInt(qtdCarta)
                    await query("UPDATE carta_colecao SET qtdCarta = (?) WHERE idCarta = (?) AND idColecao = (?)",[novaQtdCarta,idCarta,idColecao])
                }else{

                    const resulte = await query("INSERT INTO carta_colecao (idCarta,idColecao,qtdCarta) VALUE (?,?,?)",[idCarta,idColecao,qtdCarta])
                    return resulte
                }
            }
        }catch(err){
            console.log(err)
            return err
        }
    }
    static async removerCarta(id, idCarta) {
        const query = util.promisify(db.query).bind(db);
        try {
          const carta = await query(
            "SELECT * FROM carta_colecao WHERE idColecao = (?) AND idCarta = (?)",
            [id, idCarta]
          );
    
          if (carta.length != 0) {
            let novaQuantidadeCarta = carta[0].qtdCarta - 1;
            if (novaQuantidadeCarta <= 0) {
              query(
                "DELETE FROM carta_colecao WHERE idColecao = (?) AND idCarta = (?)",
                [id, idCarta]
              );
            } else {
              query(
                "UPDATE carta_colecao SET qtdCarta = (?) WHERE idColecao = (?) AND idCarta = (?)",
                [novaQuantidadeCarta, id, idCarta]
              );
            }
          }
        } catch (err) {
          console.log(err);
        }
    }

}

module.exports = ColecaoServico