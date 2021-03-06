# **Feature Selection in Supervised Learning**

---


## Introduction
When you are a novice in machine learning, one thing that haunts you is to make the best selection of features (input variables) that will be most relevant in predicting the target (output variable).
## Why?
Large and unnecessary inputs can slow down your model and affect its performance. To overcome this perform feature selection before model creation.
## How?
Techniques used are:-
1.   Filter methods which use statistical scores of features with the target variable e.g. univariate feature selection like SelectKBest, SelectPercentile, etc.
2.   Wrapper methods which considers selection as a search problem e.g. recursive feature elimination like RFE and RFECV.
3.   Embedded methods by algorithms which perform automatic built-in feature selection during training e.g. L1-based or Tree-based feature selection using SelectFromModel.

## Implementation

---


### 1. Filter method


*   Take the set of all features.
*   Select the best subset of features using the statistical ranking of features (data preprocessing step).
*   Apply learning algorithm (feature selection is independent of the model chosen).
*   Measure the performance of the model.







```python
# Feature selection using filter method - statistical method Pearson’s Correlation Coefficient
from sklearn.datasets import make_regression
from sklearn.feature_selection import SelectKBest
from sklearn.feature_selection import f_regression
# make regression dataset
X, y = make_regression(n_samples=100, n_features=50, n_informative=10)
# Since it is numerical output and numerical input 
# Use Pearson’s Correlation Coefficient: f_regression() for feature selection
filter_method = SelectKBest(score_func=f_regression, k=10)
# applying feature selection
feat_selected = filter_method.fit_transform(X, y)
print(feat_selected.shape)
```

    (100, 10)
    

### 2. Wrapper method
*   Take the set of all features.
*   Select a subset of features and train a model.
*   Measure the performance of the model and repeat the previous step with another subset to get the best subset (like a search problem adding and deleting features from subset).
*   Measure the performance of the model.




```python
# Feature selection using wrapper method - RFE
from sklearn.datasets import load_breast_cancer
from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression
# load data
X, y = load_breast_cancer(return_X_y=True)
# feature selection
model = LogisticRegression(max_iter=5000)
wrapper_method = RFE(model, 10)
feat_selected = wrapper_method.fit_transform(X, y)
print("Total number of features before selection: %d"% X.shape[1])
print(f"Features selected or not: {wrapper_method.support_}" )
print("Feature ranking: {}".format(wrapper_method.ranking_))
print("Total number of features after selection: {}".format(wrapper_method.n_features_))
```

    Total number of features before selection: 30
    Features selected or not: [ True False False False False  True  True False False False False  True
     False False False False False False False False  True False False False
      True  True  True  True  True False]
    Feature ranking: [ 1  7 13 19  6  1  1  3  4 14 12  1  2  9 18 11 17 16 15 21  1  5  8 20
      1  1  1  1  1 10]
    Total number of features after selection: 10
    

### 3. Embedded method
*   Take the set of all features.
*   Select a subset of features and train a model and measure the performance of the model and penalizaling the model to reduce overfitting.
*   Repeat the previous step with another subset to get the best model.



```python
# Feature selection using embedded method - Tree-based using SelectFromModel
from sklearn.datasets import load_breast_cancer
from sklearn.feature_selection import SelectFromModel
from sklearn.ensemble import ExtraTreesClassifier
# load data
X, y = load_breast_cancer(return_X_y=True)
print("Total number of features before selection: %d"% X.shape[1])
# feature selection using ExtraTreesClassifier which has inbuilt feature selection
classifier = ExtraTreesClassifier(n_estimators=50)
classifier = classifier.fit(X, y)
# print the feature importance in relation to the target variable
print("Feature ranking: {}".format(classifier.feature_importances_))
# using SelectFromModel that uses in-built feature selection
model = SelectFromModel(classifier, prefit=True)
feat_selected = model.transform(X)
print("Total number of features after selection: {}".format(feat_selected.shape[1]))
```

    Total number of features before selection: 30
    Feature ranking: [0.04184641 0.01852788 0.10371432 0.07501318 0.00877562 0.02621614
     0.07334163 0.07082568 0.01345323 0.00521477 0.01644873 0.00662626
     0.01007487 0.04463063 0.00594477 0.00634359 0.00571727 0.0060053
     0.0044074  0.00519655 0.05928878 0.03061289 0.12091032 0.0485711
     0.02949367 0.01980656 0.04063984 0.0775226  0.01624272 0.00858725]
    Total number of features after selection: 11
    

## Conclusion
None of the above feature selection method works best in all scenario as there is no best method. Try using different subsets of features to get the optimal model for your data and your business problem.
