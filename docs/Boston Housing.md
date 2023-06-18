# **Boston Housing Prices Prediction Case Study**

## **Define problem statement**

**Problem Statement :** To create a model which can predict the housing prices based on the given dataset from Boston.

**Output Target :** MEDV

**Input predictors :** CRIM, ZN, INDUS, CHASd, NOX, RM, AGE, DIS, RAD, TAX, PTRATIO, B, LSTAT

**Solution :** Regression predictive modeling machine learning problem.

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

import scipy.stats as stats

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
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import ExtraTreesRegressor

#metric used for the models of this case study
from sklearn.model_selection import cross_validate, cross_val_score
from sklearn.model_selection import KFold

#Feature selection library
from sklearn.feature_selection import SelectKBest

sns.set_style('darkgrid')
```

**Read CSV dataset into dataframe**


```python
#Load boston housing price dataset from sklearn datasets
from sklearn.datasets import load_boston
boston_dataset = load_boston()

boston_dataset.keys()
```




    dict_keys(['data', 'target', 'feature_names', 'DESCR', 'filename'])




```python
print(boston_dataset['DESCR'])
```

    .. _boston_dataset:
    
    Boston house prices dataset
    ---------------------------
    
    **Data Set Characteristics:**  
    
        :Number of Instances: 506 
    
        :Number of Attributes: 13 numeric/categorical predictive. Median Value (attribute 14) is usually the target.
    
        :Attribute Information (in order):
            - CRIM     per capita crime rate by town
            - ZN       proportion of residential land zoned for lots over 25,000 sq.ft.
            - INDUS    proportion of non-retail business acres per town
            - CHAS     Charles River dummy variable (= 1 if tract bounds river; 0 otherwise)
            - NOX      nitric oxides concentration (parts per 10 million)
            - RM       average number of rooms per dwelling
            - AGE      proportion of owner-occupied units built prior to 1940
            - DIS      weighted distances to five Boston employment centres
            - RAD      index of accessibility to radial highways
            - TAX      full-value property-tax rate per $10,000
            - PTRATIO  pupil-teacher ratio by town
            - B        1000(Bk - 0.63)^2 where Bk is the proportion of blacks by town
            - LSTAT    % lower status of the population
            - MEDV     Median value of owner-occupied homes in $1000's
    
        :Missing Attribute Values: None
    
        :Creator: Harrison, D. and Rubinfeld, D.L.
    
    This is a copy of UCI ML housing dataset.
    https://archive.ics.uci.edu/ml/machine-learning-databases/housing/
    
    
    This dataset was taken from the StatLib library which is maintained at Carnegie Mellon University.
    
    The Boston house-price data of Harrison, D. and Rubinfeld, D.L. 'Hedonic
    prices and the demand for clean air', J. Environ. Economics & Management,
    vol.5, 81-102, 1978.   Used in Belsley, Kuh & Welsch, 'Regression diagnostics
    ...', Wiley, 1980.   N.B. Various transformations are used in the table on
    pages 244-261 of the latter.
    
    The Boston house-price data has been used in many machine learning papers that address regression
    problems.   
         
    .. topic:: References
    
       - Belsley, Kuh & Welsch, 'Regression diagnostics: Identifying Influential Data and Sources of Collinearity', Wiley, 1980. 244-261.
       - Quinlan,R. (1993). Combining Instance-Based and Model-Based Learning. In Proceedings on the Tenth International Conference of Machine Learning, 236-243, University of Massachusetts, Amherst. Morgan Kaufmann.
    
    

**Insight:** MEDV - The Median value of owner-occupied homes in $1000's is the target variable


```python
df = pd.DataFrame(data=boston_dataset['data'], columns=boston_dataset['feature_names'])
y = pd.DataFrame(data=boston_dataset['target'], columns=['MEDV']) #Median value of owner-occupied homes in $1000's
```


```python
#Append the target variable to the dataframe
df['MEDV'] = y.MEDV
```

**Check for duplicate rows and drop the duplicates**


```python
print("Number of records before duplicate removal {}".format(df.shape))
print("Number of duplicate rows {}".format(df[df.duplicated()].shape))
#drop the duplicates
df.drop_duplicates(inplace=True)
print("Number of records after duplicate removal {}".format(df.shape))
```

    Number of records before duplicate removal (506, 14)
    Number of duplicate rows (0, 14)
    Number of records after duplicate removal (506, 14)
    

**Define target**


```python
target_var = 'MEDV'
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




    (506, 14)



**Insight :** The dataset has 506 rows × 14 features including the target.


**Data Types for the features**


