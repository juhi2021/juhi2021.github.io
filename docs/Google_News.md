<a href="https://colab.research.google.com/github/juhi2021/juhi2021.github.io/blob/main/Google_News.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>


```python
pip install GoogleNews
```

    Requirement already satisfied: GoogleNews in c:\users\vinot_txdg204\anaconda3\lib\site-packages (1.6.8)
    Requirement already satisfied: dateparser in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from GoogleNews) (1.1.8)
    Requirement already satisfied: python-dateutil in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from GoogleNews) (2.8.2)
    Requirement already satisfied: beautifulsoup4 in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from GoogleNews) (4.10.0)
    Requirement already satisfied: soupsieve>1.2 in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from beautifulsoup4->GoogleNews) (2.2.1)
    Requirement already satisfied: tzlocal in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from dateparser->GoogleNews) (5.0.1)
    Requirement already satisfied: pytz in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from dateparser->GoogleNews) (2021.3)
    Requirement already satisfied: regex!=2019.02.19,!=2021.8.27 in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from dateparser->GoogleNews) (2021.8.3)
    Requirement already satisfied: six>=1.5 in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from python-dateutil->GoogleNews) (1.16.0)
    Requirement already satisfied: tzdata in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from tzlocal->dateparser->GoogleNews) (2023.3)
    Note: you may need to restart the kernel to use updated packages.
    


```python
from GoogleNews import GoogleNews
'''
Language: lang as English
Period: period as number, N, representing news from last N days
'''
googlenews = GoogleNews(lang='en', period='1d')
```


