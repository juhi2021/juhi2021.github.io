# **Wine Quality Prediction**

## **Define problem statement**

**Problem Statement :** To create a model which can predict the quality of wine based on the given chemical properties of the wine.

**Output Target :** quality (1 means worst and 10 means best, dataset contains 3-8 range of quality)

**Input predictors :** fixed acidity, free sulphur dioxide, sulphates, chlorides, alcohol, citric acid, residual sugar, total sulfur dioxide, density, pH

**Solution :** To create a supervised ML classification model, as the target variable is categorical.

## **Load Data**

**Import libraries**


```python
#import pandas for loading the CSV file
import pandas as pd

#import numpy for maths
import numpy as np

# import seaborn for visualization
import seaborn as sns

from sklearn import preprocessing
from collections import Counter

# import module for table creation
from tabulate import tabulate

#import matplotlib for graphs
import matplotlib.pyplot as plt

#To visualise in the notebook
%matplotlib inline

#filter the warning messages
import warnings
warnings.filterwarnings('ignore')

#library for Standardization of a dataset (e.g. Gaussian with 0 mean and unit variance)
from sklearn.preprocessing import StandardScaler

#library for splitting dataset into test and train
from sklearn.model_selection import train_test_split

#library for the models used in this case study
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.linear_model import LogisticRegression

#metric used for the models of this case study
from sklearn.model_selection import cross_validate, cross_val_score
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, precision_score
from sklearn.metrics import balanced_accuracy_score, roc_auc_score
from sklearn.model_selection import KFold

#Feature selection library
from sklearn.feature_selection import SelectKBest, chi2
from sklearn.feature_selection import f_classif
from sklearn.feature_selection import mutual_info_classif

#library for imbalanced resampling (over sampling)
from imblearn.over_sampling import SMOTE

sns.set_style('darkgrid')

# Mount google drive in google colab
#from google.colab import drive
#drive.mount('/content/drive')

#to import the custom module after mounting the drive
import sys
sys.path.insert(0, '/content/drive/My Drive/Colab Notebooks')

#custom library for data exploration
from lib import explore_data as ed
from lib.Model import Model
```

    Hello you are in explore_data file
    

**Read CSV dataset into dataframe**


```python
train_path = '/content/drive/MyDrive/Data/Wine/winequality-red.csv'
train_df = pd.read_csv(train_path)
```

**Check for duplicate rows and drop the duplicates**


```python
print("Number of duplicate rows {}".format(train_df[train_df.duplicated()].shape))
#drop the duplicates
train_df.drop_duplicates(inplace=True)
print("Number of records after duplicate removal {}".format(train_df.shape))
```

    Number of duplicate rows (240, 12)
    Number of records after duplicate removal (1359, 12)
    

**Define target**


```python
target_var = 'quality'
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




    (1359, 12)



**Insight :** The dataset has 1599 rows × 12 features including the target.


**Data Types for the features**


```python
train_df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 1359 entries, 0 to 1598
    Data columns (total 12 columns):
     #   Column                Non-Null Count  Dtype  
    ---  ------                --------------  -----  
     0   fixed acidity         1359 non-null   float64
     1   volatile acidity      1359 non-null   float64
     2   citric acid           1359 non-null   float64
     3   residual sugar        1359 non-null   float64
     4   chlorides             1359 non-null   float64
     5   free sulfur dioxide   1359 non-null   float64
     6   total sulfur dioxide  1359 non-null   float64
     7   density               1359 non-null   float64
     8   pH                    1359 non-null   float64
     9   sulphates             1359 non-null   float64
     10  alcohol               1359 non-null   float64
     11  quality               1359 non-null   int64  
    dtypes: float64(11), int64(1)
    memory usage: 138.0 KB
    

