```python
import tensorflow as tf
import keras as keras
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
%matplotlib inline
from sklearn.model_selection import train_test_split
from keras.callbacks import ModelCheckpoint
```


```python
(X, y), (X_test, y_test) = tf.keras.datasets.fashion_mnist.load_data()
```

    Downloading data from https://storage.googleapis.com/tensorflow/tf-keras-datasets/train-labels-idx1-ubyte.gz
    32768/29515 [=================================] - 0s 0us/step
    40960/29515 [=========================================] - 0s 0us/step
    Downloading data from https://storage.googleapis.com/tensorflow/tf-keras-datasets/train-images-idx3-ubyte.gz
    26427392/26421880 [==============================] - 0s 0us/step
    26435584/26421880 [==============================] - 0s 0us/step
    Downloading data from https://storage.googleapis.com/tensorflow/tf-keras-datasets/t10k-labels-idx1-ubyte.gz
    16384/5148 [===============================================================================================] - 0s 0us/step
    Downloading data from https://storage.googleapis.com/tensorflow/tf-keras-datasets/t10k-images-idx3-ubyte.gz
    4423680/4422102 [==============================] - 0s 0us/step
    4431872/4422102 [==============================] - 0s 0us/step
    


```python
X.shape, y.shape, X_test.shape, y_test.shape
```




    ((60000, 28, 28), (60000,), (10000, 28, 28), (10000,))




```python
# Define the text labels
fashion_mnist_labels = ["T-shirt/top",  # index 0
                        "Trouser",      # index 1
                        "Pullover",     # index 2 
                        "Dress",        # index 3 
                        "Coat",         # index 4
                        "Sandal",       # index 5
                        "Shirt",        # index 6 
                        "Sneaker",      # index 7 
                        "Bag",          # index 8 
                        "Ankle boot"]   # index 9

# Image index, you can pick any number between 0 and 59,999
img_index = 5
# y_train contains the lables, ranging from 0 to 9
label_index = y[img_index]
```


```python
#plt.imshow(X_train[0], cmap='Greys')
plt.figure(figsize=(10,10))
for i in range(25):
  ax = plt.subplot(5, 5, i+1)
  plt.imshow(X[i], cmap='Greys')
  plt.title(fashion_mnist_labels[y[i]]+"="+str(y[i]), fontsize=10)
  plt.axis("off")
```


    
![png](/assets/images/fashion-mnist/output_4_0.png)
    



```python
y_train[0:10]
```




    array([[0., 0., 0., 0., 1., 0., 0., 0., 0., 0.],
           [1., 0., 0., 0., 0., 0., 0., 0., 0., 0.],
           [0., 0., 0., 0., 0., 0., 0., 1., 0., 0.],
           [0., 0., 0., 0., 0., 0., 0., 0., 0., 1.],
           [0., 0., 0., 0., 0., 0., 0., 0., 0., 1.],
           [0., 0., 0., 0., 0., 0., 0., 0., 0., 1.],
           [0., 0., 0., 0., 1., 0., 0., 0., 0., 0.],
           [0., 0., 0., 0., 1., 0., 0., 0., 0., 0.],
           [0., 0., 0., 1., 0., 0., 0., 0., 0., 0.],
           [0., 0., 0., 0., 1., 0., 0., 0., 0., 0.]], dtype=float32)




```python
X = X.astype('float32') / 255
X_test = X_test.astype('float32') / 255
```


```python
#X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.33, random_state=42)
# Further break training data into train / validation sets (# put 5000 into validation set and keep remaining 55,000 for train)
(X_train, X_val) = X[5000:], X[:5000] 
(y_train, y_val) = y[5000:], y[:5000]

# Reshape input data from (28, 28) to (28, 28, 1)
w, h = 28, 28
X_train = X_train.reshape(X_train.shape[0], w, h, 1)
X_val = X_val.reshape(X_val.shape[0], w, h, 1)
X_test = X_test.reshape(X_test.shape[0], w, h, 1)

# One-hot encode the labels
y_train = tf.keras.utils.to_categorical(y_train, 10)
y_val = tf.keras.utils.to_categorical(y_val, 10)
y_test = tf.keras.utils.to_categorical(y_test, 10)

# Print training set shape
print("x_train shape:", X_train.shape, "y_train shape:", y_train.shape)

# Print the number of training, validation, and test datasets
print(X_train.shape[0], 'train set')
print(X_val.shape[0], 'validation set')
print(X_test.shape[0], 'test set')
```

    x_train shape: (55000, 28, 28, 1) y_train shape: (55000, 10)
    55000 train set
    5000 validation set
    10000 test set
    


```python
seq_model = keras.models.Sequential([
    keras.layers.Flatten(input_shape=(28, 28, 1)),
    keras.layers.Dense(units=256, activation='relu')
])
seq_model.add(keras.layers.Dense(units=10, activation='softmax'))
```


```python
seq_model.summary()
```

    Model: "sequential"
    _________________________________________________________________
    Layer (type)                 Output Shape              Param #   
    =================================================================
    flatten (Flatten)            (None, 784)               0         
    _________________________________________________________________
    dense (Dense)                (None, 256)               200960    
    _________________________________________________________________
    dense_1 (Dense)              (None, 10)                2570      
    =================================================================
    Total params: 203,530
    Trainable params: 203,530
    Non-trainable params: 0
    _________________________________________________________________
    


