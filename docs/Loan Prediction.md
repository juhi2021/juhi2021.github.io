# **Loan Prediction Case Study**

## **Define problem statement**

**Problem Statement :** To create a model which can predict decide whether the applicant is suitable for the loan or in other words to approve or reject the loan application.

**Output Target :** Loan_Status ('Y' means loan is approved and 'N' means loan is rejected)

**Input predictors :** Gender, Married, Dependents, Education, Self_Employed, ApplicantIncome, CoApplicantIncome,LoanAmount, Loan_Amount_Term, Credit_History, Property_Area.

**Solution :** To create a supervised ML classification model, as the target variable is categorical.

## **Load Data**

**Import libraries**

    Hello you are in explore_data file
    

**Read CSV dataset into dataframe**

**Check for duplicate rows and drop the duplicates**

    Number of duplicate rows 0
    Number of records after duplicate removal 614
    

**Define target**

    The target variable is '[1mLoan_Status'[1m
    

## **Exploratory Data Analysis (EDA)**

### **Basic Data Exploration**



---

**Observe data**

---


**Number of rows and columns**

    The dataset has 614 rows × 13 features including the target.
    

**Data Types for the features**

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

**Display sample data**
*   Display the first 5 rows of the dataset along with the target
*   Display the last 5 rows of the dataset along with the target 




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

    The target value is an ordinal variable with possible values of ['N', 'Y']
    Count for category 'Y' is 422
    Count for category 'N' is 192
    Ratio of target variable categories (Y:N) is 2:1
    


    
![png](/assets/images/loan/Loan%20Prediction_28_1.png)
    


**Insight :** The above data shows that there are few data points of the class '0' as compared to class '1'. Hence the dataset is slightly imbalanced. Since the ratio of the imbalance is 1:2, hence we can ignore this imbalance and the problem can often be treated like a normal classification predictive modeling problem.

---
**Analyze input predictors**
---

**List of numerical and categorical features**

    numerical variables:  ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History']
    discrete variables: ['Loan_Amount_Term', 'Credit_History']
    continuous variables: ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount']
    categorical variables:  ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'Property_Area', 'Loan_Status']
    

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
    

    Features with more than 15% of null values ['Total', 'Percent']
    




    <matplotlib.axes._subplots.AxesSubplot at 0x7f622a761fd0>




    
![png](/assets/images/loan/Loan%20Prediction_35_1.png)
    


## Uni-variate Analysis


    
![png](/assets/images/loan/Loan%20Prediction_37_0.png)
    


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







    
![png](/assets/images/loan/Loan%20Prediction_39_0.png)
    


**Insight:** 
*   Around 80% of loan applicants are male.
*   Nearly 65% are married.
*   About 78% of loan applicants are graduates.
*   Nearly 81% loan applicants are self-employed.
*   The loan has been approved for more than 65% of applicants.
*   Almost 56% of the applicants have no dependents.
*   Highest number of applicants are from Semi Urban areas, followed by urban areas and the rural areas have the least number of applicants.


## Bivariate Analysis


    
![png](/assets/images/loan/Loan%20Prediction_42_0.png)
    


**Insight:**

*   Applicant income, coapplicant's income and Loan_Amount does not affect the chances of loan approval (the median value is same for both Loan_Status and the boxes are in the same line).
*   People with credit history as 1 are more likely to get  loans approved.





    
![png](/assets/images/loan/Loan%20Prediction_44_0.png)
    


**Insight:**
*   There is not a substantial difference between male and female approval rates. But overall males have more loan approval may be because they applyy more.
*   Married applicants have a slightly higher chances of loan approval.
*   Applicants with no dependents have higher chances of approval.
*   Graduates have higher chance of loan approval compared to non-graduates.
*   There is not a substantial difference between Self_Employed and not Self_Employed approval rates.
*   More loans are approved in semiurban area.







