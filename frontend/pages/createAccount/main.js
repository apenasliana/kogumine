
function getDados(){
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    console.log(username, email,senha)

    if(username =="" && email=="" && senha==""){
        document.getElementById("email").classList.add('loginError');
        document.getElementById("senha").classList.add('loginError');
        document.getElementById("username").classList.add('loginError');
        document.getElementById("loginERROR").classList.remove('display-none')


    }else{
        criarConta(username,email,senha)

    }
}

async function criarConta(username,email,senha){

    const result = await fetch("http://localhost:3000/usuarios", {method: "POST",headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'},body:JSON.stringify({"username" :username, "email": email,"senha":senha})})
    if(result.status == 200){
        window.location.href = '../../index.html'

    }else{
        document.getElementById("email").classList.add('loginError');
        document.getElementById("senha").classList.add('loginError');
        document.getElementById("username").classList.add('loginError');
        document.getElementById("loginERROR").classList.remove('display-none')

    }
}




document.getElementById("username").addEventListener("click",event =>{
    document.getElementById("username").classList.remove('loginError');
})


document.getElementById("email").addEventListener("click",event =>{
    document.getElementById("email").classList.remove('loginError');
})
document.getElementById("senha").addEventListener("click",event =>{
    document.getElementById("senha").classList.remove('loginError');
})