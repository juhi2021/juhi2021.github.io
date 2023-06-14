# **Loan Prediction Case Study**

## **Define problem statement**

**Problem Statement :** To create a model which can predict decide whether the applicant is suitable for the loan or in other words to approve or reject the loan application.

**Output Target :** Loan_Status ('Y' means loan is approved and 'N' means loan is rejected)

**Input predictors :** Gender, Married, Dependents, Education, Self_Employed, ApplicantIncome, CoApplicantIncome,LoanAmount, Loan_Amount_Term, Credit_History, Property_Area.

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

from scipy import stats 
from sklearn import preprocessing
from collections import Counter

#import matplotlib for graphs
import matplotlib.pyplot as plt

#Feature selection library
from sklearn.feature_selection import SelectKBest, chi2
from sklearn.feature_selection import f_classif
from sklearn.feature_selection import mutual_info_classif
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import KFold, cross_val_score
from sklearn.metrics import accuracy_score, balanced_accuracy_score, classification_report, confusion_matrix

#To visualise in the notebook
%matplotlib inline

sns.set_style('darkgrid')

# import module
from tabulate import tabulate

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
train_path = '/content/drive/MyDrive/Data/Loan Pred/train.csv'
test_path = r'/content/drive/MyDrive/Data/Loan Pred/test.csv'

train_df = pd.read_csv(train_path)
test_df = pd.read_csv(test_path)
```

**Check for duplicate rows and drop the duplicates**


```python
print("Number of duplicate rows {}".format(train_df[train_df.duplicated()].shape[0]))
#drop the duplicates
train_df.drop_duplicates(inplace=True)
print("Number of records after duplicate removal {}".format(train_df.shape[0]))
```

    Number of duplicate rows 0
    Number of records after duplicate removal 614
    

**Define target**


```python
target_var = 'Loan_Status'
y = pd.DataFrame(train_df[target_var])
print("The target variable is '\033[1m{}'\033[1m".format(target_var))
```

    The target variable is '[1mLoan_Status'[1m
    

## **Exploratory Data Analysis (EDA)**

### **Basic Data Exploration**



---

**Observe data**

---


**Number of rows and columns**


```python
print("The dataset has {} rows × {} features including the target.".format(train_df.shape[0],train_df.shape[1]))
```

    The dataset has 614 rows × 13 features including the target.
    

**Data Types for the features**


```python
train_df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 614 entries, 0 to 613
    Data columns (total 13 columns):
     #   Column             Non-Null Count  Dtype  
    ---  ------             --------------  -----  
     0   Loan_ID            614 non-null    object 
     1   Gender             601 non-null    object 
     2   Married            611 non-null    object 
     3   Dependents         599 non-null    object 
     4   Education          614 non-null    object 
     5   Self_Employed      582 non-null    object 
     6   ApplicantIncome    614 non-null    int64  
     7   CoapplicantIncome  614 non-null    float64
     8   LoanAmount         592 non-null    float64
     9   Loan_Amount_Term   600 non-null    float64
     10  Credit_History     564 non-null    float64
     11  Property_Area      614 non-null    object 
     12  Loan_Status        614 non-null    object 
    dtypes: float64(4), int64(1), object(8)
    memory usage: 67.2+ KB
    

**Insight:** There are 3 types of independent Variables - Categorical, Ordinal & Numerical.


