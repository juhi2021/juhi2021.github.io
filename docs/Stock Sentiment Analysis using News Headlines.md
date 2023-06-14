# **Stock Sentiment Analysis using News Headlines Prediction Case Study**

## **Define problem statement**

**Problem Statement :** Studies in sentiment analysis have shown strong correlation between the movement of stock prices and the news headlines. To create a model which can predict the stock value rose or stayed same or decreased after analyzing the News headlines.

**Output Target :** Label (1 if stock value rose or stayed same, 0 if it decresed)

**Input predictors :** Top1, Top2, Top3, ..., Top25, Date

**Solution :** To create a supervised ML classification model using NLP, as the input predictors are text based news headlines and the target variable is categorical.

## **Load Data**

**Import libraries**


```python
#import pandas for loading the CSV file
import pandas as pd

#import numpy for maths
import numpy as np

# import seaborn for visualization
import seaborn as sns
sns.set_style('darkgrid')

from sklearn import preprocessing
from collections import Counter

#filter the warning messages
import warnings
warnings.filterwarnings('ignore')

# import required modules
import re
import nltk
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('stem')

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer

from sklearn.metrics import confusion_matrix, classification_report, accuracy_score

#library for splitting dataset into test and train
from sklearn.model_selection import train_test_split

#library for the models used in this case study
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import GridSearchCV
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

#metric used for the models of this case study
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score
from sklearn.metrics import balanced_accuracy_score, roc_auc_score
from sklearn.model_selection import KFold, cross_val_score

# Mount google drive in google colab
#from google.colab import drive
#drive.mount('/content/drive')

#to import the custom module after mounting the drive
import sys
sys.path.insert(0, '/content/drive/My Drive/Colab Notebooks')
```

    [nltk_data] Downloading package stopwords to /root/nltk_data...
    [nltk_data]   Unzipping corpora/stopwords.zip.
    [nltk_data] Downloading package punkt to /root/nltk_data...
    [nltk_data]   Unzipping tokenizers/punkt.zip.
    [nltk_data] Downloading package wordnet to /root/nltk_data...
    [nltk_data]   Unzipping corpora/wordnet.zip.
    [nltk_data] Error loading stem: Package 'stem' not found in index
    

**Read CSV dataset into dataframe**


```python
# read the dataset using the compression zip
file_path = '/content/drive/MyDrive/Data/Stock Sentiment Analysis/archive.zip'
df = pd.read_csv(file_path, compression='zip', encoding="ISO-8859-1", parse_dates=True) 
```

**Check for duplicate rows and drop the duplicates**


```python
print("Number of records before duplicate removal {}".format(df.shape))
print("Number of duplicate rows {}".format(df[df.duplicated()].shape))
#drop the duplicates
df.drop_duplicates(inplace=True)
print("Number of records after duplicate removal {}".format(df.shape))
```

    Number of records before duplicate removal (4101, 27)
    Number of duplicate rows (0, 27)
    Number of records after duplicate removal (4101, 27)
    

**Define target**


```python
target_var = 'Label'
y = pd.DataFrame(df[target_var])
```

## **Exploratory Data Analysis (EDA)**

### **Basic Data Exploration**



---

**Observe data**

---





**Number of rows and columns**


```python
df.shape
```




    (4101, 27)



**Insight :** The dataset has 4101 rows × 27 features including the target.


**Data Types for the features**