```python
df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 506 entries, 0 to 505
    Data columns (total 14 columns):
     #   Column   Non-Null Count  Dtype  
    ---  ------   --------------  -----  
     0   CRIM     506 non-null    float64
     1   ZN       506 non-null    float64
     2   INDUS    506 non-null    float64
     3   CHAS     506 non-null    float64
     4   NOX      506 non-null    float64
     5   RM       506 non-null    float64
     6   AGE      506 non-null    float64
     7   DIS      506 non-null    float64
     8   RAD      506 non-null    float64
     9   TAX      506 non-null    float64
     10  PTRATIO  506 non-null    float64
     11  B        506 non-null    float64
     12  LSTAT    506 non-null    float64
     13  MEDV     506 non-null    float64
    dtypes: float64(14)
    memory usage: 59.3 KB
    

**Insight :** All of 14 features are float. Clearly, from the above table none of the feature have missing values or NAN as the non-null values equals the total number of records.
There are no qualitative variables (useless columns) in the data.

**Display sample data**

*   Display the first 5 rows of the dataset along with the target
*   Display the last 5 rows of the dataset along with the target 


```python
df.head()
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
      <th>CRIM</th>
      <th>ZN</th>
      <th>INDUS</th>
      <th>CHAS</th>
      <th>NOX</th>
      <th>RM</th>
      <th>AGE</th>
      <th>DIS</th>
      <th>RAD</th>
      <th>TAX</th>
      <th>PTRATIO</th>
      <th>B</th>
      <th>LSTAT</th>
      <th>MEDV</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.00632</td>
      <td>18.0</td>
      <td>2.31</td>
      <td>0.0</td>
      <td>0.538</td>
      <td>6.575</td>
      <td>65.2</td>
      <td>4.0900</td>
      <td>1.0</td>
      <td>296.0</td>
      <td>15.3</td>
      <td>396.90</td>
      <td>4.98</td>
      <td>24.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.02731</td>
      <td>0.0</td>
      <td>7.07</td>
      <td>0.0</td>
      <td>0.469</td>
      <td>6.421</td>
      <td>78.9</td>
      <td>4.9671</td>
      <td>2.0</td>
      <td>242.0</td>
      <td>17.8</td>
      <td>396.90</td>
      <td>9.14</td>
      <td>21.6</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.02729</td>
      <td>0.0</td>
      <td>7.07</td>
      <td>0.0</td>
      <td>0.469</td>
      <td>7.185</td>
      <td>61.1</td>
      <td>4.9671</td>
      <td>2.0</td>
      <td>242.0</td>
      <td>17.8</td>
      <td>392.83</td>
      <td>4.03</td>
      <td>34.7</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.03237</td>
      <td>0.0</td>
      <td>2.18</td>
      <td>0.0</td>
      <td>0.458</td>
      <td>6.998</td>
      <td>45.8</td>
      <td>6.0622</td>
      <td>3.0</td>
      <td>222.0</td>
      <td>18.7</td>
      <td>394.63</td>
      <td>2.94</td>
      <td>33.4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.06905</td>
      <td>0.0</td>
      <td>2.18</td>
      <td>0.0</td>
      <td>0.458</td>
      <td>7.147</td>
      <td>54.2</td>
      <td>6.0622</td>
      <td>3.0</td>
      <td>222.0</td>
      <td>18.7</td>
      <td>396.90</td>
      <td>5.33</td>
      <td>36.2</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.tail()
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
      <th>CRIM</th>
      <th>ZN</th>
      <th>INDUS</th>
      <th>CHAS</th>
      <th>NOX</th>
      <th>RM</th>
      <th>AGE</th>
      <th>DIS</th>
      <th>RAD</th>
      <th>TAX</th>
      <th>PTRATIO</th>
      <th>B</th>
      <th>LSTAT</th>
      <th>MEDV</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>501</th>
      <td>0.06263</td>
      <td>0.0</td>
      <td>11.93</td>
      <td>0.0</td>
      <td>0.573</td>
      <td>6.593</td>
      <td>69.1</td>
      <td>2.4786</td>
      <td>1.0</td>
      <td>273.0</td>
      <td>21.0</td>
      <td>391.99</td>
      <td>9.67</td>
      <td>22.4</td>
    </tr>
    <tr>
      <th>502</th>
      <td>0.04527</td>
      <td>0.0</td>
      <td>11.93</td>
      <td>0.0</td>
      <td>0.573</td>
      <td>6.120</td>
      <td>76.7</td>
      <td>2.2875</td>
      <td>1.0</td>
      <td>273.0</td>
      <td>21.0</td>
      <td>396.90</td>
      <td>9.08</td>
      <td>20.6</td>
    </tr>
    <tr>
      <th>503</th>
      <td>0.06076</td>
      <td>0.0</td>
      <td>11.93</td>
      <td>0.0</td>
      <td>0.573</td>
      <td>6.976</td>
      <td>91.0</td>
      <td>2.1675</td>
      <td>1.0</td>
      <td>273.0</td>
      <td>21.0</td>
      <td>396.90</td>
      <td>5.64</td>
      <td>23.9</td>
    </tr>
    <tr>
      <th>504</th>
      <td>0.10959</td>
      <td>0.0</td>
      <td>11.93</td>
      <td>0.0</td>
      <td>0.573</td>
      <td>6.794</td>
      <td>89.3</td>
      <td>2.3889</td>
      <td>1.0</td>
      <td>273.0</td>
      <td>21.0</td>
      <td>393.45</td>
      <td>6.48</td>
      <td>22.0</td>
    </tr>
    <tr>
      <th>505</th>
      <td>0.04741</td>
      <td>0.0</td>
      <td>11.93</td>
      <td>0.0</td>
      <td>0.573</td>
      <td>6.030</td>
      <td>80.8</td>
      <td>2.5050</td>
      <td>1.0</td>
      <td>273.0</td>
      <td>21.0</td>
      <td>396.90</td>
      <td>7.88</td>
      <td>11.9</td>
    </tr>
  </tbody>
