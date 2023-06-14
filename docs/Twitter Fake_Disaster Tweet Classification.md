# **Twitter Fake/Disaster Tweet Classification Case Study**

## **Define problem statement**

**Problem Statement :** To create a model which can predict  whether a given tweet is about a real disaster or fake.

**Output Target :** Target (1 if tweet is real, 0 if it is fake)

**Input predictors :** Text, Keyword, Location

**Solution :** To create a supervised ML classification model using NLP, as the input predictors are text based tweets and the target variable is categorical.

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

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer


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
    [nltk_data]   Package stopwords is already up-to-date!
    [nltk_data] Downloading package punkt to /root/nltk_data...
    [nltk_data]   Package punkt is already up-to-date!
    [nltk_data] Downloading package wordnet to /root/nltk_data...
    [nltk_data]   Package wordnet is already up-to-date!
    

**Read CSV dataset into dataframe**


```python
# read the dataset using the compression zip
file_path = '/content/drive/MyDrive/Data/Twitter Fake/'
train_df = pd.read_csv(file_path+'train.csv') 
```

**Check for duplicate rows and drop the duplicates**


```python
print("Number of records before duplicate removal {}".format(train_df.shape))
print("Number of duplicate rows {}".format(train_df[train_df.duplicated()].shape))
#drop the duplicates
train_df.drop_duplicates(inplace=True)
print("Number of records after duplicate removal {}".format(train_df.shape))
```

    Number of records before duplicate removal (7613, 5)
    Number of duplicate rows (0, 5)
    Number of records after duplicate removal (7613, 5)
    

**Define target**


```python
target_var = 'target'
y = pd.DataFrame(train_df[target_var])
```

## **Exploratory Data Analysis (EDA)**

### **Basic Data Exploration**



---

**Observe data**

---





**Number of rows and columns**


```python
train_df.shape
```




    (7613, 5)



**Insight :** The dataset has 7613 rows × 5 features including the target.


**Data Types for the features**


```python
train_df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 7613 entries, 0 to 7612
    Data columns (total 5 columns):
     #   Column    Non-Null Count  Dtype 
    ---  ------    --------------  ----- 
     0   id        7613 non-null   int64 
     1   keyword   7552 non-null   object
     2   location  5080 non-null   object
     3   text      7613 non-null   object
     4   target    7613 non-null   int64 
    dtypes: int64(2), object(3)
    memory usage: 356.9+ KB
    

**Insight :** Out of 5 features 3 are string object, and 2 are of int data type. Clearly, from the above table features keyword and location have missing values or NAN as the non-null values.

**Display sample data**

*   Display the first 5 rows of the dataset along with the target
*   Display the last 5 rows of the dataset along with the target 


```python
train_df.head()
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
      <th>id</th>
      <th>keyword</th>
      <th>location</th>
      <th>text</th>
      <th>target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Our Deeds are the Reason of this #earthquake M...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Forest fire near La Ronge Sask. Canada</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>5</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>All residents asked to 'shelter in place' are ...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>6</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>13,000 people receive #wildfires evacuation or...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>7</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Just got sent this photo from Ruby #Alaska as ...</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>




```python
train_df.tail()
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
      <th>id</th>
      <th>keyword</th>
      <th>location</th>
      <th>text</th>
      <th>target</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>7608</th>
      <td>10869</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Two giant cranes holding a bridge collapse int...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>7609</th>
      <td>10870</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>@aria_ahrary @TheTawniest The out of control w...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>7610</th>
      <td>10871</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>M1.94 [01:04 UTC]?5km S of Volcano Hawaii. htt...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>7611</th>
      <td>10872</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>Police investigating after an e-bike collided ...</td>
      <td>1</td>
    </tr>
    <tr>
      <th>7612</th>
      <td>10873</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>The Latest: More Homes Razed by Northern Calif...</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>





---



**Analyze Target**






---




**Check descriptive statistics for the string data**


```python
train_df.describe(include='O')
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
      <th>keyword</th>
      <th>location</th>
      <th>text</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>7552</td>
      <td>5080</td>
      <td>7613</td>
    </tr>
    <tr>
      <th>unique</th>
      <td>221</td>
      <td>3341</td>
      <td>7503</td>
    </tr>
    <tr>
      <th>top</th>
      <td>fatalities</td>
      <td>USA</td>
      <td>11-Year-Old Boy Charged With Manslaughter of T...</td>
    </tr>
    <tr>
      <th>freq</th>
      <td>45</td>
      <td>104</td>
      <td>10</td>
    </tr>
  </tbody>
</table>
</div>



**Insight :** Analyze the data, 
*   All text tweets have some repetitions, e.g. tweet '11-Year-Old Boy Charged...' is repeated 10 times.

**Find the unique classes for the target variable**


```python
sorted(train_df[target_var].unique())
```




    [0, 1]



**Insight :** The target value i.e. is 1 if tweet is real, 0 if it is fake.

**Summarize target class distribution**


```python
print(y[target_var].value_counts())
```

    0    4342
    1    3271
    Name: target, dtype: int64
    

The above data shows that there is sufficient number of samples for both the classes, hence data is balanced.

### **Univariate Analysis**

**Checking for Missing Data**


```python
train_df.isna().sum()
```




    id             0
    keyword       61
    location    2533
    text           0
    target         0
    dtype: int64




```python
col_val_missing = [col for col in train_df.columns if train_df[col].isna().sum()>0]
col_val_missing
```




    ['keyword', 'location']



**Insight:** kewyword and location have missing values 61, 2533 respectively.

**Plot the distribution of the target variable**


```python
ax = sns.countplot(x=target_var, data=train_df)
for p in ax.patches:
  ax.annotate('{}={:.2f}%'.format(p.get_height(), p.get_height()/train_df.shape[0]*100), (p.get_x()+0.15, p.get_height()+1))
```


    
![png](/assets/images/fake-tweet/output_40_0.png)
    


