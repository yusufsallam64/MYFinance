import requests 
from bs4 import BeautifulSoup
import time;
import math;


ticker = input("Input Ticker: ")

URL = "https://finance.yahoo.com/quote/"

ms = time.time() * 1000
page = requests.get(URL + ticker.upper())


soup = BeautifulSoup(page.content, 'html.parser')

results = soup.find(id="quote-header-info")

try:
    text = results.find('div', class_="D(ib) Mend(20px)")
except Exception:
    print("Invalid Ticker!")
    exit()

price = ""
text = str(text)
for i in range(len(text) - 4):
    if text[i] == '=' and text[i + 1] == '"' and text[i+2] == '5' and text[i+3] == "0":
        x = 6
        while text[i + x] != "<":
            price += text[i + x]
            x += 1
        break

ms2 = time.time() * 1000
print("Price: $" + price + "\nTime Taken: " + str(math.ceil(ms2 - ms)) + " ms")