</table>
</div>





---



**Analyze Target**






---




**Check descriptive statistics for the numeric data**


```python
df['CRIM'].max()
```




    88.9762




```python
df.describe().append([df.nunique().to_frame().swapaxes(1, 0).rename({0:'Unique'}, axis='index'),
               df.skew().to_frame().swapaxes(1, 0).rename({0:'Skew'}, axis='index'),
               df.kurt().to_frame().swapaxes(1, 0).rename({0:'Kurt'}, axis='index'),
               (df.quantile(0.75) - df.quantile(0.25)).to_frame().swapaxes(1, 0).rename({0:'IQR'}, axis='index')]).round(2)
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
      <th>CRIM</th>
      <th>ZN</th>
      <th>INDUS</th>
      <th>CHAS</th>
      <th>NOX</th>
      <th>RM</th>
      <th>AGE</th>
      <th>DIS</th>
      <th>RAD</th>
      <th>TAX</th>
      <th>PTRATIO</th>
      <th>B</th>
      <th>LSTAT</th>
      <th>MEDV</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>506.00</td>
      <td>506.00</td>
      <td>506.00</td>
      <td>506.00</td>
      <td>506.00</td>
      <td>506.00</td>
      <td>506.00</td>
      <td>506.00</td>
      <td>506.00</td>
      <td>506.00</td>
      <td>506.00</td>
      <td>506.00</td>
      <td>506.00</td>
      <td>506.00</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>3.61</td>
      <td>11.36</td>
      <td>11.14</td>
      <td>0.07</td>
      <td>0.55</td>
      <td>6.28</td>
      <td>68.57</td>
      <td>3.80</td>
      <td>9.55</td>
      <td>408.24</td>
      <td>18.46</td>
      <td>356.67</td>
      <td>12.65</td>
      <td>22.53</td>
    </tr>
    <tr>
      <th>std</th>
      <td>8.60</td>
      <td>23.32</td>
      <td>6.86</td>
      <td>0.25</td>
      <td>0.12</td>
      <td>0.70</td>
      <td>28.15</td>
      <td>2.11</td>
      <td>8.71</td>
      <td>168.54</td>
      <td>2.16</td>
      <td>91.29</td>
      <td>7.14</td>
      <td>9.20</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.01</td>
      <td>0.00</td>
      <td>0.46</td>
      <td>0.00</td>
      <td>0.38</td>
      <td>3.56</td>
      <td>2.90</td>
      <td>1.13</td>
      <td>1.00</td>
      <td>187.00</td>
      <td>12.60</td>
      <td>0.32</td>
      <td>1.73</td>
      <td>5.00</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>0.08</td>
      <td>0.00</td>
      <td>5.19</td>
      <td>0.00</td>
      <td>0.45</td>
      <td>5.89</td>
      <td>45.02</td>
      <td>2.10</td>
      <td>4.00</td>
      <td>279.00</td>
      <td>17.40</td>
      <td>375.38</td>
      <td>6.95</td>
      <td>17.02</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>0.26</td>
      <td>0.00</td>
      <td>9.69</td>
      <td>0.00</td>
      <td>0.54</td>
      <td>6.21</td>
      <td>77.50</td>
      <td>3.21</td>
      <td>5.00</td>
      <td>330.00</td>
      <td>19.05</td>
      <td>391.44</td>
      <td>11.36</td>
      <td>21.20</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>3.68</td>
      <td>12.50</td>
      <td>18.10</td>
      <td>0.00</td>
      <td>0.62</td>
      <td>6.62</td>
      <td>94.07</td>
      <td>5.19</td>
      <td>24.00</td>
      <td>666.00</td>
      <td>20.20</td>
      <td>396.22</td>
      <td>16.96</td>
      <td>25.00</td>
    </tr>
    <tr>
      <th>max</th>
      <td>88.98</td>
      <td>100.00</td>
      <td>27.74</td>
      <td>1.00</td>
      <td>0.87</td>
      <td>8.78</td>
      <td>100.00</td>
      <td>12.13</td>
      <td>24.00</td>
      <td>711.00</td>
      <td>22.00</td>
      <td>396.90</td>
      <td>37.97</td>
      <td>50.00</td>
    </tr>
    <tr>
      <th>Unique</th>
      <td>504.00</td>
      <td>26.00</td>
      <td>76.00</td>
      <td>2.00</td>
      <td>81.00</td>
      <td>446.00</td>
      <td>356.00</td>
      <td>412.00</td>
      <td>9.00</td>
      <td>66.00</td>
      <td>46.00</td>
      <td>357.00</td>
      <td>455.00</td>
      <td>229.00</td>
    </tr>
    <tr>
      <th>Skew</th>
      <td>5.22</td>
      <td>2.23</td>
      <td>0.30</td>
      <td>3.41</td>
      <td>0.73</td>
      <td>0.40</td>
      <td>-0.60</td>
      <td>1.01</td>
      <td>1.00</td>
      <td>0.67</td>
      <td>-0.80</td>
      <td>-2.89</td>
      <td>0.91</td>
      <td>1.11</td>
    </tr>
    <tr>
      <th>Kurt</th>
      <td>37.13</td>
      <td>4.03</td>
      <td>-1.23</td>
      <td>9.64</td>
      <td>-0.06</td>
      <td>1.89</td>
      <td>-0.97</td>
      <td>0.49</td>
      <td>-0.87</td>
      <td>-1.14</td>
      <td>-0.29</td>
      <td>7.23</td>
      <td>0.49</td>
      <td>1.50</td>
    </tr>
    <tr>
      <th>IQR</th>
      <td>3.60</td>
      <td>12.50</td>
      <td>12.91</td>
      <td>0.00</td>
      <td>0.18</td>
      <td>0.74</td>
      <td>49.05</td>
      <td>3.09</td>
      <td>20.00</td>
      <td>387.00</td>
      <td>2.80</td>
      <td>20.85</td>
      <td>10.01</td>
      <td>7.98</td>
    </tr>
  </tbody>
</table>
</div>



**Insight :** Analyze the data, for example, the feature 'CRIM' has 
*   total 506 records
*   mean of 3.61
*   standard deviation as 8.6
*   0.01 as its minimum value
*   88.98 as its maximum value
*   Range is 88.98-0.01=88.97
*   25% of the values of the feature are < or = 0.08
*   50% of the values of the feature are < or = 0.26 i.e. the median value
*   75% of the values of the feature are < or = 3.68
*   and only 25% of the values of the feature are > 3.68 but less than 88.98
*   mean > median indicating the distribution is positively skewed (the distribution peak is towards left and the tail on the right side of the distribution is longer or fatter)
*   Range (88.97) is much larger compared to the IQR (3.60).
*   The above two observations indicate that there are outliers in the data.
*   Skewness = 5.22 shows that the feature has a right-skewed distribution and indicating the presence of extreme higher values.
*   Kurtosis = 37.13 shows that the feature's distribution has heavy tails and thereby many outliers.

Similarly, analyze other features.

**Summarize target class distribution**


```python
#As target is continuous, use histogram
sns.histplot(df['MEDV'], kde=True)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f2daee3e750>




    
![png](output_34_1.png)
    


