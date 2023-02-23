import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../gqlQueries/queries";
import BookDetails from "./BookDetails";
import { useState } from "react";

function BookList() {
  const {loading, error, data} = useQuery(getBooksQuery)
  if (error){
    console.log(error.message)
  }

  const [select, setSelect] = useState(null )

  if (loading){ return <div >Loading Books...</div>}else{
    return (
      <div>
        <ul className="book-list">
        {
          data.books.map(books =>{
            return (
                <li key = {books.id} onClick = {(e) => {setSelect(books.id)}}>{books.name}</li>
            )
          })
        }
      </ul>
      <ul>
        {/* keep the name of both passing and accepting variables at BookList function and here "id" same as in query */}
         <BookDetails id = {select}/> 
      </ul>
      </div>  
    );
  }
  }

  export default BookList;