**Insight :** Out of 12 features 11 are float and 1 is of int data type. Clearly, from the above table none of the feature have missing values or NAN as the non-null values equals the total number of records.

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
      <th>fixed acidity</th>
      <th>volatile acidity</th>
      <th>citric acid</th>
      <th>residual sugar</th>
      <th>chlorides</th>
      <th>free sulfur dioxide</th>
      <th>total sulfur dioxide</th>
      <th>density</th>
      <th>pH</th>
      <th>sulphates</th>
      <th>alcohol</th>
      <th>quality</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>7.4</td>
      <td>0.70</td>
      <td>0.00</td>
      <td>1.9</td>
      <td>0.076</td>
      <td>11.0</td>
      <td>34.0</td>
      <td>0.9978</td>
      <td>3.51</td>
      <td>0.56</td>
      <td>9.4</td>
      <td>5</td>
    </tr>
    <tr>
      <th>1</th>
      <td>7.8</td>
      <td>0.88</td>
      <td>0.00</td>
      <td>2.6</td>
      <td>0.098</td>
      <td>25.0</td>
      <td>67.0</td>
      <td>0.9968</td>
      <td>3.20</td>
      <td>0.68</td>
      <td>9.8</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2</th>
      <td>7.8</td>
      <td>0.76</td>
      <td>0.04</td>
      <td>2.3</td>
      <td>0.092</td>
      <td>15.0</td>
      <td>54.0</td>
      <td>0.9970</td>
      <td>3.26</td>
      <td>0.65</td>
      <td>9.8</td>
      <td>5</td>
    </tr>
    <tr>
      <th>3</th>
      <td>11.2</td>
      <td>0.28</td>
      <td>0.56</td>
      <td>1.9</td>
      <td>0.075</td>
      <td>17.0</td>
      <td>60.0</td>
      <td>0.9980</td>
      <td>3.16</td>
      <td>0.58</td>
      <td>9.8</td>
      <td>6</td>
    </tr>
    <tr>
      <th>5</th>
      <td>7.4</td>
      <td>0.66</td>
      <td>0.00</td>
      <td>1.8</td>
      <td>0.075</td>
      <td>13.0</td>
      <td>40.0</td>
      <td>0.9978</td>
      <td>3.51</td>
      <td>0.56</td>
      <td>9.4</td>
      <td>5</td>
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
      <th>fixed acidity</th>
      <th>volatile acidity</th>
      <th>citric acid</th>
      <th>residual sugar</th>
      <th>chlorides</th>
      <th>free sulfur dioxide</th>
      <th>total sulfur dioxide</th>
      <th>density</th>
      <th>pH</th>
      <th>sulphates</th>
      <th>alcohol</th>
      <th>quality</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1593</th>
      <td>6.8</td>
      <td>0.620</td>
      <td>0.08</td>
      <td>1.9</td>
      <td>0.068</td>
      <td>28.0</td>
      <td>38.0</td>
      <td>0.99651</td>
      <td>3.42</td>
      <td>0.82</td>
      <td>9.5</td>
      <td>6</td>
    </tr>
    <tr>
      <th>1594</th>
      <td>6.2</td>
      <td>0.600</td>
      <td>0.08</td>
      <td>2.0</td>
      <td>0.090</td>
      <td>32.0</td>
      <td>44.0</td>
      <td>0.99490</td>
      <td>3.45</td>
      <td>0.58</td>
      <td>10.5</td>
      <td>5</td>
    </tr>
    <tr>
      <th>1595</th>
      <td>5.9</td>
      <td>0.550</td>
      <td>0.10</td>
      <td>2.2</td>
      <td>0.062</td>
      <td>39.0</td>
      <td>51.0</td>
      <td>0.99512</td>
      <td>3.52</td>
      <td>0.76</td>
      <td>11.2</td>
      <td>6</td>
    </tr>
    <tr>
      <th>1597</th>
      <td>5.9</td>
      <td>0.645</td>
      <td>0.12</td>
      <td>2.0</td>
      <td>0.075</td>
      <td>32.0</td>
      <td>44.0</td>
      <td>0.99547</td>
      <td>3.57</td>
      <td>0.71</td>
      <td>10.2</td>
      <td>5</td>
    </tr>
    <tr>
      <th>1598</th>
      <td>6.0</td>
      <td>0.310</td>
      <td>0.47</td>
      <td>3.6</td>
      <td>0.067</td>
      <td>18.0</td>
      <td>42.0</td>
      <td>0.99549</td>
      <td>3.39</td>
      <td>0.66</td>
      <td>11.0</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>





---



**Analyze Target**






---




**Check descriptive statistics for the numeric data**


