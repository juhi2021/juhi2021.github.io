# **Tata Stock Price Prediction Case Study**

**Problem Statement :** To analyze the charts and using statistical figures to identify the trends in the stock market.


## **Load Data**
Import libraries


```python
#import pandas for loading the CSV file
import pandas as pd

#import numpy for maths
import numpy as np

# import seaborn for visualization
import seaborn as sns
sns.set_style('darkgrid')
sns.set(rc={'figure.figsize':(16, 8)})

#To visualise in the notebook
#%matplotlib inline

#filter the warning messages
import warnings
warnings.filterwarnings('ignore')
```

Read CSV dataset into dataframe


```python
df = pd.read_csv('/content/drive/MyDrive/Data/Tata Stock/NSE-TATAGLOBAL11.csv')
```

## **Exploratory Data Analysis (EDA)**
### **Basic Data Exploration**
Number of rows and columns


```python
print("Number of rows are {} and number of columns are {}".format(len(df.index), len(df.columns)))
```

    Number of rows are 1235 and number of columns are 8
    

Data Types for the features


```python
df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 1235 entries, 0 to 1234
    Data columns (total 8 columns):
     #   Column                Non-Null Count  Dtype  
    ---  ------                --------------  -----  
     0   Date                  1235 non-null   object 
     1   Open                  1235 non-null   float64
     2   High                  1235 non-null   float64
     3   Low                   1235 non-null   float64
     4   Last                  1235 non-null   float64
     5   Close                 1235 non-null   float64
     6   Total Trade Quantity  1235 non-null   float64
     7   Turnover (Lacs)       1235 non-null   float64
    dtypes: float64(7), object(1)
    memory usage: 77.3+ KB
    

Insight : Out of 8 features 7 are float and 1 is of object data type (date). Clearly, from the above table none of the feature have missing values or NAN as the non-null values equals the total number of records.
*   Date represents day of trading.
*   Open - the opening price of stock on that day.
*   Close - the closing price of stock on that day.
*   High - the maximum price of stock on that day.
*   Low - the minimum price of stock on that day.
*   Last - the last price of stock on that day.
*   Total Trade Quantity - the number of stock traded on that day.
*   Turnover (Lacs) - the turnover of the company on that day.

Display sample data
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
      <th>Date</th>
      <th>Open</th>
      <th>High</th>
      <th>Low</th>
      <th>Last</th>
      <th>Close</th>
      <th>Total Trade Quantity</th>
      <th>Turnover (Lacs)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2018-10-08</td>
      <td>208.00</td>
      <td>222.25</td>
      <td>206.85</td>
      <td>216.00</td>
      <td>215.15</td>
      <td>4642146.0</td>
      <td>10062.83</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2018-10-05</td>
      <td>217.00</td>
      <td>218.60</td>
      <td>205.90</td>
      <td>210.25</td>
      <td>209.20</td>
      <td>3519515.0</td>
      <td>7407.06</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2018-10-04</td>
      <td>223.50</td>
      <td>227.80</td>
      <td>216.15</td>
      <td>217.25</td>
      <td>218.20</td>
      <td>1728786.0</td>
      <td>3815.79</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2018-10-03</td>
      <td>230.00</td>
      <td>237.50</td>
      <td>225.75</td>
      <td>226.45</td>
      <td>227.60</td>
      <td>1708590.0</td>
      <td>3960.27</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2018-10-01</td>
      <td>234.55</td>
      <td>234.60</td>
      <td>221.05</td>
      <td>230.30</td>
      <td>230.90</td>
      <td>1534749.0</td>
      <td>3486.05</td>
    </tr>
  </tbody>
</table>
</div>



Insight:
*   Date has missing values as trading doesn't happen on weekends and holidays.




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
      <th>Date</th>
      <th>Open</th>
      <th>High</th>
      <th>Low</th>
      <th>Last</th>
      <th>Close</th>
      <th>Total Trade Quantity</th>
      <th>Turnover (Lacs)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1230</th>
      <td>2013-10-14</td>
      <td>160.85</td>
      <td>161.45</td>
      <td>157.70</td>
      <td>159.3</td>
      <td>159.45</td>
      <td>1281419.0</td>
      <td>2039.09</td>
    </tr>
    <tr>
      <th>1231</th>
      <td>2013-10-11</td>
      <td>161.15</td>
      <td>163.45</td>
      <td>159.00</td>
      <td>159.8</td>
      <td>160.05</td>
      <td>1880046.0</td>
      <td>3030.76</td>
    </tr>
    <tr>
      <th>1232</th>
      <td>2013-10-10</td>
      <td>156.00</td>
      <td>160.80</td>
      <td>155.85</td>
      <td>160.3</td>
      <td>160.15</td>
      <td>3124853.0</td>
      <td>4978.80</td>
    </tr>
    <tr>
      <th>1233</th>
      <td>2013-10-09</td>
      <td>155.70</td>
      <td>158.20</td>
      <td>154.15</td>
      <td>155.3</td>
      <td>155.55</td>
      <td>2049580.0</td>
      <td>3204.49</td>
    </tr>
    <tr>
      <th>1234</th>
      <td>2013-10-08</td>
      <td>157.00</td>
      <td>157.80</td>
      <td>155.20</td>
      <td>155.8</td>
      <td>155.80</td>
      <td>1720413.0</td>
      <td>2688.94</td>
    </tr>
  </tbody>
</table>
</div>



Define target


```python
# As the stock's closing price marks its profit/loss, hence it is target
target_var = 'Close'
```

---
**Analyze Target**
---
Check descriptive statistics for the numeric data


```python
df.describe()
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
      <th>Open</th>
      <th>High</th>
      <th>Low</th>
      <th>Last</th>
      <th>Close</th>
      <th>Total Trade Quantity</th>
      <th>Turnover (Lacs)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>1235.000000</td>
      <td>1235.000000</td>
      <td>1235.000000</td>
      <td>1235.000000</td>
      <td>1235.000000</td>
      <td>1.235000e+03</td>
      <td>1235.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>168.954858</td>
      <td>171.429069</td>
      <td>166.402308</td>
      <td>168.736356</td>
      <td>168.731053</td>
      <td>2.604151e+06</td>
      <td>4843.166502</td>
    </tr>
    <tr>
      <th>std</th>
      <td>51.499145</td>
      <td>52.436761</td>
      <td>50.542919</td>
      <td>51.587384</td>
      <td>51.544928</td>
      <td>2.277028e+06</td>
      <td>5348.919832</td>
    </tr>
    <tr>
      <th>min</th>
      <td>103.000000</td>
      <td>104.600000</td>
      <td>100.000000</td>
      <td>102.600000</td>
      <td>102.650000</td>
      <td>1.001800e+05</td>
      <td>128.040000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>137.550000</td>
      <td>138.925000</td>
      <td>135.250000</td>
      <td>137.175000</td>
      <td>137.225000</td>
      <td>1.284482e+06</td>
      <td>1801.035000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>151.500000</td>
      <td>153.250000</td>
      <td>149.500000</td>
      <td>151.200000</td>
      <td>151.100000</td>
      <td>1.964885e+06</td>
      <td>3068.510000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>169.000000</td>
      <td>172.325000</td>
      <td>166.700000</td>
      <td>169.100000</td>
      <td>169.500000</td>
      <td>3.095788e+06</td>
      <td>5852.600000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>327.700000</td>
      <td>328.750000</td>
      <td>321.650000</td>
      <td>325.950000</td>
      <td>325.750000</td>
      <td>2.919102e+07</td>
      <td>55755.080000</td>
    </tr>
  </tbody>
