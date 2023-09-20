# EnduroTrak

## Introduction
EnduroTrak, a [Strava](https://www.strava.com/)-inspired project, enables users to create and join challenges, track their progress on leaderboards, and engage with fellow fitness enthusiasts through comments.

**Live Site:** [EnduroTrak](https://endurotrak.onrender.com)

## Technologies Used:
Backend:

 - Python
 - Flask
 - PostgreSQL

Frontend:

 - JavaScript
 - React
 - Redux

## Login Page
![login](https://github.com/SSauseda/endurotrak/assets/108492423/567ddc77-3946-4b52-a51e-47c4a1933ca8)

## Sign Up
![signup](https://github.com/SSauseda/endurotrak/assets/108492423/39124305-6bf5-4b2a-9f31-a0fdbe21578a)

## User Profile
![userprofile](https://github.com/SSauseda/endurotrak/assets/108492423/47f7f301-a877-46c8-ac35-21d28f76681a)

## Challenge Page
![challengepage](https://github.com/SSauseda/endurotrak/assets/108492423/f5435bba-ce56-4943-8f48-af08284b48e7)

## Challenge Detail's Page with Leaderboard
![challenge-leaderboard](https://github.com/SSauseda/endurotrak/assets/108492423/a55a57d5-6cd6-43c7-b593-3c7ff74327a6)

## Results Page with Comments
![results](https://github.com/SSauseda/endurotrak/assets/108492423/a99d9b3f-0039-469e-a768-90a03e5d1ee0)


# Installation
1. Clone this repository to your local machine using the following command:
	
	```
	git clone https://github.com/SSauseda/endurotrak.git
	  ```
2. Navigate to the root directory of the project and install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```
3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file
   ```bash
   DATABASE_URL=sqlite://your-database-file-path
   ```

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. Finally, open a new terminal window, cd into the frontend folder, and start the frontend application:

   ```
   cd react-app
   npm start
   ```

# Contributing

Thank you so much for taking the time to explore my project! Your interest and feedback mean a lot. I welcome all contributions to help make EnduroTrak even better. If you come across any bugs, or if you have suggestions to improve the platform, please don't hesitate to reach out. Your insights are invaluable, and together, we can refine and perfect this tool for all users. Once again, thank you, and happy tracking! 🚴‍♂️🏃‍♀️🌟