```python
#set the index for the concatenated dataset
train_df = train_df.set_index("Loan_ID")
test_df = test_df.set_index("Loan_ID")
```

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
      <th>Gender</th>
      <th>Married</th>
      <th>Dependents</th>
      <th>Education</th>
      <th>Self_Employed</th>
      <th>ApplicantIncome</th>
      <th>CoapplicantIncome</th>
      <th>LoanAmount</th>
      <th>Loan_Amount_Term</th>
      <th>Credit_History</th>
      <th>Property_Area</th>
      <th>Loan_Status</th>
    </tr>
    <tr>
      <th>Loan_ID</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>LP001002</th>
      <td>Male</td>
      <td>No</td>
      <td>0</td>
      <td>Graduate</td>
      <td>No</td>
      <td>5849</td>
      <td>0.0</td>
      <td>NaN</td>
      <td>360.0</td>
      <td>1.0</td>
      <td>Urban</td>
      <td>Y</td>
    </tr>
    <tr>
      <th>LP001003</th>
      <td>Male</td>
      <td>Yes</td>
      <td>1</td>
      <td>Graduate</td>
      <td>No</td>
      <td>4583</td>
      <td>1508.0</td>
      <td>128.0</td>
      <td>360.0</td>
      <td>1.0</td>
      <td>Rural</td>
      <td>N</td>
    </tr>
    <tr>
      <th>LP001005</th>
      <td>Male</td>
      <td>Yes</td>
      <td>0</td>
      <td>Graduate</td>
      <td>Yes</td>
      <td>3000</td>
      <td>0.0</td>
      <td>66.0</td>
      <td>360.0</td>
      <td>1.0</td>
      <td>Urban</td>
      <td>Y</td>
    </tr>
    <tr>
      <th>LP001006</th>
      <td>Male</td>
      <td>Yes</td>
      <td>0</td>
      <td>Not Graduate</td>
      <td>No</td>
      <td>2583</td>
      <td>2358.0</td>
      <td>120.0</td>
      <td>360.0</td>
      <td>1.0</td>
      <td>Urban</td>
      <td>Y</td>
    </tr>
    <tr>
      <th>LP001008</th>
      <td>Male</td>
      <td>No</td>
      <td>0</td>
      <td>Graduate</td>
      <td>No</td>
      <td>6000</td>
      <td>0.0</td>
      <td>141.0</td>
      <td>360.0</td>
      <td>1.0</td>
      <td>Urban</td>
      <td>Y</td>
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
      <th>Gender</th>
      <th>Married</th>
      <th>Dependents</th>
      <th>Education</th>
      <th>Self_Employed</th>
      <th>ApplicantIncome</th>
      <th>CoapplicantIncome</th>
      <th>LoanAmount</th>
      <th>Loan_Amount_Term</th>
      <th>Credit_History</th>
      <th>Property_Area</th>
      <th>Loan_Status</th>
    </tr>
    <tr>
      <th>Loan_ID</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>LP002978</th>
      <td>Female</td>
      <td>No</td>
      <td>0</td>
      <td>Graduate</td>
      <td>No</td>
      <td>2900</td>
      <td>0.0</td>
      <td>71.0</td>
      <td>360.0</td>
      <td>1.0</td>
      <td>Rural</td>
      <td>Y</td>
    </tr>
    <tr>
      <th>LP002979</th>
      <td>Male</td>
      <td>Yes</td>
      <td>3+</td>
      <td>Graduate</td>
      <td>No</td>
      <td>4106</td>
      <td>0.0</td>
      <td>40.0</td>
      <td>180.0</td>
      <td>1.0</td>
      <td>Rural</td>
      <td>Y</td>
    </tr>
    <tr>
      <th>LP002983</th>
      <td>Male</td>
      <td>Yes</td>
      <td>1</td>
      <td>Graduate</td>
      <td>No</td>
      <td>8072</td>
      <td>240.0</td>
      <td>253.0</td>
      <td>360.0</td>
      <td>1.0</td>
      <td>Urban</td>
      <td>Y</td>
    </tr>
    <tr>
      <th>LP002984</th>
      <td>Male</td>
      <td>Yes</td>
      <td>2</td>
      <td>Graduate</td>
      <td>No</td>
      <td>7583</td>
      <td>0.0</td>
      <td>187.0</td>
      <td>360.0</td>
      <td>1.0</td>
      <td>Urban</td>
      <td>Y</td>
    </tr>
    <tr>
      <th>LP002990</th>
      <td>Female</td>
      <td>No</td>
      <td>0</td>
      <td>Graduate</td>
      <td>Yes</td>
      <td>4583</td>
      <td>0.0</td>
      <td>133.0</td>
      <td>360.0</td>
      <td>0.0</td>
      <td>Semiurban</td>
      <td>N</td>
    </tr>
  </tbody>
</table>
</div>



---
**Analyze Target**
---

**Check descriptive statistics for the numeric data**