```python
train_df.describe().append([train_df.mode().rename({0:'Mode'}, axis='index'), 
               train_df.skew().to_frame().swapaxes(1, 0).rename({0:'Skew'}, axis='index'),
               train_df.kurt().to_frame().swapaxes(1, 0).rename({0:'Kurt'}, axis='index'),
               (train_df.quantile(0.75) - train_df.quantile(0.25)).to_frame().swapaxes(1, 0).rename({0:'IQR'}, axis='index')]).round(2)
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
      <th>fixed acidity</th>
      <th>volatile acidity</th>
      <th>citric acid</th>
      <th>residual sugar</th>
      <th>chlorides</th>
      <th>free sulfur dioxide</th>
      <th>total sulfur dioxide</th>
      <th>density</th>
      <th>pH</th>
      <th>sulphates</th>
      <th>alcohol</th>
      <th>quality</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>1359.00</td>
      <td>1359.00</td>
      <td>1359.00</td>
      <td>1359.00</td>
      <td>1359.00</td>
      <td>1359.00</td>
      <td>1359.00</td>
      <td>1359.00</td>
      <td>1359.00</td>
      <td>1359.00</td>
      <td>1359.00</td>
      <td>1359.00</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>8.31</td>
      <td>0.53</td>
      <td>0.27</td>
      <td>2.52</td>
      <td>0.09</td>
      <td>15.89</td>
      <td>46.83</td>
      <td>1.00</td>
      <td>3.31</td>
      <td>0.66</td>
      <td>10.43</td>
      <td>5.62</td>
    </tr>
    <tr>
      <th>std</th>
      <td>1.74</td>
      <td>0.18</td>
      <td>0.20</td>
      <td>1.35</td>
      <td>0.05</td>
      <td>10.45</td>
      <td>33.41</td>
      <td>0.00</td>
      <td>0.16</td>
      <td>0.17</td>
      <td>1.08</td>
      <td>0.82</td>
    </tr>
    <tr>
      <th>min</th>
      <td>4.60</td>
      <td>0.12</td>
      <td>0.00</td>
      <td>0.90</td>
      <td>0.01</td>
      <td>1.00</td>
      <td>6.00</td>
      <td>0.99</td>
      <td>2.74</td>
      <td>0.33</td>
      <td>8.40</td>
      <td>3.00</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>7.10</td>
      <td>0.39</td>
      <td>0.09</td>
      <td>1.90</td>
      <td>0.07</td>
      <td>7.00</td>
      <td>22.00</td>
      <td>1.00</td>
      <td>3.21</td>
      <td>0.55</td>
      <td>9.50</td>
      <td>5.00</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>7.90</td>
      <td>0.52</td>
      <td>0.26</td>
      <td>2.20</td>
      <td>0.08</td>
      <td>14.00</td>
      <td>38.00</td>
      <td>1.00</td>
      <td>3.31</td>
      <td>0.62</td>
      <td>10.20</td>
      <td>6.00</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>9.20</td>
      <td>0.64</td>
      <td>0.43</td>
      <td>2.60</td>
      <td>0.09</td>
      <td>21.00</td>
      <td>63.00</td>
      <td>1.00</td>
      <td>3.40</td>
      <td>0.73</td>
      <td>11.10</td>
      <td>6.00</td>
    </tr>
    <tr>
      <th>max</th>
      <td>15.90</td>
      <td>1.58</td>
      <td>1.00</td>
      <td>15.50</td>
      <td>0.61</td>
      <td>72.00</td>
      <td>289.00</td>
      <td>1.00</td>
      <td>4.01</td>
      <td>2.00</td>
      <td>14.90</td>
      <td>8.00</td>
    </tr>
    <tr>
      <th>Mode</th>
      <td>7.20</td>
      <td>0.50</td>
      <td>0.00</td>
      <td>2.00</td>
      <td>0.08</td>
      <td>6.00</td>
      <td>28.00</td>
      <td>1.00</td>
      <td>3.30</td>
      <td>0.54</td>
      <td>9.50</td>
      <td>5.00</td>
    </tr>
    <tr>
      <th>Skew</th>
      <td>0.94</td>
      <td>0.73</td>
      <td>0.31</td>
      <td>4.55</td>
      <td>5.50</td>
      <td>1.23</td>
      <td>1.54</td>
      <td>0.04</td>
      <td>0.23</td>
      <td>2.41</td>
      <td>0.86</td>
      <td>0.19</td>
    </tr>
    <tr>
      <th>Kurt</th>
      <td>1.05</td>
      <td>1.25</td>
      <td>-0.79</td>
      <td>29.36</td>
      <td>38.62</td>
      <td>1.89</td>
      <td>4.04</td>
      <td>0.83</td>
      <td>0.88</td>
      <td>11.10</td>
      <td>0.16</td>
      <td>0.34</td>
    </tr>
    <tr>
      <th>IQR</th>
      <td>2.10</td>
      <td>0.25</td>
      <td>0.34</td>
      <td>0.70</td>
      <td>0.02</td>
      <td>14.00</td>
      <td>41.00</td>
      <td>0.00</td>
      <td>0.19</td>
      <td>0.18</td>
      <td>1.60</td>
      <td>1.00</td>
    </tr>
  </tbody>
</table>
</div>



**Insight :** Analyze the data, for example, the feature 'fixed acidity' has 
*   total 1359 records
*   mean of 8.31
*   standard deviation as 1.74
*   4.6 as its minimum value
*   15.9 as its maximum value
*   range is 15.9-4.6=11.3
*   25% of the values of the feature are < or = 7.1
*   50% of the values of the feature are < or = 7.9 i.e. the median value
*   75% of the values of the feature are < or = 9.2
*   and only 25% of the values of the feature are > 9.2 but less than 15.9
*   mean > median indicating the distribution is positively skewed (the distribution peak is towards left and the tail on the right side of the distribution is longer or fatter)
*   Range (11.3) is much larger compared to the IQR (2.1).
*   The above two observations indicate that there are outliers in the data.
*   Mode is 7.2 (most frequent value)
*   Skewness = 0.94 shows that the feature is moderately positively skewed
*   Kurtosis = 1.05 shows that the feature's distribution is shorter and the tails are thinner than the normal distribution
*   Notice the high values of Kurtosis for features Residual Sugar and Chlorides suggesting heavy tails and thereby many outliers.
*   Notice the high values of Skewness for features Residual Sugar and Chlorides suggesting a right-skewed distribution and indicating the presence of extreme higher values.
*   Notice high variance of feature 'Total Sulphur dioxide'

Similarly, analyze other features.

**Find the unique classes for the target variable**


```python
sorted(train_df['quality'].unique())
```




    [3, 4, 5, 6, 7, 8]



**Insight :** The target value i.e. the quality feature for wine is within range 3-8, indicating that wine with value 3 has lowest quality and wine with 8 has the highest quality. Therefore, quality is an ordinal variable with a possible ranking from 1(worst quality wine) to 10(best quality wine).

**Summarize target class distribution**


```python
print(Counter(y.quality))
```

    Counter({5: 577, 6: 535, 7: 167, 4: 53, 8: 17, 3: 10})
    

The above data shows that there are too few examples of the minority class for a model to effectively learn the decision boundary. Hence the dataset is imbalanced. One approach to addressing imbalanced datasets is to oversample the minority class. We will use Synthetic Minority Oversampling Technique, or SMOTE for over sampling.



---

**Analyze input predictors**

---



**List of numerical and categorical features**


```python
# list of numerical variables
num_feat_list = train_df.select_dtypes(include=np.number).columns.tolist()
print('numerical features: ', num_feat_list)

