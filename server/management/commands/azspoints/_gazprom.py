cookies = {}

headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json;charset=UTF-8',
    'User-Agent': 'test',
}

json_data = {
    'open': False,
    'wash': False,
    'AZSShopTypeID': False,
    'services': {
    'car': {}, 'payment': {}, 'person': {}, 'station': {}
    },
}

url = 'https://gpnbonus.ru/api/stations/list'

def get_services(dic):
    services = []
    for key1 in list(dic):
        for key2 in dic[key1]:
            services.append(dic[key1][key2])
    return services

def one_part(item):
    azs = {
        "lat": item["latitude"],
        "lon": item["longitude"],
        "address": "г. {}, {}".format(item["city"], item['address'] ),
        "number": item["id"]
    }
    fuels = []
    if "oils" in item: 
        for fuel in item["oils"]:
            if "price" in fuel:
                if "price" in fuel["price"]:
                    dic = {
                        "type": fuel["id"],
                        "price": fuel["price"]["price"],
                        "discount_price": fuel["price"]["price"]
                    }
                    fuels.append(dic)
    features = []
    if 'services' in item:
        services = item['services']
        features  = get_services(services)
    return {
        "azs": azs,
        "fuels": fuels,
        "features": features}  


def get_data(res):
    stations = res['stations']
    data = [one_part(item) for item in stations]
    return data 


async def post_gazprom(session):   
    async with session.post(url, 
                            headers=headers,
                            cookies=cookies,
                            json=json_data) as resp:
        res = await resp.json(content_type='text/html')
        return get_data(res)
    
fuel_types = {
    12: "АИ 95",
    21: "АИ 98",
    61: "А 76/80",
    62: 'АИ 95',
    372: 'ДТ',
    373: 'ГАЗ',
    374: 'ДТ',
    421: "АИ 95",
    422: "АИ 98",
    423: 'ДТ',
    424: 'ДТ',
    431: 'АИ 92',
    461: 'ДТ',
    511: 'ДТ',
    512: 'ДТ',
    521: 'ДТ',
    531: 'КПГ',
    541: 'ДТ',
    100032: 'АИ 100',
    100033: 'АИ 92',
    100034: "АИ 95",
    100036: 'АИ 100'}


if __name__ == "__main__":
    import requests
    json_data_test = {
    'open': False,
    'wash': False,
    'AZSShopTypeID': False,
    'services': {'station':{}}
}
    response = requests.post(url, cookies=cookies, headers=headers, json=json_data_test)
    print(response.json())