```python
train_df.describe().append([train_df.select_dtypes(exclude='object').mode().rename({0:'Mode'}, axis='index'), 
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
      <th>ApplicantIncome</th>
      <th>CoapplicantIncome</th>
      <th>LoanAmount</th>
      <th>Loan_Amount_Term</th>
      <th>Credit_History</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>614.00</td>
      <td>614.00</td>
      <td>592.00</td>
      <td>600.00</td>
      <td>564.00</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>5403.46</td>
      <td>1621.25</td>
      <td>146.41</td>
      <td>342.00</td>
      <td>0.84</td>
    </tr>
    <tr>
      <th>std</th>
      <td>6109.04</td>
      <td>2926.25</td>
      <td>85.59</td>
      <td>65.12</td>
      <td>0.36</td>
    </tr>
    <tr>
      <th>min</th>
      <td>150.00</td>
      <td>0.00</td>
      <td>9.00</td>
      <td>12.00</td>
      <td>0.00</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>2877.50</td>
      <td>0.00</td>
      <td>100.00</td>
      <td>360.00</td>
      <td>1.00</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>3812.50</td>
      <td>1188.50</td>
      <td>128.00</td>
      <td>360.00</td>
      <td>1.00</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>5795.00</td>
      <td>2297.25</td>
      <td>168.00</td>
      <td>360.00</td>
      <td>1.00</td>
    </tr>
    <tr>
      <th>max</th>
      <td>81000.00</td>
      <td>41667.00</td>
      <td>700.00</td>
      <td>480.00</td>
      <td>1.00</td>
    </tr>
    <tr>
      <th>Mode</th>
      <td>2500.00</td>
      <td>0.00</td>
      <td>120.00</td>
      <td>360.00</td>
      <td>1.00</td>
    </tr>
    <tr>
      <th>Skew</th>
      <td>6.54</td>
      <td>7.49</td>
      <td>2.68</td>
      <td>-2.36</td>
      <td>-1.88</td>
    </tr>
    <tr>
      <th>Kurt</th>
      <td>60.54</td>
      <td>84.96</td>
      <td>10.40</td>
      <td>6.67</td>
      <td>1.55</td>
    </tr>
    <tr>
      <th>IQR</th>
      <td>2917.50</td>
      <td>2297.25</td>
      <td>68.00</td>
      <td>0.00</td>
      <td>0.00</td>
    </tr>
  </tbody>
</table>
</div>




```python
train_df.describe(include=['O'])
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
      <th>Gender</th>
      <th>Married</th>
      <th>Dependents</th>
      <th>Education</th>
      <th>Self_Employed</th>
      <th>Property_Area</th>
      <th>Loan_Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>601</td>
      <td>611</td>
      <td>599</td>
      <td>614</td>
      <td>582</td>
      <td>614</td>
      <td>614</td>
    </tr>
    <tr>
      <th>unique</th>
      <td>2</td>
      <td>2</td>
      <td>4</td>
      <td>2</td>
      <td>2</td>
      <td>3</td>
      <td>2</td>
    </tr>
    <tr>
      <th>top</th>
      <td>Male</td>
      <td>Yes</td>
      <td>0</td>
      <td>Graduate</td>
      <td>No</td>
      <td>Semiurban</td>
      <td>Y</td>
    </tr>
    <tr>
      <th>freq</th>
      <td>489</td>
      <td>398</td>
      <td>345</td>
      <td>480</td>
      <td>500</td>
      <td>233</td>
      <td>422</td>
    </tr>
  </tbody>
</table>
</div>



**Find the unique classes for the target variable**


```python
print("The target value is an ordinal variable with possible values of {}".format(sorted(train_df[target_var].unique())))
target_cat_count = Counter(train_df[target_var])
cat_y_count = target_cat_count['Y']
cat_n_count = target_cat_count['N'];
print("Count for category 'Y' is {}".format(cat_y_count))
print("Count for category 'N' is {}".format(cat_n_count))

print("Ratio of target variable categories (Y:N) is {}:{}".format(round(cat_y_count/cat_n_count), round(cat_n_count/cat_n_count)))
ax = sns.countplot(x=target_var, data=train_df)
for p in ax.patches:
  ax.annotate('{}={:.2f}%'.format(p.get_height(), p.get_height()/train_df.shape[0]*100), (p.get_x()+0.15, p.get_height()+1))
```

    The target value is an ordinal variable with possible values of ['N', 'Y']
    Count for category 'Y' is 422
    Count for category 'N' is 192
    Ratio of target variable categories (Y:N) is 2:1
    


    
![png](/assets/images/loan/output_28_1.png)
    


**Insight :** The above data shows that there are few data points of the class '0' as compared to class '1'. Hence the dataset is slightly imbalanced. Since the ratio of the imbalance is 1:2, hence we can ignore this imbalance and the problem can often be treated like a normal classification predictive modeling problem.

---
**Analyze input predictors**
---

**List of numerical and categorical features**


```python
# list of numerical variables
num_feat = list(train_df.select_dtypes(exclude='object').columns)
print('numerical variables: ', num_feat)

dis_feat_threshold = 25
dis_feat = [features for features in num_feat if len(train_df[features].unique())<dis_feat_threshold]
print('discrete variables:', dis_feat)

cont_feat = [feature for feature in num_feat if feature not in dis_feat]
print('continuous variables:', cont_feat)

# list of categorical variables
cat_feat = list(train_df.select_dtypes(include='object').columns)
print('categorical variables: ', cat_feat)
```

    numerical variables:  ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History']
    discrete variables: ['Loan_Amount_Term', 'Credit_History']
    continuous variables: ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount']
    categorical variables:  ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'Property_Area', 'Loan_Status']
    


```python
# import module
from tabulate import tabulate

#missing data
null_total = train_df.isnull().sum().sort_values(ascending=False)
null_percent = train_df.isnull().sum()/train_df.shape[0]*100
null_percent = pd.concat([null_total, null_percent], axis=1, keys=['Total', 'Percent'])
null_percent.head(20)
print(tabulate(null_percent, headers=('Feature', 'Null Total', 'Null Percent')))
```

    Feature              Null Total    Null Percent
    -----------------  ------------  --------------
    Credit_History               50        8.14332
    Self_Employed                32        5.21173
    LoanAmount                   22        3.58306
    Dependents                   15        2.443
    Loan_Amount_Term             14        2.28013
    Gender                       13        2.11726
    Married                       3        0.488599
    Loan_Status                   0        0
    Property_Area                 0        0
    CoapplicantIncome             0        0
    ApplicantIncome               0        0
    Education                     0        0
    