</table>
</div>



Analyze the Date feature


```python
print(f"The data is in range from {df['Date'].min()} till {df['Date'].max()}")
```

    The data is in range from 2013-10-08 till 2018-10-08
    

Setting index as date


```python
#converting Date as DateTime type
df['Date'] = pd.to_datetime(df.Date, format='%Y-%m-%d')

#setting date as index
df.index = df['Date']
df.sort_index(ascending=True, axis=0, inplace=True)
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
      <th>Date</th>
      <th>Open</th>
      <th>High</th>
      <th>Low</th>
      <th>Last</th>
      <th>Close</th>
      <th>Total Trade Quantity</th>
      <th>Turnover (Lacs)</th>
    </tr>
    <tr>
      <th>Date</th>
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
      <th>2013-10-08</th>
      <td>2013-10-08</td>
      <td>157.00</td>
      <td>157.80</td>
      <td>155.20</td>
      <td>155.8</td>
      <td>155.80</td>
      <td>1720413.0</td>
      <td>2688.94</td>
    </tr>
    <tr>
      <th>2013-10-09</th>
      <td>2013-10-09</td>
      <td>155.70</td>
      <td>158.20</td>
      <td>154.15</td>
      <td>155.3</td>
      <td>155.55</td>
      <td>2049580.0</td>
      <td>3204.49</td>
    </tr>
    <tr>
      <th>2013-10-10</th>
      <td>2013-10-10</td>
      <td>156.00</td>
      <td>160.80</td>
      <td>155.85</td>
      <td>160.3</td>
      <td>160.15</td>
      <td>3124853.0</td>
      <td>4978.80</td>
    </tr>
    <tr>
      <th>2013-10-11</th>
      <td>2013-10-11</td>
      <td>161.15</td>
      <td>163.45</td>
      <td>159.00</td>
      <td>159.8</td>
      <td>160.05</td>
      <td>1880046.0</td>
      <td>3030.76</td>
    </tr>
    <tr>
      <th>2013-10-14</th>
      <td>2013-10-14</td>
      <td>160.85</td>
      <td>161.45</td>
      <td>157.70</td>
      <td>159.3</td>
      <td>159.45</td>
      <td>1281419.0</td>
      <td>2039.09</td>
    </tr>
  </tbody>
</table>
</div>



Feature Extraction


```python
#creating a separate dataset for feature extraction
feat_df = df.copy()
#feat_df.index = range(0,len(feat_df))
feat_df = feat_df[['Date', 'Close']]
feat_df.head()
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
      <th>Close</th>
    </tr>
    <tr>
      <th>Date</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-10-08</th>
      <td>2013-10-08</td>
      <td>155.80</td>
    </tr>
    <tr>
      <th>2013-10-09</th>
      <td>2013-10-09</td>
      <td>155.55</td>
    </tr>
    <tr>
      <th>2013-10-10</th>
      <td>2013-10-10</td>
      <td>160.15</td>
    </tr>
    <tr>
      <th>2013-10-11</th>
      <td>2013-10-11</td>
      <td>160.05</td>
    </tr>
    <tr>
      <th>2013-10-14</th>
      <td>2013-10-14</td>
      <td>159.45</td>
    </tr>
  </tbody>
