# -*- coding: utf-8 -*-
"""
Created on Mon Jan 25 02:30:10 2021

@author: monkey
note: 关于每次操作之后数据的初始化没有考虑
update: 2021-2-27 22:36
note: 关于Hmlvt 时间列表 js会自动剔除大于30天的时间戳，若长时间没有使用 
      并且退出出现问题导致cookies中Hmlvt耿欣出现问题，会报 cookies typeError 
      需要手动更新Hmlvt的时间列表
      后期可以对此问题进行处理

"""
import getpass
import execjs
import json
import requests
from bs4 import BeautifulSoup as bs
import copy
import time
import urllib.parse as parse
# from pynput import keyboard
# from pynput.keyboard import Key
import re
import os
os.system('title="知乎复刻bymonkey"')
class zhihu:
    def __init__(self):
        self.headers=self.getImform("./headers.json")
        self.cookies=self.getImform("./cookies.json")
        self.logintoken=self.getImform("./logintoken.json")
        self.formEncryptJs=self.getJs("./loginencyp.js")
        self.argGetJs=self.getJs("./x-zse-86.js")
        self.signatureGetJs=self.getJs("./signature.js")
        self.proxies={'http':'http://localhost:8888','https':'https://localhost:8888'}
        self.captchaurl=['https://www.zhihu.com/api/v3/oauth/captcha?lang=en']
        self.initData=self.getInitData()
        self.xabparampb=self.getHeader()
        self.form=self.getForm()
        self.dataCache={}
        self.commentDataCache={}
        self.searchDict={'page':0}##self.getImform("D://snake//知乎//content.json")
        self.commentDict={'page':0}
        self.childComment={'isend':False,'data':[]}
        self.index=0
        self.answerId=None
        
    def captcha(self):
        dic=self.getHeader(self.captchaurl[0])
        captch=self.getCaptcha(self.captchaurl[0],dic)
        message=json.loads(captch['json'])
        self.setCookie(captch['headers']['set-cookie'],['capsion_ticket'])
        if message['show_captcha']:
            captch=self.getCaptcha(self.captchaurl[0],'PUT')
            captcha=json.loads(captch['json'])
            self.setCookie(captch['headers']['set-cookie'],['capsion_ticket'])
            return self.picture(captcha['img_base64'])#暂时还没实现通过验证码验证
        return None
    
    def chooseDetailPage(self):
        print("+%s+"%('-'*70))
        print("|","c.查看评论 ".center(30),"|","enter.返回上一级".center(27),"|")
        print("+%s+"%('-'*70))
        choose=input(":")
        if choose=="":
            self.dispatch("0040")
        elif choose=="c" or choose=="C":
            self.answerId=self.searchDict['data'][self.index]['id']
            self.dispatch("0070")
    def chooseMainOperation(self):
        self.cls()
        self.initCData()
        print('----------------------------------------------------------------',end='\n')
        print('* *                        登陆成功啦!!!!                     * *',end='\n')
        print('* *                        选择操作：                         * *',end='\n')
        print('* *                        A.搜索内容                         * *',end='\n')
        print('----------------------------------------------------------------',end='\n')
        choice=input("输入操作:\n")
        if choice=='A' or choice=='a':
            self.searchApi()
    def cleanContent(self,text):
        temp=re.sub("<p>","\n",text)
        bsobj=bs(temp,'lxml')
        if len(bsobj.get_text())!=0:
            return bsobj.get_text()
        else:
            temp=re.sub("<p>","圝",text)
            return re.sub("[^\u4E00-\u9FFF]","",temp).replace("圝","\n")
    def close(self):
        filesp=["./headers.json","./cookies.json","./logintoken.json"]
        files=[self.headers,self.cookies,self.logintoken]
        for i in range(len(filesp)):
            fp=open(filesp[i],'w',encoding="utf-8")
            json.dump(files[i],fp)
            fp.close()
        print("+%0s+"%('-'*70))
        print("**%s**"%("登出成功！！！！").center(61))
        print("+%0s+"%('-'*70))
        print("谢谢使用！！！！！！")
        time.sleep(2)
    
    def cls(self):
        os.system("clear")
    
    def commentRootDisplay(self):
        data=self.commentDict['data']
        i=0
        print("+%s+"%('-'*70))
        for item in data:
            print("%03d."%i)
            print(item['author'].ljust(40),item['created_time'].rjust(30))
            print('    ',item['content'])
            print("---赞:%d"%item['vote_count'],"       ---回复数量:%d"%item['child_comment_count'])
            print("+%s+"%('-'*70))
            i+=1
        self.commentRootOpChoose()
    
    def commentRootOpChoose(self):
        print("+%s+"%('-'*70))
        print("|","p.上一页".ljust(15),'|',"n.下一页".ljust(15),'|',"enter.返回上一级".ljust(15),'|',"0-20.查看回复".ljust(15),"|")
        print("+%s+"%('-'*70))
        choose=input(':')
        try:
            if choose=='n' or choose=='N':
                if not self.commentDict['isend']:
                    if not self.commentDataCache.get(self.commentDict['page']+1,False):
                        self.dispatch("0070")
                    else:
                        self.commentDict['page']+=1
                        self.commentDict=self.commentDataCache[self.commentDict['page']]
                        self.dispatch("0080")
                else:
                    raise Exception("这是最后一页!",self.commentDict['page'])
            elif choose=='p' or choose=="P":
                if self.commentDict['page']==1:
                    raise Exception("这是第一页",self.commentDict['page'])
                else:
                    self.commentDict['page']-=1
                    self.commentDict=self.commentDataCache[self.commentDict['page']]
                    self.dispatch("0080")
            elif choose=="":
                self.dispatch("0040")
            else:
                temp=int(choose)
                if temp>=0 and temp<=len(self.commentDict['data'])-1:
                    if self.commentDict['data'][temp]['child_comment_count']==0:
                        raise Exception("此条评论无回复")
                    else:
                        self.index=temp
                        self.filterChildComment()
                        raise Exception("加载完毕！")
                else:
                    raise Exception("评论序号超范围！")
        except Exception as e:
            print(e)
            self.commentRootOpChoose()
                
            
        
    def detailDisplay(self):
        self.cls()
        data=self.searchDict['data'][self.index]
        print("\n\n%s"%data['title'].center(70))
        print("作者:%s"%data['author'])
        print("发布:%s     更新:%s        赞同:%d            评论数:%d"%(data['created_time'],data['updated_time'],data['voteup_count'],data['comment_count']))
        print(data['content'])
        print("+%s+"%('-'*70))
        self.chooseDetailPage()
        
    def dispatch(self,operation_code):
        if operation_code=="0010":
            self.interface()
        elif operation_code=="0020":
            self.chooseMainOperation()
        elif operation_code=="0030":
            self.searchApi()
        elif operation_code=="0040":
            self.excerptPrint()
        elif operation_code=="0050":
            self.detailDisplay()
        elif operation_code=="0060":
            self.initCData()
        elif operation_code=="0070":
            self.getCommentsRoot()
        elif operation_code=="0080":
            self.commentRootDisplay()
   #     elif operation_code==:
            
        
    def encrypt(self,func,Data):
        return self.formEncryptJs.call(func,json.dumps(Data))
    def excerptPrint(self):
        self.cls()
        i=0
        for item in self.searchDict['data']:
            print("+%0s+"%('-'*70))
            print('{:02d}.'.format(i),end='')
            print(item['title'].center(72))
            print("作者:",item['author'])
            print(item['description'])
            print("赞同:",item['voteup_count'],"    评论:",item['comment_count'],"    发布:",item['created_time'])
            i+=1
        print("+%0s+"%('-'*70))  
        del i
        self.resultChoose()
    def filterChildComment(self):
        data=self.getChildComment()
        try:
            for i in data:
                Json=json.loads(i)
                self.childComment['isend']=Json['paging']['is_end']
                lis=[]
                for item in Json['data']:
                    dic={}
                    if item['type']=="comment":
                        dic['content']= self.cleanContent(item['content'])
                        dic['created_time']=self.fixedTime(item['created_time'])
                        dic['vote_count']=item['vote_count']
                        dic['author']=item['author']['member']['name'] if item['author']['role']=='normal' else item['author']['member']['name']+"[作者]"
                        dic['rely']=item['reply_to_author']['member']['name'] if item['reply_to_author']['role']=='normal' else item['reply_to_author']['member']['name']+"[作者]"
                        dic['type']="comment"
                    lis.append(dic)
                    del dic
                self.childComment['data']+=lis
                del lis
            fp=open("./childcomment.json","w",encoding="utf-8")
            fp.write(json.dumps(self.childComment))
            fp.close()
            del fp
            self.childComment={'isend':False,'data':[]}
            os.system(" open /Users/na/miniconda3/bin/python ./childcomment.py")
        except Exception as e:
            print(e)
            print("评论回复过滤错误:",e.args)
            
    def filterCommentRoot(self,j):
        data=json.loads(j)
        self.commentDict['common_counts']=data['common_counts']
        self.commentDict['isend']=data['paging']['is_end']
        self.commentDict['next']=data['paging']['next']
        lis=[]
        for item in data['data']:
            dic={}
            if item['type']=="comment":
                dic['id']=str(item['id'])
                dic['content']= self.cleanContent(item['content'])
                dic['created_time']=self.fixedTime(item['created_time'])
                dic['vote_count']=item['vote_count']
                dic['child_comment_count']=item['child_comment_count']
                #if item['author']['role']=='normal' or item['author']['role']=='author':
                dic['author']=item['author']['member']['name'] if item['author']['role']=='normal' else item['author']['member']['name']+'[作者]'
                lis.append(dic)
            del dic
        self.commentDict['data']=lis
        del lis
        self.commentDataCache[self.commentDict['page']]=self.commentDict
        self.commentRootDisplay()
    
    def filterSearch(self,j):
        data=json.loads(j)
        try:
            self.searchDict['isend']=data['paging']['is_end']
            self.searchDict['next']=data['paging']['next']
            self.searchDict['search_action_info']=data['search_action_info']
            lis=[]
            for item in data['data']:
                if item['type']=="search_result":
                    dic={}
                    try: 
                        dic['title']=re.sub("<(\/)*em>","",item['highlight']['title'])
                        dic['description']=re.sub("<(\/)*em>","",item['highlight']['description'])
                        dic['author']=item['object']['author']['name']
                        dic['comment_count']=item['object']['comment_count']
                        dic['voteup_count']=item['object']['voteup_count']
                        dic['id']=item['object']['id']
                        dic['content']=self.cleanContent(item['object']['content'])
                        try:
                            dic["question"]={
                                        'name':item['object']['question']['name'],
                                        'url':item['object']['question']['url']
                                        }
                        except:
                            dic["question"]=None
                        dic['type']=item['object']['type']
                        dic['created_time']=self.fixedTime(item['object']['created_time'])
                        dic['updated_time']=self.fixedTime(item['object']['updated_time']) if item['object']['updated_time']>0 else "未更新"
                        lis.append(dic)
                    except Exception as e:
                        print("+%0s+"%('-'*70))
                        print("|filterSearch have an err in search_result",e)
                        print("+%0s+"%('-'*70))
                    del dic
                elif item['type']=="multi_answers":
                    for key in range(len(item['object']['answers'])):
                        dic={}
                        try:
                            dic['title']=re.sub("<(\/)*em>","",item['highlight']['title'])
                            dic['description']=re.sub("<(\/)*em>","",item['highlight']['description'+'_'+str(key)])
                            dic['author']=item['object']['answers'][key]['author']['name']
                            dic['comment_count']=item['object']['answers'][key]['comment_count']
                            dic['voteup_count']=item['object']['answers'][key]['voteup_count']
                            dic['id']=item['object']['answers'][key]['id']
                            dic['content']=self.cleanContent(item['object']['answers'][key]['content'])
                            try:
                                dic["question"]={
                                        'name':item['object']['answers'][key]['question']['name'],
                                        'url':item['object']['answers'][key]['question']['url']
                                        }
                            except:
                                dic["question"]==None
                            dic['type']=item['object']['answers'][key]['type']
                            dic['created_time']=self.fixedTime(item['object']['answers'][key]['created_time'])
                            dic['updated_time']=self.fixedTime(item['object']['answers'][key]['updated_time']) if item['object']['answers'][key]['updated_time']>0 else "未更新"
                            lis.append(dic)
                        except Exception as e:
                            print("+%0s+"%('-'*70))
                            print("|filterSearch have an err in search_result",e)
                            print("+%0s+"%('-'*70))
                        del dic
            self.searchDict['data']=lis
            self.dataCache[self.searchDict['page']]=self.searchDict
            self.dispatch("0040")
        except Exception as e:
            if data.get('error',False):
                self.index-=1
                print("Error:",end="")
                print(data['error'])
            else:
                print(e)
            print("+----------------------------------------------------------+")
            print("|    L.重新登陆             |       enter.直接退出          |")
            print("+----------------------------------------------------------+")
            choose=input(":")
            if choose=="":
                self.close()
            elif choose=="L" or choose=='l':
                self.logintoken['islogin']=False
                self.dispatch('0060')
                self.dispatch("0010")
            
    def fixedTime(self,t):
        mon=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        week=[ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun']
        ct=time.ctime(int(t))
        ta=re.sub("( )+",',',ct).split(',')
        ta[1]=str(mon.index(ta[1])+1)
        ta[0]=str(week.index(ta[0])+1)
        ta[0],ta[4]=ta[4],ta[0]
        return '-'.join(ta)
    def getCaptcha(self,url,dic,method='GET'):
        Headers=copy.deepcopy(self.headers)
        Headers['x-Zse-86']='2.0_'+self.encrypt('encypinf',{'data':dic['x-Zse-86'],'time':str(int(time.time()*1000))})
        Headers['x-Zse-83']=dic['x-Zse-83']
        Headers['x-ab-pb']=dic['x-ab-pb']
        Headers['x-ab-param']=dic['x-ab-param']
        try:
            del self.cookies['q_c0']
            del self.cookies['z_c0']
        except:
            pass
        if method=='GET':
            res=requests.get(url,headers=Headers,cookies=self.cookies)#,proxies=self.proxies,verify=False)
            del Headers
            return {'json':res.content.decode('utf-8'),'headers':res.headers}
        elif method=='PUT':
            res=requests.put(url,headers=Headers,cookies=self.cookies)#,proxies=self.proxies,verify=False)
            del Headers
            return {'json':res.content.decode('utf-8'),'headers':res.headers}
    
    def getChildComment(self):
        url="https://www.zhihu.com/api/v4/comments/"#705311583/child_comments"
        url+=self.commentDict['data'][self.index]['id']
        Id=self.commentDict['data'][self.index]['id']
        url+="/child_comments"
        offset=0
        limit=20
        cookielis=['_zap','_xsrf','Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49','Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49','d_c0','tst','capsion_ticket','z_c0','KLBRSID']
        Cookies={}
        dic=self.getHeader(url[21:])
        Headers=copy.deepcopy(self.headers)
        Headers["Referer"]=self.searchDict['Referer']
        Headers['x-Zse-86']='2.0_'+self.encrypt('encypinf',{'data':dic['x-Zse-86'],'time':str(int(time.time()*1000))})
        print("+%0s+"%('-'*70))
        for i in cookielis:
            try:
                Cookies[i]=self.cookies[i]
            except:
                print("|losing cookie in searchapi %s|"%i.center(43))
        else:
            
            print("|%s|"%('search add cookie complete!!').center(70))
            print("+%0s+"%('-'*70))
        while not self.childComment['isend']:
            try:
                res=requests.get(url,headers=Headers,cookies=Cookies)#,proxies=self.proxies,verify=False)
                if res.status_code==200:
                    yield res.content.decode('utf-8')
                else:
                    raise Exception("服务器回应错误 code：",res.status_code)
                offset+=20
                url="https://www.zhihu.com/api/v4/comments/"+Id+"/child_comments"+"?limit="+str(limit)+"&offset="+str(offset)
                self.setCookie(res.headers['set-cookie'])
                time.sleep(1)
                
            except Exception as e:
                print(e,e.args)
                break
        del url
    def getCommentsRoot(self):
        url="https://www.zhihu.com/api/v4/"
        if self.commentDict['page']==0:
            if self.searchDict['data'][self.index]['type']=='question':
                print("此条问题没有评论")
                return 0
            else:
                url+=self.searchDict['data'][self.index]['type']
                url+='s/'
            url+=self.answerId+'/root_comments?order=normal&limit=20&offset='
            url+=str(self.commentDict['page']*20)
            url+="&status=open"
        else:
            url=self.commentDict['next']
        Headers=copy.deepcopy(self.headers)
        Headers["X-APP-VERSION"]="6.42.0"
        Headers["Referer"]=self.searchDict['Referer']
        cookielis=['_zap','_xsrf','Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49','Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49','d_c0','tst','capsion_ticket','z_c0','KLBRSID']
        Cookies={}
        dic=self.getHeader(url[21:])
        Headers['x-Zse-86']='2.0_'+self.encrypt('encypinf',{'data':dic['x-Zse-86'],'time':str(int(time.time()*1000))})
        print("+%0s+"%('-'*70))
        for i in cookielis:
            try:
                Cookies[i]=self.cookies[i]
            except:
                print("|losing cookie in searchapi %s|"%i.center(43))
        else:
            
            print("|%s|"%('search add cookie complete!!').center(70))
            print("+%0s+"%('-'*70))
        res=requests.get(url,headers=Headers,cookies=Cookies)#,proxies=self.proxies,verify=False)
        del Cookies,Headers
        self.commentDict['page']+=1
        self.setCookie(res.headers['set-cookie'])
        self.filterCommentRoot(res.content.decode('utf-8')) 
    def getForm(self):
        form={}
        form['client_id']="c3cef7c66a1843f8b3a9e6a1e3160e20"#固定的，在sign-page可找到
        form['grant_type']="password"
        form['timestamp']=""#要和signature里的时间统一
        form['source']="com.zhihu.web"
        form['signature']=""
        form['username']="%2B86"+input("请输入你的手机号\n:")#+86
        form['password']=getpass.getpass("请输入密码\n:")
        form['captcha']=""
        form['lang']="cn"
        form['utm_source']=""
        form['ref_source']="other_https%3A%2F%2Fwww.zhihu.com%2Fsignin%3Fnext%3D%252F"
        form['timestamp']=str(int(time.time()*1000))
        arg=json.dumps({"id":form['client_id'],"time":form['timestamp']})
        form['signature']=self.signatureGetJs.call("infsignature",arg)
        return form
    
    def getHeader(self,url=None):
        """
        param return x-zse-86 x-zse-83 x-ab-pb x-ab-param value
        
        """
        lis=[]
        for item in self.initData['params']:
            try:
                if item['chainId']=='_all_':
                    lis.append(item)
            except:
                pass
        dic={}
        dic['x-ab-pb']=self.initData['encodedParams']
        dic['x-ab-param']=self.argGetJs.call('xabparaminf',json.dumps(lis))
        if url!=None:
            data='3_2.0+'+url+'+'+self.cookies['d_c0']
            dic['x-Zse-86']=self.argGetJs.call('zse86inf',data)
            dic['x-Zse-83']='3_2.0'
        return dic
    
    def getImform(self,file,encoding='utf-8'):
        fp=open(file,'r',encoding=encoding)
        data=json.load(fp)
        fp.close()
        return data
    
    def getInitData(self):
        """
        param return initdata for init x-ab-param in getheader
        """
        url="https://www.zhihu.com/signin?next=%2F"
        res=requests.get(url,headers=self.headers,cookies=self.cookies)#,proxies=self.proxies,verify=False)
        bsobj=bs(res.content.decode('utf-8'),'lxml')
        self.setCookie(res.headers['set-cookie'])
        return json.loads(bsobj.find('script',id='js-initialData').string)['initialState']['env']['ab']['config']
       
    def getJs(self,file,encoding=None):
        fp=open(file,'rb')
        data=fp.read().decode(encoding if encoding else "utf-8","ignore")
        fp.close()
        return execjs.compile(data)
    def getVertical_info(self,text):
        s='vertical_info'
        start=0
        end=0
        try:
            start=text.index(s)+len(s)+1
            end=text[186+len(s)+1:].index('&')
        except:
            end=len(text)
        if start==0:
            print("err in getVertical_info can not find vertical_info")
            return ""
        else:
            return text[start:end]
        
        
    def initCData(self):
        self.searchDict={'page':0}
        self.index=0
        self.childComment={'isend':False,'data':[]}
        self.commentDict={'page':0}
        self.dataCache={}
    
    def interface(self):
        self.updateCookie()
        if not self.isLogin():
            self.captcha()
            text=self.login()
            self.operation(text)
            self.dispatch("0020")
        else:
            self.dispatch("0020")
    
    def isLogin(self):
        return self.logintoken['islogin']
    def isInForce(self,j):
        pass
    def login(self):
        data=""
        Headers=copy.deepcopy(self.headers)
        Cookies={}
        Cookies['_xsrf']=self.cookies['_xsrf']
        Cookies['_zap']=self.cookies['_zap']
        Cookies['capsion_ticket']=self.cookies['capsion_ticket']
        Cookies['d_c0']=self.cookies['d_c0']
        Cookies['Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49']=self.cookies['Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49']
        Cookies['Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49']=self.cookies['Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49']
        Cookies['KLBRSID']=self.cookies['KLBRSID']
        url="https://www.zhihu.com/api/v3/oauth/sign_in"
        for key in self.form:
            data+=key+'='+self.form[key]+'&'
        dic={'data':data[0:-1],'time':self.form['timestamp']}
        data=self.encrypt('encypinf',dic)
        Headers['Origin']='https://www.zhihu.com'
        Headers['Content-Length']=str(len(data))
        Headers['content-type']='application/x-www-form-urlencoded'
        Headers['x-xsrftoken']=self.cookies['_xsrf']
        Headers['x-requested-with']='fetch'
        Headers['X-AB-PB']=self.xabparampb['x-ab-pb']
        Headers['X-Ab-Param']=self.xabparampb['x-ab-param']
        Headers['x-requested-with']='fetch'
        res=requests.post(url,data=data,headers=Headers,cookies=Cookies)#,proxies=self.proxies,verify=False)
        return {'json':res.content.decode('utf-8'),'headers':res.headers}
    

    def operation(self,text):
        dic=json.loads(text['json'])
        self.setCookie(text['headers']['set-cookie'],['z_c0'])
        if 'error' in dic:
            imform=dic['error']
            print(imform['message'])
        else:
            if dic.get('cookie',False):
                for key in dic['cookie']:
                    self.cookies[key]=dic['cookie'][key]
                del dic['cookie']
            for key in dic:
                self.logintoken[key]=dic[key]
            self.logintoken['islogin']=True
                
    def picture(self,text,file="C://Users//monkey//Desktop//test1.jpg"):
        """
        param return captcha value
        """
        import base64
        img=text.replace('↵','')
        img=base64.b64decode(img)
        fp=open(file,"wb")
        fp.write(img)
        fp.close()
        return input("输入"+file+"中的图片验证码\n---------------------------------------------\n:")
    def resultChoose(self):
        self.commentDataCache={}
        print("+---------------------------------------------------------------------------+")
        print("|  p.上一页    | 0-20.选择本页内容    | N.下一页   | R.返回上一级  |enter.退出|")
        print("+---------------------------------------------------------------------------+")
        choice=input(":")
        try:
            if choice=='P' or choice=='p':
                if self.searchDict['page']==1:
                    raise Exception("Err:此页为第一页")
                else:
                    self.searchDict['page']-=1
                    self.searchDict=self.dataCache[self.searchDict['page']]
                    self.dispatch("0040")
            elif choice=='N' or choice=='n':
                if self.searchDict['isend']:
                    raise Exception("Err:此页为最后一页")
                else:
                    if self.dataCache.get(self.searchDict['page']+1,False):
                        self.searchDict['page']+=1
                        self.searchDict=self.dataCache[self.searchDict['page']]
                        self.dispatch("0040")
                    else:
                        self.dispatch("0030")
            elif choice=="R" or choice=='r':
                self.dispatch("0020")
            elif choice=="":
                self.close()
            else:
                temp=int(choice)
                if temp>=0 and temp <= len(self.searchDict['data']):
                    self.index=temp
                    self.dispatch("0050")
                    del temp
                else:
                    raise Exception("err:文章号超范围\n")
        except Exception as e:
            print(e)
            self.resultChoose()
        
    
    def searchApi(self):
        
        url="https://www.zhihu.com/api/v4/search_v3"
        imform="?"
        Headers=copy.deepcopy(self.headers)
        cookielis=['_zap','_xsrf','Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49','Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49','d_c0','tst','capsion_ticket','z_c0','KLBRSID']
        Cookies={}
        Headers['Referer']='https://www.zhihu.com/search?type=content&q=e'
        print("+%0s+"%('-'*70))
        for i in cookielis:
            try:
                Cookies[i]=self.cookies[i]
            except:
                print("|losing cookie in searchapi %s|"%i.center(43))
        else:
            
            print("|%s|"%('search add cookie complete!!').center(70))
            print("+%0s+"%('-'*70))
        form={'t':'general','q':'','correction':'1','offset': '0','limit': '20','lc_idx': '0','show_all_topics': '0' }
        if self.searchDict['page']==0:
            form['q']=parse.quote(input("你想搜点什么呢？\n"))
            self.searchDict['key']=form['q']
            self.searchDict['Referer']='https://www.zhihu.com/search?type=content&q='+form['q']
        else:
            form['lc_idx']=str(self.searchDict['search_action_info']['lc_idx'])
            form['offset']=str(self.searchDict['search_action_info']['lc_idx'])
            form['search_hash_id']=self.searchDict['search_action_info']['search_hash_id']
            form['vertical_info']=self.getVertical_info(self.searchDict['next'])
            form['q']=self.searchDict['key']
        for key in form:
            imform+=(key+'='+form[key]+"&")
        else:
            url+=imform[0:-1]
        Headers['Referer']=self.searchDict['Referer']
        dic=self.getHeader(url[21:])
        Headers['x-Zse-86']='2.0_'+self.encrypt('encypinf',{'data':dic['x-Zse-86'],'time':str(int(time.time()*1000))})
        res=requests.get(url,headers=Headers,cookies=Cookies)#,proxies=self.proxies,verify=False)
        self.setCookie(res.headers['set-cookie'])
        self.searchDict['page']+=1
        self.filterSearch(res.content.decode('utf-8'))
        
    def setCookie(self,text,anothercookie=None):
        cookielis=['KLBRSID']
        if anothercookie !=None:
            cookielis=cookielis+anothercookie
        print("+%0s+"%('-'*70))
        for i in cookielis:    
            try:
                start=text.index(i)+len(i)+1
                end=text[start:].index(';')+start
                self.cookies[i]=text[start:end]
                print("**   set cookie %015s  : %030s     **"%(i[:15],self.cookies[i][:30]))
            except:
                print('**   no cookies: %045s    **'%i)
        else:
            print("--+--%s--+--"%("set cookies complete").center(62))
            print("+%0s+"%('-'*70))
    def updateCookie(self):
        data=json.dumps({'Hm_lpvt':self.cookies['Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49'],'Hm_lvt':self.cookies['Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49']})
        dic=json.loads(self.argGetJs.call('Hminf',data))
        self.cookies['Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49']=str(dic['Hm_lpvt'])
        self.cookies['Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49']=dic['Hm_lvt']


if __name__=="__main__":
    zh=zhihu()
    zh.interface()
    #"xnn1rdzlgdys"
        