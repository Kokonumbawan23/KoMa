import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
import tensorflow as tf
import numpy as np
from google.cloud import storage
from google.oauth2 import service_account

# Setting up Google Cloud Credential
credentials = service_account.Credentials.from_service_account_file('./credentials/ ## PLACE YOUR CREDENTIALS HERE ##')
storage_client = storage.Client(credentials=credentials, project='Capstone-KoMa')
bucket = storage_client.get_bucket('koma_ingredients_picture')

# Configuring env variables
UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Loading the model
model = tf.keras.models.load_model('./models/model.h5')

# Listing the class
listclass=['apple', 'banana', 'beetroot', 'bell pepper', 'cabbage', 'capsicum', 'carrot', 'cauliflower', 'chilli pepper', 'corn', 'cucumber', 'eggplant', 'garlic', 'ginger', 'grapes', 'jalepeno', 'kiwi', 'lemon', 'lettuce', 'mango', 'onion', 'orange', 'paprika', 'pear', 'peas', 'pineapple', 'pomegranate', 'potato', 'raddish', 'soy beans', 'spinach', 'sweetcorn', 'sweetpotato', 'tomato', 'turnip', 'watermelon']

# Function for filtering file
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/", methods=['POST'])
def classify():
    try:
        filePath = ''
        if request.method == 'POST':
            # check if the post request has the file part
            if 'file' not in request.files:
                return {
                    "status" : "error",
                    "message" : 'No file part'
                }
            file = request.files['file']
            # If the user does not select a file, the browser submits an
            # empty file without a filename.
            if file.filename == '':
                return {
                    "status" : "error",
                    "message" : 'No selected file'
                }
            if file and allowed_file(file.filename):
                # Saving file to local storage
                filename = secure_filename(file.filename)
                filePath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(filePath)
                
                
                # Predict the picture from local storage
                result = predict(filePath)
                
                # Upload it to Google Cloud Storage
                blob = bucket.blob(file.filename)
                blob.upload_from_filename('./uploads/' + file.filename)
                
                # Delete it as soon the picture is predicred
                os.remove(filePath)
            return {
                "result": result
            }
    # catch error if something unexpected happened
    except Exception as e:
        if hasattr(e,'message'):
           print(e.message)
        else:
            print(e)

# Function to predict the file ingredients
def predict(picture):
    
    img= tf.keras.utils.load_img(picture,target_size=(224,224))
    x= tf.keras.utils.img_to_array(img)
    x=x/255.0
    x=np.expand_dims(x,axis=0)
    images = np.vstack([x])
    classes= model.predict(images)
    num=np.argmax(classes)
    return listclass[num]