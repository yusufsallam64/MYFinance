import requests 
from bs4 import BeautifulSoup
import time
import math
import random
import json
import sys


# time.sleep(random.random() * 5)
URL = "https://finance.yahoo.com/quote/"
values = []

try:
    lines = sys.stdin.readlines()
    page = requests.get(URL + json.loads(lines[0]))
    soup = BeautifulSoup(page.content, 'html.parser')
    priceText = soup.find('span', class_='Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)')
    values.append(priceText.text)
except Exception:
    # return "Invalid Ticker!"
    print("Oopsie")

try:
    changeText = soup.find('span', class_='Trsdu(0.3s) Fw(500) Pstart(10px) Fz(24px) C($negativeColor)')
    values.append(changeText.text)
except Exception:
    changeText = soup.find('span', class_='Trsdu(0.3s) Fw(500) Pstart(10px) Fz(24px) C($positiveColor)')
    values.append(changeText.text)

nameText = soup.find('h1', class_="D(ib) Fz(18px)")
values.append(nameText.text)

#values: price, change, name
# return values 
print(values, flush=True, end='')