</table>
</div>




```python
#extracting year, month and day from date
feat_df['year'] = feat_df['Date'].dt.year
feat_df['quarter'] = feat_df['Date'].dt.quarter
feat_df['month'] = feat_df['Date'].dt.month
feat_df['day'] = feat_df['Date'].dt.day
feat_df['dayofweek'] = feat_df['Date'].dt.dayofweek   #day of the week with Monday=0, Sunday=6
feat_df['dayofyear'] = feat_df['Date'].dt.dayofyear
feat_df['is_month_start'] = (feat_df['Date'].dt.is_month_start).map({True:1, False:0})
feat_df['is_month_end'] = (feat_df['Date'].dt.is_month_end).map({True:1, False:0})
feat_df['is_quarter_start'] = (feat_df['Date'].dt.is_quarter_start).map({True:1, False:0})
feat_df['is_quarter_end'] = (feat_df['Date'].dt.is_quarter_end).map({True:1, False:0})
feat_df['is_year_start'] = (feat_df['Date'].dt.is_year_start).map({True:1, False:0})
feat_df['is_year_end'] = (feat_df['Date'].dt.is_year_end).map({True:1, False:0})
#as sat=5 and sun=6, use this to calculate if it is weekend
feat_df['is_weekend'] = np.where(feat_df['dayofweek'].isin([5, 6]), 1, 0) #no values of 1 as the date for weekend is not included in dataset

feat_df.head()
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
      <th>Close</th>
      <th>year</th>
      <th>quarter</th>
      <th>month</th>
      <th>day</th>
      <th>dayofweek</th>
      <th>dayofyear</th>
      <th>is_month_start</th>
      <th>is_month_end</th>
      <th>is_quarter_start</th>
      <th>is_quarter_end</th>
      <th>is_year_start</th>
      <th>is_year_end</th>
      <th>is_weekend</th>
    </tr>
    <tr>
      <th>Date</th>
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
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013-10-08</th>
      <td>2013-10-08</td>
      <td>155.80</td>
      <td>2013</td>
      <td>4</td>
      <td>10</td>
      <td>8</td>
      <td>1</td>
      <td>281</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2013-10-09</th>
      <td>2013-10-09</td>
      <td>155.55</td>
      <td>2013</td>
      <td>4</td>
      <td>10</td>
      <td>9</td>
      <td>2</td>
      <td>282</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2013-10-10</th>
      <td>2013-10-10</td>
      <td>160.15</td>
      <td>2013</td>
      <td>4</td>
      <td>10</td>
      <td>10</td>
      <td>3</td>
      <td>283</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2013-10-11</th>
      <td>2013-10-11</td>
      <td>160.05</td>
      <td>2013</td>
      <td>4</td>
      <td>10</td>
      <td>11</td>
      <td>4</td>
      <td>284</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2013-10-14</th>
      <td>2013-10-14</td>
      <td>159.45</td>
      <td>2013</td>
      <td>4</td>
      <td>10</td>
      <td>14</td>
      <td>0</td>
      <td>287</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>



Plot the distribution of the target variable


```python
#plot the mean for closing price for year and month wise 
feat_df[['year', 'month', 'Close']].groupby(by=['year', 'month']).mean().plot.bar()
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7fb099dcd410>




    
![png](/assets/images/tata-stock/output_26_1.png)
    



