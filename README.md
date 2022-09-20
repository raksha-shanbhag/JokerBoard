# JokerBoard
![ScreenShot](/Screenshots/Riddle.PNG)

### To edit riddle
![ScreenShot](/Screenshots/Edit.png)

## Setup
Go to the Frontend folder, install required modules using npm -
```
cd Frontend
npm -i 
```

Next, install the required python modules to run the backend server using the commmand - 
pip install -r /path/to/requirements.txt

To setup database on your local machine, 
Install MySQL using  - 
```
https://docs.oracle.com/en/java/java-components/advanced-management-console/2.22/install-guide/mysql-database-installation-and-configuration-advanced-management-console.html#GUID-2B24F7E4-A00C-463F-8666-10D3D1097061
```

If you have MySQL already, make sure MySQL server is running. Then, edit line 11 of app.py to your username, password port number- 
```
mysql://<username>:<password>@localhost:<port>/notesdb
```

Now open terminal and run Python shell, followed by these commands - 
```
from app import db
db.create_all()
```

## Run the project
In order to run this project in your local machine, by first running the backend using command - 
```
python app.py
```

Then, tun the front end by changing directory to Frontend, and then -
```
npm start
```
