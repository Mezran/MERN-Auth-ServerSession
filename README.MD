# Goal:

With this project I want to create a simple MERN stack application with session authentication, where important user information is stored in the session and not in the client-side. This project is designed to be a launching point for other projects, where I can quickly start a new project with session authentication and not have to reinvent the wheel each time.

### Overview:

- Create a MERN stack application with session authentication
- Create a application that can be a launching point for other projects.

### Frontend:

- Create a React application with Vite, Redux/Redux Tool Kit, and Material-UI
- Integrate storybook for component isolation development

### Backend:

- Create a Node.js application with Express, MongoDB and mongoose
- Create a session authentication system with express-session and bcryptjs

# Tools:

### Frontend:

- Vite
  - Frontend build tool
- React
  - Frontend library
- Redux/Redux Tool Kit
  - State management, cashing, and endpoint handling
- Material-UI
  - Styling library
- Storybook
  - Component isolation development
- React Router
  - Routing
- React Hook Form
  - Easier form handling
- Yup
  - Validation

### Backend:

- Node.js
  - Backend
- Express
  - Backend framework
- MongoDB
  - Database
- Mongoose
  - MongoDB object modeling tool
- bcryptjs
  - Password hashing
- express-session
  - Session handling
- Yup
  - Validation
- Winston
  - Logging to the console, file, and MongoDB
- Nodemon
  - Auto restart server on file change

# Installation:

1. Clone the repository

### Frontend:

1. Install the dependencies for the frontend
   - `cd client`
   - `npm install`
2. Start the frontend
   - `npm run dev`

### Backend:

1. Install the dependencies for the backend
   - `cd server`
   - `npm install`
2. Create a `.env` file in the backend directory, see `.env.template` for required variables
3. Start the backend with nodemon
   - `npm run dev`

# Other Commands:

### Frontend:

- `npm run build` - Build the frontend
- `npm run storybook` - Start storybook

### Backend:

- `npm run start` - Start the backend without nodemon (for production)
- `npm run test` - Run tests with Jest

# Demo / Walkthrough:

1. Ensure backend and frontend are running.
2. Navigate to `http://localhost:5173/` in your browser.
3. Click on the `Login` button in the top right corner.
   - Notes: Each form has type validation, so entereing an invalid email address and clicking login will show an error message.
4. Click `Need an account? Register here!` to navigate to the register page.
5. Enter a valid email address and password, then click `Register`.
   - Note: Each form has type validation, so entereing an invalid email address and clicking register will show an error message. Same for the username and password fields.
6. On registering, you will see a success message and be redirected to the dashboard page.
7. Navigating to and from the dashboard page and home page will show the session authentication in action, as the user will be redirected to the login page if they are not authenticated.
8. Clicking on the profile page will show:
   - the user's email address and username
   - the option to change the username and password
     - There is type validation, and the user must re-enter their password to change their username or password.
   - the option delete the account.
     - The user must re-enter their password to delete the account.
9. Clicking on the icon in the top right corner will give the options of profile and logout.
   - Clicking on logout will log the user out, delete their session, and redirect them to the login page.
   - Attemping to navigate to the dashboard page again `http://localhost:5173/dashboard` will redirect the user to the login page, as they are not authenticated. (It's best to be on the home or register page to see the redirect in action.s)

## Resources:

- https://medium.com/@hendelRamzy/how-session-and-cookies-works-640fb3f349d1#:~:text=Sessions%20are%20often%20used%20to,not%20on%20the%20client%2Dside.

- https://itnext.io/mastering-session-authentication-aa29096f6e22