```python
df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 4101 entries, 0 to 4100
    Data columns (total 27 columns):
     #   Column  Non-Null Count  Dtype 
    ---  ------  --------------  ----- 
     0   Date    4101 non-null   object
     1   Label   4101 non-null   int64 
     2   Top1    4101 non-null   object
     3   Top2    4101 non-null   object
     4   Top3    4101 non-null   object
     5   Top4    4101 non-null   object
     6   Top5    4101 non-null   object
     7   Top6    4101 non-null   object
     8   Top7    4101 non-null   object
     9   Top8    4101 non-null   object
     10  Top9    4101 non-null   object
     11  Top10   4101 non-null   object
     12  Top11   4101 non-null   object
     13  Top12   4101 non-null   object
     14  Top13   4101 non-null   object
     15  Top14   4101 non-null   object
     16  Top15   4101 non-null   object
     17  Top16   4101 non-null   object
     18  Top17   4101 non-null   object
     19  Top18   4101 non-null   object
     20  Top19   4101 non-null   object
     21  Top20   4101 non-null   object
     22  Top21   4101 non-null   object
     23  Top22   4101 non-null   object
     24  Top23   4100 non-null   object
     25  Top24   4098 non-null   object
     26  Top25   4098 non-null   object
    dtypes: int64(1), object(26)
    memory usage: 897.1+ KB
    

**Insight :** Out of 27 features 25 are string object, 1 is time-series string object (Date) and 1 is of int data type. Clearly, from the above table features Top23, Top24 and Top25 have missing values or NAN as the non-null values.

**Display sample data**

*   Display the first 5 rows of the dataset along with the target
*   Display the last 5 rows of the dataset along with the target 


```python
df.head(2)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Date</th>
      <th>Label</th>
      <th>Top1</th>
      <th>Top2</th>
      <th>Top3</th>
      <th>Top4</th>
      <th>Top5</th>
      <th>Top6</th>
      <th>Top7</th>
      <th>Top8</th>
      <th>Top9</th>
      <th>Top10</th>
      <th>Top11</th>
      <th>Top12</th>
      <th>Top13</th>
      <th>Top14</th>
      <th>Top15</th>
      <th>Top16</th>
      <th>Top17</th>
      <th>Top18</th>
      <th>Top19</th>
      <th>Top20</th>
      <th>Top21</th>
      <th>Top22</th>
      <th>Top23</th>
      <th>Top24</th>
      <th>Top25</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2000-01-03</td>
      <td>0</td>
      <td>A 'hindrance to operations': extracts from the...</td>
      <td>Scorecard</td>
      <td>Hughes' instant hit buoys Blues</td>
      <td>Jack gets his skates on at ice-cold Alex</td>
      <td>Chaos as Maracana builds up for United</td>
      <td>Depleted Leicester prevail as Elliott spoils E...</td>
      <td>Hungry Spurs sense rich pickings</td>
      <td>Gunners so wide of an easy target</td>
      <td>Derby raise a glass to Strupar's debut double</td>
      <td>Southgate strikes, Leeds pay the penalty</td>
      <td>Hammers hand Robson a youthful lesson</td>
      <td>Saints party like it's 1999</td>
      <td>Wear wolves have turned into lambs</td>
      <td>Stump mike catches testy Gough's taunt</td>
      <td>Langer escapes to hit 167</td>
      <td>Flintoff injury piles on woe for England</td>
      <td>Hunters threaten Jospin with new battle of the...</td>
      <td>Kohl's successor drawn into scandal</td>
      <td>The difference between men and women</td>
      <td>Sara Denver, nurse turned solicitor</td>
      <td>Diana's landmine crusade put Tories in a panic</td>
      <td>Yeltsin's resignation caught opposition flat-f...</td>
      <td>Russian roulette</td>
      <td>Sold out</td>
      <td>Recovering a title</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2000-01-04</td>
      <td>0</td>
      <td>Scorecard</td>
      <td>The best lake scene</td>
      <td>Leader: German sleaze inquiry</td>
      <td>Cheerio, boyo</td>
      <td>The main recommendations</td>
      <td>Has Cubie killed fees?</td>
      <td>Has Cubie killed fees?</td>
      <td>Has Cubie killed fees?</td>
      <td>Hopkins 'furious' at Foster's lack of Hannibal...</td>
      <td>Has Cubie killed fees?</td>
      <td>A tale of two tails</td>
      <td>I say what I like and I like what I say</td>
      <td>Elbows, Eyes and Nipples</td>
      <td>Task force to assess risk of asteroid collision</td>
      <td>How I found myself at last</td>
      <td>On the critical list</td>
      <td>The timing of their lives</td>
      <td>Dear doctor</td>
      <td>Irish court halts IRA man's extradition to Nor...</td>
      <td>Burundi peace initiative fades after rebels re...</td>
      <td>PE points the way forward to the ECB</td>
      <td>Campaigners keep up pressure on Nazi war crime...</td>
      <td>Jane Ratcliffe</td>
      <td>Yet more things you wouldn't know without the ...</td>
      <td>Millennium bug fails to bite</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.tail(2)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Date</th>
      <th>Label</th>
      <th>Top1</th>
      <th>Top2</th>
      <th>Top3</th>
      <th>Top4</th>
      <th>Top5</th>
      <th>Top6</th>
      <th>Top7</th>
      <th>Top8</th>
      <th>Top9</th>
      <th>Top10</th>
      <th>Top11</th>
      <th>Top12</th>
      <th>Top13</th>
      <th>Top14</th>
      <th>Top15</th>
      <th>Top16</th>
      <th>Top17</th>
      <th>Top18</th>
      <th>Top19</th>
      <th>Top20</th>
      <th>Top21</th>
      <th>Top22</th>
      <th>Top23</th>
      <th>Top24</th>
      <th>Top25</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>4099</th>
      <td>2016-06-30</td>
      <td>1</td>
      <td>Jamaica proposes marijuana dispensers for tour...</td>
      <td>Stephen Hawking says pollution and 'stupidity'...</td>
      <td>Boris Johnson says he will not run for Tory pa...</td>
      <td>Six gay men in Ivory Coast were abused and for...</td>
      <td>Switzerland denies citizenship to Muslim immig...</td>
      <td>Palestinian terrorist stabs israeli teen girl ...</td>
      <td>Puerto Rico will default on $1 billion of debt...</td>
      <td>Republic of Ireland fans to be awarded medal f...</td>
      <td>Afghan suicide bomber 'kills up to 40' - BBC News</td>
      <td>US airstrikes kill at least 250 ISIS fighters ...</td>
      <td>Turkish Cop Who Took Down Istanbul Gunman Hail...</td>
      <td>Cannabis compounds could treat Alzheimer's by ...</td>
      <td>Japan's top court has approved blanket surveil...</td>
      <td>CIA Gave Romania Millions to Host Secret Prisons</td>
      <td>Groups urge U.N. to suspend Saudi Arabia from ...</td>
      <td>Googles free wifi at Indian railway stations i...</td>
      <td>Mounting evidence suggests 'hobbits' were wipe...</td>
      <td>The men who carried out Tuesday's terror attac...</td>
      <td>Calls to suspend Saudi Arabia from UN Human Ri...</td>
      <td>More Than 100 Nobel Laureates Call Out Greenpe...</td>
      <td>British pedophile sentenced to 85 years in US ...</td>
      <td>US permitted 1,200 offshore fracks in Gulf of ...</td>
      <td>We will be swimming in ridicule - French beach...</td>
      <td>UEFA says no minutes of silence for Istanbul v...</td>
      <td>Law Enforcement Sources: Gun Used in Paris Ter...</td>
    </tr>
    <tr>
      <th>4100</th>
      <td>2016-07-01</td>
      <td>1</td>
      <td>A 117-year-old woman in Mexico City finally re...</td>
      <td>IMF chief backs Athens as permanent Olympic host</td>
      <td>The president of France says if Brexit won, so...</td>
      <td>British Man Who Must Give Police 24 Hours' Not...</td>
      <td>100+ Nobel laureates urge Greenpeace to stop o...</td>
      <td>Brazil: Huge spike in number of police killing...</td>
      <td>Austria's highest court annuls presidential el...</td>
      <td>Facebook wins privacy case, can track any Belg...</td>
      <td>Switzerland denies Muslim girls citizenship af...</td>
      <td>China kills millions of innocent meditators fo...</td>
      <td>France Cracks Down on Factory Farms - A viral ...</td>
      <td>Abbas PLO Faction Calls Killer of 13-Year-Old ...</td>
      <td>Taiwanese warship accidentally fires missile t...</td>
      <td>Iran celebrates American Human Rights Week, mo...</td>
      <td>U.N. panel moves to curb bias against L.G.B.T....</td>
      <td>The United States has placed Myanmar, Uzbekist...</td>
      <td>S&amp;amp;P revises European Union credit rating t...</td>
      <td>India gets $1 billion loan from World Bank for...</td>
      <td>U.S. sailors detained by Iran spoke too much u...</td>
      <td>Mass fish kill in Vietnam solved as Taiwan ste...</td>
      <td>Philippines president Rodrigo Duterte urges pe...</td>
      <td>Spain arrests three Pakistanis accused of prom...</td>
      <td>Venezuela, where anger over food shortages is ...</td>
      <td>A Hindu temple worker has been killed by three...</td>
      <td>Ozone layer hole seems to be healing - US &amp;amp...</td>
    </tr>
  </tbody>
