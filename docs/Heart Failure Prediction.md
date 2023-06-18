# Heart Failure Prediction Case Study
**Problem Statement:** Create a model to assess the likelihood of a death by heart failure event. This can be used to help hospitals in assessing the severity of patients with cardiovascular diseases.

### Import libraries


```python
#import pandas for loading the CSV file
import pandas as pd

#import numpy for maths
import numpy as np

# import seaborn for visualization
import seaborn as sns

#iimport matplotlib for graphs
import matplotlib.pyplot as plt

# To visualise in the notebook
%matplotlib inline
```

## Load Data


```python
dataset_path = "/content/drive/MyDrive/Data/Heart Failure/heart_failure_clinical_records_dataset.csv"
hf_ds = pd.read_csv(dataset_path)
```

## EDA


```python
# Display the first 5 rows
hf_ds.head()
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
      <th>age</th>
      <th>anaemia</th>
      <th>creatinine_phosphokinase</th>
      <th>diabetes</th>
      <th>ejection_fraction</th>
      <th>high_blood_pressure</th>
      <th>platelets</th>
      <th>serum_creatinine</th>
      <th>serum_sodium</th>
      <th>sex</th>
      <th>smoking</th>
      <th>time</th>
      <th>DEATH_EVENT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>75.0</td>
      <td>0</td>
      <td>582</td>
      <td>0</td>
      <td>20</td>
      <td>1</td>
      <td>265000.00</td>
      <td>1.9</td>
      <td>130</td>
      <td>1</td>
      <td>0</td>
      <td>4</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>55.0</td>
      <td>0</td>
      <td>7861</td>
      <td>0</td>
      <td>38</td>
      <td>0</td>
      <td>263358.03</td>
      <td>1.1</td>
      <td>136</td>
      <td>1</td>
      <td>0</td>
      <td>6</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>65.0</td>
      <td>0</td>
      <td>146</td>
      <td>0</td>
      <td>20</td>
      <td>0</td>
      <td>162000.00</td>
      <td>1.3</td>
      <td>129</td>
      <td>1</td>
      <td>1</td>
      <td>7</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>50.0</td>
      <td>1</td>
      <td>111</td>
      <td>0</td>
      <td>20</td>
      <td>0</td>
      <td>210000.00</td>
      <td>1.9</td>
      <td>137</td>
      <td>1</td>
      <td>0</td>
      <td>7</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>65.0</td>
      <td>1</td>
      <td>160</td>
      <td>1</td>
      <td>20</td>
      <td>0</td>
      <td>327000.00</td>
      <td>2.7</td>
      <td>116</td>
      <td>0</td>
      <td>0</td>
      <td>8</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Display the last 5 rows
hf_ds.tail()
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
      <th>age</th>
      <th>anaemia</th>
      <th>creatinine_phosphokinase</th>
      <th>diabetes</th>
      <th>ejection_fraction</th>
      <th>high_blood_pressure</th>
      <th>platelets</th>
      <th>serum_creatinine</th>
      <th>serum_sodium</th>
      <th>sex</th>
      <th>smoking</th>
      <th>time</th>
      <th>DEATH_EVENT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>294</th>
      <td>62.0</td>
      <td>0</td>
      <td>61</td>
      <td>1</td>
      <td>38</td>
      <td>1</td>
      <td>155000.0</td>
      <td>1.1</td>
      <td>143</td>
      <td>1</td>
      <td>1</td>
      <td>270</td>
      <td>0</td>
    </tr>
    <tr>
      <th>295</th>
      <td>55.0</td>
      <td>0</td>
      <td>1820</td>
      <td>0</td>
      <td>38</td>
      <td>0</td>
      <td>270000.0</td>
      <td>1.2</td>
      <td>139</td>
      <td>0</td>
      <td>0</td>
      <td>271</td>
      <td>0</td>
    </tr>
    <tr>
      <th>296</th>
      <td>45.0</td>
      <td>0</td>
      <td>2060</td>
      <td>1</td>
      <td>60</td>
      <td>0</td>
      <td>742000.0</td>
      <td>0.8</td>
      <td>138</td>
      <td>0</td>
      <td>0</td>
      <td>278</td>
      <td>0</td>
    </tr>
    <tr>
      <th>297</th>
      <td>45.0</td>
      <td>0</td>
      <td>2413</td>
      <td>0</td>
      <td>38</td>
      <td>0</td>
      <td>140000.0</td>
      <td>1.4</td>
      <td>140</td>
      <td>1</td>
      <td>1</td>
      <td>280</td>
      <td>0</td>
    </tr>
    <tr>
      <th>298</th>
      <td>50.0</td>
      <td>0</td>
      <td>196</td>
      <td>0</td>
      <td>45</td>
      <td>0</td>
      <td>395000.0</td>
      <td>1.6</td>
      <td>136</td>
      <td>1</td>
      <td>1</td>
      <td>285</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Check the columns and data types
hf_ds.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 299 entries, 0 to 298
    Data columns (total 13 columns):
     #   Column                    Non-Null Count  Dtype  
    ---  ------                    --------------  -----  
     0   age                       299 non-null    float64
     1   anaemia                   299 non-null    int64  
     2   creatinine_phosphokinase  299 non-null    int64  
     3   diabetes                  299 non-null    int64  
     4   ejection_fraction         299 non-null    int64  
     5   high_blood_pressure       299 non-null    int64  
     6   platelets                 299 non-null    float64
     7   serum_creatinine          299 non-null    float64
     8   serum_sodium              299 non-null    int64  
     9   sex                       299 non-null    int64  
     10  smoking                   299 non-null    int64  
     11  time                      299 non-null    int64  
     12  DEATH_EVENT               299 non-null    int64  
    dtypes: float64(3), int64(10)
    memory usage: 30.5 KB
    


```python
# Check the shape(rows, columns)
hf_ds.shape
```




    (299, 13)




```python
#Check descriptive statistics for the numeric data
hf_ds.describe()
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
      <th>age</th>
      <th>anaemia</th>
      <th>creatinine_phosphokinase</th>
      <th>diabetes</th>
      <th>ejection_fraction</th>
      <th>high_blood_pressure</th>
      <th>platelets</th>
      <th>serum_creatinine</th>
      <th>serum_sodium</th>
      <th>sex</th>
      <th>smoking</th>
      <th>time</th>
      <th>DEATH_EVENT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>299.000000</td>
      <td>299.000000</td>
      <td>299.000000</td>
      <td>299.000000</td>
      <td>299.000000</td>
      <td>299.000000</td>
      <td>299.000000</td>
      <td>299.00000</td>
      <td>299.000000</td>
      <td>299.000000</td>
      <td>299.00000</td>
      <td>299.000000</td>
      <td>299.00000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>60.833893</td>
      <td>0.431438</td>
      <td>581.839465</td>
      <td>0.418060</td>
      <td>38.083612</td>
      <td>0.351171</td>
      <td>263358.029264</td>
      <td>1.39388</td>
      <td>136.625418</td>
      <td>0.648829</td>
      <td>0.32107</td>
      <td>130.260870</td>
      <td>0.32107</td>
    </tr>
    <tr>
      <th>std</th>
      <td>11.894809</td>
      <td>0.496107</td>
      <td>970.287881</td>
      <td>0.494067</td>
      <td>11.834841</td>
      <td>0.478136</td>
      <td>97804.236869</td>
      <td>1.03451</td>
      <td>4.412477</td>
      <td>0.478136</td>
      <td>0.46767</td>
      <td>77.614208</td>
      <td>0.46767</td>
    </tr>
    <tr>
      <th>min</th>
      <td>40.000000</td>
      <td>0.000000</td>
      <td>23.000000</td>
      <td>0.000000</td>
      <td>14.000000</td>
      <td>0.000000</td>
      <td>25100.000000</td>
      <td>0.50000</td>
      <td>113.000000</td>
      <td>0.000000</td>
      <td>0.00000</td>
      <td>4.000000</td>
      <td>0.00000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>51.000000</td>
      <td>0.000000</td>
      <td>116.500000</td>
      <td>0.000000</td>
      <td>30.000000</td>
      <td>0.000000</td>
      <td>212500.000000</td>
      <td>0.90000</td>
      <td>134.000000</td>
      <td>0.000000</td>
      <td>0.00000</td>
      <td>73.000000</td>
      <td>0.00000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>60.000000</td>
      <td>0.000000</td>
      <td>250.000000</td>
      <td>0.000000</td>
      <td>38.000000</td>
      <td>0.000000</td>
      <td>262000.000000</td>
      <td>1.10000</td>
      <td>137.000000</td>
      <td>1.000000</td>
      <td>0.00000</td>
      <td>115.000000</td>
      <td>0.00000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>70.000000</td>
      <td>1.000000</td>
      <td>582.000000</td>
      <td>1.000000</td>
      <td>45.000000</td>
      <td>1.000000</td>
      <td>303500.000000</td>
      <td>1.40000</td>
      <td>140.000000</td>
      <td>1.000000</td>
      <td>1.00000</td>
      <td>203.000000</td>
      <td>1.00000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>95.000000</td>
      <td>1.000000</td>
      <td>7861.000000</td>
      <td>1.000000</td>
      <td>80.000000</td>
      <td>1.000000</td>
      <td>850000.000000</td>
      <td>9.40000</td>
      <td>148.000000</td>
      <td>1.000000</td>
      <td>1.00000</td>
      <td>285.000000</td>
      <td>1.00000</td>
    </tr>
  </tbody>
