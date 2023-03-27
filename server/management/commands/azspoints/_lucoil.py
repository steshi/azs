import requests

headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    'Connection': 'keep-alive',
    'User-Agent': 'test',
}
url = 'https://auto.lukoil.ru/api/cartography/GetSearchObjects'

if __name__ == "__main__":
    response = requests.get(url, headers=headers)
    print(response.json())
