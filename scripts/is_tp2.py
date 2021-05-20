from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from flask_caching import Cache
from flask_cors import CORS
import sim
import time
from datetime import datetime
import threading
import requests
import json

app = Flask(__name__)
CORS(app)
api = Api(app)

# Instantiate the cache
cache = Cache()
cache.init_app(app=app, config={"CACHE_TYPE": "filesystem", 'CACHE_DIR': './tmp'})

# global configuration variables
clientID = -1
db_ref = 'https://is-tp2-84cca-default-rtdb.europe-west1.firebasedatabase.app/'


# TODO LAB 1 - Implement the UpdateRate resource
class UpdateRate(Resource):
    def put(self, update_rate):
        cache.set("current_rate", update_rate)
        put_config('config', {'current_rate': cache.get("current_rate")})
        return {'update_rate': cache.get("current_rate")}

# TODO LAB 1 - Define the API resource routing
api.add_resource(UpdateRate, '/updateRate/api/v1.0/<float:update_rate>')


# Helper function provided by the teaching staff
def get_data_from_simulation(id):
    """Connects to the simulation and gets a float signal value

    Parameters
    ----------
    id : str
        The signal id in CoppeliaSim. Possible values are 'accelX', 'accelY' and 'accelZ'.

    Returns
    -------
    data : float
        The float value retrieved from the simulation. None if retrieval fails.
    """
    if clientID != -1:
        res, data = sim.simxGetFloatSignal(
            clientID, id, sim.simx_opmode_blocking)
        if res == sim.simx_return_ok:
            return data
    return None


# TODO LAB 2 - Implement the necessary functions to read and write data to your Firebase real-time database
def push_data(child, data):
    requests.post('%s%s.json' % (db_ref, child), json=data)


def put_config(data):
    requests.put('%s/config.json' % (db_ref), json=data)


def get_config():
    return requests.get('%s/config.json' % (db_ref))


# LAB 1 - Implement the data collection loop in a thread
class DataCollection(threading.Thread):
    def __init__(self):
        self.id = id
        threading.Thread.__init__(self)
        # initialize the current_rate value in the cache
        cache.set("current_rate", 1.0)
        # LAB 2 - Put an initial rate in the config stored in the DB
        put_config({'current_rate': 1.0})
    
    def run(self):
        # LAB 1 - Get acceleration data values (x, y and z) from the simulation and print them to the console
        while True:
            x = get_data_from_simulation('accelX')
            y = get_data_from_simulation('accelY')
            z = get_data_from_simulation('accelZ')
            timestamp = datetime.now().strftime("%H:%M:%S")

            if x == None or y == None or z == None:
                continue

            # LAB 2 - Push the data to the real-time database on Firebase
            push_data('accel_x', {'data': x, 'timestamp': timestamp})
            push_data('accel_y', {'data': y, 'timestamp': timestamp})
            push_data('accel_z', {'data': z, 'timestamp': timestamp})
            
            cache.set("current_rate", get_config().json()["current_rate"])

            sleep = cache.get("current_rate")
            print("Current rate: %s" % (sleep))
            time.sleep(sleep if sleep != None else 1.0)


if __name__ == '__main__':
    sim.simxFinish(-1)  # just in case, close all opened connections
    clientID = sim.simxStart('127.0.0.1', 19997, True, True, 5000, 5)  # Connect to CoppeliaSim
    if clientID != -1:
        # TODO LAB 1 - Start the data collection as a daemon thread
        dataCollection = DataCollection()
        dataCollection.daemon = True
        dataCollection.start()
        app.run(debug=True, threaded=True)
    else:
        exit()
