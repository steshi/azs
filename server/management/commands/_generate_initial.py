import asyncio
from aiohttp import ClientSession

from server.management.commands.azspoints import _gazprom as gazprom
from server.management.commands.azspoints import _tatneft as tatneft

# from azspoints import _gazprom as gazprom
# from azspoints import _tatneft as tatneft

# import json
# import random
# from datetime import datetime, timedelta


dic_azs = {
    "gazprom": gazprom.post_gazprom,
    "tatneft": tatneft.get_tatneft
}

async def bulk_azs(order_station):
    async with ClientSession() as session:
        tasks = []
        for azs_item in order_station: # ["tatneft", "gazprom"]
            tasks.append(asyncio.ensure_future(dic_azs[azs_item](session)))
        results = await asyncio.gather(*tasks)
        return results


if __name__ == "__main__":
    order_station = ["tatneft", "gazprom"]
    print(asyncio.run(bulk_azs(order_station)))
        


    
       