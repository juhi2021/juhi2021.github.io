# Iris Flower Species Classification Case Study

**Problem Statement :** To create a model which can predict the species of the iris flower.

**Output Target :** species (0 for 'setosa', 1 for 'versicolor', and 2 for 'virginica')

**Input predictors :** 'sepal length (cm)',
 'sepal width (cm)',
 'petal length (cm)',
 'petal width (cm)'

**Solution :** To create a supervised ML classification model, as the target variable is categorical.

### Import libraries


```python
#import pandas for loading the CSV file
import pandas as pd

#import numpy for maths
import numpy as np

# import seaborn for visualization
import seaborn as sns

# Mount google drive in google colab
#from google.colab import drive
#drive.mount('/content/drive')

#to import the custom module after mounting the drive
import sys
sys.path.insert(0, '/content/drive/My Drive/Colab Notebooks')

#custom library for data exploration
from lib import explore_data as ed
from lib.Model import Model

#import matplotlib for graphs
import matplotlib.pyplot as plt

#To visualise in the notebook
%matplotlib inline
```

    Hello you are in explore_data file
    


```python
#To run the python library file in colab
!python3 "/content/drive/MyDrive/Colab Notebooks/lib/explore_data.py"
```

    Hello you are in explore_data file
    

## Load Data

**Read dataset into dataframe**


```python
#Load iris dataset
from sklearn.datasets import load_iris
iris_dataset = load_iris()

iris_dataset.keys()
```




    dict_keys(['data', 'target', 'target_names', 'DESCR', 'feature_names', 'filename'])




```python
iris_dataset.feature_names
```




    ['sepal length (cm)',
     'sepal width (cm)',
     'petal length (cm)',
     'petal width (cm)']




```python
iris_dataset['target']
```




    array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
           1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
           1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
           2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
           2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])




```python
iris_dataset['target_names']
```




    array(['setosa', 'versicolor', 'virginica'], dtype='<U10')




```python
print(iris_dataset['DESCR'])
```


```python
#load the features data as a dataframe
X = pd.DataFrame(data=iris_dataset['data'], columns=iris_dataset['feature_names'])
print(X.shape)
#select the target variable and name as Type
y = pd.DataFrame(data=iris_dataset['target'], columns=['Species'])
print(y.shape)
#combine to get full iris dataframe
iris_df = y.combine_first(X)
print(iris_df.shape)
```

    (150, 4)
    (150, 1)
    (150, 5)
    

**Define target**


