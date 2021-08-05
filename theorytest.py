# -*- coding: utf-8 -*-
"""
Created on Thu Jan 21 15:25:23 2021

@author: monkey
"""

import execjs
import time
import json
import requests
import random
import urllib.parse as parse
from bs4 import BeautifulSoup as bs
print("env:",execjs.get().name)
fp=open("D://snake//知乎//x-zse-86.js","rt")
jsdata=fp.read()
fp.close()
js=execjs.compile(jsdata)
data=json.dumps({'Hm_lpvt':'1614435465','Hm_lvt':'1614431231,1614433116,1614435465'})
data=js.call("Hminf",data)
print(data)