# list of categorical variables
cat_feat_list = list(train_df.select_dtypes(exclude=np.number).columns)
print('categorical features: {}'.format(cat_feat_list))
```

    numerical features:  ['fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar', 'chlorides', 'free sulfur dioxide', 'total sulfur dioxide', 'density', 'pH', 'sulphates', 'alcohol', 'quality']
    categorical features: []
    

**Check for mismatched numeric variables and categorical variables**


```python
#Check for unique values of each feature, if the values are <20 then the variable is likely to be categorical
cat_feats_as_num = train_df.columns[train_df.nunique()<20].to_list()
print('Categorical Features with wrong datatypes {}'.format(cat_feats_as_num))
```

    Categorical Features with wrong datatypes ['quality']
    

**Change the datatypes of the mismatched variables**


```python
# change data type of num columns to cat type
for i in cat_feats_as_num:
  train_df[i] = train_df[i].astype('category')
```

**Recalculate the list of numeric and categorical features**


```python
# list of numerical variables
num_feat_list = train_df.select_dtypes(include=np.number).columns.tolist()
print('numerical features: ', num_feat_list)

# list of categorical variables
cat_feat_list = list(train_df.select_dtypes(exclude=np.number).columns)
print(f'categorical features: {cat_feat_list}')
```

    numerical features:  ['fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar', 'chlorides', 'free sulfur dioxide', 'total sulfur dioxide', 'density', 'pH', 'sulphates', 'alcohol']
    categorical features: ['quality']
    



---

**Outliers Detection**

---



**Function to detect outliers using Tukey's method**


```python
def detect_outliers(df, features, no_of_outlier_in_row, threshold=1.5):
  """
  Input - dataframe of features 
  output - feature wise list of the indices and count
  Procedure - Tukey method.
  """
  outliers = []
  
  # iterate over features(columns)
  for col in features:
    # 1st quartile (25%)
    Q1 = df[col].quantile(0.25)

    # 3rd quartile (75%)
    Q3 = df[col].quantile(0.75)

    # Interquartile range (IQR)
    IQR = Q3 - Q1
    
    # outlier step
    outlier_step = threshold * IQR

    #calculate lower limit
    lower_limit = Q1 - outlier_step

    #calculate upper limit
    upper_limit = Q3 + outlier_step
    
    # Determine a list of indices of outliers for feature col
    outlier_list_col = df[(df[col] < lower_limit) | 
                          (df[col] > upper_limit )].index
    
    if (len(outlier_list_col) > 0):
      outliers.append({'Feature': col, 'No_of_outliers':len(outlier_list_col), 'Outlier_rows':outlier_list_col})
     
  #print('Num of outlier detected:', outliers)

  return outliers
```

**Detect the number of outliers in the dataset**


```python
# detect outliers from all columns, this return the dictionary of indices and column number
outliers = detect_outliers(train_df, num_feat_list, 0)

print(tabulate(outliers))

out_val = 0
for ind, val in enumerate(outliers):
  out_val += val.get('No_of_outliers')
