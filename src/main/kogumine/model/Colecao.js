class Colecao{
    idColecao
    listaCartas
    idUsuario
    custoTotal
    numCartas


 


    constructor(idUsuario,custoTotal,numCartas){
        this.idUsuario  = idUsuario
        this.custoTotal = custoTotal
        this.numCartas  = numCartas
    }


    adicionarCarta(){
        return kjfahgdajksfh
    }
    removerCarta(){
        return asdkfjasd
    }
    listarCartas(){
        return asdjilfhasdlifh
    }
    buscarCartas(){
        return asdjkf
    }
    
    // Getters and Setters

    getIdColecao(){
        return this.idColecao
    }
    setIdColecao(novoIdColecao){
        if (novoIdColecao === ''){
            throw 'Escreva um nome de Colecao'
        }
        this.idColecao = novoIdColecao
    }
    
    getListaCartas(){
        return this.listaCartas
    }
    setListaCartas(novoListaCartas){
        if (novoListaCartas === ''){
            throw 'envie uma lista de cartas valida'
        }
        this.listaCartas = novoListaCartas
    }

    getIdUsuario(){
        return this.idUsuario
    }
    setIdUsuario(novoIdUsuario){
        if (novoIdUsuario === ''){
            throw 'IdUsuario invalido'
        }
        this.idUsuario = novoIdUsuario
    }

    getCustoTotal(){
        return this.custoTotal
    }
    setCustoTotal(novoCustoTotal){
        if (novoCustoTotal === ''){
            throw 'custo total invalido'
        }
        this.custoTotal = novoCustoTotal
    }

    getNumCartas(){
        return this.numCartas
    }
    setNumCartas(novoNumCartas){
        if (novoNumCartas === ''){
            throw 'envie uma lista de cartas valida'
        }
        this.numCartas = novoNumCartas
    }
}

module.exports = Colecao