function getDados(){
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    autenticar(email,senha)
}

async function autenticar(email,senha){
    const result = await fetch("http://localhost:3000/auth", {method: "POST",headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'},body:JSON.stringify({"email": email,"senha":senha})})
    if(result.status == 200){

        
        const body = await result.json()
        console.log(body)
        await localStorage.setItem("Usuario",JSON.stringify(body))
        window.location.href = './pages/home/home.html'

    }else{
        document.getElementById("email").classList.add('loginError');
        document.getElementById("senha").classList.add('loginError');
        document.getElementById("username").classList.add('loginError');
        document.getElementById("loginERROR").classList.remove('display-none')

    }

}

document.getElementById("email").addEventListener("click",event =>{
    document.getElementById("email").classList.remove('loginError');
})
document.getElementById("senha").addEventListener("click",event =>{
    document.getElementById("senha").classList.remove('loginError');
})
document.getElementById("username").addEventListener("click",event =>{
    document.getElementById("username").classList.remove('loginError');
})