print("Total                 {}".format(out_val))
```

    --------------------  ---  ----------------------------------------------------------------------------------------------
    fixed acidity          41  Int64Index([ 205,  243,  264,  294,  328,  338,  339,  347,  353,  359,  363,
                                            364,  374,  381,  394,  409,  429,  440,  442,  446,  470,  472,
                                            509,  510,  516,  538,  544,  548,  554,  557,  559,  560,  596,
                                            599,  601,  611,  652,  680,  811,  814, 1224],
                                          dtype='int64')
    volatile acidity       19  Int64Index([  38,   94,  120,  126,  127,  134,  199,  553,  672,  690,  700,
                                            705,  710,  724,  899, 1261, 1299, 1312, 1467],
                                          dtype='int64')
    citric acid             1  Int64Index([151], dtype='int64')
    residual sugar        126  Int64Index([   9,   14,   15,   18,   33,   35,   39,   55,   57,   64,
                                           ...
                                           1478, 1501, 1514, 1515, 1540, 1552, 1558, 1574, 1577, 1589],
                                          dtype='int64', length=126)
    chlorides              87  Int64Index([  14,   15,   17,   19,   38,   42,   81,   83,  106,  120,  125,
                                            147,  151,  169,  181,  226,  240,  258,  281,  291,  303,  307,
                                            308,  335,  368,  375,  408,  447,  451,  482,  483,  512,  517,
                                            549,  566,  568,  614,  624,  638,  666,  689,  692,  695,  730,
                                            754,  773,  774,  776,  777,  780,  795,  796,  797,  808,  832,
                                            833,  836,  882,  910,  916, 1020, 1051, 1098, 1109, 1146, 1165,
                                           1191, 1193, 1207, 1220, 1252, 1258, 1260, 1299, 1319, 1334, 1358,
                                           1370, 1371, 1374, 1423, 1434, 1436, 1474, 1558, 1570, 1571],
                                          dtype='int64')
    free sulfur dioxide    26  Int64Index([  14,   15,   57,  396,  497,  522,  584,  634,  678,  925,  926,
                                            982, 1075, 1131, 1154, 1156, 1175, 1217, 1231, 1244, 1256, 1295,
                                           1358, 1434, 1474, 1558],
                                          dtype='int64')
    total sulfur dioxide   45  Int64Index([  14,   15,   86,   88,   90,   92,  109,  130,  145,  154,  155,
                                            188,  189,  190,  192,  201,  219,  313,  354,  415,  463,  515,
                                            522,  523,  591,  636,  637,  649,  651,  672,  684,  694,  723,
                                            741,  771,  772,  791, 1079, 1081, 1131, 1244, 1400, 1419, 1493,
                                           1559],
                                          dtype='int64')
    density                35  Int64Index([ 142,  294,  324,  353,  354,  364,  374,  381,  415,  442,  480,
                                            538,  554,  557,  559,  588,  591,  608,  695,  821,  836,  889,
                                            999, 1017, 1114, 1122, 1126, 1228, 1269, 1270, 1298, 1434, 1474,
                                           1475, 1477],
                                          dtype='int64')
    pH                     28  Int64Index([  45,   94,   95,  151,  268,  440,  544,  553,  554,  557,  588,
                                            614,  650,  657,  695,  821,  930,  996, 1017, 1111, 1270, 1300,
                                           1316, 1319, 1321, 1377, 1470, 1488],
                                          dtype='int64')
    sulphates              55  Int64Index([  13,   17,   19,   43,   79,   81,   83,   86,   88,   92,  106,
                                            151,  161,  169,  181,  201,  226,  240,  258,  281,  338,  339,
                                            340,  369,  372,  376,  415,  451,  477,  482,  483,  503,  504,
                                            506,  515,  586,  614,  639,  689,  692,  723,  754,  795,  852,
                                           1051, 1158, 1165, 1260, 1288, 1319, 1367, 1370, 1371, 1403, 1408],
                                          dtype='int64')
    alcohol                12  Int64Index([142, 467, 588, 652, 821, 1114, 1132, 1228, 1269, 1270, 1475, 1477], dtype='int64')
    --------------------  ---  ----------------------------------------------------------------------------------------------
    Total                 475
    

**Insight:**
*   Features 'Residual Sugar' and 'Chlorides' have highest number of outliers
*   This was suggested by values of Skewness and Kurtosis earlier



### **Univariate Analysis**

**Function to plot Histogram, Boxplot and Scatter plot for individual features**


```python
#Plot Numerical Data - three plots per feature
def plot_uni_num(data, rows, feature):
  '''
  Input - Dataframe, number of rows, feature name
  Output - Histogram, Boxplot and Scatter plot for individual features
  Process - Plot Histogram, Boxplot and Scatter plot using seaborn
  '''
  #  plot Numerical Data
  fig_rows = rows  # number of rows
  fig_cols = 3  # number of columns
  fig_counter = 1  # initialize plot counter

  fig = plt.figure(figsize=(10, 2*fig_rows))
  
  plt.subplot(fig_rows, fig_cols, fig_counter)
  ax = sns.histplot(data[feature], bins='auto', kde=True)
  ax.legend(["Skewness: {:.2f}, \n Kurtosis: {:.2f}".format(data[feature].skew(), data[feature].kurt(), fontsize='xx-large')])
  fig_counter = fig_counter + 1

  plt.subplot(fig_rows, fig_cols, fig_counter)
  sns.boxplot(x=data[feature])
  fig_counter = fig_counter + 1

  
  plt.subplot(fig_rows, fig_cols, fig_counter)
  sns.scatterplot(data=data, y=data.index, x=data[feature])
  fig_counter = fig_counter + 1

  return
```

**Function to plot Univariate analysis for numeric features**


```python
def plot_uni_num_list(data, feat_list):
  '''
  Input - Dataframe, feature list
  Output - Histogram, Boxplot and Scatter plot for individual features in the list
  Process - Plot Histogram, Boxplot and Scatter plot using seaborn
  '''
  for feature in feat_list:
    plot_uni_num(data, len(feat_list), feature)
  return
```

**Plot Univariate Analysis for any one numeric feature from the list**


```python
plot_uni_num(train_df, 1, num_feat_list[0])
```


    
![png](/assets/images/wine/output_55_0.png)
    


**Insight :**

From Histogram plot:
*   The data is moderately postive or right skewed as the skewness is 0.9 (between +0.5 and +1)
*   The data has low kurtosis value of 1.05 (<3)
*   The data has light-tail or lack of outliers.
*   Have outliers and most of them are on the larger side.
*   Therefore, the feature has non-normal distribution

From Box plot:
*   Outliers are visible clearly.
*   Outliers concentration more on right side
*   If the outliers are eliminated then the distribution is almost symmetric.

From Scatter Plot:
*   Most of the values are in 6-11 range
*   Concentration is high around value 8
*   Outlier values beyond 13



**Plot Univariate Analysis for all numeric features**


```python
plot_uni_num_list(train_df, num_feat_list)
```


    
![png](/assets/images/wine/output_58_0.png)
    



    
![png](/assets/images/wine/output_58_1.png)
    



    
![png](/assets/images/wine/output_58_2.png)
    



    
![png](/assets/images/wine/output_58_3.png)
    



    
![png](/assets/images/wine/output_58_4.png)
    



    
![png](/assets/images/wine/output_58_5.png)
    



    
![png](/assets/images/wine/output_58_6.png)
    



    
![png](/assets/images/wine/output_58_7.png)
    



    
![png](/assets/images/wine/output_58_8.png)
    



    
![png](/assets/images/wine/output_58_9.png)
    



    
![png](/assets/images/wine/output_58_10.png)
    


**Insight:**

General observations for all feature:
*   Most of the features have outliers
*   Residual sugar, chlorides and sulphates has a positively or right skewed distribution with heavy tail as they have high values of kurtosis
*   Most of the outliers are on larger side
*   Chlorides, density and pH have outliers on both sides
*   Citric acid and alcohol have an irregular distribution but few outliers.


Therefore, before any models are built, the outliers must be handled.


**Plot the distribution of the target variable**


```python
ax = sns.countplot(x=target_var, data=train_df)
for p in ax.patches:
  ax.annotate('{}={:.2f}%'.format(p.get_height(), p.get_height()/train_df.shape[0]*100), (p.get_x()+0.15, p.get_height()+1))