</table>
</div>





---



**Analyze Target**






---




**Check descriptive statistics for the string data**


```python
df.describe(include='O')
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Date</th>
      <th>Top1</th>
      <th>Top2</th>
      <th>Top3</th>
      <th>Top4</th>
      <th>Top5</th>
      <th>Top6</th>
      <th>Top7</th>
      <th>Top8</th>
      <th>Top9</th>
      <th>Top10</th>
      <th>Top11</th>
      <th>Top12</th>
      <th>Top13</th>
      <th>Top14</th>
      <th>Top15</th>
      <th>Top16</th>
      <th>Top17</th>
      <th>Top18</th>
      <th>Top19</th>
      <th>Top20</th>
      <th>Top21</th>
      <th>Top22</th>
      <th>Top23</th>
      <th>Top24</th>
      <th>Top25</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4101</td>
      <td>4100</td>
      <td>4098</td>
      <td>4098</td>
    </tr>
    <tr>
      <th>unique</th>
      <td>4101</td>
      <td>4074</td>
      <td>4082</td>
      <td>4081</td>
      <td>4087</td>
      <td>4070</td>
      <td>4075</td>
      <td>4078</td>
      <td>4080</td>
      <td>4085</td>
      <td>4077</td>
      <td>4074</td>
      <td>4080</td>
      <td>4082</td>
      <td>4081</td>
      <td>4083</td>
      <td>4083</td>
      <td>4077</td>
      <td>4082</td>
      <td>4078</td>
      <td>4078</td>
      <td>4077</td>
      <td>4078</td>
      <td>4072</td>
      <td>4078</td>
      <td>4066</td>
    </tr>
    <tr>
      <th>top</th>
      <td>2004-10-28</td>
      <td>Morning session</td>
      <td>Round-up</td>
      <td>Corrections and clarifications</td>
      <td>Scoreboard</td>
      <td>Business news in brief</td>
      <td>Media FAQ</td>
      <td>Corrections and clarifications</td>
      <td>Round-up</td>
      <td>Corrections and clarifications</td>
      <td>Notebook</td>
      <td>Corrections and clarifications</td>
      <td>Round-up</td>
      <td>UK news in brief</td>
      <td>Scoreboard</td>
      <td>Corrections and clarifications</td>
      <td>Women's football</td>
      <td>Round-up</td>
      <td>Round-up</td>
      <td>Corrections and clarifications</td>
      <td>Corrections and clarifications</td>
      <td>Corrections and clarifications</td>
      <td>Corrections and clarifications</td>
      <td>Radio pick of the day</td>
      <td>Corrections and clarifications</td>
      <td>Corrections and clarifications</td>
    </tr>
    <tr>
      <th>freq</th>
      <td>1</td>
      <td>6</td>
      <td>4</td>
      <td>5</td>
      <td>3</td>
      <td>4</td>
      <td>4</td>
      <td>6</td>
      <td>3</td>
      <td>8</td>
      <td>5</td>
      <td>7</td>
      <td>5</td>
      <td>4</td>
      <td>4</td>
      <td>4</td>
      <td>3</td>
      <td>4</td>
      <td>7</td>
      <td>7</td>
      <td>6</td>
      <td>6</td>
      <td>8</td>
      <td>5</td>
      <td>9</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>



**Insight :** Analyze the data, 
*   All dates are unique, no repititions
*   All news columns Top1..Top25 have some repetitions of news, e.g. Top1 has headline 'UK news in brief...' repeated 6 times.

**Analyze the Date feature**


```python
df['Date'].min(), df['Date'].max()
```




    ('2000-01-03', '2016-07-01')



**Insight:** The data for the news headlines ranges from '2000-01-03' till '2016-07-01'.

**Find the unique classes for the target variable**


```python
sorted(df[target_var].unique())
```




    [0, 1]



**Insight :** The target value i.e. the Label feature is 1 if stock value rose or stayed same, 0 if it decreased.

**Summarize target class distribution**


```python
print(Counter(y.Label))
```

    Counter({1: 2166, 0: 1935})
    

The above data shows that there is sufficient number of samples for both the classes, hence data is balanced.

### **Univariate Analysis**

**Checking for Missing Data**


```python
df.isna().sum()
```




    Date     0
    Label    0
    Top1     0
    Top2     0
    Top3     0
    Top4     0
    Top5     0
    Top6     0
    Top7     0
    Top8     0
    Top9     0
    Top10    0
    Top11    0
    Top12    0
    Top13    0
    Top14    0
    Top15    0
    Top16    0
    Top17    0
    Top18    0
    Top19    0
    Top20    0
    Top21    0
    Top22    0
    Top23    1
    Top24    3
    Top25    3
    dtype: int64



**Insight:** Top23, Top24, Top25 have missing values 1, 3, 3 respectively.

**Plot the distribution of the target variable**


```python
ax = sns.countplot(x=target_var, data=df)
for p in ax.patches:
  ax.annotate('{}={:.2f}%'.format(p.get_height(), p.get_height()/df.shape[0]*100), (p.get_x()+0.15, p.get_height()+1))