```python
#plot distribution for single month - Jan 2014
df['Close']['2014-01'].plot()
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7fb099318b90>




    
![png](/assets/images/tata-stock/output_27_1.png)
    



```python
#plot distribution for single year - 2014
sns.lineplot(data=df['Close']['2014'])
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7fb098364510>




    
![png](/assets/images/tata-stock/output_28_1.png)
    



```python
#plot distribution for all years
sns.lineplot(data=df['Close'])
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7fb0982ee850>




    
![png](/assets/images/tata-stock/output_29_1.png)
    


Insight: There is an increasing trend after mid 2015 and then a decline after 2018 in the stock prices.

## **Machine Learning**


Splitting the data into Training and Testing sample


```python
#Since it is a time-series data random split can't be done. 
#Hence, split the latest data as a test set (2018 DATA) and the initial data as a train set (2013-2017 data).
#Create dataframe with date and the target variable only
#train test split
train_df = df.loc[(df['Date'] < '2017-10-08'), ['Close']]
test_df = df.loc[(df['Date'] > '2017-10-08') | (df['Date'] == '2017-10-08'), ['Close']]

print(f"Shape of training set: {train_df.shape}")
print(f"Shape of testing set: {test_df.shape}")

#plot distribution for all years in training and test data
sns.lineplot(data=train_df['Close'], label='Train data'), sns.lineplot(data=test_df['Close'], label='Test data')
```

    Shape of training set: (987, 1)
    Shape of testing set: (248, 1)
    




    (<matplotlib.axes._subplots.AxesSubplot at 0x7fb0982fd950>,
     <matplotlib.axes._subplots.AxesSubplot at 0x7fb0982fd950>)




    
![png](/assets/images/tata-stock/output_33_2.png)
    


Insight: The split is fine, with initial data in train and latter data in test. The blue part represents the train and the orange part represents the test.

**Simple Moving Averages (SMA) Model**


```python
from sklearn.metrics import mean_squared_error
from math import sqrt

#take the average (rolling mean) of the stock closing price for the last 10 days
y_pred = test_df.copy()
y_pred['moving average prediction'] = train_df['Close'].rolling(10).mean().iloc[-1]

#plot distribution for all years for training, test and predicted data
sns.lineplot(data=train_df['Close'], label='Train data'), sns.lineplot(data=test_df['Close'], label='Test data'), sns.lineplot(data=y_pred['moving average prediction'], label='Moving average data')

#calculating the root mean square error (rmse)
rmse = sqrt(mean_squared_error(test_df.Close, y_pred['moving average prediction']))
print(f"The root mean squared error for simple moving average for last 10 days is {rmse}")
```

    The root mean squared error for simple moving average for last 10 days is 65.18485486081731
    


    
![png](/assets/images/tata-stock/output_36_1.png)
    



```python
#take the average (rolling mean) of the stock closing price for the last 50 days
y_pred = test_df.copy()
y_pred['moving average prediction'] = train_df['Close'].rolling(len(test_df)).mean().iloc[-1]

#plot distribution for all years for training, test and predicted data
sns.lineplot(data=train_df['Close'], label='Train data'), sns.lineplot(data=test_df['Close'], label='Test data'), sns.lineplot(data=y_pred['moving average prediction'], label='Moving average data')