```


    
![png](/assets/images/wine/output_61_0.png)
    


**Insight :** 
*   Quality has most values concentrated in the categories 5, 6 and 7
*   There are no values in categories 1, 2, 9 and 10
*   Since there is huge disparity in the number of quality inputs, it can be concluded that the dataset is imbalanced.


### **Bivariate Analysis**

**Function to plot box for all features against the target variable**


```python
#Visualising numeric feature against target variable
def plot_bi_box_num_target(data, feat_list, no_of_cols, target):
  '''
  Input - dataframe, the features list, and no of columns in a row, the target variable
  Output - The box plot
  Process - Box plot in seaborn
  '''
  fig_counter = 1
  no_of_features = len(feat_list)
  fig = plt.figure(figsize=(15, 5*no_of_cols))

  for feature in feat_list:
    plt.subplot(np.ceil(no_of_features/no_of_cols), no_of_cols, fig_counter)
    sns.boxplot(data=data, x=feature, y=target)
    fig_counter = fig_counter + 1
  
  return
```

**Analyze one feature against the target variable - bivariate analysis using boxplot**


```python
plot_bi_box_num_target(train_df, ['fixed acidity'], 1, target_var)
```


    
![png](/assets/images/wine/output_67_0.png)
    


**Insight:**
*   The median value for fixed acidity is more in wine of quality 7 than the other wine qualities.
*   The IQR for quality 4 and 5 are reasonably similar (lengths of the boxes is almost same) and the IQR for wine quality 3, 7 and 8 are almost similar.
*   However, the overall range is greater for wines with quality 6 and 7 (as the distances between the ends of the two whiskers is almost similar and longer than others).
*   The wine quality 3 and 8 data appears to be right-skew, and quality 7 is almost normally distributed for feature 'fixed acidity'.
*   Clearly, box plot shows that wine quality 4, 5, 6 and 7 has outliers with respect to feature 'fixed acidity'.
*   Conclusion can be drawn that feature 'fixed acidity' is moderately correlated to the target variable 'quality' (the boxes are not in same line)

**Analyze all features against the target variable - bivariate analysis using boxplot**


```python
plot_bi_box_num_target(train_df, num_feat_list, 3, target_var)
```


    
![png](/assets/images/wine/output_70_0.png)
    


**Insight:**
*   Most of the features have outliers and that too for higher end values.
*   Most of the features except 'Residual sugar' are moderately correlated to the target variable 'quality' (the boxes are not in same line)
*   Feature 'Residual sugar' seems not related to target 'quality'



### **Statistical Analysis**

**Statistical Feature analysis (Continuous versus Categorical) using ANOVA test :**

*   Null Hypothesis (H0) : There is no relation between the given feature and the target
*   Alternate Hypothesis (H1) : There is relation between the given feature and the target



```python
# split into input (X) and output (y) variables
X = train_df.copy()
X.drop(target_var, axis=1, inplace=True)
y = y

#configure to select all features
fs = SelectKBest(score_func=f_classif, k='all')
#learn relationship from training data
fs.fit(X, y)

print('##### ANOVA Test Results for Numeric Features ##### \n')
#check the p-values for the features
for i in range(len(fs.pvalues_)):
  p_value = fs.pvalues_[i]
  feature = X.columns[i]
  #If the p-value is <0.05, reject H0
  if (p_value < 0.05):
    print(('Feature %s: is correlated with %s | P-Value: %f' % (feature, target_var, p_value)))
  else:
    print(('Feature %s: is NOT correlated with %s | P-Value: %f' % (feature, target_var, p_value)))
```

    ##### ANOVA Test Results for Numeric Features ##### 
    
    Feature fixed acidity: is correlated with quality | P-Value: 0.000102
    Feature volatile acidity: is correlated with quality | P-Value: 0.000000
    Feature citric acid: is correlated with quality | P-Value: 0.000000
    Feature residual sugar: is NOT correlated with quality | P-Value: 0.337335
    Feature chlorides: is correlated with quality | P-Value: 0.000063
    Feature free sulfur dioxide: is correlated with quality | P-Value: 0.000239
    Feature total sulfur dioxide: is correlated with quality | P-Value: 0.000000
    Feature density: is correlated with quality | P-Value: 0.000000
    Feature pH: is correlated with quality | P-Value: 0.000588
    Feature sulphates: is correlated with quality | P-Value: 0.000000
    Feature alcohol: is correlated with quality | P-Value: 0.000000
    

**Insight:**

*   The results of ANOVA confirm that all features except 'Residual sugar' are correlated with the target variable as seen in the visual data analysis above.
*   Based on the above test, 'Residual sugar' can be dropped from the dataset.
*   Rest all other features will be selected for model building



### **Multivariate Analysis:**

**Visualize pairwise plot for all numeric features**


```python
#g = sns.pairplot(data=train_df, hue=target_var, corner=True, diag_kind="hist", kind='reg')
#g.add_legend()
```

**Compute Pearson correlation coefficient for numeric features**


```python
## The relationship between numeric features
corr = train_df.corr(method='pearson')