```


    
![png](/assets/images/stock-senti/output_42_0.png)
    


**Insight :** 
*   Since there is no disparity in the number of quality inputs, it can be concluded that the dataset is balanced.



```python
news_df = df.copy()

news_df['Year'] = news_df['Date'].str.slice(0, 4)
news_df[['Year', 'Label']].groupby(['Year'], as_index=False).count()
news_data = pd.crosstab(index=news_df['Year'], columns=news_df['Label'])
news_data
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th>Label</th>
      <th>0</th>
      <th>1</th>
    </tr>
    <tr>
      <th>Year</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2000</th>
      <td>119</td>
      <td>128</td>
    </tr>
    <tr>
      <th>2001</th>
      <td>123</td>
      <td>123</td>
    </tr>
    <tr>
      <th>2002</th>
      <td>125</td>
      <td>97</td>
    </tr>
    <tr>
      <th>2003</th>
      <td>112</td>
      <td>136</td>
    </tr>
    <tr>
      <th>2004</th>
      <td>121</td>
      <td>131</td>
    </tr>
    <tr>
      <th>2005</th>
      <td>119</td>
      <td>133</td>
    </tr>
    <tr>
      <th>2006</th>
      <td>107</td>
      <td>135</td>
    </tr>
    <tr>
      <th>2007</th>
      <td>105</td>
      <td>146</td>
    </tr>
    <tr>
      <th>2008</th>
      <td>134</td>
      <td>119</td>
    </tr>
    <tr>
      <th>2009</th>
      <td>116</td>
      <td>136</td>
    </tr>
    <tr>
      <th>2010</th>
      <td>109</td>
      <td>143</td>
    </tr>
    <tr>
      <th>2011</th>
      <td>113</td>
      <td>139</td>
    </tr>
    <tr>
      <th>2012</th>
      <td>127</td>
      <td>123</td>
    </tr>
    <tr>
      <th>2013</th>
      <td>106</td>
      <td>146</td>
    </tr>
    <tr>
      <th>2014</th>
      <td>113</td>
      <td>139</td>
    </tr>
    <tr>
      <th>2015</th>
      <td>130</td>
      <td>122</td>
    </tr>
    <tr>
      <th>2016</th>
      <td>56</td>
      <td>70</td>
    </tr>
  </tbody>