</table>
</div>




```python
#select the target
y = hf_ds.DEATH_EVENT

#select the dependent features and its dataframe
X = hf_ds.drop('DEATH_EVENT', axis=1)
```


```python
#convert the categorical data to categorical data type
#list of categorical data with data type as numeric
cat_feat_num_to_cat = ['anaemia', 'diabetes', 'high_blood_pressure', 'sex', 'smoking', 'DEATH_EVENT']
#convert the categorical features to correct data type
#for feature in cat_feat_num_to_cat:
 # hf_ds[feature] = hf_ds[feature].astype('category')
```


```python
#Check descriptive statistics for the categorical data
#hf_ds.describe(include=['category'])
```


```python
# list of numerical variables
num_feat = hf_ds.select_dtypes(include=np.number).columns.tolist()
print('Number of Train numerical variables: ', num_feat)

# list of categorical variables
cat_feat = hf_ds.select_dtypes(exclude=np.number).columns.tolist()
print('Number of Train categorical variables: ', cat_feat)
```

    Number of Train numerical variables:  ['age', 'anaemia', 'creatinine_phosphokinase', 'diabetes', 'ejection_fraction', 'high_blood_pressure', 'platelets', 'serum_creatinine', 'serum_sodium', 'sex', 'smoking', 'time', 'DEATH_EVENT']
    Number of Train categorical variables:  []
    

