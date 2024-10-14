const socket = new WebSocket('wss://pkf12q20-8766.brs.devtunnels.ms');
const sendmessage = document.getElementById("sendmessage");
const loginform = document.getElementById("login")
const loginsct = document.getElementById("bglogin")
const container = document.getElementById("container")
const apagrbtn = document.getElementById("dhistory")

apagrbtn.addEventListener("click", () => {
    var divConteudo = localStorage.getItem('conteudoDiv');
    if(divConteudo) {
        localStorage.removeItem("conteudoDiv")
        const messagesdiv = document.getElementById("messages")
        messagesdiv.innerHTML = ""
        const div = document.createElement("div")
        div.id = "mensagem"
        const message = document.createElement("p")
        message.innerHTML = "Mensagens Apagadas..."
        div.appendChild(message)
        messagesdiv.appendChild(div)
    }
    
})




function salvarDiv() {
    var divConteudo = document.getElementById('messages').innerHTML;
    localStorage.setItem('conteudoDiv', divConteudo);
}


function carregarDiv() {
    var divConteudo = localStorage.getItem('conteudoDiv');
    if (divConteudo) {
        document.getElementById('messages').innerHTML = divConteudo;
        console.log("mensagens carregadas")
    } else {
        console.log("nenhuma mensagem encontrada")
    }
}

carregarDiv()


function getRandomPredefinedColor() {
    // Array com uma lista de cores predefinidas
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF9', '#F3FF33', '#7D33FF'];

    // Escolhe uma cor aleatoriamente da lista
    const randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
}

cor = getRandomPredefinedColor()

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
        mensagem: mensagem.value,
        cor: cor
    };
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(mensagemJson));
    }
    

    mensagem.value = "";
});

const statuspopup = document.getElementById("status")
const statusp = document.getElementById("statusp")
socket.onopen = () => {
    
    statuspopup.style.display = "none"
    statuspopup.style.display = "block"
    statuspopup.style.backgroundColor = 'rgb(36, 161, 36)'
    statusp.innerHTML = "Conectado"
    statuspopup.style.opacity = "0.85"
}

socket.onerror = (error) => {
    statuspopup.style.display = "block"
    statuspopup.style.backgroundColor = 'red'
    statusp.innerHTML = "ocorreu um erro!"
    statuspopup.style.animation = "l1 1s linear infinite alternate"
    

}

socket.onclose = () => {
    statuspopup.style.display = "block"
    statuspopup.style.backgroundColor = 'red'
    statusp.innerHTML = "Desconectado."
    statuspopup.style.animation = "l1 1s linear infinite alternate"
}

socket.onmessage = function(event) {
    const messagescontainer = document.getElementById("messages");
    const resposta = JSON.parse(event.data);
    if (parseFloat(resposta.id) !== parseFloat(userid)) {
        const div = document.createElement("div")
        div.id = "msdozoto"
        const nome = document.createElement("h6")
        nome.innerHTML = resposta.nome
        nome.style.color = resposta.cor
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
    salvarDiv()
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
    logintitle.style.transform = "scale(1.05)"
    nameinput.style.transform = "scale(1.05)"
    nameinput.style.backgroundColor = "white"
})
nameinput.addEventListener("blur", () => {
    logintitle.style.color = "rgb(131, 130, 130)"
    logintitle.style.transform = "scale(1)"
    nameinput.style.transform = "scale(1)"
    nameinput.style.backgroundColor = "darkgray"
})
nameinput.addEventListener("keypress", (event) => {
    logintitle.style.color = "white"
    logintitle.style.transform = "scale(1.05)"
    nameinput.style.transform = "scale(1.05)"
    nameinput.style.backgroundColor = "white"
})

// quando hover no botao ai
loginbtn.addEventListener('mouseover', () => {
    logintitle.style.color = "rgb(131, 130, 130)"
    logintitle.style.transform = "scale(1)"
    nameinput.style.transform = "scale(1)"
    nameinput.style.backgroundColor = "darkgray"
});

// Evento para detectar quando o mouse sai do elemento
// loginbtn.addEventListener('mouseout', () => {
//     console.log('O mouse saiu do elemento.');
// });