**Insight:** 

The above data shows that the histogram looks like a bell curve or slight skewed version of it. Hence predictive modeling can be applied to the target.
The data distribution of the target variable is almost balanced as it is almost normal.



---

**Analyze input predictors**

---



**List of numerical and categorical features**


```python
# list of numerical variables
num_feat_list = df.select_dtypes(include=np.number).columns.tolist()
print('numerical features: ', num_feat_list)

# list of categorical variables
cat_feat_list = list(df.select_dtypes(exclude=np.number).columns)
print('categorical features: {}'.format(cat_feat_list))
```

    numerical features:  ['CRIM', 'ZN', 'INDUS', 'CHAS', 'NOX', 'RM', 'AGE', 'DIS', 'RAD', 'TAX', 'PTRATIO', 'B', 'LSTAT', 'MEDV']
    categorical features: []
    

**Check for mismatched numeric variables and categorical variables**


```python
#Check for unique values of each feature, if the values are <20 then the variable is likely to be categorical
cat_feats_as_num = df.columns[df.nunique()<20].to_list()
print('Categorical Features with wrong datatypes {}'.format(cat_feats_as_num))
```

    Categorical Features with wrong datatypes ['CHAS', 'RAD']
    

**Change the datatypes of the mismatched variables**


```python
# change data type of num columns to cat type
for i in cat_feats_as_num:
  df[i] = df[i].astype('category')
```