## Visualising Data

### Univariate Analysis


```python
#histograms for numeric data
hf_ds.hist(bins=30, figsize=(10, 8))
plt.show()
```


    
![png](/assets/images/heart/output_17_0.png)
    



```python
#Visualising numeric Data Using Seaborn
for feature in num_feat:
  sns.FacetGrid(hf_ds).map(sns.histplot, feature, bins=50, kde=True)
```


    
![png](/assets/images/heart/output_18_0.png)
    



    
![png](/assets/images/heart/output_18_1.png)
    



    
![png](/assets/images/heart/output_18_2.png)
    



    
![png](/assets/images/heart/output_18_3.png)
    



    
![png](/assets/images/heart/output_18_4.png)
    



    
![png](/assets/images/heart/output_18_5.png)
    



    
![png](/assets/images/heart/output_18_6.png)
    



    
![png](/assets/images/heart/output_18_7.png)
    



    
![png](/assets/images/heart/output_18_8.png)
    



    
![png](/assets/images/heart/output_18_9.png)
    



    
![png](/assets/images/heart/output_18_10.png)
    



    
![png](/assets/images/heart/output_18_11.png)
    



    
![png](/assets/images/heart/output_18_12.png)
    



```python
#Visualising categorical Data 
for feature in cat_feat:
  sns.FacetGrid(hf_ds).map(sns.countplot, feature)
```

### Bivariate Analysis