#calculating the root mean square error (rmse)
rmse = sqrt(mean_squared_error(test_df.Close, y_pred['moving average prediction']))
print(f"The root mean squared error for simple moving average for last 50 days is {rmse}")
```

    The root mean squared error for simple moving average for last 50 days is 113.98305699588853
    


    
![png](/assets/images/tata-stock/output_37_1.png)
    



```python
preds = []
y_pred = test_df.copy()
y_pred['moving average prediction'] = 0.00
y_pred['rolling average prediction'] = 0.00

window_size = len(test_df)

rolling_avgs_df = train_df.rolling(window=test_df.shape[0]).mean()[-window_size:]

cc = 0
moving_averages = []
while cc < len(train_df) - window_size + 1:
    this_window = train_df['Close'][cc : cc + window_size]

    window_average = sum(this_window) / window_size
    moving_averages.append(window_average)
    cc += 1

moving_avgs_list = moving_averages[-window_size:]

for i in range(0, len(moving_avgs_list)):
  y_pred['moving average prediction'][i] = moving_avgs_list[i]
  y_pred['rolling average prediction'][i] = rolling_avgs_df['Close'][i]

#plot distribution for all years for training, test and predicted data
sns.lineplot(data=train_df['Close'], label='Train data'), sns.lineplot(data=test_df['Close'], label='Test data'), 
sns.lineplot(data=y_pred['moving average prediction'], label='Moving average data'), 
sns.lineplot(data=y_pred['rolling average prediction'], label='Rolling average data')

#calculating the root mean square error (rmse)
rmse = sqrt(mean_squared_error(test_df.Close, y_pred['moving average prediction']))
print(f"The root mean squared error for simple moving average using calculation for last {window_size} days is {rmse}")

#calculating the root mean square error (rmse)
rmse = sqrt(mean_squared_error(test_df.Close, y_pred['rolling average prediction']))
print(f"The root mean squared error for rolling moving average using formula for last {window_size} days is {rmse}")
```

    The root mean squared error for simple moving average using calculation for last 248 days is 131.98068526555178
    The root mean squared error for rolling moving average using formula for last 248 days is 131.98068526555173
    


    
![png](/assets/images/tata-stock/output_38_1.png)
    


Insight : As can be seen from the RMSE value for last 10 and 50 days, they are almost similar and the prediction is getting weaker as the number of observations are increased (from 106 to 112). Also, the rolling function of pandas and the manual calculation both give the same values of RMSE as 112 (for 248 days) which are not very good as compared to the actual values(from the plot). The predicted values are of the same range as the observed values in the train set (there is an increasing trend initially and then a slow decrease).

k-Nearest Neighbours (kNN) Model


```python
#Since kNN finds similarity between new data points and old data points.

#importing libraries
from sklearn import neighbors
from sklearn.model_selection import GridSearchCV, KFold
from sklearn.preprocessing import MinMaxScaler

#creating a separate dataset for kNN model
knn_df = feat_df.copy()
```


```python
#train test split
train_df = knn_df.loc[(knn_df['Date'] < '2017-10-08')]
test_df = knn_df.loc[(knn_df['Date'] > '2017-10-08') | (knn_df['Date'] == '2017-10-08')]

#removing the Date column from the train and test dataframe
X_train = train_df.drop(['Date', 'Close'], axis=1)
y_train = train_df['Close']
X_test = test_df.drop(['Date', 'Close'], axis=1)
y_test = test_df['Close']

#scaling data
scaler = MinMaxScaler(feature_range=(0, 1))
train_scaled_df = pd.DataFrame(scaler.fit_transform(X_train))
test_scaled_df = pd.DataFrame(scaler.fit_transform(X_test))

#using gridsearch to find the best parameter
params = {'n_neighbors':[2, 3, 4, 5, 6, 7, 8, 9, 20, 50]}
knn = neighbors.KNeighborsRegressor()
cv = KFold(n_splits=5, random_state=5, shuffle=True)
model = GridSearchCV(knn, params, cv=cv)

#fit the model and make predictions
model.fit(train_scaled_df, y_train)
y_pred = model.predict(X_test)
#print(y_test)
#print(y_pred)
test_df['Predictions'] = 0
test_df['Predictions'] = y_pred
#print(test_df.head())
#print(test_df.tail())

#plot distribution for all years for training, test and predicted data
sns.lineplot(data=train_df['Close'], label='Train data'), sns.lineplot(data=test_df['Close'], label='Test data'), 
sns.lineplot(data=test_df['Predictions'], label='kNN model')