```python
null_threshold = 15
col_for_drop = null_percent[null_percent>null_threshold].keys().tolist()
print("Features with more than {}% of null values {}".format(null_threshold, col_for_drop))
```

    Features with more than 15% of null values ['Total', 'Percent']
    


```python
sns.countplot(x=target_var, data=train_df)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f622a761fd0>




    
![png](/assets/images/loan/output_35_1.png)
    


## Uni-variate Analysis


```python
plt = ed.plot_uni_num_data_analysis(train_df, target_var, num_feat, plt)
plt.show()
```


    
![png](/assets/images/loan/output_37_0.png)
    


**Insight:**

For Applicant Income feature:

From Distribution plot:
*   The data is highly negative or left skewed as the skewness is 6.54 (greater than +1)
*   The data has high kurtosis value of 60.54 (>3)
*   The data has heavy-tail or has lots of outliers.
*   Have outliers and most of them are on the right/higher side.
*   Therefore, the feature has non-normal distribution.

From Box plot:
*   Outliers are visible clearly.
*   Outliers concentration more on right side.
*   If the outliers are eliminated then the distribution is almost symmetric.

From Scatter Plot:
*   Most of the values are in 0-20000 range.
*   Outlier values beyond 20000.







```python
#Visualising categorical Data 
fig = plt.figure(figsize=(15, 15))

fig_counter = 1
no_of_cols = 2

for feature in cat_feat:
  ax = fig.add_subplot(np.ceil(len(cat_feat)/no_of_cols), no_of_cols, fig_counter)
  sns.countplot(data=train_df, x=feature)
  fig_counter =  fig_counter + 1
  for p in ax.patches:
    ax.annotate('{}={:.2f}%'.format(p.get_height(), p.get_height()/train_df.shape[0]*100), (p.get_x()+0.15, p.get_height()+1))
```


    
![png](/assets/images/loan/output_39_0.png)
    


**Insight:** 
*   Around 80% of loan applicants are male.
*   Nearly 65% are married.
*   About 78% of loan applicants are graduates.
*   Nearly 81% loan applicants are self-employed.
*   The loan has been approved for more than 65% of applicants.
*   Almost 56% of the applicants have no dependents.
*   Highest number of applicants are from Semi Urban areas, followed by urban areas and the rural areas have the least number of applicants.


## Bivariate Analysis


```python
#Visualising numeric feature against target variable
fig = plt.figure(figsize=(15, 15))

fig_counter = 1
no_of_cols = 2

for feature in num_feat:
  ax = fig.add_subplot(np.ceil(len(num_feat)/no_of_cols), no_of_cols, fig_counter)
  sns.boxplot(data=train_df, x=feature, y=target_var)
  fig_counter =  fig_counter + 1
```


    
![png](/assets/images/loan/output_42_0.png)
    


**Insight:**

*   Applicant income, coapplicant's income and Loan_Amount does not affect the chances of loan approval (the median value is same for both Loan_Status and the boxes are in the same line).
*   People with credit history as 1 are more likely to get  loans approved.





```python
## Lets Find the realtionship between categorical and target variables
fig = plt.figure(figsize=(15, 15))

fig_counter = 1
no_of_cols = 2

for feature in cat_feat:
  ax = fig.add_subplot(np.ceil(len(cat_feat)/no_of_cols), no_of_cols, fig_counter)
  #sns.boxplot(data=train_df, x=feature, y=target_var)
  sns.countplot(hue=feature, x=target_var, data=train_df)
  fig_counter =  fig_counter + 1
```


    
![png](/assets/images/loan/output_44_0.png)
    


**Insight:**
*   There is not a substantial difference between male and female approval rates. But overall males have more loan approval may be because they applyy more.
*   Married applicants have a slightly higher chances of loan approval.
*   Applicants with no dependents have higher chances of approval.
*   Graduates have higher chance of loan approval compared to non-graduates.
*   There is not a substantial difference between Self_Employed and not Self_Employed approval rates.
*   More loans are approved in semiurban area.







**Converting Categorical to Numeric variables**


```python
#Mapp the Y/N to 1/0 in the target variable column so that target becomes numeric and 
#we can find the correlation of the numeric variable to the converted numeric target variable
target_map = {'Y':1,'N':0}
train_df[target_var] = train_df[target_var].map(target_map).astype(int)
y[target_var] = y[target_var].map(target_map).astype(int)
```


```python
## The relationship between features and target
corr = train_df.corr()

# Getting the Upper Triangle of the corelation matrix
matrix = np.triu(corr)

# using the upper triangle matrix as mask 
sns.heatmap(corr, annot=True, cmap ='coolwarm', linewidths=2, mask=matrix)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f621d53fb50>




    
![png](/assets/images/loan/output_48_1.png)
    


**Insight:**
*   The features 'Loan_Amount', 'ApplicantIncome' and 'Loan_Status', 'Credit_History' has strong positive correlation (depicted by darker shades).
*   There is almost no correlation between 'Loan_Status' and 'ApplicantIncome' (depicted by lighter shades).
*   For feature 'Credit_History' correlation is almost zero against other features.