</table>
</div>




```python
sns.lineplot(data=news_data)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7fc89f27bd10>




    
![png](/assets/images/stock-senti/output_45_1.png)
    


## **Data Preprocessing**

**Steps to be followed:**

*   The Date feature is in proper DateTime datatype, hence no preprocessing required.
*   The target is already categorical so no preprocessing required.
*   Merge all the columns of the news into one news headlines.
*   Remove all punctuations.
*   Remove all numbers.
*   Convert to lower case. (Done using TF-IDF normalization)
*   Remove all the links. 
*   Remove all the special characters, emoticons.
*   Remove all the hashtags (#), @ symbol.
*   Tokenize, remove stopwords, lemmatize the words and get bigrams using TF-IDF.



**Merge all the columns of the news into one news headlines**


```python
#join all the news headlines columns into one column named 'News'
df['News'] = df.filter(like='Top', axis=1).apply(lambda x: ' '.join(x.dropna().astype(str)), axis=1)
df['News'].head()
```




    0    A 'hindrance to operations': extracts from the...
    1    Scorecard The best lake scene Leader: German s...
    2    Coventry caught on counter by Flo United's riv...
    3    Pilgrim knows how to progress Thatcher facing ...
    4    Hitches and Horlocks Beckham off but United su...
    Name: News, dtype: object



**Drop not required features of individual news headlines**


```python
#drop the individual columns of headlines
df.drop(df.filter(like='Top', axis=1).columns, axis=1, inplace=True)
df.columns
```




    Index(['Date', 'Label', 'News'], dtype='object')



**Remove punctuations, numbers and special characters**


```python
#removing punctuations, numbers, special characters
df['News'] = df['News'].apply(lambda x : re.sub(r'[^a-zA-Z]', ' ', x))
```

## **Machine Learning**

**Splitting the data into Training and Testing sample**

Since it is a time-series data random split can't be done. Hence, split the latest data as a test set and the initial data as a train set.


```python
#train test split
X_train = df[df['Date'] < '20150101']
X_test = df[df['Date'] > '20141231']
y_train = X_train.Label
y_test = X_test.Label
X_train.drop('Label', axis=1, inplace=True)
X_test.drop('Label', axis=1, inplace=True)
```


```python
# Sanity check for the sampled data
len(X_train), y_train.shape, len(X_test), y_test.shape
```




    (3975, (3975,), 378, (378,))



**TF-IDF-normalization**
Perform TF-IDF-normalization on the training set seperately and then use the IDF-vector from the training set to calculate the TF-IDF vectors of the test set.


```python
tfidf_vec = TfidfVectorizer(ngram_range=(2, 2), lowercase=True, analyzer='word', stop_words='english', use_idf=True)
X_train_tfidf = tfidf_vec.fit_transform(list(X_train['News']))
X_test_tfidf = tfidf_vec.transform(list(X_test['News']))
```


```python
X_train_tfidf
```




    <3975x572572 sparse matrix of type '<class 'numpy.float64'>'
    	with 726112 stored elements in Compressed Sparse Row format>




```python
X_train_tfidf.shape, y_train.shape, X_test_tfidf.shape, y_test.shape
```




    ((3975, 572572), (3975,), (378, 572572), (378,))



### **MultinomialNB**

**Fit the model**


```python
classifier_model = MultinomialNB()

