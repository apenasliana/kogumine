const db = require('../../../../server/database.js')
const util = require('util')

class BaralhoServico {
  static async postBaralho(baralho) {
    const query = util.promisify(db.query).bind(db)

    const sqlInsert =
      'INSERT INTO baralho (nome,idUsuario,custoTotal,numCartas,qtdGostei) VALUES (?,?,?,?,0)'

    try {
      const newBaralho = await query(sqlInsert, [
        baralho.nome,
        baralho.idUsuario,
        baralho.custoTotal,
        baralho.numCartas
      ])
      const idBaralho = newBaralho.insertId
      // console.log(baralho.listaCartas)
      baralho.listaCartas.forEach(async carta => {
        const cartaCadastrada = await query(
          'SELECT * FROM carta WHERE nome = (?)',
          [carta.nome]
        )
        if (cartaCadastrada.length == 0) {
          //A carta nao está cadastrada, cadastrar e dps inserir no baralho
          const sqlInsert =
            'INSERT INTO carta (nome,raridade,preco) VALUE (?,?,?)'

          const resulte = await query(sqlInsert, [
            carta.nome,
            carta.raridade,
            carta.preco
          ])
          const idCarta = resulte.insertId
          const cartaExiste = await query(
            'SELECT * FROM carta_baralho WHERE idCarta = (?) AND idBaralho = (?) ',
            [idCarta, idBaralho]
          )
          if (cartaExiste.length != 0) {
            let novaQtdCarta =
              parseInt(cartaExiste[0].qtdCarta) + parseInt(carta.qtdCarta)
            await query(
              'UPDATE carta_baralho SET qtdCarta = (?) WHERE idCarta = (?) AND idBaralho = (?)',
              [novaQtdCarta, idCarta, idBaralho]
            )
            // console.log('if 1')
            // await this.colecaoSUPERData(idColecao)
          } else {
            const resultado = await query(
              'INSERT INTO carta_baralho (idCarta,idBaralho,qtdCarta) VALUE (?,?,?)',
              [idCarta, idBaralho, carta.qtdCarta]
            )
            // console.log('else 1')
            // await this.colecaoSUPERData(idColecao)

            return resultado
          }
        } else {
          const idCarta = cartaCadastrada[0].id
          // console.log('cardID:', idCarta)
          //atualizar dados da carta
          // this.atualizarDadosCarta(carta, idCarta)

          const cartaExiste = await query(
            'SELECT * FROM carta_baralho WHERE idCarta = (?) AND idBaralho = (?) ',
            [idCarta, idBaralho]
          )
          if (cartaExiste.length != 0) {
            let novaQtdCarta =
              parseInt(cartaExiste[0].qtdCarta) + parseInt(carta.qtdCarta)
            await query(
              'UPDATE carta_baralho SET qtdCarta = (?) WHERE idCarta = (?) AND idBaralho = (?)',
              [novaQtdCarta, idCarta, idBaralho]
            )
            // console.log('if 2')
            // this.atualizarColecao(carta, idColecao,qtdCarta)//
          } else {
            const resulte = await query(
              'INSERT INTO carta_baralho (idCarta,idBaralho,qtdCarta) VALUE (?,?,?)',
              [idCarta, idBaralho, carta.qtdCarta]
            )
            // await this.colecaoSUPERData(idColecao)
            // console.log(resulte)
            return resulte
          }

          // await this.colecaoSUPERData(idColecao)
        }
      })

      // await baralho.listaCartas.forEach(async element => {
      //   const result = await query('SELECT nome FROM carta WHERE nome = (?)', [
      //     element.nome
      //   ])
      //   console.log(result)

      //   if (result.length == 0) {
      //     const sqlInsert =
      //       'INSERT INTO carta (nome,raridade,preco) VALUE (?,?,?)'

      //     const resulte = await query(sqlInsert, [
      //       element.nome,
      //       element.raridade,
      //       element.preco
      //     ])
      //     console.log(resulte)
      //     const idCarta = resulte.insertId

      //     const resultado = await query(
      //       'INSERT INTO carta_baralho (idCarta,idBaralho) VALUE (?,?)',
      //       [idCarta, newBaralho.insertId]
      //     )
      //   } else {
      //     const idCarta = result[0].id
      //     const resulte = await query(
      //       'INSERT INTO carta_baralho (idCarta,idBaralho) VALUE (?,?)',
      //       [idCarta, newBaralho.insertId]
      //     )
      //   }
      // })
      return newBaralho
    } catch (err) {
      return err
    }
  }

  static async deleteBaralho(idBaralho, idUsuario) {
    const query = util.promisify(db.query).bind(db)

    const sqlDelete = 'DELETE FROM baralho WHERE id = ? AND idUsuario = ?'
    try {
      const result = await query(sqlDelete, [idBaralho, idUsuario])

      // const cartasDoBaralho =
      //   await query(`SELECT * FROM (SELECT idCarta,qtdCarta FROM carta_baralho WHERE idBaralho = ${idUsuario}) Res1
      // LEFT JOIN carta on Res1.idCarta = carta.id`)
      // const sqlDeleteCards =
      //   'DELETE FROM carta_baralho WHERE idUsuario = ? AND idCarta = ?'
      // cartasDoBaralho.forEach(async carta => {
      //   await query(sqlDeleteCards, idUsuario, carta.idCarta)
      // })
      return result
    } catch (err) {
      return err
    }
  }

  static async putBaralho(baralho, idBaralho) {
    const query = util.promisify(db.query).bind(db)

    const sqlUpdate =
      'UPDATE baralho SET nome = ?, custoTotal = ?, numCartas = ? WHERE id = ? AND idUsuario = ?'

    try {
      const result = await query(sqlUpdate, [
        baralho.nome,
        baralho.custoTotal,
        baralho.numCartas,
        idBaralho,
        baralho.idUsuario
      ])
      return result
    } catch (err) {
      return err
    }
  }

  static async getBaralho(idBaralho) {
    const query = util.promisify(db.query).bind(db)

    const sqlSelectBaralho = 'SELECT * FROM baralho WHERE id = (?)'
    try {
      const result = await query(sqlSelectBaralho, idBaralho)
      return result
    } catch (err) {
      return err
    }
  }

  static async getBaralhosUsuario(idUsuario) {
    const query = util.promisify(db.query).bind(db)
    // console.log(idUsuario)
    const sqlSelectBaralho = 'SELECT * FROM baralho WHERE idUsuario = (?)'
    try {
      const result = await query(sqlSelectBaralho, idUsuario)
      // console.log(result)
      return result
    } catch (err) {
      return err
    }
  }

  static async listBaralho(idBaralho) {
    const query = util.promisify(db.query).bind(db)

    const sqlBaralhoDados = 'SELECT * FROM baralho WHERE id = (?)'
    try {
      const baralhoDados = await query(sqlBaralhoDados, idBaralho)
      return baralhoDados
    } catch (err) {
      return err
    }
  }

  static async getBaralhoDados(idBaralho) {
    const query = util.promisify(db.query).bind(db)
    const sqlSelectBaralho =
      'SELECT baralho.*,carta.* FROM baralho JOIN carta_baralho ON carta_baralho.idBaralho = baralho.id JOIN carta ON carta.id = carta_baralho.idCarta WHERE baralho.id = (?)'
    try {
      const result = await query(sqlSelectBaralho, idBaralho)
      return result
    } catch (err) {
      return err
    }
  }
}

module.exports = BaralhoServico
