# Problem Statement
You are working as a data scientist with HR Department of a large insurance company focused on sales team attrition. Insurance sales teams help insurance companies generate new business by contacting potential customers and selling one or more types of insurance. The department generally sees high attrition and thus staffing becomes a crucial aspect.

To aid staffing, you are provided with the monthly information for a segment of employees for 2016 and 2017 and tasked to predict whether a current employee will be leaving the organization in the upcoming two quarters (01 Jan 2018 - 01 July 2018) or not, given:
  1. Demographics of the employee (city, age, gender etc.)
  2. Tenure information (joining date, Last Date)
  3. Historical data regarding the performance of the employee (Quarterly rating, Monthly business acquired, designation, salary)

# Approach

The problem statement is a time-series based classification problem that is multi-label and multi-step. The task is to predict employee attrition within the next 2 quarters.
It was challening to formulate the problem into a ML model and transforming the data was also challenging.
As per my perception, this is a time-series based problem with multi-features to predict the multiple employee attriton for next 60 days.

# Feature Engineering

Did some analysis of data, then introduced the 'Target' variable which defines the attrition (0 or 1).
Pre-processed data to include 'days_worked', label encoding, change in ratings.

# Model Building
It was challenge to formulate data for the Long Short Term Memory(LSTM). Used LSTM to learn the patterns in the employee attrition.
Steps involved:
  Splitting the dataset employee wise
  Padding the sequences to make all the sub datasets of same size (balancing of data, because of time constraint used 0 as padding value)
  Normalizing the data
  Splitting the data into samples (prepare data for LSTM returning X_samples as 3-D and y_samples as 2-D)
  Splitting the train-test data
  Create the LSTM Model and train it with train set
  Measure the accuracy on the test data
  The model worked fine with around 95% accuracy.
  Next step was to prepare the sample set for future (2 quarters dates) and predicting the outcome for all individual days.
  Since small dataset used 2 days data to predict for the next days values.
  Train the model with this sample data for next 60 days prediction.
  Use the LSTM to predict for the next 60 days.
  Draw conclusions by aggregating the result of prediction to see if the employee leaves the job
  
# Model Evaluation
The evaluation metric used was F1 score (classification report was printed).