```python
target_var = 'Species'
print("The target variable is '\033[1m{}'\033[1m".format(target_var))
```

    The target variable is '[1mSpecies'[1m
    

**Check for duplicate rows and drop the duplicates**


```python
print("Number of duplicate rows {}".format(iris_df[iris_df.duplicated()].shape))
#drop the duplicates
iris_df.drop_duplicates(inplace=True)
print("Number of records after duplicate removal {}".format(iris_df.shape))
```

    Number of duplicate rows (1, 5)
    Number of records after duplicate removal (149, 5)
    

## **Exploratory Data Analysis (EDA)**
### **Basic Data Exploration**
---
**Observe data**
---
**Number of rows and columns**


```python
# Check the shape(rows, columns)
print("The dataset has {} rows × {} features including the target.".format(iris_df.shape[0],iris_df.shape[1]))
```

    The dataset has 149 rows × 5 features including the target.
    

**Data Types for the features**


```python
# Check the columns and data types along with the target y
iris_df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 149 entries, 0 to 149
    Data columns (total 5 columns):
     #   Column             Non-Null Count  Dtype  
    ---  ------             --------------  -----  
     0   Species            149 non-null    int64  
     1   petal length (cm)  149 non-null    float64
     2   petal width (cm)   149 non-null    float64
     3   sepal length (cm)  149 non-null    float64
     4   sepal width (cm)   149 non-null    float64
    dtypes: float64(4), int64(1)
    memory usage: 7.0 KB
    

**Insight:** All independent Variables are Numerical. The target variable is categorical.

**Display sample data**
*   Display the first 5 rows of the dataset along with the target
*   Display the last 5 rows of the dataset along with the target 


```python
#Display the first 5 rows of the dataset along with the target y
iris_df.head()
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
      <th>Species</th>
      <th>petal length (cm)</th>
      <th>petal width (cm)</th>
      <th>sepal length (cm)</th>
      <th>sepal width (cm)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>5.1</td>
      <td>3.5</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>4.9</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0</td>
      <td>1.3</td>
      <td>0.2</td>
      <td>4.7</td>
      <td>3.2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0</td>
      <td>1.5</td>
      <td>0.2</td>
      <td>4.6</td>
      <td>3.1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>5.0</td>
      <td>3.6</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Display the last 5 rows of the dataset along with the target y
iris_df.tail()
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
      <th>Species</th>
      <th>petal length (cm)</th>
      <th>petal width (cm)</th>
      <th>sepal length (cm)</th>
      <th>sepal width (cm)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>145</th>
      <td>2</td>
      <td>5.2</td>
      <td>2.3</td>
      <td>6.7</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>146</th>
      <td>2</td>
      <td>5.0</td>
      <td>1.9</td>
      <td>6.3</td>
      <td>2.5</td>
    </tr>
    <tr>
      <th>147</th>
      <td>2</td>
      <td>5.2</td>
      <td>2.0</td>
      <td>6.5</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>148</th>
      <td>2</td>
      <td>5.4</td>
      <td>2.3</td>
      <td>6.2</td>
      <td>3.4</td>
    </tr>
    <tr>
      <th>149</th>
      <td>2</td>
      <td>5.1</td>
      <td>1.8</td>
      <td>5.9</td>
      <td>3.0</td>
    </tr>
  </tbody>
</table>
</div>



---
**Analyze Target**
---
**Check descriptive statistics for the numeric data**


```python
#Check descriptive statistics for the numeric data
iris_df.describe()
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
      <th>Species</th>
      <th>petal length (cm)</th>
      <th>petal width (cm)</th>
      <th>sepal length (cm)</th>
      <th>sepal width (cm)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>149.000000</td>
      <td>149.000000</td>
      <td>149.000000</td>
      <td>149.000000</td>
      <td>149.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>0.993289</td>
      <td>3.748993</td>
      <td>1.194631</td>
      <td>5.843624</td>
      <td>3.059732</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.817847</td>
      <td>1.767791</td>
      <td>0.762622</td>
      <td>0.830851</td>
      <td>0.436342</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>0.100000</td>
      <td>4.300000</td>
      <td>2.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>0.000000</td>
      <td>1.600000</td>
      <td>0.300000</td>
      <td>5.100000</td>
      <td>2.800000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>1.000000</td>
      <td>4.300000</td>
      <td>1.300000</td>
      <td>5.800000</td>
      <td>3.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>2.000000</td>
      <td>5.100000</td>
      <td>1.800000</td>
      <td>6.400000</td>
      <td>3.300000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>2.000000</td>
      <td>6.900000</td>
      <td>2.500000</td>
      <td>7.900000</td>
      <td>4.400000</td>
    </tr>
  </tbody>
</table>
</div>




```python
#convert the categorical data to categorical data type
#list of categorical data with data type as numeric
cat_feat_num_to_cat = ['Species']
#convert the categorical features to correct data type
y['Species'] = y['Species'].astype('category')
iris_df['Species'] = iris_df['Species'].astype('category')
```


```python
#Check descriptive statistics for the categorical data
iris_df.describe(include=['category'])
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
      <th>Species</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>149</td>
    </tr>
    <tr>
      <th>unique</th>
      <td>3</td>
    </tr>
    <tr>
      <th>top</th>
      <td>1</td>
    </tr>
    <tr>
      <th>freq</th>
      <td>50</td>
    </tr>
  </tbody>
</table>
</div>




```python
# list of numerical and categorical variables
num_feat, cat_feat = ed.get_num_cat_list(iris_df)#iris_df.select_dtypes(include=np.number).columns.tolist()
print('Number of Train numerical variables: ', num_feat)
print('Number of Train categorical variables: ', cat_feat)
```

    Number of Train numerical variables:  ['petal length (cm)', 'petal width (cm)', 'sepal length (cm)', 'sepal width (cm)']
    Number of Train categorical variables:  ['Species']
    

## Visualising Data

### Univariate Analysis


```python
plt = ed.plot_uni_num_data_analysis(iris_df, 'Species', num_feat, plt)
plt.show()
```


    
![png](/assets/images/iris/output_31_0.png)
    



```python
#Visualising categorical target 
sns.set(style='darkgrid')
ax = sns.countplot(x='Species', data=iris_df, order=iris_df['Species'].value_counts().index)
for p in ax.patches:
  ax.annotate('{}={:.2f}%'.format(p.get_height(), p.get_height()/iris_df.shape[0]*100), (p.get_x()+0.15, p.get_height()+1))
```


    
![png](/assets/images/iris/output_32_0.png)
    


**Insight :** 
*   Since the number of inputs are equally distributed among the 3 speicies, it can be concluded that the dataset is balanced.

### Bivariate Analysis


```python
g = sns.PairGrid(iris_df, hue="Species", corner=True, palette="coolwarm_r")
g.map_diag(sns.histplot)
g.map_offdiag(sns.scatterplot)
g.add_legend()
```




    <seaborn.axisgrid.PairGrid at 0x7fd91630b7d0>




    
![png](/assets/images/iris/output_35_1.png)
    



```python
plt = ed.plot_bi_box_plot(iris_df, 'Species', X.columns, plt)

plt.show()
```


    
![png](/assets/images/iris/output_36_0.png)
    


**Compute Pearson correlation coefficient for numeric features**


```python
#graph to show the correlation
corr_feat_series = pd.Series.sort_values(abs(iris_df.corrwith(y.Species)), ascending=False)
sns.barplot(x=abs(corr_feat_series), y=corr_feat_series.index, orient='h')
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7fd9163c0350>




    
![png](/assets/images/iris/output_38_1.png)
    



```python
## Lets Find the realtionship between target and features
corr = iris_df.corr()
sns.heatmap(corr, annot=True, cmap ='coolwarm', linewidths=2, mask=np.triu(corr))
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7fd916435790>




    
![png](/assets/images/iris/output_39_1.png)
    


**Insight:** The petal measurements have highly positive correlation, while the sepal ones are less correlated with the target Species.

## Data preprocessing

**Outliers Detection**


```python
# split into input (X) and output (y) variables
X = iris_df.copy()
X.drop(target_var, axis=1, inplace=True)
y = iris_df[target_var]
```


```python
# detect outliers from all columns, this return the dictionary of indices and column number
Outliers_dict = ed.detect_outliers(X, X.columns, 0, 1.5)

#row indices list to drop
Outliers_indices = Outliers_dict.keys()

#column list that has outliers
Outliers_col_list = Outliers_dict.items()

# Show the outliers rows
print(X.loc[Outliers_indices])

#Impute outliers with mean
X = ed.outlier_imputation_avg(X, Outliers_dict, 'mean')
iris_df = ed.outlier_imputation_avg(iris_df, Outliers_dict, 'mean')

# Show the imputed rows
print(X.loc[Outliers_indices])
```

    Num of outlier detected: Counter({15: 1, 32: 1, 33: 1, 60: 1})
        petal length (cm)  petal width (cm)  sepal length (cm)  sepal width (cm)
    15                1.5               0.4                5.7               4.4
    32                1.5               0.1                5.2               4.1
    33                1.4               0.2                5.5               4.2
    60                3.5               1.0                5.0               2.0
        petal length (cm)  petal width (cm)  sepal length (cm)  sepal width (cm)
    15                1.5          1.194631                5.7               4.4
    32                1.5          1.199964                5.2               4.1
    33                1.4          1.207346                5.5               4.2
    60                3.5          1.214107                5.0               2.0
    


```python
num_feat
```




    ['petal length (cm)',
     'petal width (cm)',
     'sepal length (cm)',
     'sepal width (cm)']



**Outlier Treatment** 

Since data has outliers, use log transformation which doesn't effect affect the smaller values much but reduces the larger values, thereby nullifying the effect of higher values and making the distribution normal.


```python
#Log Transformation
for feature in num_feat:
  X[feature] = np.log1p(X[feature]) #for very small value, use this
```

### **Feature Selection - Using MI Score**


```python
from sklearn.feature_selection import SelectKBest
from sklearn.feature_selection import f_classif
from sklearn.feature_selection import mutual_info_classif

# configure to select all features or top 10 features
fs = SelectKBest(score_func=f_classif, k='all')

def make_mi_scores(X, y, discrete_features):
    mi_scores = mutual_info_classif(X, y)
    mi_scores = pd.Series(mi_scores, name="MI Scores", index=X.columns)
    mi_scores = mi_scores.sort_values(ascending=False)
    return mi_scores

mi_scores = make_mi_scores(X, y, num_feat)
mi_scores
```




    petal length (cm)    0.992245
    petal width (cm)     0.908814
    sepal length (cm)    0.503787
    sepal width (cm)     0.241230
    Name: MI Scores, dtype: float64




```python
plt.figure(figsize=(6, 2))
sns.barplot(x=mi_scores, y=mi_scores.index, orient='h')
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7fd90c4d6390>




    
![png](/assets/images/iris/output_50_1.png)
    



```python
#select tge features with high MI score
threshold = 0.5
X = X[mi_scores.index[mi_scores>=threshold]]
```

## **Machine Learning**


```python
from sklearn.naive_bayes import GaussianNB
from sklearn import metrics
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import  RobustScaler
from sklearn.model_selection import KFold
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import train_test_split
```

**Splitting the data into Training and Testing sample**


```python
#Normalization
X =  RobustScaler().fit_transform(X)  #as it is well suited for outliers

# split dataset into train and test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=1/3, random_state= 5)
```


```python
models = [Model('Random Forest', RandomForestClassifier()), 
          Model('Support Vector Machine', SVC()), 
          Model('K Nearest Neighbors', KNeighborsClassifier()),
          Model('GaussianNB', GaussianNB())]
models
```




    [<(Random Forest, Not train yet)>,
     <(Support Vector Machine, Not train yet)>,
     <(K Nearest Neighbors, Not train yet)>,
     <(GaussianNB, Not train yet)>]




```python
for i in range(len(models)):
    models[i].fit(X_train, y_train)
    models[i].accuracy_score(X_test, y_test)
```


```python
models
```




    [<(Random Forest, 0.96%)>,
     <(Support Vector Machine, 0.96%)>,
     <(K Nearest Neighbors, 1.00%)>,
     <(GaussianNB, 0.96%)>]



**Model Building Outcomes**
*   RandomForest, Support Vector Machine, and GaussianNB produces of 96% accuracy.
*   Whereas K Nearest Neighbors gives 100% accuracy.