**Recalculate the list of numeric and categorical features**


```python
# list of numerical variables
num_feat_list = df.select_dtypes(include=np.number).columns.tolist()
print('numerical features: ', num_feat_list)

# list of categorical variables
cat_feat_list = list(df.select_dtypes(exclude=np.number).columns)
print(f'categorical features: {cat_feat_list}')
```

    numerical features:  ['CRIM', 'ZN', 'INDUS', 'NOX', 'RM', 'AGE', 'DIS', 'TAX', 'PTRATIO', 'B', 'LSTAT', 'MEDV']
    categorical features: ['CHAS', 'RAD']
    



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
outliers = detect_outliers(df, num_feat_list, 0)

print(tabulate(outliers))

out_val = 0
for ind, val in enumerate(outliers):
  out_val += val.get('No_of_outliers')
print("Total                 {}".format(out_val))
```

    -------  --  ----------------------------------------------------------------------------
    CRIM     66  Int64Index([367, 371, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 384,
                             385, 386, 387, 388, 392, 394, 398, 399, 400, 401, 402, 403, 404,
                             405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418,
                             419, 420, 422, 425, 426, 427, 429, 431, 434, 435, 436, 437, 438,
                             439, 440, 441, 443, 444, 445, 447, 448, 454, 468, 469, 477, 478,
                             479],
                            dtype='int64')
    ZN       68  Int64Index([ 39,  40,  54,  55,  56,  57,  65,  66, 187, 188, 189, 190, 191,
                             192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204,
                             254, 255, 256, 274, 275, 276, 277, 278, 283, 284, 285, 286, 287,
                             288, 289, 290, 291, 292, 298, 299, 300, 301, 302, 303, 304, 305,
                             306, 307, 331, 332, 341, 343, 344, 347, 348, 349, 350, 351, 352,
                             353, 354, 355],
                            dtype='int64')
    RM       30  Int64Index([ 97,  98, 162, 163, 166, 180, 186, 195, 203, 204, 224, 225, 226,
                             232, 233, 253, 257, 262, 267, 280, 283, 364, 365, 367, 374, 384,
                             386, 406, 412, 414],
                            dtype='int64')
    DIS       5  Int64Index([351, 352, 353, 354, 355], dtype='int64')
    PTRATIO  15  Int64Index([196, 197, 198, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266,
                             267, 268],
                            dtype='int64')
    B        77  Int64Index([ 18,  25,  27,  32,  34, 102, 118, 134, 145, 146, 151, 152, 153,
                             154, 155, 156, 160, 165, 167, 168, 169, 170, 286, 366, 367, 384,
                             399, 404, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417,
                             418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430,
                             431, 432, 433, 434, 435, 436, 437, 438, 444, 445, 446, 449, 450,
                             454, 455, 456, 457, 458, 460, 465, 466, 467, 475, 489, 490],
                            dtype='int64')
    LSTAT     7  Int64Index([141, 373, 374, 387, 412, 414, 438], dtype='int64')
    MEDV     40  Int64Index([ 97,  98, 157, 161, 162, 163, 166, 179, 180, 182, 186, 190, 195,
                             202, 203, 204, 224, 225, 226, 228, 232, 233, 253, 256, 257, 261,
                             262, 267, 268, 280, 282, 283, 291, 368, 369, 370, 371, 372, 398,
                             405],
                            dtype='int64')
    -------  --  ----------------------------------------------------------------------------
    Total                 308
    

**Insight:**
*   Features 'B', 'ZN' and 'CRIM' have highest number of outliers
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
plot_uni_num(df, 1, num_feat_list[0])
```


    
![png](output_57_0.png)
    