```python
#seq_model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
seq_model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
```


```python
seq_model.fit(X_train, y_train, epochs=1)
```

    1719/1719 [==============================] - 19s 3ms/step - loss: 0.6157 - accuracy: 0.7841
    




    <keras.callbacks.History at 0x7f876e608b90>




```python
checkpointer = ModelCheckpoint(filepath='model.weights.best.hdf5', verbose = 1, save_best_only=True)
seq_model.fit(X_train,
         y_train,
         batch_size=64,
         epochs=10,
         validation_data=(X_val, y_val),
         callbacks=[checkpointer])
```

    Epoch 1/10
    860/860 [==============================] - 4s 4ms/step - loss: 0.3510 - accuracy: 0.8740 - val_loss: 0.3415 - val_accuracy: 0.8750
    
    Epoch 00001: val_loss improved from inf to 0.34148, saving model to model.weights.best.hdf5
    Epoch 2/10
    860/860 [==============================] - 4s 4ms/step - loss: 0.3253 - accuracy: 0.8820 - val_loss: 0.3269 - val_accuracy: 0.8790
    
    Epoch 00002: val_loss improved from 0.34148 to 0.32689, saving model to model.weights.best.hdf5
    Epoch 3/10
    860/860 [==============================] - 3s 4ms/step - loss: 0.3083 - accuracy: 0.8865 - val_loss: 0.3157 - val_accuracy: 0.8858
    
    Epoch 00003: val_loss improved from 0.32689 to 0.31573, saving model to model.weights.best.hdf5
    Epoch 4/10
    860/860 [==============================] - 3s 4ms/step - loss: 0.2881 - accuracy: 0.8934 - val_loss: 0.3313 - val_accuracy: 0.8802
    
    Epoch 00004: val_loss did not improve from 0.31573
    Epoch 5/10
    860/860 [==============================] - 3s 4ms/step - loss: 0.2751 - accuracy: 0.8977 - val_loss: 0.3076 - val_accuracy: 0.8864
    
    Epoch 00005: val_loss improved from 0.31573 to 0.30765, saving model to model.weights.best.hdf5
    Epoch 6/10
    860/860 [==============================] - 3s 4ms/step - loss: 0.2606 - accuracy: 0.9032 - val_loss: 0.2960 - val_accuracy: 0.8968
    
    Epoch 00006: val_loss improved from 0.30765 to 0.29604, saving model to model.weights.best.hdf5
    Epoch 7/10
    860/860 [==============================] - 3s 4ms/step - loss: 0.2486 - accuracy: 0.9076 - val_loss: 0.3105 - val_accuracy: 0.8870
    
    Epoch 00007: val_loss did not improve from 0.29604
    Epoch 8/10
    860/860 [==============================] - 3s 4ms/step - loss: 0.2416 - accuracy: 0.9090 - val_loss: 0.2989 - val_accuracy: 0.8942
    
    Epoch 00008: val_loss did not improve from 0.29604
    Epoch 9/10
    860/860 [==============================] - 3s 4ms/step - loss: 0.2298 - accuracy: 0.9144 - val_loss: 0.2993 - val_accuracy: 0.8908
    
    Epoch 00009: val_loss did not improve from 0.29604
    Epoch 10/10
    860/860 [==============================] - 3s 4ms/step - loss: 0.2212 - accuracy: 0.9175 - val_loss: 0.2998 - val_accuracy: 0.8958
    
    Epoch 00010: val_loss did not improve from 0.29604
    




    <keras.callbacks.History at 0x7f876dca7110>




```python
# Load the weights with the best validation accuracy
seq_model.load_weights('model.weights.best.hdf5')
```


```python
score = seq_model.evaluate(X_test, y_test, verbose=0)
print('Model loss = ', score[0])
print('Model accuracy = ', score[1])
```

    Model loss =  0.323933482170105
    Model accuracy =  0.8847000002861023
    


```python
y_hat = seq_model.predict(X_test)

# Plot a random sample of 10 test images, their predicted labels and ground truth
figure = plt.figure(figsize=(20, 8))
for i, index in enumerate(np.random.choice(X_test.shape[0], size=15, replace=False)):
    ax = figure.add_subplot(3, 5, i + 1, xticks=[], yticks=[])
    # Display each image
    ax.imshow(np.squeeze(X_test[index]))
    predict_index = np.argmax(y_hat[index])
    true_index = np.argmax(y_test[index])
    # Set the title for each image
    ax.set_title("{} ({})".format(fashion_mnist_labels[predict_index], 
                                  fashion_mnist_labels[true_index]),
                                  color=("green" if predict_index == true_index else "red"))
```


    
![png](/assets/images/fashion-mnist/output_15_0.png)
    



```python
y_pred = seq_model.predict(X_test)
plt.figure(figsize=(8,8))
for i in range(25):
  plt.subplot(5, 5, i+1)
  plt.imshow(np.squeeze(X_test[i]), cmap="Greys")
  plt.axis("off")
  pred_val = np.argmax(np.squeeze(y_pred[i]))
  act_val = np.argmax(np.squeeze(y_test[i]))
  plt.title("{}\n ({})".format(fashion_mnist_labels[pred_val], 
                                                  fashion_mnist_labels[act_val]),
            color=("green" if pred_val == act_val else "red"))
```


    
![png](/assets/images/fashion-mnist/output_16_0.png)
    