```python
#Correlation of numeric variables with the target variable
corr['Loan_Status']
```




    ApplicantIncome     -0.004710
    CoapplicantIncome   -0.059187
    LoanAmount          -0.037318
    Loan_Amount_Term    -0.021268
    Credit_History       0.561678
    Loan_Status          1.000000
    Name: Loan_Status, dtype: float64



**Insight:** Credit_History is strongly correlated with the target variable 'Loan_Status'.


```python
#Discrete variables and target
sns.countplot(x='Loan_Status', data=train_df, hue='Credit_History')
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f621d5a7e90>




    
![png](/assets/images/loan/output_52_1.png)
    


**Insight:** Credit_History is strongly correlated with the target variable 'Loan_Status' as shown in graph above.


```python
sns.barplot(data=train_df, x='ApplicantIncome', y='Self_Employed', hue='Loan_Status')
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f6227f36550>




    
![png](/assets/images/loan/output_54_1.png)
    


**Insight:** Self_Employed and higher Income Applicants have higher chances for loan approval.

## Data Processing

**Handle Missing values**
*   Impute with MEDIAN for continuous variables.
*   Impute with MODE for categorical variables.



```python
#Handle missing data in training dataset
train_df['Gender'].fillna(value=train_df['Gender'].dropna().mode()[0], inplace=True)
train_df['Married'].fillna(value=train_df['Married'].dropna().mode()[0], inplace=True)
train_df['Dependents'].fillna(value='1', inplace=True) #since dtype is object
train_df['Credit_History'].fillna(value=train_df['Credit_History'].dropna().mode()[0], inplace=True)
train_df['Self_Employed'].fillna(value=train_df['Self_Employed'].dropna().mode()[0], inplace=True)
train_df['LoanAmount'].fillna(value=train_df['LoanAmount'].dropna().mean(), inplace=True)
train_df['Loan_Amount_Term'].fillna(value=0, inplace=True)
```


```python
#Handle missing data in test_df
test_df['Gender'].fillna(value=test_df['Gender'].dropna().mode()[0], inplace=True)
test_df['Married'].fillna(value=test_df['Married'].dropna().mode()[0], inplace=True)
test_df['Dependents'].fillna(value='1', inplace=True) #since dtype is object
test_df['Credit_History'].fillna(value=test_df['Credit_History'].dropna().mode()[0], inplace=True)
test_df['Self_Employed'].fillna(value=test_df['Self_Employed'].dropna().mode()[0], inplace=True)
test_df['LoanAmount'].fillna(value=test_df['LoanAmount'].dropna().mean(), inplace=True)
test_df['Loan_Amount_Term'].fillna(value=0, inplace=True)
```


```python
#missing data
null_total = train_df.isnull().sum().sort_values(ascending=False)
null_percent = train_df.isnull().sum()/test_df.shape[0]*100
null_percent = pd.concat([null_total, null_percent], axis=1, keys=['Total', 'Percent'])
null_percent.head(20)
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
      <th>Total</th>
      <th>Percent</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Loan_Status</th>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Property_Area</th>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Credit_History</th>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Loan_Amount_Term</th>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>LoanAmount</th>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>CoapplicantIncome</th>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>ApplicantIncome</th>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Self_Employed</th>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Education</th>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Dependents</th>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Married</th>
      <td>0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Gender</th>
      <td>0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>



**Insight:** No more missing data.

**Handle ordered categorical data**
*   Use label encoding for ordered categorical data.


```python
cat_feat_le = cat_feat.copy()
print("Feature for label encoding are {}".format(cat_feat_le))
#remove the dependents feature as it will be One Hot Encoded later
cat_feat_le.remove('Dependents')

#Applying label encoding
def label_encoding(dataset, columns):
    label_encoder = preprocessing.LabelEncoder()
    for col in columns:
        dataset[col] = label_encoder.fit_transform(dataset[col])
        dataset[col].astype(int)
    return dataset

#Convert all categorical variables to number
train_df = label_encoding(train_df, cat_feat_le)

cat_feat_le.remove('Loan_Status')
#Convert all categorical variables to number for test df
test_df = label_encoding(test_df, cat_feat_le)
```

    Feature for label encoding are ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'Property_Area', 'Loan_Status']
    


```python
train_df['Dependents'].unique()
```




    array(['0', '1', '2', '3+'], dtype=object)




```python
#Handle Dependents as '0' - no dependents and '1' - has dependents
print("Unique terms before for dependents are {}".format( train_df['Dependents'].unique()))
train_df['Dependents'] = train_df['Dependents'].map( {'0': 0, '1': 1, '2':1, '3+':1}).astype(int)
test_df['Dependents'] = test_df['Dependents'].map( {'0': 0, '1': 1, '2':1, '3+':1}).astype(int)
print("Unique terms after for dependents are {}".format( train_df['Dependents'].unique()))
```

    Unique terms before for dependents are ['0' '1' '2' '3+']
    Unique terms after for dependents are [0 1]
    


```python
train_df['Loan_Amount_Term'].unique()
```




    array([360., 120., 240.,   0., 180.,  60., 300., 480.,  36.,  84.,  12.])




```python
#Since Loan_Amount_Term is max for '360' we handle this column
#as '1' - has term as 360 and '0' - has term other than 360
#Handle for training data
train_df['Loan_Amount_Term'] = [1 if (train_df['Loan_Amount_Term'][index]==360) else 0 for index, value in train_df['Loan_Amount_Term'].items() ]
train_df['Loan_Amount_Term'].astype(int)
train_df['Credit_History'] = train_df['Credit_History'].astype(int)

