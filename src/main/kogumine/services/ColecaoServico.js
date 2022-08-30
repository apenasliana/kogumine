const db = require('../../../../server/database.js')
const util = require('util')

class ColecaoServico {
  static async listarCartasColecao(idColecao) {
    const query = util.promisify(db.query).bind(db)

    const sqlSelectCartaColecao =
      'SELECT colecao.id,colecao.idUsuario,carta.*, carta_colecao.qtdCarta FROM colecao JOIN carta_colecao ON carta_colecao.idColecao = colecao.id JOIN carta ON carta.id = carta_colecao.idCarta WHERE colecao.id = (?)'
    try {
      const result = await query(sqlSelectCartaColecao, idColecao)
      return result
    } catch (err) {
      return err
    }
  }

  // get
  static async getCartasColecao(nome, idColecao) {
    const query = util.promisify(db.query).bind(db)

    const sqlSelectCardId = 'SELECT id FROM carta WHERE nome = (?)'
    const sqlSelectCartaColecao =
      'SELECT colecao.id,colecao.idUsuario,carta.*, carta_colecao.qtdCarta FROM colecao JOIN carta_colecao ON carta_colecao.idColecao = colecao.id JOIN carta ON carta.id = carta_colecao.idCarta WHERE colecao.id = (?) AND carta_colecao.idCarta = (?)'

    try {
      const cardId = await query(sqlSelectCardId, nome)

      const result = await query(sqlSelectCartaColecao, [
        idColecao,
        cardId[0].id
      ])
      return result
    } catch (err) {
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
  static async getColecaoData(idColecao) {
    const query = util.promisify(db.query).bind(db)
    await this.colecaoSUPERData(idColecao)
    const sqlSelectColecao = 'SELECT * FROM colecao WHERE id = ?'

    try {
      const retornarColecao = await query(sqlSelectColecao, idColecao)

      // console.log(retornarColecao)
      return retornarColecao
    } catch (err) {
      return err
    }
  }

  static async colecaoSUPERData(idColecao) {
    const query = util.promisify(db.query).bind(db)

    const totalCards = await query(
      `SELECT SUM(qtdCarta) FROM carta_colecao WHERE idColecao = ${idColecao}`
    )

    const colecaoCartas = await query(
      `SELECT * FROM (SELECT idCarta,qtdCarta FROM carta_colecao WHERE idColecao = ${idColecao}) Res1 LEFT JOIN carta on Res1.idCarta = carta.id`
    )
    let precoTotal = 0
    // console.log(colecaoCartas)
    colecaoCartas.forEach(cartaEmColecao => {
      precoTotal += cartaEmColecao.preco * cartaEmColecao.qtdCarta
    })

    const arrayofcoiso = ['mythic', 'rare', 'uncommon', 'common']
    arrayofcoiso.forEach(async element => {
      const rarityCard = await query(
        `SELECT SUM(qtdCarta) FROM (SELECT * FROM (SELECT idCarta,qtdCarta FROM carta_colecao WHERE idColecao = ${idColecao}) Res1 LEFT JOIN carta on Res1.idCarta = carta.id) result WHERE result.raridade = '${element}' `
      )
      // console.log(element,rarityCard[0]['SUM(qtdCarta)'] )
      const cardTP = rarityCard[0]['SUM(qtdCarta)']
      let raridadeString = 'qtd_'
      if (cardTP != null) {
        raridadeString += element

        await query(
          `UPDATE colecao SET ${raridadeString} = ${cardTP} WHERE id = ${idColecao}`
        )
      } else {
        raridadeString += element

        await query(
          `UPDATE colecao SET ${raridadeString} = 0 WHERE id = ${idColecao}`
        )
      }
    })
    let numCards = totalCards[0]['SUM(qtdCarta)']
    if (numCards == null) {
      numCards = 0
    }
    // console.log('preco', precoTotal)
    // console.log('totalCards', numCards)

    await query(
      `UPDATE colecao SET custoTotal = ${precoTotal} , totalCards = ${numCards} WHERE id = ${idColecao}`
    )
  }

  // tabela pog
  // SELECT
  // *
  // FROM
  // (SELECT idCarta,qtdCarta FROM `kogumine-db`.carta_colecao WHERE idColecao = 21) Res1
  // LEFT JOIN `kogumine-db`.carta on Res1.idCarta = carta.id ;

  // soma quantas cartas de raridade
  // SELECT SUM(qtdCarta)
  // FROM
  // 	(SELECT
  // 	*
  // 	FROM
  // 		(SELECT idCarta,qtdCarta FROM `kogumine-db`.carta_colecao WHERE idColecao = 21) Res1
  // 	LEFT JOIN `kogumine-db`.carta on Res1.idCarta = carta.id) result
  // WHERE result.raridade = 'common'

  static async adicionarCarta(carta, idColecao, qtdCarta) {
    const query = util.promisify(db.query).bind(db)
    try {
      const cartaCadastrada = await query(
        'SELECT * FROM carta WHERE nome = (?)',
        [carta.nome]
      )
      if (cartaCadastrada.length == 0) {
        //A carta nao está cadastrada, cadastrar e dps inserir na colecao
        const sqlInsert =
          'INSERT INTO carta (nome,raridade,preco) VALUE (?,?,?)'

        const resulte = await query(sqlInsert, [
          carta.nome,
          carta.raridade,
          carta.preco
        ])
        const idCarta = resulte.insertId
        const cartaExiste = await query(
          'SELECT * FROM carta_colecao WHERE idCarta = (?) AND idColecao = (?) ',
          [idCarta, idColecao]
        )
        if (cartaExiste.length != 0) {
          let novaQtdCarta =
            parseInt(cartaExiste[0].qtdCarta) + parseInt(qtdCarta)
          await query(
            'UPDATE carta_colecao SET qtdCarta = (?) WHERE idCarta = (?) AND idColecao = (?)',
            [novaQtdCarta, idCarta, idColecao]
          )
          // console.log('if 1')
          await this.colecaoSUPERData(idColecao)

          // this.atualizarColecao(carta, idColecao,qtdCarta)//
        } else {
          const resultado = await query(
            'INSERT INTO carta_colecao (idCarta,idColecao,qtdCarta) VALUE (?,?,?)',
            [idCarta, idColecao, qtdCarta]
          )
          // this.atualizarColecao(carta, idColecao,qtdCarta)//
          // console.log('else 1')
          await this.colecaoSUPERData(idColecao)

          return resultado
        }
      } else {
        const idCarta = cartaCadastrada[0].id
        //atualizar dados da carta
        this.atualizarDadosCarta(carta, idCarta)

        const cartaExiste = await query(
          'SELECT * FROM carta_colecao WHERE idCarta = (?) AND idColecao = (?) ',
          [idCarta, idColecao]
        )
        if (cartaExiste.length != 0) {
          let novaQtdCarta =
            parseInt(cartaExiste[0].qtdCarta) + parseInt(qtdCarta)
          await query(
            'UPDATE carta_colecao SET qtdCarta = (?) WHERE idCarta = (?) AND idColecao = (?)',
            [novaQtdCarta, idCarta, idColecao]
          )
          // console.log('if 2')
          // this.atualizarColecao(carta, idColecao,qtdCarta)//
        } else {
          const resulte = await query(
            'INSERT INTO carta_colecao (idCarta,idColecao,qtdCarta) VALUE (?,?,?)',
            [idCarta, idColecao, qtdCarta]
          )
          // console.log('else 2')
          // this.atualizarColecao(carta, idColecao,qtdCarta)//
          await this.colecaoSUPERData(idColecao)

          return resulte
        }

        await this.colecaoSUPERData(idColecao)
      }
    } catch (err) {
      console.log(err)
      return err
    }
  }
  static async atualizarDadosCarta(carta, idCarta) {
    const query = util.promisify(db.query).bind(db)

    const sqlInsert = 'UPDATE carta set preco = (?) WHERE id = (?)'

    await query(sqlInsert, [carta.preco, idCarta])
  }

  // static async atualizarColecao(carta, idColecao, qtdCarta){
  //   const query = util.promisify(db.query).bind(db);

  //   this.atualizarDadosCarta(carta,carta.id)

  //   const colecao = await query("SELECT * FROM colecao WHERE id = (?) ",[idColecao])
  //   const novoCustoTotal = parseFloat(colecao[0].custoTotal) + parseFloat(carta.preco * qtdCarta)

  //   const novaQtdTotal = parseInt(colecao[0].totalCards) + parseInt(qtdCarta)

  //   if(carta.raridade == 'mythic' || carta.raridade == 'rare' ||carta.raridade == 'common' ||carta.raridade == 'uncommon'){
  //     let raridadeString = "qtd_"
  //     raridadeString += carta.raridade
  //     const novaQtdRaridade = parseInt(colecao[0][raridadeString]) + parseInt(qtdCarta)
  //     const sqlInserIntoCollection = `UPDATE colecao  SET custoTotal = ?, ${raridadeString} = ? , totalCards = ? WHERE id = ${idColecao}`
  //     await query(sqlInserIntoCollection,[novoCustoTotal,novaQtdRaridade,novaQtdTotal])

  //   }else{

  //     const sqlInserIntoCollection = `UPDATE colecao SET custoTotal = ?, totalCards = ? WHERE id = ${idColecao}`
  //     await query(sqlInserIntoCollection,[novoCustoTotal,novaQtdTotal])

  //   }

  //   this.colecaoSUPERData(idColecao)

  // }
  static async decrementarCarta(id, idCarta) {
    const query = util.promisify(db.query).bind(db)
    try {
      const carta = await query(
        'SELECT * FROM carta_colecao WHERE idColecao = (?) AND idCarta = (?)',
        [id, idCarta]
      )

      if (carta.length != 0) {
        let novaQuantidadeCarta = carta[0].qtdCarta - 1
        if (novaQuantidadeCarta <= 0) {
          query(
            'DELETE FROM carta_colecao WHERE idColecao = (?) AND idCarta = (?)',
            [id, idCarta]
          )
        } else {
          query(
            'UPDATE carta_colecao SET qtdCarta = (?) WHERE idColecao = (?) AND idCarta = (?)',
            [novaQuantidadeCarta, id, idCarta]
          )
        }
      }
      const cartaDados = await query(
        'SELECT * FROM carta WHERE id = (?)',
        idCarta
      )
      // this.atualizarColecao(cartaDados[0], id, -1)
      // const qtdColecao = await query("SELECT totalCards FROM colecao WHERE id = (?)",id)
      // await query("UPDATE colecao SET totalCards = (?) WHERE id = (?)",[(qtdColecao[0].totalCards-1), id])

      await this.colecaoSUPERData(id)
    } catch (err) {
      console.log(err)
    }
  }

  static async incrementarCarta(id, idCarta) {
    const query = util.promisify(db.query).bind(db)
    try {
      const carta = await query(
        'SELECT * FROM carta_colecao WHERE idColecao = (?) AND idCarta = (?)',
        [id, idCarta]
      )

      if (carta.length != 0) {
        let novaQuantidadeCarta = carta[0].qtdCarta + 1
        query(
          'UPDATE carta_colecao SET qtdCarta = (?) WHERE idColecao = (?) AND idCarta = (?)',
          [novaQuantidadeCarta, id, idCarta]
        )
      }
      const cartaDados = await query(
        'SELECT * FROM carta WHERE id = (?)',
        idCarta
      )
      // this.atualizarColecao(cartaDados[0], id, 1)
      // const qtdColecao = await query("SELECT totalCards FROM colecao WHERE id = (?)",id)
      // await query("UPDATE colecao SET totalCards = (?) WHERE id = (?)",[(qtdColecao[0].totalCards+1), id])
      await this.colecaoSUPERData(id)
    } catch (err) {
      console.log(err)
    }
  }
  static async deletarCarta(id, idCarta) {
    const query = util.promisify(db.query).bind(db)

    try {
      const carta = await query(
        'SELECT * FROM carta_colecao WHERE idColecao = (?) AND idCarta = (?)',
        [id, idCarta]
      )

      if (carta.length != 0) {
        query(
          'DELETE FROM carta_colecao WHERE idColecao = (?) AND idCarta = (?)',
          [id, idCarta]
        )
        const cartaDados = await query(
          'SELECT * FROM carta WHERE id = (?)',
          idCarta
        )
        // this.atualizarColecao(cartaDados[0], id, -carta[0].qtdCarta)
        // const qtdColecao = await query("SELECT totalCards FROM colecao WHERE id = (?)",id)
        // await query("UPDATE colecao SET totalCards = (?) WHERE id = (?)",[(qtdColecao[0].totalCards - carta[0].qtdCarta), id])

        await this.colecaoSUPERData(id)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = ColecaoServico
