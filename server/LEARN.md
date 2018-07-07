# Authentication with PassportJS

"Passport is authentication middleware for Node. It is designed to serve a singular purpose: authenticate requests."

## Strategies

## Sign up w/ Google OAuth API

[Register for Google OAuth API](https://console.developers.google.com/?pli=1)

New Project

#### Enable Google OAuth API

Sign up for Google + API
Generate an API credential

#### Securing API Keys

clientID is fine, it is public information
clientSecret should not be shared with anyone, access to the client secret provides elevated permissions to anyone who has it.

#### Google Strategy Options

`passport.authenticate(strategy, scope)`

Google has a list of the scopes, or permissions that can be requested when using OAuth for a user's account. A scope typically just defines what aspects of a Google profile an application using Google Authentication will use.

#### Access and Refresh Tokens

Access Token allows the application to access profile data for a given user. It is provided afrer the `auth/google/callback` route is hit.

The function created as the second argument of the GoogleStrategy can also access some other relevant information. Mainly, the profile variable, which contains user information such as name, gender, email addresses, etc.

#### Passport Done Callback

- `done` is a passport function that is utilized for handling errors, or passing on information about the authenticated user. Common values of `done` are:
  - `null` - the first argument to `done`, signifies that there is no exception-based error
  - `false` - if credentials are not valid
  - `user` - which refers to the user that was successfully authenticated
  - `message` - for example `done(null, false, { message: 'Incorrect password.' })` can be used for displaying flash messages.
  - `err` - can be used if an exception has occured ( database/server is down)

```javascript
(accessToken, refreshToken, profile, done) => {
  console.log('accessToken', accessToken);
  console.log('refresh token', refreshToken);
  console.log('profile', profile);
  console.log('done', done);
};
```

#### Passport logout() method

Passport adds a `logout()` method to the `req` object that can be used on any route handler to end a login session. `logout()` removes the `req.user` property and clears the login session.

The profile.id is used to verify a user's identitiy between logins

## Cookie Based Authentication

Cookie, or Token based authentication is best described as a solution to the problem it solves:

`**Problem** - HTTP is stateless. That means that from one request to another, HTTP itself does not do any tracking of events that occured before or after any particular request. For instance, if a user logs into a service with one request, and then sends a request to see "a list of my comments", HTTP doesn't have any reference to that user's identity, which was supplied in the first request. In other words, it doesn't know who you are.

With regards to authentication, this poses a problem because after a user logs in, HTTP doesn't attatch a user's credentials, or any other contextual information that might make reference to prior events.

**Solution** - However, cookies that are stored in a browser's cache fulfill this function. They store contextual data in small files that can be sent along with subsequent HTTP requests. Cookie Based Authentication leverages the way cookies store data to send user-specific information with each HTTP request.

#### serializeUser and deserializeUser

Authorizing a user after initial login is done by using OAuth 2.0 serialization and deserialization. The `serializeUser()` and `deserializeUser()` methods are used to encode the user data into the cookie.

# MongoDB

## Mongoose Model Classes

## Saving Model Instances

## Mongoose Queries

Query the DB to find if a user with a given ID already exists before saving a new user model instance during OAuth flow.

# Dev vs Production Resources - Keys & Data

Seperate Keys and Databases used for production and development.

New flow for index.js

index -> config/keys -> `env === dev ? dev.data/key : prod.data/key` -> use relevant keys.

# Communicating Between React App and Express Server

**Problem** -

**Solution** - create-react-app's `proxy`

# Client Side

## Client Setup

### Client Pages

- Landing
- Dashboard
  - SurveyList
    - SurveyListItem
- SurveyForm
  - SurveyField
- Components
  - Header

### Client Architecture

index.js - Data Layer Control(Redux)
App.js - Rendering Layer Control (React Router)

if a file exports a class or a React component, name w/ a capital letter

if it exports function, lowercase

#### Redux Store

Redux Store - combineReducers
-authReducer - determines whether a user is logged in
-surveyReducer - records a list of all surveys a user has created

## Client Libs

Redux
React-Redux
React Router DOM

# Redux

## Provider, createStore, applyMiddleWare

## Reducers

Provide data to the redux store

### Creating Reducers

A reducers initial implementation simply needs to be a function, that takes in a state and action as arguments, switches over the type of action, being submitted and returns a new state based on that action.

Don't forget to set the default state in your arguments list.

The default case for a reducer should be to simply `return state`

```javascript
export default function(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}
```

Import reducer from `fileName.js` into `/reducers/index.js`
Import `reducers/reducers` into `src/index.js` and maker reducers the first argument in createStore. the store variable should now look like this:

```javascript
const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

### Using Actions

#### Connect

allows React components to make use of action creators

# React Router

Allows showing different content/components based on which route a user is on.

_React-Router_ vs _React-Router-DOM_ vs _React-Router-Native_

BrowserRouter expects at most one component.

Make an AJAX request to the backend to determine whether or not a user is logged in.

On app start,

launch `fetchUser`
make axios.get request to express API,
dispatch an action,

---

trigger the auth reducer
new auth state
update header to show content

# Redux Thunk

Redux assumes that each action creator will immediately return an action. Redux Thunk allows action creators to return functions.

This allows a middle step between when an action is created, and when the result is dispatched. That middle step allows room for additional logic for "asychronous action, such as an API call or a router transition".

Thunks, from which Redux Thunk gets its name, are a longstanding Computer Science concept. "A thunk is a function that returns a function."

What Redux Thunk does in particular, is it inspects the return value of each action. If that return value is a function, Redux Thunk calls that function, passing the `dispatch` function into it as an argument.

###

# Billing

## Rules of Billing

### We are bad at security

- Never accept raw credit card numbers
- Never store raw credit card numbers
- Always use an outside payment processor

### Billing is hard

- Possible to avoid monthly payments/multiple plans?
- Fraud and charebacks are a pain

## Stripe - Payment Processor

1.  User clicks 'Add Credits'
2.  Tell stripe to show a credit card form
3.  User enters credit card details
4.  Details sent from form to Stripe
5.  Stripe sends back a token representing the charge
6.  Send token to API
7.  API confirms the charge was successful with Stripe
8.  Add credits to the user's account

[React-Stripe-Checkout](https://github.com/azmenak/react-stripe-checkout)
