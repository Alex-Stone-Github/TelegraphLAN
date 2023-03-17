import asyncio
from websockets import serve
import json

"""
There will be a list of entities that is sent
There will be a list of world changes that is sent
"""
entities = [
    {
        "position": {
            "x": 30,
            "y": 30,
        },
        "size": {
            "x": 30,
            "y": 30,
        },
    }
]

async def handle(websocket):
    async for message in websocket:
        print(message)
        await websocket.send(json.dumps(entities))

async def main():
    async with serve(handle, "localhost", 8000):
        await asyncio.Future()

asyncio.run(main())