**Insight :**

From Histogram plot:
*   The data is highly postive or right skewed as the skewness is 5.22 (> +1)
*   The data has high kurtosis value of 37.13 (>3) suggesting heavy-tail or presence of outliers.
*   Have outliers and most of them are on the higher side.
*   Therefore, the feature has non-normal distribution

From Box plot:
*   Outliers are visible clearly.
*   Outliers concentration more on right side
*   If the outliers are eliminated then the distribution is almost symmetric.

From Scatter Plot:
*   Most of the values are in 0-20 range
*   Concentration is high around value 0-1
*   Outlier values beyond 20



**Plot Univariate Analysis for all numeric features**


```python
plot_uni_num_list(df, num_feat_list)
```


    
![png](/assets/images/boston/output_60_0.png)
    



    
![png](/assets/images/boston/output_60_1.png)
    



    
![png](/assets/images/boston/output_60_2.png)
    



    
![png](/assets/images/boston/output_60_3.png)
    



    
![png](/assets/images/boston/output_60_4.png)
    



    
![png](/assets/images/boston/output_60_5.png)
    



    
![png](/assets/images/boston/output_60_6.png)
    



    
![png](/assets/images/boston/output_60_7.png)
    



    
![png](/assets/images/boston/output_60_8.png)
    



    
![png](/assets/images/boston/output_60_9.png)
    



    
![png](/assets/images/boston/output_60_10.png)
    



    
![png](/assets/images/boston/output_60_11.png)
    


**Insight:**

General observations for all feature:
*   Most of the features have outliers
*   CRIM, ZN  has a positively or right skewed distribution with heavy tail as they have high values of kurtosis
*   B has a negatively or left skewed distribution with heavy tail as they have high values of kurtosis
*   Most of the outliers are on larger side
*   RM have outliers on both sides and if the outliers are removed then the distribution will be normal
*   AGE, NOX, INDUS have an irregular distribution but almost no outliers.


Since few features have too much skewness, so outliers should be treated and the feature re-examined. If the problem is solved then okay else reject the feature. Therefore, before any models are built, the outliers must be handled. 


**Plot the count plot for categorical features**


```python
#Plot Categorical Data - count plot per feature
def plot_uni_cat(data, feat_list):
  '''
  Input - Dataframe, feature list
  Output - Count plot for individual features
  Process - Plot count plot using seaborn
  '''
  cols = len(feat_list)
  # Generating multiple subplots
  fig, subplot = plt.subplots(nrows=1, ncols=cols, figsize=(15, 4))
  
  for fig_counter, feature in zip(range(cols), feat_list):
    ax = subplot[fig_counter]
    sns.countplot(data=data, x=feature, ax=ax)
    for p in ax.patches:
      ax.annotate('{}={:.2f}%'.format(p.get_height(), p.get_height()/data.shape[0]*100), (p.get_x()+0.15, p.get_height()+1))
    
  plt.tight_layout()
```


```python
plot_uni_cat(df, cat_feat_list)
```


    
![png](/assets/images/boston/output_64_0.png)
    


**Insight:**
*   Feature CHAS uneven distribution as is clear from one bar is tall and other short suggesting it is highly skewed and can interfere in the ML model training.
*   Feature CHAS may be not correlated to the target variable and hence needs to be investigated further if this feature needs to be selected.
*   Feature RAD has somewhat okay distribution of the data as is evident from the bars but it is also skewed a bit (24 has higher bar and it can be outlier also).






### **Bivariate Analysis**

**Function to plot histogram for all features against the target variable**


```python
#Visualising categorical feature against numerical target variable
def plot_bi_box_num_target(data, feat_list, no_of_cols, target):
  '''
  Input - dataframe, the features list, and no of columns in a row, the target variable
  Output - The box plot
  Process - Box plot in seaborn
  '''
  fig_counter = 1
  no_of_features = len(feat_list)
  fig = plt.figure(figsize=(15, 2*no_of_cols))

  for feature in feat_list:
    plt.subplot(np.ceil(no_of_features/no_of_cols), no_of_cols, fig_counter)
    sns.boxplot(data=data, x=feature, y=target)
    fig_counter = fig_counter + 1
  
  return
```

**Analyze all categorical features against the numeric target variable - bivariate analysis using boxplot**


```python
plot_bi_box_num_target(df, cat_feat_list, 2, target_var)
```


    
![png](/assets/images/boston/output_70_0.png)
    


