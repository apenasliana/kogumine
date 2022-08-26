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

    // get
    static async getCartasColecao(nome,idColecao){
      const query = util.promisify(db.query).bind(db)

      const sqlSelectCardId = "SELECT id FROM carta WHERE nome = (?)"
      const sqlSelectCartaColecao = "SELECT colecao.id,colecao.idUsuario,carta.*, carta_colecao.qtdCarta FROM colecao JOIN carta_colecao ON carta_colecao.idColecao = colecao.id JOIN carta ON carta.id = carta_colecao.idCarta WHERE colecao.id = (?) AND carta_colecao.idCarta = (?)"
      
      try{
          const cardId = await query(sqlSelectCardId,nome)
          
          const result = await query(sqlSelectCartaColecao,[idColecao,cardId[0].id])
          return result
      }catch(err){
          return err
      }
    }
  //   static async getCartasColecao(nome,idColecao){
  //     const query = util.promisify(db.query).bind(db)
      
  //     const sqlSelectCartaColecao = "SELECT colecao.id,colecao.idUsuario,carta.*, carta_colecao.qtdCarta FROM colecao JOIN carta_colecao ON carta_colecao.idColecao = colecao.id JOIN carta ON carta.id = carta_colecao.idCarta WHERE colecao.id = (?) AND carta_colecao.idCarta = (?)"
  //     try{
  //         const result = await query(sqlSelectCartaColecao,[idColecao,nome])
  //         return result
  //     }catch(err){
  //         return err
  //     }
  // }
    static async getColecaoData(idColecao){
      const query = util.promisify(db.query).bind(db)


      const sqlSelectColecao = "SELECT * FROM colecao WHERE id = ?"

      try{
        const retornarColecao = await query(sqlSelectColecao,idColecao)
        // console.log(retornarColecao)
        return retornarColecao

      }catch(err){
        return err
      }
    }


    static async adicionarCarta(carta, idColecao,qtdCarta){
        const query = util.promisify(db.query).bind(db)


        try{
            const cartaCadastrada = await query("SELECT * FROM carta WHERE nome = (?)",[carta.nome])
            if(cartaCadastrada.length == 0){ //A carta nao está cadastrada, cadastrar e dps inserir na colecao
                const sqlInsert = "INSERT INTO carta (nome,raridade,preco) VALUE (?,?,?)"

                const resulte = await query(sqlInsert,[carta.nome, carta.raridade, carta.preco])
                const idCarta = resulte.insertId
                const cartaExiste = await query("SELECT * FROM carta_colecao WHERE idCarta = (?) AND idColecao = (?) ",[idCarta,idColecao])
                if(cartaExiste.length != 0){
                    let novaQtdCarta = parseInt(cartaExiste[0].qtdCarta) + parseInt(qtdCarta)
                    await query("UPDATE carta_colecao SET qtdCarta = (?) WHERE idCarta = (?) AND idColecao = (?)",[novaQtdCarta,idCarta,idColecao])
                    // console.log('if 1')
                    
                    this.atualizarColecao(carta, idColecao,qtdCarta)//

                }else{
                  
                  const resultado = await query("INSERT INTO carta_colecao (idCarta,idColecao,qtdCarta) VALUE (?,?,?)",[idCarta,idColecao,qtdCarta])
                  this.atualizarColecao(carta, idColecao,qtdCarta)//
                  // console.log('else 1')
                  return resultado
                }
            }else{
                const idCarta = cartaCadastrada[0].id

                const cartaExiste = await query("SELECT * FROM carta_colecao WHERE idCarta = (?) AND idColecao = (?) ",[idCarta,idColecao])
                if(cartaExiste.length != 0){
                    let novaQtdCarta = parseInt(cartaExiste[0].qtdCarta) + parseInt(qtdCarta)
                    await query("UPDATE carta_colecao SET qtdCarta = (?) WHERE idCarta = (?) AND idColecao = (?)",[novaQtdCarta,idCarta,idColecao])
                    // console.log('if 2')
                    this.atualizarColecao(carta, idColecao,qtdCarta)//
                    


                }else{

                  
                  const resulte = await query("INSERT INTO carta_colecao (idCarta,idColecao,qtdCarta) VALUE (?,?,?)",[idCarta,idColecao,qtdCarta])
                  // console.log('else 2')
                  this.atualizarColecao(carta, idColecao,qtdCarta)//
                  return resulte
                }
            }
        }catch(err){
            console.log(err)
            return err
        }
    }
    static async atualizarColecao(carta, idColecao, qtdCarta){
      const query = util.promisify(db.query).bind(db);

      const colecao = await query("SELECT * FROM colecao WHERE id = (?) ",[idColecao])
      const novoCustoTotal = parseFloat(colecao[0].custoTotal) + parseFloat(carta.preco * qtdCarta)

      const novaQtdTotal = parseInt(colecao[0].totalCards) + parseInt(qtdCarta)


      if(carta.raridade == 'mythic' || carta.raridade == 'rare' ||carta.raridade == 'common' ||carta.raridade == 'uncommon'){
        let raridadeString = "qtd_"
        raridadeString += carta.raridade
        const novaQtdRaridade = parseInt(colecao[0][raridadeString]) + parseInt(qtdCarta)
        const sqlInserIntoCollection = `UPDATE colecao  SET custoTotal = ?, ${raridadeString} = ? , totalCards = ? WHERE id = ${idColecao}`
        await query(sqlInserIntoCollection,[novoCustoTotal,novaQtdRaridade,novaQtdTotal])

      }else{

        const sqlInserIntoCollection = `UPDATE colecao SET custoTotal = ?, totalCards = ? WHERE id = ${idColecao}`
        await query(sqlInserIntoCollection,[novoCustoTotal,novaQtdTotal])

      }




    }
    static async decrementarCarta(id, idCarta) {
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
          const cartaDados = await query("SELECT * FROM carta WHERE id = (?)",idCarta)
          this.atualizarColecao(cartaDados[0], id, -1)
          const qtdColecao = await query("SELECT totalCards FROM colecao WHERE id = (?)",id)
          await query("UPDATE colecao SET totalCards = (?) WHERE id = (?)",[(qtdColecao[0].totalCards-1), id])
        } catch (err) {
          console.log(err);
        }
    }


    static async incrementarCarta(id, idCarta) {
      const query = util.promisify(db.query).bind(db);

      try {
        const carta = await query(
          "SELECT * FROM carta_colecao WHERE idColecao = (?) AND idCarta = (?)",
          [id, idCarta]
        );
  
        if (carta.length != 0) {
          let novaQuantidadeCarta = carta[0].qtdCarta + 1;
          query(
            "UPDATE carta_colecao SET qtdCarta = (?) WHERE idColecao = (?) AND idCarta = (?)",
            [novaQuantidadeCarta, id, idCarta]
          );
        }
        const cartaDados = await query("SELECT * FROM carta WHERE id = (?)",idCarta)
        this.atualizarColecao(cartaDados[0], id, 1)
        const qtdColecao = await query("SELECT totalCards FROM colecao WHERE id = (?)",id)
        await query("UPDATE colecao SET totalCards = (?) WHERE id = (?)",[(qtdColecao[0].totalCards+1), id])
      } catch (err) {
        console.log(err);
      }
    }
    static async deletarCarta(id, idCarta) {
      const query = util.promisify(db.query).bind(db);



      try {
        const carta = await query(
          "SELECT * FROM carta_colecao WHERE idColecao = (?) AND idCarta = (?)",
          [id, idCarta]
        );
  
        if (carta.length != 0) {
            query(
              "DELETE FROM carta_colecao WHERE idColecao = (?) AND idCarta = (?)",
              [id, idCarta]
            );
            const cartaDados = await query("SELECT * FROM carta WHERE id = (?)",idCarta)
            this.atualizarColecao(cartaDados[0], id, -carta[0].qtdCarta)
            const qtdColecao = await query("SELECT totalCards FROM colecao WHERE id = (?)",id)
            await query("UPDATE colecao SET totalCards = (?) WHERE id = (?)",[(qtdColecao[0].totalCards - carta[0].qtdCarta), id])
          }
      } catch (err) {
        console.log(err);
      }

    }



}

module.exports = ColecaoServico