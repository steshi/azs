headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    'Connection': 'keep-alive',
    'User-Agent': 'test',
}

url = 'https://api.gs.tatneft.ru/api/v2/azs/'

feature_types = {14:"Магазин", 
    15:"Туалет",
    3: "Кафе",
    2: "Подкачка шин",
    16: "Шиномонтаж",
    4: "Автосервис",
    8: "Долив омывающей жидкости",
    17: "Зарядка мобильных устройств",
    18: "Пылесос",
    10: "Мойка",
    1: "Заправщик",
    9: "Wi-Fi",
    5: "Парковка",
    19: "Парковка грузовиков",
    7: "Банкомат",
    13:"Игровая комната"}

fuel_types = {
    5:"АИ 95",
    2:"АИ 92",
    3:"АИ 92",
    10:"ДТ",
    9:"ДТ",
    13:"Газ",
    6:"АИ 98",
    7:"АИ 98",
    20:"ДТ",
    19:"КПГ"}

def isNone (val, ifNone):
    if val == None: return ifNone
    else: return val 
    

def one_part(item):
    azs = {
        "lat": item["lat"],
        "lon": item["lon"],
        "address": item["address"],
        "number": item["number"]
    }
    fuels = []
    if "fuel" in item: 
        fuels = [{
            "type": fuel["fuel_type_id"],
            "price": fuel["price"],
            "discount_price": isNone (fuel["discount_price"], fuel["price"]) 
            } for fuel in item["fuel"]]
    features = []
    if 'features' in item:
        features = [feature_types[feat] for feat in item['features']]         #[1, 3, 5, 8, 10, 14, 15, 18]
    return {
        "azs": azs,
        "fuels": fuels,
        "features": features}      


def get_data(res):
    data = []
    for item in res:
        if "data" in res:
            wdata = res["data"]
            data = [one_part(item) for item in wdata]
    return data


async def get_tatneft(session):
    async with session.get(url) as resp:
        res = await resp.json()
        return get_data(res)   



if __name__ == "__main__":
    import requests
    response = requests.get(url, headers=headers)
    print(response.json())
