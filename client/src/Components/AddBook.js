import DisplayAuthor from "./DisplayAuthors";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { addBookMutation, getBooksQuery } from "../gqlQueries/queries";

function AddBook(){

    const [name, setName] = useState("")
    const [genre, setGenre] = useState("")
    const [author, setauthorID] = useState("")

    // adding data in database
    const [addBook, { data, loading, error }] = useMutation(addBookMutation);
    const handleAddBook = () => {
        addBook({variables: { name, genre, author }, refetchQueries: [{query: getBooksQuery}]});
    } 
    
    if (loading) return 'Submitting...';

    if (error){
        return <p>Error: {error.message}</p>;
    } 
        return(
            <form onSubmit={ e => {
                e.preventDefault();
                handleAddBook()
            }}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={ event => setName(event.target.value) }/>
                </div>
                <div className="field">
                    <label>Genre</label>
                    <input type="text" onChange={ event => setGenre(event.target.value)}/>
                </div>
                <div className="field">
                    <label>Select author</label>
                    <select onChange={ event => setauthorID(event.target.value)}>
                        <option>select author</option>
                        <DisplayAuthor />
                    </select>
                </div>
                <button>+</button>
            </form>
        )
    }

export default AddBook;