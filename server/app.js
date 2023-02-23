const express = require ('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors');


mongoose.connect('mongodb+srv://Niranjangkr:Niranjan123@cluster0.txoencd.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log("connected to database")
})

const app = express();

// allow cross origin request 
app.use(cors());

app.use('/graphql', graphqlHTTP.graphqlHTTP({
    schema,  //this schema we are referring to defines the graph and relation of data
    graphiql: true
}));

app.listen(3001, () =>{
    console.log("listening request on port 3001");
});