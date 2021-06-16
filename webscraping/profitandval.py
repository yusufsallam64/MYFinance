import requests 
from bs4 import BeautifulSoup
import json
import sys

values = []

# accessible as list, to get values of poopoo you just do poopoo[0] for ticker [1] for price [2] for shares
lines = sys.stdin.readlines()
papaya = json.loads(lines[0])
currval = 0
URL = "https://finance.yahoo.com/quote/"
for datarow in papaya:
    datarow = datarow.split()
    try:
        # lines = sys.stdin.readlines()
        page = requests.get(URL + datarow[0])
        soup = BeautifulSoup(page.content, 'html.parser')
        priceText = soup.find('span', class_='Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)')
        currval = priceText.text
        pba = datarow[1]
        amount = datarow[2]
        try:
            currval = currval.replace(',', '')
            currval = float(currval)
        except Exception:
            print("bruh seriously")

        values.append((float(currval) - float(pba)) * float(amount)) 

    except Exception:
        print(Exception)
print(sum(values))
print(float(currval) * float(datarow[2]))
print(sum(values) + " " + (float(currval) * float(datarow[2])), flush = True, end='')