```python
corr_feat_series = pd.Series.sort_values(hf_ds.corrwith(y))
sns.barplot(x=corr_feat_series, y=corr_feat_series.index, orient='h')
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f651eda5790>




    
![png](/assets/images/heart/output_21_1.png)
    



```python
## Lets Find the realtionship between them and Sale PRice
plt.figure(figsize=(15,15))
sns.heatmap(hf_ds.corr(), annot = True, cmap ='coolwarm', linewidths=2)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f65130a3bd0>




    
![png](/assets/images/heart/output_22_1.png)
    



```python
pd.Series.sort_values(abs(hf_ds.corrwith(y)), ascending=False)
```




    DEATH_EVENT                 1.000000
    time                        0.526964
    serum_creatinine            0.294278
    ejection_fraction           0.268603
    age                         0.253729
    serum_sodium                0.195204
    high_blood_pressure         0.079351
    anaemia                     0.066270
    creatinine_phosphokinase    0.062728
    platelets                   0.049139
    smoking                     0.012623
    sex                         0.004316
    diabetes                    0.001943
    dtype: float64




```python
#Visualising Data Using Seaborn
sns.boxplot(data=hf_ds, y='age', x='DEATH_EVENT', orient='v')
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f651f8d9510>




    
![png](/assets/images/heart/output_24_1.png)
    



```python
sns.boxplot(data=hf_ds, y='creatinine_phosphokinase', x='DEATH_EVENT', orient='v')
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f651fa19e10>




    
![png](/assets/images/heart/output_25_1.png)
    



```python
sns.countplot(data=hf_ds, x='anaemia')
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f651ee6aed0>




    
![png](/assets/images/heart/output_26_1.png)
    



```python
# Visualise the relationship between the features and the target using scatterplots
#sns.pairplot(hf_ds, corner=True, kind='scatter')
```


```python
from sklearn.feature_selection import SelectKBest
from sklearn.feature_selection import f_classif
from sklearn.feature_selection import mutual_info_classif

# configure to select all features
fs = SelectKBest(score_func=f_classif, k='all')

def make_mi_scores(X, y, discrete_features):
    mi_scores = mutual_info_classif(X, y)
    mi_scores = pd.Series(mi_scores, name="MI Scores", index=X.columns)
    mi_scores = mi_scores.sort_values(ascending=False)
    return mi_scores

mi_scores = make_mi_scores(X, y, num_feat)
mi_scores
```




    time                        0.245425
    age                         0.115741
    serum_creatinine            0.079078
    ejection_fraction           0.069312
    smoking                     0.051088
    creatinine_phosphokinase    0.032028
    serum_sodium                0.030723
    sex                         0.000000
    platelets                   0.000000
    high_blood_pressure         0.000000
    diabetes                    0.000000
    anaemia                     0.000000
    Name: MI Scores, dtype: float64




```python
sns.barplot(x=mi_scores, y=mi_scores.index, orient='h')
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f6512cbbbd0>




    
![png](/assets/images/heart/output_29_1.png)
    



```python
data = pd.Series.sort_values(abs(X.corrwith(y)), ascending=False)
sns.barplot(x=data, y=data.index, orient='h')
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f651f432d50>




    
![png](/assets/images/heart/output_30_1.png)
    



```python
#select tge features with high MI score
X = hf_ds[mi_scores.index[mi_scores>=0.02]]

# split dataset into train and test
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.3, random_state= 5)
```


```python
from xgboost import XGBClassifier
from sklearn.model_selection import KFold, cross_val_score
from sklearn.metrics import mean_squared_error, mean_absolute_error, mean_squared_log_error, confusion_matrix, classification_report
from sklearn.metrics import accuracy_score, log_loss

# XGBoost Classifier
xgb_classifier = XGBClassifier()
cv = KFold(n_splits=5, random_state=42, shuffle=True) 
rmse =np.sqrt(-cross_val_score(xgb_classifier, X_train, y_train, scoring="neg_mean_squared_log_error", cv=cv))
xgb_classifier.fit(X_train, y_train)
y_pred = xgb_classifier.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print (rmse)
print(acc)
```

    [0.26198501 0.2391585  0.30251423 0.26198501 0.2651607 ]
    0.8444444444444444
    