```python
'''
Search method takes parameter as search text
'''
googlenews.search('"cyber security"')
'''
Returns JSON objects representing different news
'''
results = googlenews.results(sort=True);
'''
Clear GoogleNews to do fresh search next time
'''
googlenews.clear()
'''
Print result
'''
results
```




    [{'title': 'Cyber firm hacked through new employee | Information Age | ACS',
      'media': 'ACS Information Age',
      'date': '4 mins ago',
      'datetime': datetime.datetime(2023, 6, 1, 7, 48, 54, 301843),
      'desc': "Cyber security company Dragos was breached last month when attackers intercepted the onboarding email sent to a new employee's personal email address,...",
      'link': 'https://ia.acs.org.au/article/2023/cyber-firm-hacked-through-new-employee.html',
      'img': 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='},
     {'title': 'ANZ appoints Maria Milosavljevic as next CISO - Security - Finance',
      'media': 'iTnews',
      'date': '7 mins ago',
      'datetime': datetime.datetime(2023, 6, 1, 7, 45, 54, 301843),
      'desc': 'ANZ Banking Group has appointed Maria Milosavljevic as its next CISO, replacing Lynwen Connick who is retiring in October after six-and-a-half years as...',
      'link': 'https://www.itnews.com.au/news/anz-appoints-maria-milosavljevic-as-next-ciso-596425',
      'img': 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='},
     {'title': "Netskope's Out Former Cisco Lead",
      'media': 'Australian Cyber Security Magazine',
      'date': '1 hour ago',
      'datetime': datetime.datetime(2023, 6, 1, 6, 52, 56, 15828),
      'desc': 'Netskope has announced that after just eight years of operations in ANZ, it now counts more than 25% of the ASX50 in its customer ranks,...',
      'link': 'https://australiancybersecuritymagazine.com.au/netskopes-out-former-cisco-lead/',
      'img': 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='},
     {'title': 'Top tips to make businesses safer as cyber crime evolves',
      'media': 'IT Brief Australia',
      'date': '2 hours ago',
      'datetime': datetime.datetime(2023, 6, 1, 5, 52, 56, 47551),
      'desc': 'Culture, strategy and compliance are among the top tools Australian business leaders can leverage to protect their companies from cyber criminals.',
      'link': 'https://itbrief.com.au/story/top-tips-to-make-businesses-safer-as-cyber-crime-evolves',
      'img': 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='},
     {'title': 'CommonSpirit Health reports that ransomware attack cost $160 million | Cyber Security Hub',
      'media': 'Cyber Security Hub',
      'date': '2 hours ago',
      'datetime': datetime.datetime(2023, 6, 1, 5, 52, 56, 31497),
      'desc': 'The healthcare company suffered the attack, which exposed the personal data of more than 623700 patients, in December 2022.',
      'link': 'https://www.cshub.com/attacks/news/commonspirit-health-reports-that-ransomware-attack-cost-160-million',
      'img': 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='},
     {'title': "Canberra's electric buses UN cyber-certified: Chinese manufacturer",
      'media': 'The Mandarin',
      'date': '3 hours ago',
      'datetime': datetime.datetime(2023, 6, 1, 4, 52, 56, 47551),
      'desc': "The ACT government has ordered 90 Chinese-made Yutong 'E12' vehicles as part of its non-fossil fuel fleet replacement.",
      'link': 'https://www.themandarin.com.au/221716-canberras-90-new-electric-buses-un-cyber-certified-chinese-manufacturer-says/',
      'img': 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='},
     {'title': 'Sensitive Patient Information Was Sent Through Meta Pixel by NHS Trusts',
      'media': 'CPO Magazine',
      'date': '4 hours ago',
      'datetime': datetime.datetime(2023, 6, 1, 3, 52, 56, 63216),
      'desc': 'NHS trusts, which function as local health care facilities throughout England and Wales and provide over half of all National Health Service (NHS) services,...',
      'link': 'https://www.cpomagazine.com/data-privacy/sensitive-patient-information-was-sent-through-meta-pixel-by-nhs-trusts/',
      'img': 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='},
     {'title': 'Lattice Wins 2023 Fortress Cyber Security Award',
      'media': 'Market Screener',
      'date': '6 hours ago',
      'datetime': datetime.datetime(2023, 6, 1, 1, 52, 56, 78804),
      'desc': 'Lattice Semiconductor , the low power programmable leader, today announced that the company has been named a 2023 Fortress Cyber Security Awards winner by...',
      'link': 'https://www.marketscreener.com/quote/stock/LATTICE-SEMICONDUCTOR-COR-9914/news/Lattice-Wins-2023-Fortress-Cyber-Security-Award-44005716/',
      'img': 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='},
     {'title': 'Nozomi Networks and Cynalytica Inc. Team to Deliver Advanced Cyber Security Solutions to OT & IoT Environments across Both Legacy and Modernized Technologies',
      'media': 'Yahoo Finance',
      'date': '7 hours ago',
      'datetime': datetime.datetime(2023, 6, 1, 0, 52, 56, 78804),
      'desc': 'Nozomi Networks Inc., the leader in OT and IoT security, and Cynalytica Inc. today announced they have partnered to provide a visibility, monitoring and...',
      'link': 'https://finance.yahoo.com/news/nozomi-networks-cynalytica-inc-team-185400795.html',
      'img': 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}]




```python
data='data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
```


```python
import base64
from PIL import Image
import io
image = base64.b64decode((data.split('base64,')[1]))       
fileName = 'test.jpeg'

imagePath = (fileName)
img = Image.open(io.BytesIO(image)).convert('RGB')
img.save(imagePath, 'jpeg')
```


```python
img_data=data.split('base64,')[1].encode('utf8')
img_data
```




    b'R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='




```python
with open("imageToSave.jpg", "wb") as fh:
    fh.write(base64.decodebytes(img_data))
```


```python
data.split('base64,')[1]
```




    'R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='




```python
import io, base64
from PIL import Image

# Assuming base64_str is the string value without 'data:image/jpeg;base64,'
img = Image.open(io.BytesIO(base64.decodebytes(bytes(data.split('base64,')[1], "utf-8"))))
img.save('my-image.png')
```


```python
import base64
with open("imageToSave.png", "wb") as fh:
    fh.write(base64.decodebytes(img_data))
```


```python
'''
Print the title, description and URL of the news
'''
for result in results:
  print('\n\nTITLE:', result['title'], '\nDESC:', result['desc'], '\nURL: ', result['link'])
```

    
    
    TITLE: ANZ appoints Maria Milosavljevic as next CISO - Security - Finance 
    DESC: ANZ Banking Group has appointed Maria Milosavljevic as its next CISO, replacing Lynwen Connick who is retiring in October after six-and-a-half years as... 
    URL:  https://www.itnews.com.au/news/anz-appoints-maria-milosavljevic-as-next-ciso-596425
    
    
    TITLE: Top tips to make businesses safer as cyber crime evolves 
    DESC: Culture, strategy and compliance are among the top tools Australian business leaders can leverage to protect their companies from cyber criminals. 
    URL:  https://itbrief.com.au/story/top-tips-to-make-businesses-safer-as-cyber-crime-evolves
    
    
    TITLE: CommonSpirit Health reports that ransomware attack cost $160 million | Cyber Security Hub 
    DESC: The healthcare company suffered the attack, which exposed the personal data of more than 623700 patients, in December 2022. 
    URL:  https://www.cshub.com/attacks/news/commonspirit-health-reports-that-ransomware-attack-cost-160-million
    
    
    TITLE: Sensitive Patient Information Was Sent Through Meta Pixel by NHS Trusts 
    DESC: NHS trusts, which function as local health care facilities throughout England and Wales and provide over half of all National Health Service (NHS) services,... 
    URL:  https://www.cpomagazine.com/data-privacy/sensitive-patient-information-was-sent-through-meta-pixel-by-nhs-trusts/
    
    
    TITLE: Canberra's electric buses UN cyber-certified: Chinese manufacturer 
    DESC: The ACT government has ordered 90 Chinese-made Yutong 'E12' vehicles as part of its non-fossil fuel fleet replacement. 
    URL:  https://www.themandarin.com.au/221716-canberras-90-new-electric-buses-un-cyber-certified-chinese-manufacturer-says/
    
    
    TITLE: Lattice Wins 2023 Fortress Cyber Security Award 
    DESC: Lattice Semiconductor , the low power programmable leader, today announced that the company has been named a 2023 Fortress Cyber Security Awards winner by... 
    URL:  https://www.marketscreener.com/quote/stock/LATTICE-SEMICONDUCTOR-COR-9914/news/Lattice-Wins-2023-Fortress-Cyber-Security-Award-44005716/
    
    
    TITLE: Nozomi Networks and Cynalytica Inc. Team to Deliver Advanced Cyber Security Solutions to OT & IoT Environments across Both Legacy and Modernized Technologies 
    DESC: Nozomi Networks Inc., the leader in OT and IoT security, and Cynalytica Inc. today announced they have partnered to provide a visibility, monitoring and... 
    URL:  https://finance.yahoo.com/news/nozomi-networks-cynalytica-inc-team-185400795.html
    
    
    TITLE: TXOne Networks' Stellar Wins 2023 Fortress Cyber Security Award by Offering Detect and Response Solution for Cyber ... 
    DESC: TXOne Networks, the leader of industrial cybersecurity, announced that its Stellar solution has been named a 2023 Fortress Cyber Security Award winner. 
    URL:  https://www.businesswire.com/news/home/20230531005949/en/TXOne-Networks%E2%80%99-Stellar-Wins-2023-Fortress-Cyber-Security-Award-by-Offering-Detect-and-Response-Solution-for-Cyber-Physical-Systems
    
    
    TITLE: A "hacker's" insider guide to outsmarting cyber attacks | INTHEBLACK 
    DESC: Dan Weis breaks into corporate and government computer networks to help improve their cyber security. Meet a 'penetration tester'. 
    URL:  https://intheblack.cpaaustralia.com.au/technology/hackers-insider-guide-outsmarting-cyber-attacks
    
    
    TITLE: The Department of Technology participates in Workshop on Information Security Policy in Taiwan 
    DESC: BASSETERRE, St. Kitts, May 26, 2023 (Department of Technology): Two officers from the Department of Technology, Mr. Julian Berry, Cyber Security Analyst,... 
    URL:  https://www.sknvibes.com/news/newsdetails.cfm/122046
    


```python
pip install requests bs4 google-search-results
```

    Requirement already satisfied: requests in c:\users\vinot_txdg204\anaconda3\lib\site-packages (2.26.0)
    Collecting bs4
      Downloading bs4-0.0.1.tar.gz (1.1 kB)
    Collecting google-search-results
      Downloading google_search_results-2.4.2.tar.gz (18 kB)
    Requirement already satisfied: charset-normalizer~=2.0.0 in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from requests) (2.0.4)
    Requirement already satisfied: certifi>=2017.4.17 in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from requests) (2021.10.8)
    Requirement already satisfied: urllib3<1.27,>=1.21.1 in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from requests) (1.26.7)
    Requirement already satisfied: idna<4,>=2.5 in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from requests) (3.2)
    Requirement already satisfied: beautifulsoup4 in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from bs4) (4.10.0)
    Requirement already satisfied: soupsieve>1.2 in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from beautifulsoup4->bs4) (2.2.1)
    Building wheels for collected packages: bs4, google-search-results
      Building wheel for bs4 (setup.py): started
      Building wheel for bs4 (setup.py): finished with status 'done'
      Created wheel for bs4: filename=bs4-0.0.1-py3-none-any.whl size=1271 sha256=bf128e9c3bf452c6a4e1f790c5544358bdc93940b024d06d5e79f1c56074bf5a
      Stored in directory: c:\users\vinot_txdg204\appdata\local\pip\cache\wheels\73\2b\cb\099980278a0c9a3e57ff1a89875ec07bfa0b6fcbebb9a8cad3
      Building wheel for google-search-results (setup.py): started
      Building wheel for google-search-results (setup.py): finished with status 'done'
      Created wheel for google-search-results: filename=google_search_results-2.4.2-py3-none-any.whl size=32017 sha256=5a84be490037aafaf8dbae18ce74221d182952cac15eb84b4e8d8de59aa68da6
      Stored in directory: c:\users\vinot_txdg204\appdata\local\pip\cache\wheels\68\8e\73\744b7d9d7ac618849d93081a20e1c0deccd2aef90901c9f5a9
    Successfully built bs4 google-search-results
    Installing collected packages: google-search-results, bs4
    Successfully installed bs4-0.0.1 google-search-results-2.4.2
    Note: you may need to restart the kernel to use updated packages.
    


```python
pip install nltk
```

    Requirement already satisfied: nltk in c:\users\vinot_txdg204\anaconda3\lib\site-packages (3.6.5)
    Requirement already satisfied: click in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from nltk) (8.0.3)
    Requirement already satisfied: joblib in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from nltk) (1.1.0)
    Requirement already satisfied: regex>=2021.8.3 in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from nltk) (2021.8.3)
    Requirement already satisfied: tqdm in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from nltk) (4.62.3)
    Requirement already satisfied: colorama in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from click->nltk) (0.4.4)
    Note: you may need to restart the kernel to use updated packages.
    


