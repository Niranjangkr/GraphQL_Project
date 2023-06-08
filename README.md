# GraphQL_Project

To run these project locally install the required dependencies in both client and server folder 
Use following commands
- npm install from package-lock.json 
- npm audit fix

Set up your mongodb atlas account and create your cluster and make changes in the app.js add your database connection string
- mongoose.connect('<Your connection string>')

These project I made while learning about GraphQL from youtube https://youtu.be/Y0lDGjwRYKw. 
Its like a book info site where a user can see add a info about a book and see details of particular book, 
so the system retreives data from the MongoDb Atlas DB which is all done using GraphQL (queryLanguage) and graphql client thats apollo client 
which helps to write/define query at frontend which passes to the node server from there to graphql superCharge endpoint which is a single endpoint 
from it jumps to the Database schema or collections schema its like a graph of collection from which it retreives data and passes it to the  
frontend.

Technology used: 
- GraphQL server on Node.js
- React front-end (with Apollo)
- MongoDB to store data

![Screenshot (29)](https://github.com/Niranjangkr/GraphQL_Project/assets/110449470/1642220d-7557-458c-bf1b-2f7c0c4fd6d1)