**Insight:**
*   The median value for MEDV is more in feature CHAS=1.
*   The IQR for CHAS=1 is more than that of CHAS=0.
*   Clearly, box plot shows that CHAS=0 has outliers.
*   Conclusion can be drawn that feature 'CHAS' is moderately correlated to the target variable 'MEDV' (the boxes are not in same line)
*   Similarly, feature 'RAD' is also correlated to the target variable 'MEDV' (the boxes are not in same line)



**Analyze all numeric features against the numeric target variable - bivariate analysis using regplot**


```python
#Visualising numeric feature against target variable
def plot_bi_reg_num_target(data, feat_list, no_of_cols, target):
  '''
  Input - dataframe, the features list, and no of columns in a row, the target variable
  Output - The reg plot
  Process - Reg plot in seaborn
  '''
  fig_counter = 1
  no_of_features = len(feat_list)
  fig = plt.figure(figsize=(15, 5*no_of_cols))

  for feature in feat_list:
    plt.subplot(np.ceil(no_of_features/no_of_cols), no_of_cols, fig_counter)
    sns.regplot(data=data, x=feature, y=target)
    fig_counter = fig_counter + 1
  
  return
```


```python
plot_bi_reg_num_target(df, num_feat_list, 3, target_var)
```


    
![png](/assets/images/boston/output_74_0.png)
    


**Insight:**
*   RM is showing increasing trend and LSTAT is showing decreasing trend with target varaible MEDV suggesting correlation.
*   Rest other features doesnot have any evident trend indicating weak or no correalation with the target variable.



### **Statistical Analysis**

**Statistical Feature analysis (Categorical versus Continuous) using ANOVA Test :**

*   Null Hypothesis (H0) : There is no relation between the given feature and the target
*   Alternate Hypothesis (H1) : There is relation between the given feature and the target



```python
def check_ANOVA(data, feat_list, target):
  for feature in feat_list:
    # stats f_oneway functions takes the groups as input and returns ANOVA F and p value
    fvalue, pvalue = stats.f_oneway(data[feature], data[target])
    #check the p-values for the features
    #If the p-value is <0.05, reject H0
    #A statistically significant test result (P ≤ 0.05) means that the test hypothesis is false or should be rejected.
    if (pvalue < 0.05):
      print(('Feature %s: is correlated with %s | P-Value: %f ' % (feature, target, pvalue)))
    else:
      print(('Feature %s: is NOT correlated with %s | P-Value: %f' % (feature, target, pvalue)))
  return

print('##### ANOVA Test Results for Categorical Features ##### \n')
check_ANOVA(df, cat_feat_list, target_var)
```

    ##### ANOVA Test Results for Categorical Features ##### 
    
    Feature CHAS: is correlated with MEDV | P-Value: 0.000000 
    Feature RAD: is correlated with MEDV | P-Value: 0.000000 
    

**Insight:**

*   The results of ANOVA confirm that both the categorical features are correlated with the target variable as seen in the visual data analysis above.
*   This correlation was indicated earlier by the box plots.
*   Hence both features will be selected for model building.



**Statistical Feature analysis (Continuous versus Continuous) using correlation matrix :**
*   Compute pairwise Pearson correlation coefficient for numeric features
*   Find the high correlated features (≥ 50% in absolute value)




