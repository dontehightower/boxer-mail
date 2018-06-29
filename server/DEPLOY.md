#Deployment Checklist

##Dynamic Report Binding
If the PORT `app.listen()` is being run on is hard coded for the dev environment, allow an option so that heroku can pass a dynamic port under `process.env.PORT`

`const PORT = process.env.PORT || 5000`
##Specify Node Environment
Check the engines object in `package.json` file to inform Heroku which specific versions of node and npm should be used to run the application.

##Specify Start Script
Ensure that the `start` script in `package.json` matches the script being run to start the server locally

##Add .gitignore
Make sure that the dependencies in the local `node_modules` aren't being commited to Heroku. Heroku will install the necessary dependencies on its own using the `package.json` file.

#Deploy
To deploy an updated version of the application, run `git push heroku master`