**Converting Categorical to Numeric variables**




    <matplotlib.axes._subplots.AxesSubplot at 0x7f621d53fb50>




    
![png](/assets/images/loan/Loan%20Prediction_48_1.png)
    


**Insight:**
*   The features 'Loan_Amount', 'ApplicantIncome' and 'Loan_Status', 'Credit_History' has strong positive correlation (depicted by darker shades).
*   There is almost no correlation between 'Loan_Status' and 'ApplicantIncome' (depicted by lighter shades).
*   For feature 'Credit_History' correlation is almost zero against other features.




    ApplicantIncome     -0.004710
    CoapplicantIncome   -0.059187
    LoanAmount          -0.037318
    Loan_Amount_Term    -0.021268
    Credit_History       0.561678
    Loan_Status          1.000000
    Name: Loan_Status, dtype: float64



**Insight:** Credit_History is strongly correlated with the target variable 'Loan_Status'.




    <matplotlib.axes._subplots.AxesSubplot at 0x7f621d5a7e90>




    
![png](/assets/images/loan/Loan%20Prediction_52_1.png)
    


**Insight:** Credit_History is strongly correlated with the target variable 'Loan_Status' as shown in graph above.




    <matplotlib.axes._subplots.AxesSubplot at 0x7f6227f36550>




    
![png](/assets/images/loan/Loan%20Prediction_54_1.png)
    


**Insight:** Self_Employed and higher Income Applicants have higher chances for loan approval.

## Data Processing

**Handle Missing values**
*   Impute with MEDIAN for continuous variables.
*   Impute with MODE for categorical variables.





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

    Feature for label encoding are ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'Property_Area', 'Loan_Status']
    




    array(['0', '1', '2', '3+'], dtype=object)



    Unique terms before for dependents are ['0' '1' '2' '3+']
    Unique terms after for dependents are [0 1]
    




    array([360., 120., 240.,   0., 180.,  60., 300., 480.,  36.,  84.,  12.])



    Unique terms after for Loan_Amount_Term are [1 0]
    

    Unique terms after for Loan_Amount_Term are [1 0]
    

**Handle non-ordered categorical data**
*   Use One Hot encoding for non-ordered categorical data.




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

    numerical variables:  ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount']
    

    ---------------  --
    ApplicantIncome  50
    LoanAmount       41
    ---------------  --
    Total                 91
    

**Outlier Treatment** 

Since data is left skewed, use log transformation which doesn't effect affect the smaller values much but reduces the larger values, thereby nullifying the effect of higher values and making the distribution normal.





    <matplotlib.axes._subplots.AxesSubplot at 0x7f621d5dfc90>




    
![png](/assets/images/loan/Loan%20Prediction_81_1.png)
    





    <matplotlib.axes._subplots.AxesSubplot at 0x7f621d8093d0>




    
![png](/assets/images/loan/Loan%20Prediction_82_1.png)
    


**Insight:** 
Features LoanAmount and ApplicantIncome are now nearly normal.

### **Feature Selection - Statistical analysis of features**

**For numeric features using ANOVA**

*   Null Hypothesis (H0) : There is no relation between the given feature and the target
*   Alternate Hypothesis (H1) : There is relation between the given feature and the target

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

**Logistic Regression using Pipeline**

**Check the metrics**

    Тrain accuracy: 81.26272912423626
    Тest accuracy: 79.67479674796748
    for 10-fold Cross Validation cross_val_score:  81.25714285714285
    
                   precision    recall  f1-score   support
    
               0       0.86      0.45      0.59        40
               1       0.78      0.96      0.86        83
    
        accuracy                           0.80       123
       macro avg       0.82      0.71      0.73       123
    weighted avg       0.81      0.80      0.78       123
    
    


    
![png](/assets/images/loan/Loan%20Prediction_96_1.png)
    


**Model Building Outcomes**
*   LogisticRegression produces around 80% accuracy.
*   Diagonal in confusion matrix have high values of 18 and 80 (which is good).
