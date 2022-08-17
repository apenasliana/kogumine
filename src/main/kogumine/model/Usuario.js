

class Usuario{
    idUsuario
    username
    senha
    email

    constructor(username,senha,email){
        this.username = username
        this.senha = senha
        this.email = email

    }

    criarBaralho(){
        return 
    }
    removerBaralho(){
        return 
    }
    
    
    // Getters and Setters

    getIdUsuario(){
        return this.idUsuario
    }
    setIdUsuario(novoIdUsuario){
        if (novoIdUsuario === ''){
            throw 'IdUsuario invalido'
        }
        this.idUsuario = novoIdUsuario
    }

    getUsername(){
        return this.username
    }
    setUsername(novoUsername){
        if (novoUsername === ''){
            throw 'Escreva um username valido'
        }
        this.username = novoUsername
    }

    getSenha(){
        return this.senha
    }
    setSenha(novaSenha){
        if (novaSenha === ''){
            throw 'senha invalida'
        }
        this.senha = novaSenha
    }

    getEmail(){
        return this.email
    }
    setEmail(novoEmail){
        if (novoEmail === ''){
            throw 'email invalido'
        }
        this.email = novoEmail
    }
}


module.exports = Usuario