# Getting the Upper Triangle of the corelation matrix
matrix = np.triu(corr)

plt.figure(figsize=(10,8))
# using the upper triangle matrix as mask 
sns.heatmap(corr, annot=True, cmap ='coolwarm', linewidths=2, mask=matrix)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f8768ede450>




    
![png](/assets/images/wine/output_80_1.png)
    


**Insight:**
*   The features 'density' and 'fixed acidity' has strong positive correlation while 'pH' and 'fixed acidity' has strong negative correlation (depicted by darker shades).
*   There is almost no correlation between 'residual sugar' and 'volatile acidity', 'alcohol' and 'sulphates' (depicted by lighter shades).
*   For feature 'residual sugar' correlation is almost zero against other features.






**Find the high correlated features (≥ 40% in absolute value)**



```python
corr_pairs = corr.unstack()
high_corr = corr_pairs[(abs(corr_pairs) > 0.4) & (corr_pairs !=1)]
high_corr
```




    fixed acidity         citric acid             0.667437
                          density                 0.670195
                          pH                     -0.686685
    volatile acidity      citric acid            -0.551248
    citric acid           fixed acidity           0.667437
                          volatile acidity       -0.551248
                          pH                     -0.550310
    free sulfur dioxide   total sulfur dioxide    0.667246
    total sulfur dioxide  free sulfur dioxide     0.667246
    density               fixed acidity           0.670195
                          alcohol                -0.504995
    pH                    fixed acidity          -0.686685
                          citric acid            -0.550310
    alcohol               density                -0.504995
    dtype: float64



## **Data Preprocessing**

**Separate Target Output and Input Features**


```python
train_copy = train_df.copy()

X = train_copy
y = train_copy.quality
X.drop('quality', axis=1, inplace=True)
```

**Drop the not correlated features with target**


```python
#Drop the feature which are not correlated to the target variable
X.drop('residual sugar', axis=1, inplace=True)
#remove the feature from the numerical feature list
num_feat_list.remove('residual sugar')
```

**Flooring and capping for outliers**


```python
skew_list = []

#Quantile-based Flooring and Capping
for feature in num_feat_list:
  i = num_feat_list.index(feature)
  
  #flooring for the 10th percentile of the lower values
  Q10 = X[feature].quantile(0.10)
  #capping for the 90th percentile of the higher values.
  Q90 = X[feature].quantile(0.90)

  before = X[feature].skew()

  #perform on train data
  X[feature] = np.where(X[feature] < Q10, Q10, X[feature])
  X[feature] = np.where(X[feature] > Q90, Q90, X[feature])

  after = X[feature].skew()

  #print the skewness before and after doing flooring and capping 
  skew_list.append({"Feature":feature, "Before Skewness":before, "After Skewness":after})
  
pd.DataFrame(skew_list)
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
      <th>Feature</th>
      <th>Before Skewness</th>
      <th>After Skewness</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>fixed acidity</td>
      <td>0.941041</td>
      <td>0.504507</td>
    </tr>
    <tr>
      <th>1</th>
      <td>volatile acidity</td>
      <td>0.729279</td>
      <td>0.116912</td>
    </tr>
    <tr>
      <th>2</th>
      <td>citric acid</td>
      <td>0.312726</td>
      <td>0.037461</td>
    </tr>
    <tr>
      <th>3</th>
      <td>chlorides</td>
      <td>5.502487</td>
      <td>0.474331</td>
    </tr>
    <tr>
      <th>4</th>
      <td>free sulfur dioxide</td>
      <td>1.226579</td>
      <td>0.528460</td>
    </tr>
    <tr>
      <th>5</th>
      <td>total sulfur dioxide</td>
      <td>1.540368</td>
      <td>0.642313</td>
    </tr>
    <tr>
      <th>6</th>
      <td>density</td>
      <td>0.044778</td>
      <td>0.070023</td>
    </tr>
    <tr>
      <th>7</th>
      <td>pH</td>
      <td>0.232032</td>
      <td>0.064621</td>
    </tr>
    <tr>
      <th>8</th>
      <td>sulphates</td>
      <td>2.406505</td>
      <td>0.518854</td>
    </tr>
    <tr>
      <th>9</th>
      <td>alcohol</td>
      <td>0.859841</td>
      <td>0.476464</td>
    </tr>
  </tbody>
</table>
</div>




```python
# detect outliers from all columns, this return the dictionary of indices and column number
outliers = detect_outliers(X, X.columns, 0)

print(tabulate(outliers))

out_val = 0
for ind, val in enumerate(outliers):
  out_val += val.get('No_of_outliers')
