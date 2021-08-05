# -*- coding: utf-8 -*-
"""
Created on Sun Jan 31 21:18:23 2021

@author: monkey
"""
import json
import os
os.system("title = 回复评论")
os.system("mode con cols=84")
fp=open("./childcomment.json",'r',encoding="utf-8")
data=json.load(fp)
fp.close()
print("-+%s+-"%('-'*80))
for item in data['data']:
    if item['type']=="comment":
        print("  ",item['author']," 回复 ",item['rely'])
        print(item['created_time'].rjust(80))
        print('  ',item['content'])
        print("          点赞:",item['vote_count'])
        print("-+%s+-"%('-'*80))
os.system("pause")
os.system("exit")