#Similarly, handling coapplicant income as '1' - has coapplicant income and '0' - no coapplicant income
train_df['CoapplicantIncome'] = [0 if (train_df['CoapplicantIncome'][index]==0) else 1 for index, value in train_df['CoapplicantIncome'].items() ]
train_df['CoapplicantIncome'].astype(int)
print("Unique terms after for Loan_Amount_Term are {}".format( train_df['Loan_Amount_Term'].unique()))
```

    Unique terms after for Loan_Amount_Term are [1 0]
    


```python
#Handle for test data
test_df['Loan_Amount_Term'] = [1 if (test_df['Loan_Amount_Term'][index]==360) else 0 for index, value in test_df['Loan_Amount_Term'].items() ]
test_df['Loan_Amount_Term'].astype(int)
test_df['Credit_History'] = test_df['Credit_History'].astype(int)
test_df['CoapplicantIncome'] = [0 if (test_df['CoapplicantIncome'][index]==0) else 1 for index, value in test_df['CoapplicantIncome'].items() ]
test_df['CoapplicantIncome'].astype(int) 
print("Unique terms after for Loan_Amount_Term are {}".format( train_df['Loan_Amount_Term'].unique()))
```

    Unique terms after for Loan_Amount_Term are [1 0]
    

**Handle non-ordered categorical data**
*   Use One Hot encoding for non-ordered categorical data.


```python
#categorical features not ordinal for one hot encoding
cat_feat_ohe = ['Property_Area']
df_ohe = pd.DataFrame(train_df[cat_feat_ohe])

from sklearn.preprocessing import OneHotEncoder

# Apply one-hot encoder to each column with categorical data
OH_encoder = OneHotEncoder(handle_unknown='ignore', sparse=False)

#[array(['Female', 'Male'], dtype=object), array([1, 2, 3], dtype=object)]
OH_cols = pd.DataFrame(OH_encoder.fit_transform(df_ohe))

# One-hot encoding removed index; put it back
OH_cols.index = df_ohe.index
OH_cols.columns = OH_encoder.get_feature_names()

# Remove categorical columns (will replace with one-hot encoding)
num_X_train = train_df.drop(df_ohe, axis=1)

#OH_cols_train = pd.DataFrame(X, columns = ["Country_"+str(int(i)) for i in range(data.shape[1])]) 

# Add one-hot encoded columns to numerical features
OH_cols = OH_cols.astype(int)
OH_X_train = pd.concat([num_X_train, OH_cols], axis=1)

train_df = OH_X_train
train_df.head(1)
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
      <th>Gender</th>
      <th>Married</th>
      <th>Dependents</th>
      <th>Education</th>
      <th>Self_Employed</th>
      <th>ApplicantIncome</th>
      <th>CoapplicantIncome</th>
      <th>LoanAmount</th>
      <th>Loan_Amount_Term</th>
      <th>Credit_History</th>
      <th>Loan_Status</th>
      <th>x0_0</th>
      <th>x0_1</th>
      <th>x0_2</th>
    </tr>
    <tr>
      <th>Loan_ID</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>LP001002</th>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>5849</td>
      <td>0</td>
      <td>146.412162</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>




