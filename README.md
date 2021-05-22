# RESTful JSON Web Application

## Contains:

CoppeliaSimEdu scene file to simulate a robot performing a generic action, in this case, constantly drawing the letters "IS" on a metal plate. The acceleration value of each axis is sent to a Python script using Lua. Python provides a Flask API with an endpoint that allows the changing of the rate based on which the values are read from the simulation. Python writes the obtained values and current rate in a Firebase Realtime Database using HTTP requests. React was used to create a front-end and display a dashboard in a web page. The dashboard allows the user to read the realtime simulation data and change the update rate. Firebash Authentication is also used to require the creation and logging into an account to be able to access the dashboard. SASS was used to create responsive CSS classes. Finally, the front-end is hosted at https://is-tp2-84cca.web.app/, though it's not currently being updated nor maintained.

## To Do:

Use Firebase Machine Learning to predict next values.

## Authors:

This work and was done for the "Systems Integrations" 2020/2021 course at FCT-UNL by Frederico Marques (47359), Guilherme Russo (50760) and Pedro Oliveira (50544) from the Integrated Master's in Computer and Electrical Engineering.
