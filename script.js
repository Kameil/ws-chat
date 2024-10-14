const socket = new WebSocket('wss://pkf12q20-8765.brs.devtunnels.ms');
const sendmessage = document.getElementById("sendmessage");
const loginform = document.getElementById("login")
const loginsct = document.getElementById("bglogin")
const container = document.getElementById("container")


const userid = Math.floor(Math.random() * 1000); 

loginform.addEventListener("submit", (event) => {
    event.preventDefault()
    const nomeinput = document.getElementById("username")
    nome = nomeinput.value
    loginsct.style.display = "none"
    container.style.display = "flex"

})

sendmessage.addEventListener("submit", (event) => {
    event.preventDefault();
    const mensagem = document.getElementById('message');
    const mensagemJson = {
        id: userid,
        nome: nome,
        mensagem: mensagem.value
    };
    socket.send(JSON.stringify(mensagemJson));

    mensagem.value = "";
});

socket.onerror = (error) => {
    let url = window.location.href
    let urlsemocoiso = url.replace("index.html", "")
    window.location.href = urlsemocoiso + "/error.html"
}

socket.onclose = () => {
    let url = window.location.href
    let urlsemocoiso = url.replace("index.html", "")
    window.location.href = urlsemocoiso + "/error.html"
}

socket.onmessage = function(event) {
    const messagescontainer = document.getElementById("messages");
    const resposta = JSON.parse(event.data);
    if (parseFloat(resposta.id) !== parseFloat(userid)) {
        const div = document.createElement("div")
        div.id = "msdozoto"
        const nome = document.createElement("h6")
        nome.innerHTML = resposta.nome
        const message = document.createElement("p")
        message.innerHTML = resposta.mensagem
        div.appendChild(nome)
        div.appendChild(message)
        const messagesdiv = document.getElementById("messages")
        messagesdiv.appendChild(div)
    }else{
        const div = document.createElement("div")
        div.id = "mensagem"
        const message = document.createElement("p")
        message.innerHTML = resposta.mensagem
        div.appendChild(message)
        messagescontainer.appendChild(div)
    }
    window.scrollTo(0, document.body.scrollHeight);
    console.log(resposta);
};

// login form animations


// pegar os elemento
const nameinput = document.getElementById("username")
const loginbtn = document.getElementById("loginbtn")
const logintitle = document.getElementById("logintitle")

// quando clicar no input

nameinput.addEventListener("focus", () => {
    logintitle.style.color = "white"
    nameinput.style.backgroundColor = "white"
})
nameinput.addEventListener("blur", () => {
    logintitle.style.color = "rgb(131, 130, 130)"
})
nameinput.addEventListener("keypress", (event) => {
    logintitle.style.color = "white"
    nameinput.style.backgroundColor = "white"
})

// quando hover no botao ai
loginbtn.addEventListener('mouseover', () => {
    logintitle.style.color = "rgb(131, 130, 130)"
    nameinput.style.backgroundColor = "darkgray"
});

// Evento para detectar quando o mouse sai do elemento
// loginbtn.addEventListener('mouseout', () => {
//     console.log('O mouse saiu do elemento.');
// });