#calculating the root mean square error (rmse)
rmse = sqrt(mean_squared_error(y_test, y_pred))
print(f"The root mean squared error for kNN is {rmse}")
```

    The root mean squared error for kNN is 65.86098770942424
    


    
![png](/assets/images/tata-stock/output_42_1.png)
    


Insight: The RMSE value for kNN model (65) is almost half the value obtained from SMA model (112) and the plot shows the same pattern. The kNN model has performed better than the SMA model.



---



**Long Short Term Memory(LSTM)**

Using LSTMs to learn the patterns in the stock prices.

Steps involved:
1. Normalize data
2. Split the data into samples
3. Split the train-test data
4. Create the LSTM Model
5. Measure the accuracy on the test data
6. Visualize the predictions
7. Draw conclusions


```python
#creating a separate dataset for LSTM model
lstm_df = df[['Close']]

#normalization using scaler (rescale values between 0 and 1)
scaler = MinMaxScaler(feature_range=(0, 1))
 
samples_list = scaler.fit_transform(lstm_df)

print("Normalized data :\n", samples_list)
```

    Normalized data :
     [[0.23823398]
     [0.2371134 ]
     [0.25773196]
     ...
     [0.51792918]
     [0.47758853]
     [0.50425818]]
    


```python
#splitting the univariate sequence (the number of features is one, for one target variable)
#into data samples of select sample size (preferably 10)
#meaning the last 10 values of Close column are used to predict the 11th value
def split_into_samples(samples, no_of_steps, no_of_future_steps, total_features):
  X_samples, y_samples = list(), list()
  for i in range(no_of_steps, len(samples)-no_of_future_steps, total_features):
    x_sample, y_sample = samples[i-no_of_steps:i, 0], samples[i:i+no_of_future_steps, 0]
    X_samples.append(x_sample)
    y_samples.append(y_sample)
  
  X_samples_arr = np.array(X_samples)
  X_samples_arr = X_samples_arr.reshape(X_samples_arr.shape[0], X_samples_arr.shape[1], total_features)
  y_samples_arr = np.array(y_samples)
  y_samples_arr = y_samples_arr.reshape(y_samples_arr.shape[0], no_of_future_steps)

  # return X_samples as 3-D and y_samples as 2-D this reshapes the list into 3D and 2D (number of samples, Time Steps, Features)
  return X_samples_arr, y_samples_arr
```


```python
#create samples for next day's Price Prediction based on last 10 days prices
time_steps = 10 # prediction on past how many days 
future_time_steps = 1 # prediction for how many days
no_of_features = 1 # total features
X, y = split_into_samples(samples_list, no_of_steps=time_steps, no_of_future_steps=future_time_steps, total_features=no_of_features)
print(f"Shape of input dataset is {X.shape}, and output dataset is {y.shape}")
```

    Shape of input dataset is (1224, 10, 1), and output dataset is (1224, 1)
    


```python
#choosing the test dataset size
test_size = 200
train_size = 800
 
#splitting the data into train and test dataset
X_train = X[:-test_size]
(X_train, X_val) = X_train[:train_size], X_train[train_size:] 
X_test = X[-test_size:]
y_train = y[:-test_size]
(y_train, y_val) = y_train[:train_size], y_train[train_size:] 
y_test = y[-test_size:]
 
# Print training set shape
print("X_train shape:", X_train.shape, "y_train shape:", y_train.shape)

# Print the number of training, validation, and test datasets
print(X_train.shape[0], 'input train set')
print(X_val.shape[0], 'input validation set')
print(X_test.shape[0], 'input test set')

print(y_train.shape[0], 'output train set')
print(y_val.shape[0], 'output validation set')
print(y_test.shape[0], 'output test set')
```

    X_train shape: (800, 10, 1) y_train shape: (800, 1)
    800 input train set
    224 input validation set
    200 input test set
    800 output train set
    224 output validation set
    200 output test set
    


```python
# Importing the Keras libraries and packages
from keras.models import Sequential
from keras.layers import Flatten
from keras.layers import Dense
from keras.layers import LSTM
from keras.callbacks import ModelCheckpoint
from keras.layers import Bidirectional
from keras.metrics import RootMeanSquaredError

# define the LSTM model
model = Sequential()