print("Total               {}".format(out_val))
```

    
    Total               0
    

**Standardization/Normalization of data**


```python
scaler = StandardScaler()
X = pd.DataFrame(scaler.fit_transform(X), columns=X.columns, index=X.index)
y = np.ravel(y)
```

**Method oversampling SMOTE**


```python
print(f"Before OverSampling, {Counter(y)}")
#oversample
X_smote, y_smote = SMOTE(random_state=7).fit_resample(X, y)
print(f"After OverSampling, {Counter(y_smote)}")
```

    Before OverSampling, Counter({5: 577, 6: 535, 7: 167, 4: 53, 8: 17, 3: 10})
    After OverSampling, Counter({5: 577, 6: 577, 7: 577, 4: 577, 8: 577, 3: 577})
    

## **Machine Learning**

**Splitting the data into Training and Testing sample**


```python
#train test split
X_train, X_test, y_train, y_test = train_test_split(X_smote, y_smote, test_size=0.3, random_state=7)
```


```python
# Sanity check for the sampled data
X_train.shape, y_train.shape, X_test.shape, y_test.shape
```




    ((2423, 10), (2423,), (1039, 10), (1039,))



### **Logistic Regression**


```python
# logistic regression object
classifier = LogisticRegression()
  
# train the model on train set
classifier.fit(X_train, y_train)
  
y_pred = classifier.predict(X_test)

print(f"Тrain: {classifier.score(X_train, y_train)*100} - Тest: {classifier.score(X_test, y_test)*100}")

cv_score = cross_val_score(estimator=classifier, X=X_train, y=y_train, cv=10)
print("for 10-fold Cross Validation cross_val_score: ", cv_score.mean()*100)

print("accuracy_score: ", accuracy_score(y_test, y_pred)*100)

print("balanced_accuracy_score: ", balanced_accuracy_score(y_test, y_pred)*100)

# print classification report
print(classification_report(y_test, y_pred))
```

    Тrain: 57.28435823359471 - Тest: 55.14918190567853
    for 10-fold Cross Validation cross_val_score:  56.08849437132265
    accuracy_score:  55.14918190567853
    balanced_accuracy_score:  55.37492614366196
                  precision    recall  f1-score   support
    
               3       0.69      0.88      0.78       173
               4       0.51      0.48      0.49       163
               5       0.54      0.49      0.51       175
               6       0.41      0.31      0.35       177
               7       0.47      0.42      0.45       182
               8       0.59      0.75      0.66       169
    
        accuracy                           0.55      1039
       macro avg       0.54      0.55      0.54      1039
    weighted avg       0.54      0.55      0.54      1039
    
    

### **Extremely Randomized Trees**


```python
# Building the model
classifier = ExtraTreesClassifier()

# Training the model
classifier.fit(X_train, y_train)

# Computing the importance of each feature
feature_importance = classifier.feature_importances_
  
# Normalizing the individual importances
feature_importance_normalized = np.std([tree.feature_importances_ for tree in classifier.estimators_], axis=0)

# Plotting a Bar Graph to compare the models
ax = sns.barplot(X.columns, feature_importance_normalized)
ax.set_xlabel('Feature Labels')
ax.set_ylabel('Feature Importances')
ax.set_title('Comparison of different Feature Importances')
ax.set_xticklabels(labels=X.columns, rotation=90)
print()
```

    
    


    
![png](/assets/images/wine/output_103_1.png)
    


**Check the metrics**


```python
#use the model to predict values
y_pred = classifier.predict(X_test)

print(f"Тrain: {classifier.score(X_train, y_train)*100} - Тest: {classifier.score(X_test, y_test)*100}")

cv_score = cross_val_score(estimator=classifier, X=X_train, y=y_train, cv=10)
print("for 10-fold Cross Validation cross_val_score: ", cv_score.mean()*100)

print("accuracy_score: ", accuracy_score(y_test, y_pred)*100)

print("balanced_accuracy_score: ", balanced_accuracy_score(y_test, y_pred)*100)

print(classification_report(y_test, y_pred))
```

    Тrain: 100.0 - Тest: 84.6968238691049
    for 10-fold Cross Validation cross_val_score:  84.72961942658912
    accuracy_score:  84.6968238691049
    balanced_accuracy_score:  85.01347240330291
                  precision    recall  f1-score   support
    
               3       0.98      1.00      0.99       173
               4       0.91      1.00      0.95       163
               5       0.72      0.67      0.70       175
               6       0.64      0.53      0.58       177
               7       0.82      0.90      0.86       182
               8       0.97      1.00      0.98       169
    
        accuracy                           0.85      1039
       macro avg       0.84      0.85      0.84      1039
    weighted avg       0.84      0.85      0.84      1039
    
    

**Model Building Outcomes**

*   LogisticRegression produces around 54% accuracy, while the ensemble model ExtraTreesClassifier gives around 85% which is way better.
*   Select the best average accuracy model, that is ExtraTreesClassifier for predictions.
*   Also the model ExtraTreesClassifier is using the input features better (by looking at its feature importance graph). It is not letting a single input feature or predictor to dominate the decision.



*Note: This work is inspired from data science resources available on internet. Any traces of replications, which may appear, is purely co-incidental. Due respect & credit to all my fellow data scientist. Thanks !!*


