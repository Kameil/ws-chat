const socket = new WebSocket('ws://192.168.40.159:8765');
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