classifier_model.fit(X_train_tfidf, y_train)
```




    MultinomialNB(alpha=1.0, class_prior=None, fit_prior=True)



**Use model to predict the values for test data**


```python
y_pred = classifier_model.predict(X_test_tfidf)
```

**Check the metrics**


```python
print(f"Тrain: {classifier_model.score(X_train_tfidf, y_train)*100} - Тest: {classifier_model.score(X_test_tfidf, y_test)*100}")

print("accuracy_score: ", accuracy_score(y_test, y_pred)*100)

print(classification_report(y_test, y_pred))
```

    Тrain: 100.0 - Тest: 84.65608465608466
    accuracy_score:  84.65608465608466
                  precision    recall  f1-score   support
    
               0       0.98      0.70      0.82       186
               1       0.77      0.99      0.87       192
    
        accuracy                           0.85       378
       macro avg       0.88      0.84      0.84       378
    weighted avg       0.88      0.85      0.84       378
    
    

**Plot the confusion matrix**


```python
ax = sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='.3g', cmap="Pastel1")
ax.set_xticklabels(['class 0 predicted', 'class 1 predict'])
ax.set_yticklabels(['class 0 actual', 'class 1 actual'])
```




    [Text(0, 0.5, 'class 0 actual'), Text(0, 1.5, 'class 1 actual')]




    
![png](/assets/images/stock-senti/output_71_1.png)
    



```python
from sklearn.linear_model import PassiveAggressiveClassifier

#Initialize a PassiveAggressiveClassifier
classifier_model = PassiveAggressiveClassifier(max_iter=500, early_stopping=True, validation_fraction=0.3, class_weight='balanced', random_state=5)
classifier_model.fit(X_train_tfidf, y_train)

#Predict on the test set and calculate accuracy
y_pred = classifier_model.predict(X_test_tfidf)

print(f"Тrain: {classifier_model.score(X_train_tfidf, y_train)*100} - Тest: {classifier_model.score(X_test_tfidf, y_test)*100}")

print("accuracy_score: ", accuracy_score(y_test, y_pred)*100)

print(classification_report(y_test, y_pred))
```

    Тrain: 85.71069182389938 - Тest: 78.04232804232805
    accuracy_score:  78.04232804232805
                  precision    recall  f1-score   support
    
               0       0.82      0.70      0.76       186
               1       0.75      0.85      0.80       192
    
        accuracy                           0.78       378
       macro avg       0.79      0.78      0.78       378
    weighted avg       0.79      0.78      0.78       378
    
    

**Model Building Outcomes**

*   MultinomialNB produces around 84% accuracy.


