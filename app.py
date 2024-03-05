# Import the Flask class from the flask module
from flask import Flask

# Create an instance of the Flask class and pass the name of the current module
app = Flask(__name__)

# Use the route() decorator to bind a URL to a function
@app.route('/')
def hello():
    # Return a string as the response
    return 'Hello, world!'

# Check if the script is run directly and not imported
if __name__ == '__main__':
    # Run the app on the local development server
    app.run()
