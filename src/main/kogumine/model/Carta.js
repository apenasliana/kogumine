class Carta{
    idCarta
    nome
    raridade
    preco
    

    constructor(nome,raridade, preco){
        this.nome = nome
        this.raridade = raridade
        this.preco = preco
    }


    // Getters and Setters

    getIdCarta(){
        return this.idCarta
    }
    setIdCarta(novoIdCarta){
        if (novoIdCarta === ''){
            throw 'Escreva um nome de Carta'
        }
        this.idCarta = novoIdCarta
    }

    getNome(){
        return this.nome
    }
    setNome(novoNome){
        if (novoNome === ''){
            throw 'Escreva um nome'
        }
        this.nome = novoNome
    }

    getRaridade(){
        return this.raridade
    }
    setRaridade(novoRaridade){
        if (novoRaridade === ''){
            throw 'Raridade invalida'
        }
        this.raridade = novoRaridade
    }

    getIdExterno(){
        return this.idExterno
    }
    setIdExterno(novoIdExterno){
        if (novoIdExterno === ''){
            throw 'idExterno invalido'
        }
        this.idExterno = novoIdExterno
    }

    getPreco(){
        return this.preco
    }
    setPreco(novoPreco){
        if (novoPreco === ''){
            throw 'preco invalido'
        }
        this.preco = novoPreco
    }
}

module.exports = Carta