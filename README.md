# 22- Global State [Heroku](https://fierce-gorge-20763.herokuapp.com/)

### Usage
- npm install</br>
- npm run seed</br>
- npm run develop</br>

### Deploying to Heroku
- add "build": "cd client && npm run build" to package.json scripts</br>
- once deployed, run heroku run npm run seed in a local command line to seed the deployed DB</br>

### React
- Single source of truth: By having all of the application's data stored in one location that isn't tied to any single piece of the UI, we can easily manipulate our app's UI without having to affect any of it.</br>
- State is read-only: This doesn't mean state can't be updated, but rather that it cannot be directly updated. Instead, it should be overwritten with a new iteration of that state. This makes it so that the application's state is updated in a predictable fashion and the UI won't ever get out of sync with its data.</br>
- State is changed through pure functions: This means that to make an update to state, we don't actually manipulate it. Instead, we overwrite it with a new version of it. This lowers the chance of any data being accidentally affected by an action. We do this by creating what's known as a reducer, which runs as a result of an action.</br>

# Updating State
- Actions: These define the types of events that can be emitted to update state. State can only be updated if it's a predefined action.</br>
- [Reducers](#reducers-take-two-parameters): The actual functionality that carries out the emitted action to update state. It is a function that updates the state by returning a new state object instead of altering the original state object

##### Reducers take two parameters:
- The current state object, so we can make our copy of it for the new state.</br>
- The action we're performing to update state, which is broken into the following two parts as an object:</br>
(type: This is the type of action we're performing, and should be one of the predefined actions we created earlier.)</br>
(value: This won't always have the name value, but it is a name representative of the new data we want to use with the action.)

### Lesson Goal
- Use the React Context API to implement a Redux-like store to manage state globally.</br>
- Write Redux-like actions and reducers with the necessary tests in place.</br>
</br>
- Write additional reducers for the global store.</br>
- Conditionally render React components.</br>
- Use global state across multiple React components.</br>
- Write reducers that update and delete array items.</br>
</br>
- Read and write data to IndexedDB.</br>
- Use React Hooks like useEffect().</br>
- Dispatch updates to the global state object.</br>
- Use IndexedDB within a React component.</br>
- Cache server-side data using IndexedDB.</br>
</br>
- Reading API documentation.</br>
- Building GraphQL queries and resolvers.</br>
- Defining client-side routes with React Router.</br>
- Generating a checkout session with the Stripe API.</br>
- Capturing a completed order in your own database.</br>
- Using the useLazyQuery Hook to handle delayed requests.</br>

##### Tech Used
- Stripe - a suite of payment processing APIs</br>
- Stripe.js - Stripe’s JavaScript library for building payment flows. It uses Stripe Elements, a set of prebuilt, customizable UI components to allow platforms to collect sensitive payment information.(For the purposes of this module's application, you’ll use the @stripe/stripe-js (Links to an external site.) npm package to redirect your app to a prebuilt Stripe checkout page.)</br>
- React Context API - use to make a global state object in React</br>

### Normal React Set up
The Home page component manages the state currentCategory, which is passed to the ProductList component as a prop and instructs which category's products should be retrieved using Apollo. To set that currentCategory value, however, the setCategory callback function is passed to the CategoryMenu component as a prop to be executed on a new category pick.