# Adding the First input hidden layer
# LSTM requires a 3D input and by default it produces a 2D output
# so set return_sequences=True, 
# it allows the output of every time step to be shared with hidden next layer in 3D 
# in Bidirectional LSTM, inputs are run in two ways, one from past to future and other one from future to past 
model.add(Bidirectional(LSTM(units=50, activation='relu', return_sequences=True), input_shape=(time_steps, no_of_features)))
 
# Adding the Second input hidden layer
model.add(Bidirectional(LSTM(units=50, activation='relu', return_sequences=True), input_shape=(time_steps, no_of_features)))
 
# Adding the Second Third hidden layer
model.add(Bidirectional(LSTM(units=50, activation='relu', return_sequences=False)))

# flatten or convert data to 1-D
model.add(Flatten())

# Adding the output layer
model.add(Dense(units=future_time_steps))

# build the model
model.build(input_shape=(time_steps, no_of_features))

# print the summary of the model
model.summary()
```

    Model: "sequential"
    _________________________________________________________________
    Layer (type)                 Output Shape              Param #   
    =================================================================
    bidirectional (Bidirectional (None, 10, 100)           20800     
    _________________________________________________________________
    bidirectional_1 (Bidirection (None, 10, 100)           60400     
    _________________________________________________________________
    bidirectional_2 (Bidirection (None, 100)               60400     
    _________________________________________________________________
    flatten (Flatten)            (None, 100)               0         
    _________________________________________________________________
    dense (Dense)                (None, 1)                 101       
    =================================================================
    Total params: 141,701
    Trainable params: 141,701
    Non-trainable params: 0
    _________________________________________________________________
    


```python
# Compiling the model
model.compile(optimizer='adam', loss='mse', metrics=[RootMeanSquaredError()])
```


```python
# Fitting the model on the Training set
model.fit(X_train, y_train, batch_size=100, epochs=1)
```

    8/8 [==============================] - 5s 46ms/step - loss: 0.0263 - root_mean_squared_error: 0.1621
    




    <keras.callbacks.History at 0x7fb04f42d090>




```python
checkpointer = ModelCheckpoint(filepath='model.best.hdf5', verbose=1, save_best_only=True)
history = model.fit(X_train,
         y_train,
         batch_size=100,
         epochs=20,
         validation_data=(X_val, y_val),
         callbacks=[checkpointer])
```


```python
# print the loss values and metric values during training
#history.history
```


```python
# Load the weights with the best validation accuracy 
model.load_weights('model.best.hdf5')
```


```python
score = model.evaluate(X_test, y_test, verbose=1)
print('Model loss = ', score[0])
print('Model rmse = ', score[1])
```

    7/7 [==============================] - 0s 8ms/step - loss: 0.0093 - root_mean_squared_error: 0.0965
    Model loss =  0.009304795414209366
    Model rmse =  0.09646137058734894
    


```python
#for plotting
train_df = lstm_df[:-test_size]
test_df = lstm_df[-test_size:]

# measure the accuracy and loss on testing dataset
y_pred = model.predict(X_test)
y_pred_scaled = scaler.inverse_transform(y_pred)

# Getting the original price values for testing data
y_orig = scaler.inverse_transform(y_test)

test_df['Predictions'] = 0
test_df['Predictions'] = y_pred_scaled
sns.set(rc={'figure.figsize':(16, 8)})
#plot distribution for all years for training, test and predicted data
sns.lineplot(data=train_df['Close'], label='Train data'), sns.lineplot(data=test_df['Close'], label='Test data'), 
sns.lineplot(data=test_df['Predictions'], label='LSTM model')

#calculating the root mean square error (rmse)
rmse = sqrt(mean_squared_error(y_test, y_pred))
print(f"The root mean squared error for LSTM is {rmse}")
```

    The root mean squared error for LSTM is 0.09646137001364984
    


    
![png](/assets/images/tata-stock/output_57_1.png)
    


Viewing just the test dataset


```python
#plot distribution for all years for training, test and predicted data
sns.lineplot(data=test_df['Close'], label='Test data'), 
sns.lineplot(data=test_df['Predictions'], label='LSTM model')
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7fb04f10b5d0>




    
![png](/assets/images/tata-stock/output_59_1.png)
    


Conclusion: The RMSE value for LSTM model is the least and the plot shows the same pattern. The LSTM model has performed better than the other models. This prediction is only for short-term (stock price for next 2-5 days). 

*Note: This work is inspired from data science resources available on internet. Any traces of replications, which may appear, is purely co-incidental. Due respect & credit to all my fellow data scientist. Thanks !!*