```python
## The relationship between numeric features
corr = df.corr(method='pearson')

# Getting the Upper Triangle of the corelation matrix
matrix = np.triu(corr)

plt.figure(figsize=(8,5))
# using the upper triangle matrix as mask 
sns.heatmap(corr, annot=True, cmap ='coolwarm', linewidths=2, mask=matrix)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f2d9bccf7d0>




    
![png](/assets/images/boston/output_81_1.png)
    


**Insight:**
*   The features 'NOX' and 'AGE' has strong positive correlation while 'DIS' and 'AGE' has strong negative correlation (depicted by darker shades).
*   There is almost no correlation between 'B' and 'ZN' (depicted by lighter shades).





```python
#Find the high correlated features (≥ 50% in absolute value)
corr_pairs = corr.unstack()
high_corr = corr_pairs[(abs(corr_pairs) > 0.5) & (corr_pairs !=1)]
high_corr
```




    CRIM     TAX        0.582764
    ZN       INDUS     -0.533828
             NOX       -0.516604
             AGE       -0.569537
             DIS        0.664408
    INDUS    ZN        -0.533828
             NOX        0.763651
             AGE        0.644779
             DIS       -0.708027
             TAX        0.720760
             LSTAT      0.603800
    NOX      ZN        -0.516604
             INDUS      0.763651
             AGE        0.731470
             DIS       -0.769230
             TAX        0.668023
             LSTAT      0.590879
    RM       LSTAT     -0.613808
             MEDV       0.695360
    AGE      ZN        -0.569537
             INDUS      0.644779
             NOX        0.731470
             DIS       -0.747881
             TAX        0.506456
             LSTAT      0.602339
    DIS      ZN         0.664408
             INDUS     -0.708027
             NOX       -0.769230
             AGE       -0.747881
             TAX       -0.534432
    TAX      CRIM       0.582764
             INDUS      0.720760
             NOX        0.668023
             AGE        0.506456
             DIS       -0.534432
             LSTAT      0.543993
    PTRATIO  MEDV      -0.507787
    LSTAT    INDUS      0.603800
             NOX        0.590879
             RM        -0.613808
             AGE        0.602339
             TAX        0.543993
             MEDV      -0.737663
    MEDV     RM         0.695360
             PTRATIO   -0.507787
             LSTAT     -0.737663
    dtype: float64



**Insight :**
*   Features RM, PTRATIO, LSTAT are highly correlated to the target varaible.
*   This correlation was indicated earlier by the reg plots.
*   Hence these features will be selected for model building.



**Features selected :**

**Input** - RM, PTRATIO, LSTAT, CHAS, RAD

**Output** - MEDV


```python
input_feat_list = ['RM', 'PTRATIO', 'LSTAT', 'CHAS', 'RAD']
target_var = 'MEDV'
```

## **Data Preprocessing**

**Separate Target Output and Input Features**


```python
df_copy = df.copy()

X = df_copy
y = df_copy[target_var]
X.drop(target_var, axis=1, inplace=True)
```

**Drop the not correlated features with target**


```python
#Drop the feature which are not correlated to the target variable
X.drop([col for col in X.columns if col not in input_feat_list], axis=1, inplace=True)
X.columns
```




    Index(['CHAS', 'RM', 'RAD', 'PTRATIO', 'LSTAT'], dtype='object')




```python
num_feat_list = X.select_dtypes(include=np.number).columns.tolist()
num_feat_list
```




    ['RM', 'PTRATIO', 'LSTAT']



**Standardization/Normalization of data**


```python
scaler = StandardScaler()
#X[num_feat_list] = pd.DataFrame(scaler.fit_transform(X[num_feat_list]), columns=num_feat_list, index=X.index)
X = pd.DataFrame(scaler.fit_transform(X), columns=X.columns, index=X.index)
y = np.ravel(y)
```

## **Machine Learning**

**Splitting the data into Training and Testing sample**


```python
#train test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=7, shuffle=True)
```


```python
# Sanity check for the sampled data
X_train.shape, y_train.shape, X_test.shape, y_test.shape
```




    ((354, 5), (354,), (152, 5), (152,))



### **Linear Regression**


```python
# logistic regression object
classifier = LinearRegression()
  
# train the model on train set
classifier.fit(X_train, y_train)
  
y_pred = classifier.predict(X_test)

print(f"Тrain: {classifier.score(X_train, y_train)*100} - Тest: {classifier.score(X_test, y_test)*100}")

cv_score = cross_val_score(estimator=classifier, X=X_train, y=y_train, cv=10)
print("for 10-fold Cross Validation cross_val_score: ", cv_score.mean()*100)
```

    Тrain: 71.82623158859305 - Тest: 57.54107608636374
    for 10-fold Cross Validation cross_val_score:  69.06001654895947
    

### **Extremely Randomized Trees**


```python
# Building the model
classifier = ExtraTreesRegressor()

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

    
    


    
![png](/assets/images/boston/output_102_1.png)
    


**Check the metrics**


```python
#use the model to predict values
y_pred = classifier.predict(X_test)

print(f"Тrain: {classifier.score(X_train, y_train)*100} - Тest: {classifier.score(X_test, y_test)*100}")

strat_kfold = KFold(n_splits=10, shuffle=True, random_state=7)
cv_score = cross_val_score(estimator=classifier, X=X_train, y=y_train, cv=strat_kfold)

print("for 10-fold Cross Validation cross_val_score: ", cv_score.mean()*100)
```

    Тrain: 99.99999983488931 - Тest: 79.59582844242045
    for 10-fold Cross Validation cross_val_score:  80.2461573106072
    

**Model Building Outcomes**

*   LinearRegression produces around 69% accuracy, while the ensemble model ExtraTreesRegressor gives around 80% which is way better.
*   Select the best average accuracy model, that is ExtraTreesRegressor for predictions.
*   Also the model ExtraTreesRegressor is using the input features better (by looking at its feature importance graph). It is not letting a single input feature or predictor to dominate the decision.