**Insight :** 
*   Since there is no disparity in the number of quality inputs, it can be concluded that the dataset is balanced.


## **Data Preprocessing**

**Steps to be followed:**

*   The target is already categorical so no preprocessing required.
*   Replace the missing values of location and keyword with the value that appears most often.
*   Merge the columns text, location and keyword into one tweet.
*   Remove all punctuations.
*   Remove all numbers.
*   Convert to lower case.
*   Remove all the links.
*   Remove all the special characters, emoticons.
*   Remove all the hashtags (#), @ symbol.
*   Tokenize, remove stopwords, lemmatize the words and get bigrams using TF-IDF



**Handle missing values**


```python
for col in col_val_missing:
  train_df[col].fillna(train_df[col].mode()[0], inplace=True)

train_df.isna().sum()
```




    id          0
    keyword     0
    location    0
    text        0
    target      0
    dtype: int64



**Drop unnecessary columns**


```python
train_df.drop('id', axis=1, inplace=True)
```

**Concatenation of the input predictors** 


```python
#join all the input columns into one column named 'Tweet'
train_df['Tweet'] = train_df['keyword'] + ' ' + train_df['location'] + ' ' + train_df['text']
train_df['Tweet'][0]
```




    'fatalities USA Our Deeds are the Reason of this #earthquake May ALLAH Forgive us all'



**Insight :**

Concatenation of the input predictors so the model will be more generalized because adding more words to the input may increase the reliablity of the model.

**Drop not required features of individual tweet details**


```python
#drop the individual columns
train_df.drop(['location', 'keyword', 'text'], axis=1, inplace=True)
train_df.columns
```




    Index(['target', 'Tweet'], dtype='object')



**Function for cleaning the news data**


```python
#Preprocess data
def cleaner(data, col_to_clean):
  '''
  input - the data
  output - list of cleaned tweets
  process - Removes all punctuations, numbers, links, special characters, emoticons, hashtags and stop words
            Converts to lower case and lemmatize the words.
  '''
 
  #removing punctuations, numbers, special characters
  data[col_to_clean] = data[col_to_clean].apply(lambda x : re.sub(r'[^a-zA-Z]', ' ', x))
  
  #change to lower case
  data[col_to_clean] = data[col_to_clean].str.lower()
  
  #tokenize and remove stop words
  data[col_to_clean] = data[col_to_clean].apply(lambda x: ' '.join(word for word in nltk.word_tokenize(x) 
      if word not in stopwords.words('english')))

  #lemmatize
  data.loc[:][col_to_clean] = data.loc[:][col_to_clean].apply(lambda x: " ".join([WordNetLemmatizer().lemmatize(word) for word in x.split()]))

  #removing hyperlink
  data[col_to_clean] = data[col_to_clean].apply(lambda x:re.sub('https?://\S+|www\.\S+', '', x))

  freq = pd.Series(' '.join(data[col_to_clean]).split()).value_counts()[:10]
  #print(freq)

  #Common word removal
  freq = list(freq.index)
  data.loc[:][col_to_clean] = data.loc[:][col_to_clean].apply(lambda x: " ".join(x for x in x.split() if x not in freq))

  freq = pd.Series(' '.join(data[col_to_clean]).split()).value_counts()[-10:]
  #print(freq)

  #Rare words removal
  freq = list(freq.index)
  data.loc[:][col_to_clean] = data.loc[:][col_to_clean].apply(lambda x: " ".join(x for x in x.split() if x not in freq))

  clean_data = list(data[col_to_clean])

  return clean_data
```

**Separate Target Output and Input Features**


```python
X = cleaner(train_df, 'Tweet')

y = train_df['target']
```

## **Machine Learning**

**Splitting the data into Training and Testing sample**


```python
#train test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30, random_state=7, shuffle=True)
```

**TF-IDF-normalization**

Vectorization is mapping words or phrases  to a corresponding vector of real numbers which are then used for the prediction using the model.

**Steps to perform:**
*   Perform TF-IDF-normalization on the training set seperately.
*   Use the IDF-vector from the training set to calculate the TF-IDF vectors of the test set.


**Make Pipeline, use model to predict the values, check the metrics, Plot the confusion matrix**


```python
from sklearn.pipeline import Pipeline

#build the pipeline for the ML model
text_pipe = Pipeline([('vector', TfidfVectorizer(ngram_range=(2, 2))), ('model', LogisticRegression())])

text_pipe.fit(X_train, y_train)

y_pred = text_pipe.predict(X_test)

print(f"Тrain: {text_pipe.score(X_train, y_train)*100} - Тest: {text_pipe.score(X_test, y_test)*100}")

print("accuracy_score: ", accuracy_score(y_test, y_pred)*100)

print(classification_report(y_test, y_pred))

ax = sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='.4g', cmap="Pastel1")
ax.set_xticklabels(['True predicted', 'Fake predict'])
ax.set_yticklabels(['True actual', 'Fake actual'])
```

    Тrain: 97.12891724526177 - Тest: 72.94220665499125
    accuracy_score:  72.94220665499125
                  precision    recall  f1-score   support
    
               0       0.69      0.95      0.80      1304
               1       0.87      0.43      0.58       980
    
        accuracy                           0.73      2284
       macro avg       0.78      0.69      0.69      2284
    weighted avg       0.77      0.73      0.71      2284
    
    




    [Text(0, 0.5, 'True actual'), Text(0, 1.5, 'Fake actual')]




    
![png](/assets/images/fake-tweet/output_62_2.png)
    


**Model Building Outcomes**

*   LogisticRegression produces around 72% accuracy.