```python
pip install newspaper
```

    Collecting newspaper
      Using cached newspaper-0.1.0.7.tar.gz (176 kB)
      Using cached newspaper-0.1.0.6.tar.gz (176 kB)
    Collecting beautifulsoup4==4.3.2
      Using cached beautifulsoup4-4.3.2.tar.gz (143 kB)
    Collecting Pillow==2.5.1
    Note: you may need to restart the kernel to use updated packages.
    

        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_3775e35c7b974ee3a91cb7f2e416ebba\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_3775e35c7b974ee3a91cb7f2e416ebba\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-ur6tmj0h'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_3775e35c7b974ee3a91cb7f2e416ebba\
        Complete output (1 lines):
        WARNING! You are attempting to install newspaper's python2 repository on python3. PLEASE RUN `$ pip3 install newspaper3k` for python3 or `$ pip install newspaper` for python2
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/d8/07/5765cc9c36e2be1a0f0e615b7a092129e1ba30a25182506dea437290c193/newspaper-0.1.0.7.tar.gz#sha256=929ea447660d2633d3eea6c2aba703b549f7cdd56bd5cf636eb8f1454b254945 (from https://pypi.org/simple/newspaper/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:

      Using cached Pillow-2.5.1.zip (6.9 MB)
    Collecting PyYAML==3.11
      Using cached PyYAML-3.11.zip (371 kB)
    Collecting cssselect==0.9.1
      Using cached cssselect-0.9.1.tar.gz (32 kB)
    Collecting lxml==3.3.5
      Using cached lxml-3.3.5.tar.gz (3.5 MB)
    Collecting nltk==2.0.5
      Using cached nltk-2.0.5.zip (1.1 MB)
      Using cached nltk-2.0.5.tar.gz (954 kB)
    Collecting newspaper
      Using cached newspaper-0.1.0.5.tar.gz (49 kB)
      Using cached newspaper-0.1.0.4.tar.gz (49 kB)
      Using cached newspaper-0.1.0.3.tar.gz (49 kB)
      Using cached newspaper-0.1.0.2.tar.gz (180 kB)
      Using cached newspaper-0.1.0.1.tar.gz (49 kB)
      Using cached newspaper-0.1.0.0.tar.gz (49 kB)
      Using cached newspaper-0.0.9.9.tar.gz (49 kB)
      Using cached newspaper-0.0.9.8.tar.gz (248 kB)
      Using cached newspaper-0.0.9.6.tar.gz (244 kB)
    Collecting nltk==2.0.4
      Using cached nltk-2.0.4.zip (1.1 MB)
      Using cached nltk-2.0.4.tar.gz (955 kB)
    Collecting newspaper
      Using cached newspaper-0.0.9.5.tar.gz (244 kB)
      Using cached newspaper-0.0.9.2.tar.gz (242 kB)
      Using cached newspaper-0.0.9.1.tar.gz (760 kB)
    Collecting BeautifulSoup==3.2.1
      Using cached BeautifulSoup-3.2.1.tar.gz (31 kB)
    Collecting newspaper
      Using cached newspaper-0.0.9.tar.gz (760 kB)
      Using cached newspaper-0.0.8.tar.gz (6.9 MB)
    Requirement already satisfied: lxml in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from newspaper) (4.6.3)
    Requirement already satisfied: requests in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from newspaper) (2.26.0)
    Requirement already satisfied: nltk in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from newspaper) (3.6.5)
    Requirement already satisfied: Pillow in c:\users\vinot_txdg204\anaconda3\lib\site-packages (from newspaper) (8.4.0)
    Collecting cssselect
      Using cached cssselect-1.2.0-py2.py3-none-any.whl (18 kB)
    Collecting BeautifulSoup
      Using cached BeautifulSoup-3.2.2.tar.gz (32 kB)
      Using cached BeautifulSoup-3.2.0.tar.gz (31 kB)
    Collecting newspaper
      Using cached newspaper-0.0.7.tar.gz (6.9 MB)
      Using cached newspaper-0.0.6.tar.gz (7.0 MB)
      Using cached newspaper-0.0.5.tar.gz (7.7 MB)
      Using cached newspaper-0.0.4.tar.gz (6.7 MB)
      Using cached newspaper-0.0.3.tar.gz (10.8 MB)
    Collecting lxml==3.2.4
      Using cached lxml-3.2.4.tar.gz (3.3 MB)
    Collecting newspaper
      Using cached newspaper-0.0.2.tar.gz (10.8 MB)
    
    The conflict is caused by:
        newspaper 0.1.0.6 depends on nltk==2.0.5
        newspaper 0.1.0.2 depends on nltk==2.0.5
        newspaper 0.0.9.8 depends on nltk==2.0.5
        newspaper 0.0.9.6 depends on nltk==2.0.4
        newspaper 0.0.9.5 depends on nltk==2.0.4
        newspaper 0.0.9.2 depends on nltk==2.0.4
        newspaper 0.0.9.1 depends on BeautifulSoup==3.2.1
        newspaper 0.0.9 depends on BeautifulSoup==3.2.1
        newspaper 0.0.8 depends on BeautifulSoup
        newspaper 0.0.3 depends on BeautifulSoup
    
    To fix this you could try to:
    1. loosen the range of package versions you've specified
    2. remove package versions to allow pip attempt to solve the dependency conflict
    
    

    
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\nltk_c913b25d674347a7b2753d838b062e6a\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\nltk_c913b25d674347a7b2753d838b062e6a\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-8jzdfnty'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_c913b25d674347a7b2753d838b062e6a\
        Complete output (31 lines):
        Downloading http://pypi.python.org/packages/source/d/distribute/distribute-0.6.21.tar.gz
        Traceback (most recent call last):
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_c913b25d674347a7b2753d838b062e6a\distribute_setup.py", line 143, in use_setuptools
            raise ImportError
        ImportError
        
        During handling of the above exception, another exception occurred:
        
        Traceback (most recent call last):
          File "<string>", line 1, in <module>
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_c913b25d674347a7b2753d838b062e6a\setup.py", line 23, in <module>
            distribute_setup.use_setuptools()
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_c913b25d674347a7b2753d838b062e6a\distribute_setup.py", line 145, in use_setuptools
            return _do_download(version, download_base, to_dir, download_delay)
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_c913b25d674347a7b2753d838b062e6a\distribute_setup.py", line 123, in _do_download
            tarball = download_setuptools(version, download_base,
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_c913b25d674347a7b2753d838b062e6a\distribute_setup.py", line 193, in download_setuptools
            src = urlopen(url)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 214, in urlopen
            return opener.open(url, data, timeout)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 523, in open
            response = meth(req, response)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 632, in http_response
            response = self.parent.error(
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 561, in error
            return self._call_chain(*args)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 494, in _call_chain
            result = func(*args)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 641, in http_error_default
            raise HTTPError(req.full_url, code, msg, hdrs, fp)
        urllib.error.HTTPError: HTTP Error 403: SSL is required
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/61/32/c7d454c7d232034dfb492b6ef5d749b367c58e0a0f2ed4125eb4089b9227/nltk-2.0.5.zip#sha256=edbeb82d03ef6fe24d4ec8380998d23cb2e36eb43350c9f33e932fe07de42cd5 (from https://pypi.org/simple/nltk/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\nltk_48ebe62a989041b989234e29cff1dccd\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\nltk_48ebe62a989041b989234e29cff1dccd\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-4fj5omq4'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_48ebe62a989041b989234e29cff1dccd\
        Complete output (31 lines):
        Downloading http://pypi.python.org/packages/source/d/distribute/distribute-0.6.21.tar.gz
        Traceback (most recent call last):
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_48ebe62a989041b989234e29cff1dccd\distribute_setup.py", line 143, in use_setuptools
            raise ImportError
        ImportError
        
        During handling of the above exception, another exception occurred:
        
        Traceback (most recent call last):
          File "<string>", line 1, in <module>
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_48ebe62a989041b989234e29cff1dccd\setup.py", line 23, in <module>
            distribute_setup.use_setuptools()
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_48ebe62a989041b989234e29cff1dccd\distribute_setup.py", line 145, in use_setuptools
            return _do_download(version, download_base, to_dir, download_delay)
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_48ebe62a989041b989234e29cff1dccd\distribute_setup.py", line 123, in _do_download
            tarball = download_setuptools(version, download_base,
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_48ebe62a989041b989234e29cff1dccd\distribute_setup.py", line 193, in download_setuptools
            src = urlopen(url)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 214, in urlopen
            return opener.open(url, data, timeout)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 523, in open
            response = meth(req, response)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 632, in http_response
            response = self.parent.error(
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 561, in error
            return self._call_chain(*args)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 494, in _call_chain
            result = func(*args)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 641, in http_error_default
            raise HTTPError(req.full_url, code, msg, hdrs, fp)
        urllib.error.HTTPError: HTTP Error 403: SSL is required
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/50/9e/39418026bf8013bbc2852c7aec3fb21e4339f6cd694934496d67a19b53b8/nltk-2.0.5.tar.gz#sha256=590b1752fb39427ad8018a65f72355c22e8276d476699aa4a488e38c1b17889a (from https://pypi.org/simple/nltk/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_e9066807f07a445fb171f207b817316d\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_e9066807f07a445fb171f207b817316d\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-xfev5led'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_e9066807f07a445fb171f207b817316d\
        Complete output (1 lines):
        WARNING! You are attempting to install newspaper's python2 repository on python3. PLEASE RUN `$ pip3 install newspaper3k` for python3 or `$ pip install newspaper` for python2
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/57/21/35a7e7040e70a628b526c6830e6f506868f54dcaadffbe57cb3d393af5cb/newspaper-0.1.0.5.tar.gz#sha256=b346e615f5a0c8ac5ab1ebab2420ad24fda7fc78198cae32f1b3fed640dde788 (from https://pypi.org/simple/newspaper/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_1968b5484749488aaf5c095bad2bbe86\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_1968b5484749488aaf5c095bad2bbe86\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-k3ot_ets'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_1968b5484749488aaf5c095bad2bbe86\
        Complete output (1 lines):
        WARNING! You are attempting to install newspaper's python2 repository on python3. PLEASE RUN `$ pip3 install newspaper3k` for python3 or `$ pip install newspaper` for python2
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/da/a3/88885ac6e2f65b84f23511da21bdd486d63d2a035d0adab6e4ef89cd4c25/newspaper-0.1.0.4.tar.gz#sha256=927edcccb7d57905fbd24fde4fb3879ffcc59d082877ac7c40963f795372cb67 (from https://pypi.org/simple/newspaper/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_098270f7532f4d65a16ddb61edf50e6a\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_098270f7532f4d65a16ddb61edf50e6a\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-a5yyqxlg'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_098270f7532f4d65a16ddb61edf50e6a\
        Complete output (1 lines):
        WARNING! You are attempting to install newspaper's python2 repository on python3. PLEASE RUN `$ pip3 install newspaper3k` for python3 or `$ pip install newspaper` for python2
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/4f/59/140bdf8b9413c552fdfa73eb01b6622eaa8ed62ded2f390c4062b58f58bb/newspaper-0.1.0.3.tar.gz#sha256=d2eb46563c973a4046e82580d6193df42b86bff12cbfcb39e9780b0f7dc24595 (from https://pypi.org/simple/newspaper/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_130a6771336b44b6889b3c28c4272da3\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_130a6771336b44b6889b3c28c4272da3\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-sdedqjly'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_130a6771336b44b6889b3c28c4272da3\
        Complete output (1 lines):
        WARNING! You are attempting to install newspaper's python2 repository on python3. PLEASE RUN `$ pip3 install newspaper3k` for python3 or `$ pip install newspaper` for python2
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/9c/57/e6af9770c3241725fbf7a79c6f2954988947202e2cab01cdf53457f039a8/newspaper-0.1.0.1.tar.gz#sha256=bc40cf56e35f0c6fe79b77f3a4c84a950de9f66559a51bd280e3c363796afc75 (from https://pypi.org/simple/newspaper/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_a471ec9b64054db3b5b22e6e7b173200\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_a471ec9b64054db3b5b22e6e7b173200\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-kr20962w'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_a471ec9b64054db3b5b22e6e7b173200\
        Complete output (1 lines):
        WARNING! You are attempting to install newspaper's python2 repository on python3. PLEASE RUN `$ pip3 install newspaper3k` for python3 or `$ pip install newspaper` for python2
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/be/7b/a34b526cf37727ef353ff46217173a67a598fbbf3d8dbd80b899e51af45c/newspaper-0.1.0.0.tar.gz#sha256=8c71680c09c39642be06d632149fe0e44a93ae5494e9f98c19fc79d6d21817bf (from https://pypi.org/simple/newspaper/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_32a901cc72a54e0a848a04a92ee2fc19\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_32a901cc72a54e0a848a04a92ee2fc19\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-8q4mqh95'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_32a901cc72a54e0a848a04a92ee2fc19\
        Complete output (1 lines):
        WARNING! You are attempting to install newspaper's python2 repository on python3. PLEASE RUN `$ pip3 install newspaper3k` for python3 or `$ pip install newspaper` for python2
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/ad/b6/02023ed7543c280cbd18eef61502b97f63eed842a1414f7596e370a97362/newspaper-0.0.9.9.tar.gz#sha256=e2449afd697d9280c78301e4d1e385fd7d6dc73e0a4a130c35f0e909f1804402 (from https://pypi.org/simple/newspaper/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\nltk_c1669cdce5c94c5189ae07e52ddc30bb\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\nltk_c1669cdce5c94c5189ae07e52ddc30bb\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-sed_kt4h'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_c1669cdce5c94c5189ae07e52ddc30bb\
        Complete output (31 lines):
        Downloading http://pypi.python.org/packages/source/d/distribute/distribute-0.6.21.tar.gz
        Traceback (most recent call last):
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_c1669cdce5c94c5189ae07e52ddc30bb\distribute_setup.py", line 143, in use_setuptools
            raise ImportError
        ImportError
        
        During handling of the above exception, another exception occurred:
        
        Traceback (most recent call last):
          File "<string>", line 1, in <module>
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_c1669cdce5c94c5189ae07e52ddc30bb\setup.py", line 23, in <module>
            distribute_setup.use_setuptools()
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_c1669cdce5c94c5189ae07e52ddc30bb\distribute_setup.py", line 145, in use_setuptools
            return _do_download(version, download_base, to_dir, download_delay)
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_c1669cdce5c94c5189ae07e52ddc30bb\distribute_setup.py", line 123, in _do_download
            tarball = download_setuptools(version, download_base,
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_c1669cdce5c94c5189ae07e52ddc30bb\distribute_setup.py", line 193, in download_setuptools
            src = urlopen(url)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 214, in urlopen
            return opener.open(url, data, timeout)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 523, in open
            response = meth(req, response)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 632, in http_response
            response = self.parent.error(
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 561, in error
            return self._call_chain(*args)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 494, in _call_chain
            result = func(*args)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 641, in http_error_default
            raise HTTPError(req.full_url, code, msg, hdrs, fp)
        urllib.error.HTTPError: HTTP Error 403: SSL is required
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/25/a7/f8938bdf6f6d17e37e882b67f1362c0fdb6a8a609a69252b6033d6c546c5/nltk-2.0.4.zip#sha256=70936b0cf30710a1d63df152c3286af39af37b131cd176c0202e6665a8630632 (from https://pypi.org/simple/nltk/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\nltk_46d2b9c7903c4f6a88d9179d4084e430\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\nltk_46d2b9c7903c4f6a88d9179d4084e430\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-_9r3rt4v'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_46d2b9c7903c4f6a88d9179d4084e430\
        Complete output (31 lines):
        Downloading http://pypi.python.org/packages/source/d/distribute/distribute-0.6.21.tar.gz
        Traceback (most recent call last):
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_46d2b9c7903c4f6a88d9179d4084e430\distribute_setup.py", line 143, in use_setuptools
            raise ImportError
        ImportError
        
        During handling of the above exception, another exception occurred:
        
        Traceback (most recent call last):
          File "<string>", line 1, in <module>
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_46d2b9c7903c4f6a88d9179d4084e430\setup.py", line 23, in <module>
            distribute_setup.use_setuptools()
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_46d2b9c7903c4f6a88d9179d4084e430\distribute_setup.py", line 145, in use_setuptools
            return _do_download(version, download_base, to_dir, download_delay)
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_46d2b9c7903c4f6a88d9179d4084e430\distribute_setup.py", line 123, in _do_download
            tarball = download_setuptools(version, download_base,
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\nltk_46d2b9c7903c4f6a88d9179d4084e430\distribute_setup.py", line 193, in download_setuptools
            src = urlopen(url)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 214, in urlopen
            return opener.open(url, data, timeout)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 523, in open
            response = meth(req, response)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 632, in http_response
            response = self.parent.error(
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 561, in error
            return self._call_chain(*args)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 494, in _call_chain
            result = func(*args)
          File "C:\Users\vinot_txdg204\anaconda3\lib\urllib\request.py", line 641, in http_error_default
            raise HTTPError(req.full_url, code, msg, hdrs, fp)
        urllib.error.HTTPError: HTTP Error 403: SSL is required
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/81/f6/30c4eb35ad7a4b5e9301943c8738b79ebb8152f0986e877f809b8e295c61/nltk-2.0.4.tar.gz#sha256=a554d6b9c5c7c8b597a090d8848a6f78c6fc4665ae43c9a6a6d6a5b207d98c65 (from https://pypi.org/simple/nltk/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\beautifulsoup_43ec18954ca647cd8d2de856eec446cb\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\beautifulsoup_43ec18954ca647cd8d2de856eec446cb\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-es0ds1ks'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\beautifulsoup_43ec18954ca647cd8d2de856eec446cb\
        Complete output (6 lines):
        Traceback (most recent call last):
          File "<string>", line 1, in <module>
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\beautifulsoup_43ec18954ca647cd8d2de856eec446cb\setup.py", line 22
            print "Unit tests have failed!"
                  ^
        SyntaxError: Missing parentheses in call to 'print'. Did you mean print("Unit tests have failed!")?
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/1e/ee/295988deca1a5a7accd783d0dfe14524867e31abb05b6c0eeceee49c759d/BeautifulSoup-3.2.1.tar.gz#sha256=6a8cb4401111e011b579c8c52a51cdab970041cc543814bbd9577a4529fe1cdb (from https://pypi.org/simple/beautifulsoup/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\beautifulsoup_47589708e755450ca1eb402bfc513663\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\beautifulsoup_47589708e755450ca1eb402bfc513663\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-pi95dtkf'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\beautifulsoup_47589708e755450ca1eb402bfc513663\
        Complete output (6 lines):
        Traceback (most recent call last):
          File "<string>", line 1, in <module>
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\beautifulsoup_47589708e755450ca1eb402bfc513663\setup.py", line 3
            "You're trying to run a very old release of Beautiful Soup under Python 3. This will not work."<>"Please use Beautiful Soup 4, available through the pip package 'beautifulsoup4'."
                                                                                                           ^
        SyntaxError: invalid syntax
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/40/f2/6c9f2f3e696ee6a1fb0e4d7850617e224ed2b0b1e872110abffeca2a09d4/BeautifulSoup-3.2.2.tar.gz#sha256=a04169602bff6e3138b1259dbbf491f5a27f9499dea9a8fbafd48843f9d89970 (from https://pypi.org/simple/beautifulsoup/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\beautifulsoup_5f70cec66c4d4b22ad04978b6329d7c9\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\beautifulsoup_5f70cec66c4d4b22ad04978b6329d7c9\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-td2255fh'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\beautifulsoup_5f70cec66c4d4b22ad04978b6329d7c9\
        Complete output (6 lines):
        Traceback (most recent call last):
          File "<string>", line 1, in <module>
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\beautifulsoup_5f70cec66c4d4b22ad04978b6329d7c9\setup.py", line 22
            print "Unit tests have failed!"
                  ^
        SyntaxError: Missing parentheses in call to 'print'. Did you mean print("Unit tests have failed!")?
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/33/fe/15326560884f20d792d3ffc7fe8f639aab88647c9d46509a240d9bfbb6b1/BeautifulSoup-3.2.0.tar.gz#sha256=0dc52d07516c1665c9dd9f0a390a7a054bfb7b147a50b2866fb116b8909dfd37 (from https://pypi.org/simple/beautifulsoup/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_75bae976c886424c81756369e14a0603\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_75bae976c886424c81756369e14a0603\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-8tteabwf'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_75bae976c886424c81756369e14a0603\
        Complete output (6 lines):
        Traceback (most recent call last):
          File "<string>", line 1, in <module>
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_75bae976c886424c81756369e14a0603\setup.py", line 57
            print ''
                  ^
        SyntaxError: Missing parentheses in call to 'print'. Did you mean print('')?
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/6f/ed/2a56827d9291bd27251d60bfd11affd3dce7d24ba929014bbd4975a17eca/newspaper-0.0.7.tar.gz#sha256=a29c39e9c1c142238249208aed07204047c4a0b1cdcc92138dc98953cf66f7c3 (from https://pypi.org/simple/newspaper/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_41dc9dea6a3f43c79ca4dcc4b2856bd1\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_41dc9dea6a3f43c79ca4dcc4b2856bd1\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-05uxbm8m'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_41dc9dea6a3f43c79ca4dcc4b2856bd1\
        Complete output (6 lines):
        Traceback (most recent call last):
          File "<string>", line 1, in <module>
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_41dc9dea6a3f43c79ca4dcc4b2856bd1\setup.py", line 60
            print ''
                  ^
        SyntaxError: Missing parentheses in call to 'print'. Did you mean print('')?
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/d7/7f/ddcd5263d1fa14936786b01f62e75a4f806f98cb2255587af00ccb08b97b/newspaper-0.0.6.tar.gz#sha256=7bb92ecf4ef26dc3121b798e933dfc4cce3eb95d1d9e4ae01887231f12e30f9d (from https://pypi.org/simple/newspaper/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_8cd6323b1c1b474e8731adf76c487194\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_8cd6323b1c1b474e8731adf76c487194\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-zoa17q8v'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_8cd6323b1c1b474e8731adf76c487194\
        Complete output (6 lines):
        Traceback (most recent call last):
          File "<string>", line 1, in <module>
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_8cd6323b1c1b474e8731adf76c487194\setup.py", line 60
            print ''
                  ^
        SyntaxError: Missing parentheses in call to 'print'. Did you mean print('')?
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/de/4b/3279534d13073ea8958edff3b97e39e853faec4436e1c9d805f9cf6e9f23/newspaper-0.0.5.tar.gz#sha256=7fe4fa9121bb07707fa2489479ab7994a056ca9cc3a848ed634d5537c7eaa0bc (from https://pypi.org/simple/newspaper/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_c36d5d3d58414457a3265c56192d0bda\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_c36d5d3d58414457a3265c56192d0bda\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-dft7n2ge'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_c36d5d3d58414457a3265c56192d0bda\
        Complete output (6 lines):
        Traceback (most recent call last):
          File "<string>", line 1, in <module>
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_c36d5d3d58414457a3265c56192d0bda\setup.py", line 61
            print ''
                  ^
        SyntaxError: Missing parentheses in call to 'print'. Did you mean print('')?
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/44/10/cc8abed3de450ea2925601e29951eec9658a19f18572429cc29380ec7ac8/newspaper-0.0.4.tar.gz#sha256=359934ee0c47015687ac3b71d51c7d1a87e8b95ff96135bdbe5c4d2e2c20c735 (from https://pypi.org/simple/newspaper/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
        ERROR: Command errored out with exit status 1:
         command: 'C:\Users\vinot_txdg204\anaconda3\python.exe' -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_798eed73d2ca41b19ed8d47a8335559f\\setup.py'"'"'; __file__='"'"'C:\\Users\\vinot_txdg204\\AppData\\Local\\Temp\\pip-install-wc3nyzur\\newspaper_798eed73d2ca41b19ed8d47a8335559f\\setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base 'C:\Users\vinot_txdg204\AppData\Local\Temp\pip-pip-egg-info-w7j0swjq'
             cwd: C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_798eed73d2ca41b19ed8d47a8335559f\
        Complete output (6 lines):
        Traceback (most recent call last):
          File "<string>", line 1, in <module>
          File "C:\Users\vinot_txdg204\AppData\Local\Temp\pip-install-wc3nyzur\newspaper_798eed73d2ca41b19ed8d47a8335559f\setup.py", line 88
            print 'Please run:',"curl https://raw.github.com/codelucas/newspaper/master/download_corpora.py | python", 'to download the required nltk corpora'
                  ^
        SyntaxError: Missing parentheses in call to 'print'. Did you mean print('Please run:',"curl https://raw.github.com/codelucas/newspaper/master/download_corpora.py | python", 'to download the required nltk corpora')?
        ----------------------------------------
    WARNING: Discarding https://files.pythonhosted.org/packages/6f/d3/c73ee757a0d2cd493a7d1ad16482902761ca5be3a52d971bce0cbf17b6fd/newspaper-0.0.2.tar.gz#sha256=a94c0427bc20448242457873d9dddb8c872ce82a6fb342b90b72bec790a117ab (from https://pypi.org/simple/newspaper/). Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
    ERROR: Cannot install newspaper==0.0.3, newspaper==0.0.8, newspaper==0.0.9, newspaper==0.0.9.1, newspaper==0.0.9.2, newspaper==0.0.9.5, newspaper==0.0.9.6, newspaper==0.0.9.8, newspaper==0.1.0.2 and newspaper==0.1.0.6 because these package versions have conflicting dependencies.
    ERROR: ResolutionImpossible: for help visit https://pip.pypa.io/en/latest/user_guide/#fixing-conflicting-dependencies
    


```python
from GoogleNews import GoogleNews
from newspaper import Article
from newspaper import Config
import pandas as pd
import nltk
#config will allow us to access the specified url for which we are #not authorized. Sometimes we may get 403 client error while parsing #the link to download the article.
nltk.download('punkt')

user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
config = Config()
config.browser_user_agent = user_agent
googlenews=GoogleNews(start='05/01/2020',end='05/31/2020')
googlenews.search('Coronavirus')
result=googlenews.result()
df=pd.DataFrame(result)
print(df.head())
for i in range(2,20):
    googlenews.getpage(i)
    result=googlenews.result()
    df=pd.DataFrame(result)
list=[]
for ind in df.index:
    dict={}
    article = Article(df['link'][ind],config=config)
    article.download()
    article.parse()
    article.nlp()
    dict['Date']=df['date'][ind]
    dict['Media']=df['media'][ind]
    dict['Title']=article.title
    dict['Article']=article.text
    dict['Summary']=article.summary
    list.append(dict)
news_df=pd.DataFrame(list)
news_df.to_excel("articles.xlsx")
```


    ---------------------------------------------------------------------------

    ModuleNotFoundError                       Traceback (most recent call last)

    C:\Users\VINOT_~1\AppData\Local\Temp/ipykernel_11792/2847093432.py in <module>
          1 from GoogleNews import GoogleNews
    ----> 2 from newspaper import Article
          3 from newspaper import Config
          4 import pandas as pd
          5 import nltk
    

    ModuleNotFoundError: No module named 'newspaper'

