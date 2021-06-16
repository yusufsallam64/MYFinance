import requests 
from bs4 import BeautifulSoup
import time
import math
import random
import json
import sys

values = []

# accessable as list, to get values of poopoo you just do poopoo[0] for ticker [1] for price [2] for shares
lines = sys.stdin.readlines()
papaya = json.loads(lines[0])
# poopoo = papaya[0].split()

URL = "https://finance.yahoo.com/quote/"
# papaya = papaya[0]

for datarow in papaya:
    datarow = datarow.split()
    print(type(datarow))
    try:
        # lines = sys.stdin.readlines()
        page = requests.get(URL + datarow[0])
        soup = BeautifulSoup(page.content, 'html.parser')
        priceText = soup.find('span', class_='Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)')
        values.append((float((priceText.text)) - float(datarow[1])) * float(datarow[2])) 

    except Exception:
        print(Exception)
        # return "Invalid Ticker!"
        # print("err", flush = True, end = '')


    #values: price, change, name
    # return values 
    # print(values, flush=True, end='')
print(values)