```python
#categorical features not ordinal for one hot encoding for testing
cat_feat_ohe = ['Property_Area']
df_ohe = pd.DataFrame(test_df[cat_feat_ohe])

from sklearn.preprocessing import OneHotEncoder

# Apply one-hot encoder to each column with categorical data
OH_encoder = OneHotEncoder(handle_unknown='ignore', sparse=False)

#[array(['Female', 'Male'], dtype=object), array([1, 2, 3], dtype=object)]
OH_cols = pd.DataFrame(OH_encoder.fit_transform(df_ohe))

# One-hot encoding removed index; put it back
OH_cols.index = df_ohe.index
OH_cols.columns = OH_encoder.get_feature_names()

# Remove categorical columns (will replace with one-hot encoding)
num_X_train = test_df.drop(df_ohe, axis=1)

#OH_cols_train = pd.DataFrame(X, columns = ["Country_"+str(int(i)) for i in range(data.shape[1])]) 

# Add one-hot encoded columns to numerical features
OH_cols = OH_cols.astype(int)
OH_X_train = pd.concat([num_X_train, OH_cols], axis=1)

test_df = OH_X_train
test_df.head(1)
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
      <th>Gender</th>
      <th>Married</th>
      <th>Dependents</th>
      <th>Education</th>
      <th>Self_Employed</th>
      <th>ApplicantIncome</th>
      <th>CoapplicantIncome</th>
      <th>LoanAmount</th>
      <th>Loan_Amount_Term</th>
      <th>Credit_History</th>
      <th>x0_0</th>
      <th>x0_1</th>
      <th>x0_2</th>
    </tr>
    <tr>
      <th>Loan_ID</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>LP001015</th>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>5720</td>
      <td>0</td>
      <td>110.0</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>



**Converting Categorical variables to category type**


```python
train_df[['Gender', 'Married', 'Education', 'Self_Employed', 'CoapplicantIncome', 'Loan_Amount_Term']] = train_df[['Gender', 'Married', 'Education', 'Self_Employed', 'CoapplicantIncome', 'Loan_Amount_Term']].astype(int)
test_df[['Gender', 'Married', 'Education', 'Self_Employed', 'CoapplicantIncome', 'Loan_Amount_Term']] = test_df[['Gender', 'Married', 'Education', 'Self_Employed', 'CoapplicantIncome', 'Loan_Amount_Term']].astype(int)
train_df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    Index: 614 entries, LP001002 to LP002990
    Data columns (total 14 columns):
     #   Column             Non-Null Count  Dtype  
    ---  ------             --------------  -----  
     0   Gender             614 non-null    int64  
     1   Married            614 non-null    int64  
     2   Dependents         614 non-null    int64  
     3   Education          614 non-null    int64  
     4   Self_Employed      614 non-null    int64  
     5   ApplicantIncome    614 non-null    int64  
     6   CoapplicantIncome  614 non-null    int64  
     7   LoanAmount         614 non-null    float64
     8   Loan_Amount_Term   614 non-null    int64  
     9   Credit_History     614 non-null    int64  
     10  Loan_Status        614 non-null    int64  
     11  x0_0               614 non-null    int64  
     12  x0_1               614 non-null    int64  
     13  x0_2               614 non-null    int64  
    dtypes: float64(1), int64(13)
    memory usage: 92.0+ KB
    

---
**Outliers Detection**
---

**Function to detect outliers using Tukey's method**


```python
# list of numerical variables
num_feat = ['ApplicantIncome', 'CoapplicantIncome','LoanAmount']
print('numerical variables: ', num_feat)
```

    numerical variables:  ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount']
    


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
      outliers.append({'Feature': col, 'No_of_outliers':len(outlier_list_col)})#, 'Outlier_rows':outlier_list_col})
     
  #print('Num of outlier detected:', outliers)

  return outliers
```


```python
# detect outliers from all numeric columns, this return the dictionary of indices and column number
outliers = detect_outliers(train_df, num_feat, 0)

print(tabulate(outliers))

out_val = 0
for ind, val in enumerate(outliers):
  out_val += val.get('No_of_outliers')
print("Total                 {}".format(out_val))
```

    ---------------  --
    ApplicantIncome  50
    LoanAmount       41
    ---------------  --
    Total                 91
    

**Outlier Treatment** 

Since data is left skewed, use log transformation which doesn't effect affect the smaller values much but reduces the larger values, thereby nullifying the effect of higher values and making the distribution normal.



```python
# Perform log transformation of LoanAmount, ApplicantIncome to make it closer to normal for treating outliers
train_df['LoanAmount'] = np.log1p(train_df['LoanAmount'])
train_df['ApplicantIncome'] = np.log1p(train_df['ApplicantIncome']) 
```


```python
# distribtion of LoanAmount, ApplicantIncome log
sns.histplot(data=train_df, x='ApplicantIncome', bins=20)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f621d5dfc90>




    
![png](/assets/images/loan/output_81_1.png)
    



```python
sns.histplot(data=train_df, x='LoanAmount', bins=20)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f621d8093d0>




    
![png](/assets/images/loan/output_82_1.png)
    


**Insight:** 
Features LoanAmount and ApplicantIncome are now nearly normal.


```python
# Perform log transformation of LoanAmount, ApplicantIncome 
#to make it closer to normal for treating outliers ON test_df
test_df['LoanAmount'] = np.log1p(test_df['LoanAmount'])
test_df['ApplicantIncome'] = np.log1p(test_df['ApplicantIncome'])
```

### **Feature Selection - Statistical analysis of features**

**For numeric features using ANOVA**

*   Null Hypothesis (H0) : There is no relation between the given feature and the target
*   Alternate Hypothesis (H1) : There is relation between the given feature and the target


```python
# split into input (X) and output (y) variables
X = train_df.copy()
X.drop(target_var, axis=1, inplace=True)
y = y

#features selected list
sel_feat = []

#configure to select all features
fs = SelectKBest(score_func=f_classif, k='all')
#learn relationship from training data
fs.fit(X, y)

