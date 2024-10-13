import asyncio
from websockets import serve
import threading




def flask():
    from flask import Flask
    from flask import send_file

    app = Flask(__name__)

    @app.route("/")
    def index():
        with open("index.html", "r", encoding="utf-8") as file:
            return file.read()

    @app.route("/script.js")
    def script():
        with open("script.js", "r", encoding="utf-8") as file:
            return file.read()

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
    async with serve(echo, "192.168.40.159", 8765):
        await asyncio.get_running_loop().create_future()  # run forever


threading.Thread(target=flask).start()
asyncio.run(main())
