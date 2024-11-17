
import asyncio
import websockets
from websockets import serve
import threading

import websockets.legacy
import websockets.legacy.server




connected_clients = set()

async def echo(websocket: websockets.legacy.server.WebSocketServerProtocol):
    if websocket.origin not in ["https://kameil.github.io", "https://chatdosdesenrolado.netlify.app"]:
        await websocket.close(reason="voce nao esta no chat")
        print(f"acesso bloqueado: websocket acessado de uma origem desconhecida: {websocket.origin}")
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
    print("iniciado")
    async with serve(echo, "0.0.0.0", 8765):
        await asyncio.get_running_loop().create_future()  # run forever


# threading.Thread(target=flaskserver).start()
asyncio.run(main())