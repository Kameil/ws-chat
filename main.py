# websocket ai


import asyncio
from websockets import serve
import threading




def flaskserver():
    from flask import Flask
    from flask import send_file

    app = Flask(__name__)

    @app.route("/")
    def index():
        with open("index.html", "r", encoding="utf-8") as file:
            return file.read()

    @app.route("/script.js")
    def script():
        return send_file("script.js", "text/javascript")
    @app.route("/error.html")
    def error():
        return send_file("error.html")

    @app.route("/style.css")
    def style():
        return send_file("style.css")

    app.run(host="0.0.0.0", port="2020")
# Lista global para armazenar conexões ativas
connected_clients = set()

async def echo(websocket):
    print("Novo cliente")
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            # Cria tarefas para enviar a mensagem a todos os clientes conectados
            tasks = [client.send(message) for client in connected_clients]
            await asyncio.gather(*tasks)  # Aguarda todas as tarefas
    except Exception as e:
        print(f"Um erro ocorreu: {e}")
    finally:
        # Remove o cliente da lista quando a conexão é fechada
        connected_clients.remove(websocket)

async def main():
    async with serve(echo, "0.0.0.0", 8765):
        await asyncio.get_running_loop().create_future()  # run forever


# threading.Thread(target=flaskserver).start()
asyncio.run(main())