print('##### ANOVA Test Results for Numeric Features ##### \n')
#check the p-values for the features
for i in range(len(fs.pvalues_)):
  p_value = fs.pvalues_[i]
  feature = X.columns[i]
  if(feature in num_feat):
    #If the p-value is <0.05, reject H0
    if (p_value < 0.05):
      print(('Feature %s: is correlated with %s | P-Value: %f' % (feature, target_var, p_value)))
      sel_feat.append(feature)
    else:
      print(('Feature %s: is NOT correlated with %s | P-Value: %f' % (feature, target_var, p_value)))
      
print('Features selected are : ', sel_feat)
```

    ##### ANOVA Test Results for Numeric Features ##### 
    
    Feature ApplicantIncome: is NOT correlated with Loan_Status | P-Value: 0.786393
    Feature CoapplicantIncome: is NOT correlated with Loan_Status | P-Value: 0.062695
    Feature LoanAmount: is NOT correlated with Loan_Status | P-Value: 0.297269
    Features selected are :  []
    

    /usr/local/lib/python3.7/dist-packages/sklearn/utils/validation.py:760: DataConversionWarning: A column-vector y was passed when a 1d array was expected. Please change the shape of y to (n_samples, ), for example using ravel().
      y = column_or_1d(y, warn=True)
    

**For categorical features using chi2**

*   Null Hypothesis (H0) : There is no relation between the given feature and the target
*   Alternate Hypothesis (H1) : There is relation between the given feature and the target


```python
# split into input (X) and output (y) variables
X = train_df.copy()
X.drop(target_var, axis=1, inplace=True)
y = y

#configure to select all features
fs = SelectKBest(score_func=chi2, k='all')
#learn relationship from training data
fs.fit(X, y)

print('##### chi2 Test Results for categorical Features ##### \n')
#check the p-values for the features
for i in range(len(fs.pvalues_)):
  p_value = fs.pvalues_[i]
  feature = X.columns[i]
  if(feature not in num_feat):
    #If the p-value is <0.05, reject H0
    if (p_value < 0.05):
      print(('Feature %s: is correlated with %s | P-Value: %f' % (feature, target_var, p_value)))
      sel_feat.append(feature)
    else:
      print(('Feature %s: is NOT correlated with %s | P-Value: %f' % (feature, target_var, p_value)))
      
print('\nFeatures selected are : ', sel_feat)
```

    ##### chi2 Test Results for categorical Features ##### 
    
    Feature Gender: is NOT correlated with Loan_Status | P-Value: 0.849032
    Feature Married: is NOT correlated with Loan_Status | P-Value: 0.181852
    Feature Dependents: is NOT correlated with Loan_Status | P-Value: 0.907577
    Feature Education: is NOT correlated with Loan_Status | P-Value: 0.059887
    Feature Self_Employed: is NOT correlated with Loan_Status | P-Value: 0.931982
    Feature Loan_Amount_Term: is NOT correlated with Loan_Status | P-Value: 0.498252
    Feature Credit_History: is correlated with Loan_Status | P-Value: 0.000000
    Feature x0_0: is correlated with Loan_Status | P-Value: 0.035717
    Feature x0_1: is correlated with Loan_Status | P-Value: 0.007695
    Feature x0_2: is NOT correlated with Loan_Status | P-Value: 0.375937
    
    Features selected are :  ['Credit_History', 'x0_0', 'x0_1']
    

## **Machine Learning**

**Splitting the data into Training and Testing sample**


```python
X = train_df[[feature for feature in sel_feat]]
y = train_df['Loan_Status']

# split dataset into train and test
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state= 5)
```

**Logistic Regression using Pipeline**


```python
#make pipeline
model = Pipeline([('scaled' , StandardScaler()),('LR' ,LogisticRegression())])

#use 10-fold cross valiation for better results on training data
cv = KFold(n_splits=10, random_state=7, shuffle=True)
cv_score = cross_val_score(model, X_train, y_train, cv=cv, scoring='accuracy')

# fit the model on train set
model.fit(X_train, y_train)

#predict the results
y_pred = model.predict(X_test)
```

**Check the metrics**


```python
print(f"Тrain accuracy: {model.score(X_train, y_train)*100}\nТest accuracy: {model.score(X_test, y_test)*100}")

print("for 10-fold Cross Validation cross_val_score: ", cv_score.mean()*100)

cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True).set_title('Confusion Matrix', fontsize = 15)

# print classification report
print("\n", classification_report(y_test, y_pred))
```

    Тrain accuracy: 81.26272912423626
    Тest accuracy: 79.67479674796748
    for 10-fold Cross Validation cross_val_score:  81.25714285714285
    
                   precision    recall  f1-score   support
    
               0       0.86      0.45      0.59        40
               1       0.78      0.96      0.86        83
    
        accuracy                           0.80       123
       macro avg       0.82      0.71      0.73       123
    weighted avg       0.81      0.80      0.78       123
    
    


    
![png](/assets/images/loan/output_96_1.png)
    


**Model Building Outcomes**
*   LogisticRegression produces around 80% accuracy.
*   Diagonal in confusion matrix have high values of 18 and 80 (which is good).
