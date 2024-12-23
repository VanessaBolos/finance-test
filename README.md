# Personal-Finance-Tracker 💵💵💵
### You can try the application from [here!](https://nodejs.org/en/download/prebuilt-installer/current)
## Project Overview: 
#### A simple, customizable expense and income tracking app! 

## Features: 
### 1. User Authentication
- User registration and login functionality
- Password hashing and secure storage
### 2. Expense Tracking
- Add, edit, and delete expense entries
- Categorize expenses (e.g., food, transportation, entertainment)
- View expense history

### 3. Income Tracking
 - Add, edit, and delete income entries
 - Categorize income (e.g., salary, investments, freelance work)
 - View income history

### 4. Real time updates on balance
 - View updated balance after user input of expense and income

### 5. Reporting 
- View expense percentage with a donut visual

### 6. User Experience
- Intuitive and user-friendly interface
- Responsive design for desktop and mobile devices
- Clear and concise labeling and instructions
- Toast Notifications for any updates

### Installation Instructions: 
1. Clone the repository using `git clone https://github.com/VanessaBolos/Personal-Finance-Tracker.git`
2. Install the required dependencies using `npm install react-icons --save chart.js firebase uuid react-toastify`
3. Create a new Firebase project and enable the Realtime Database and Authentication services
4. Set up a Firebase configuration file (e.g. `firebaseConfig.js`) with your project's API key, auth domain, database URL, and storage bucket and put secrets in a .env file
5. Start the server using `npm run dev`
6. Open a web browser and navigate to `http://localhost:3000`

### Usage: 
1. Register for an account or log in if you already have one
2. Add, edit, and delete expense and income entries
3. View and track total expenses and income, and compare actual expenses to income limits

### Technologies Used: List of technologies, libraries, and frameworks
1. Node.js
2. Next.js
3. Database- Firebase
4. Authentication- Firebase Authentication
5. API- Chartjs and 
6. Tailwind CSS

### Future Improvements: areas of potential enhancements and additional features
1. Implement a budgeting feature that allows users to set financial goals and track progress
2. At the moment, it can only handle 8 expense categories before it goes out of the modal so maybe fix that
3. Integrate with popular financial institutions to import transactions
4. Implement a feature to send reminders for upcoming bills and payments
5. Enhance the reporting feature to include more detailed and customizable reports perhaps to a PDF or CSV
6. Implement Generative AI to analyze users' expense habits and provide suggestions to help reach financial goals.
7. CSS styling at the moment is simple, could be more dynamic and fun.


## Development Log (DevLog)

### Week 1
#### Planning and Setting Up the Basics
- Set up a new Next.js project
- Installed required dependencies
- Created a basic layout for the app
- Implemented a donut visual to display balance, expense categories and income with dummy data
- Created a basic reusable modal for new expense and income entries and view history

![Week 1 Screenshot](/public/screenshots/Week%201.JPG)
![Reusable modal Screenshot](/public/screenshots/reusable%20modal.JPG)

#### Difficulites:
- Took a while to decide on a layout, cut more of my time working on the project
- Had to learn how to use chart.js and how to implement it in my project. Encountered a lot of issues with installing react-chartjs-2 and react-firebase-hooks/auth as it doesn't work with React19


### Week 2
#### Build the UI for core features and connect to the backend
- Set up Firebase Realtime Database
- Implemented basic CRUD operations for expense and income entries
- Replaced dummy data with actual user input
![Add expense modal Screenshot](/public/screenshots/addexpensemodal.JPG)
![Add income modal Screenshot](/public/screenshots/addincomemodal.JPG)
#### Difficulites:


### Week 3
#### Setting up Firebase Authentication and final implementations
- Set up Welcome page for user authentication
- Implemented Google Authentication/registration through Firebase
![Welcome Page](/public/screenshots/welcome%20page.JPG)
![Firebase Auth](/public/screenshots/Firebase%20Auth.JPG)
#### Difficulites:
- Had to learn how to use Firebase Authentication and how to implement it in my project
- Had to learn how to use Firebase Firestore and how to implement it in my project

### Week 4
####  Testing
- Thorough testing of all features and functionality
- Regular testing and validation of user input
- Debugging and resolving any issues that arise
- Finalized the UI and UX of the app
- Adding Firestore Security rules for protecting data ensuring only authorized users will be able to update,delete and create data
![Firestore security rules](/public/screenshots/firestore%20security%20rules.JPG)


####  Documentation
- Writing clear and concise documentation for the project
- Updating the README file with the latest information
####  Deployment
- Deploying the project to Vercel
- Configuring the server and database for production use

#### Difficulites:

