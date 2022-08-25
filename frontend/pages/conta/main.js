function getNovaSenha(){
    const senha = document.getElementById("novaSenha").value

    if(senha == ""){

        document.getElementById("novaSenha").classList.add('loginError');
        document.getElementById("loginERROR").classList.remove('display-none')
    }else{
        alterarSenha(senha)
    }
}

function getNovoUsername(){
    const username = document.getElementById("novoUsuario").value

    if(username == ""){
        document.getElementById("novoUsuario").classList.add('loginError');
        document.getElementById("loginERROR").classList.remove('display-none')


    }else{
        alterarUsername(username)

    }
}
function getNovoEmail(){
    const email = document.getElementById("novoEmail").value

    if(email == ""){
        document.getElementById("novoEmail").classList.add('loginError');
        document.getElementById("loginERROR").classList.remove('display-none')


    }else{
        alterarEmail(email)

    }
}

async function  deletarConta(){
    const Usuario = JSON.parse(localStorage.getItem('Usuario'))

    const result = await fetch(`http://localhost:3000/usuarios/${Usuario.id}`, {method: "DELETE",headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'}})
    if(result.status == 200){
        alert('Conta deletada!')
        window.location.href = '../../index.html'



    }else{
        document.getElementById("novaSenha").classList.add('loginError');
        document.getElementById("loginERROR").classList.remove('display-none')

    }

}

async function alterarSenha(senha){
    const Usuario = JSON.parse(localStorage.getItem('Usuario'))

    const result = await fetch(`http://localhost:3000/usuarios/senha/${Usuario.id}`, {method: "PUT",headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'},body:JSON.stringify({"senha":senha})})
    if(result.status == 200){
        alert("senha alterada")

    }else{
        document.getElementById("novaSenha").classList.add('loginError');
        document.getElementById("loginERROR").classList.remove('display-none')

    }
}

async function alterarUsername(username){
    const Usuario = JSON.parse(localStorage.getItem('Usuario'))


    const result = await fetch(`http://localhost:3000/usuarios/user/${Usuario.id}`, {method: "PUT",headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'},body:JSON.stringify({"username" :username})})
    
    
    if(result.status == 200){
        alert("username alterado")


    }else{
        document.getElementById("novoUsuario").classList.add('loginError');
        document.getElementById("loginERROR").classList.remove('display-none')

    }
}
async function alterarEmail(email){
    const Usuario = JSON.parse(localStorage.getItem('Usuario'))


    const result = await fetch(`http://localhost:3000/usuarios/email/${Usuario.id}`, {method: "PUT",headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'},body:JSON.stringify({"email" :email})})
    
    
    if(result.status == 200){
        alert("email alterado")


    }else{
        document.getElementById("novoEmail").classList.add('loginError');
        document.getElementById("loginERROR").classList.remove('display-none')

    }
}


document.getElementById("novoUsuario").addEventListener("click",event =>{
    document.getElementById("novoUsuario").classList.remove('loginError');
})

document.getElementById("novaSenha").addEventListener("click",event =>{
    document.getElementById("novaSenha").classList.remove('loginError');
})
document.getElementById("novoEmail").addEventListener("click",event =>{
    document.getElementById("novoEmail").classList.remove('loginError');
})
