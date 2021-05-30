import requests 
from bs4 import BeautifulSoup
import time;
import math;


# ticker = input("Input Ticker: ")
ticker = input("Ticker: ")
URL = "https://finance.yahoo.com/quote/"

ms = time.time() * 1000

page = requests.get(URL + ticker.upper())
soup = BeautifulSoup(page.content, 'html.parser')

try:
    priceText = soup.find('span', class_='Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)')
    price = priceText.text
except Exception:
    print("Invalid Ticker!")
    exit()

try:
    changeText = soup.find('span', class_='Trsdu(0.3s) Fw(500) Pstart(10px) Fz(24px) C($negativeColor)')
    change = changeText.text
except Exception:
    changeText = soup.find('span', class_='Trsdu(0.3s) Fw(500) Pstart(10px) Fz(24px) C($positiveColor)')
    change = changeText.text

nameText = soup.find('h1', class_="D(ib) Fz(18px)")
name = nameText.text

ms2 = time.time() * 1000
print(name + "\nPrice: $" + price + "\nChange: " + change + "\nTime Taken: " + str(math.ceil(ms2 - ms)) + " ms")

