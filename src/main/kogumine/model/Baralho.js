class Baralho{
    idBaralho
    nome
    idUsuario
    custoTotal
    numCartas
    listaCartas
    qtdGostei

    constructor(nome, idUsuario,custoTotal, numCartas, listaCartas){
        this.nome = nome
        this.idUsuario = idUsuario
        this.custoTotal = custoTotal
        this.numCartas = numCartas
        this.qtdGostei = 0
        this.listaCartas= listaCartas
    }

    adicionarCarta(){
        return 
    }
    removerCarta(){
        return 
    }
    listarCartas(){
        return 
    }
    adicionarGostei(){
        return 
    }
    removerGostei(){
        return 
    }





    // Getters and Setters

    getIdBaralho(){
        return this.idBaralho
    }
    setIdBaralho(novoIdBaralho){
        if (novoIdBaralho === ''){
            throw 'Escreva um nome de baralho'
        }
        this.idBaralho = novoIdBaralho
    }

    getNome(){
        return this.nome
    }
    setNome(novoNome){
        if (novoNome === ''){
            throw 'Escreva um nome valido'
        }
        this.nome = novoNome
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

    getListaCartas(){
        return this.listaCartas
    }
    setListaCartas(novoListaCartas){
        if (novoListaCartas === ''){
            throw 'envie uma lista de cartas valida'
        }
        this.listaCartas = novoListaCartas
    }

    getQtdGostei(){
        return this.qtdGostei
    }
    setQtdGostei(novaQtdGostei){
        if (novaQtdGostei === ''){
            throw 'envie um gostei valido'
        }
        this.qtdGostei = novaQtdGostei
    }
}

module.exports = Baralho