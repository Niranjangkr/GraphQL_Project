const graphql = require('graphql');
const Book = require ('../models/book');
const Author = require ('../models/author');

const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull} = graphql;
const _ = require('lodash')

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                // console.log(parent);
                // return _.find(authors, {id: parent.authorId}) //for dummy data
                return Author.findById(parent.authorId);// this is going to look for id in Author that matches the parent.authorId and then going to return it 
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return _.filter(books, {authorId: parent.id}) // for dummy data
                return Book.find({authorId: parent.id}); //this is goint to look for all the matches that satisfies the criteria in the find function and then will retrive it , here condition is authorId which is of Book schema equals to parent.id that is of author so it will return all the Book which has same authorId as parent.id 
            }
        }
    })
})

// making a single entry point for querires || how we initially jump into the graph
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from dataBase/other sources
                // return _.find(books, {id: args.id}); // for dummy data
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find(authors, {id: args.id}) // for dummy data
                return Author.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books // for dummy data
                return Book.find({}); //when we pass empty criteria for find its going to return all the objects or data cause they all match as no condition
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors // for dummy data
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                author: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.author
                })
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})