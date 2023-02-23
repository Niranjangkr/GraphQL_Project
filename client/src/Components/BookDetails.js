import { useQuery } from "@apollo/client";
import { getBookQuery } from "../gqlQueries/queries";


function BookDetails({ id }) {
    const { loading, error, data } = useQuery(getBookQuery, {
        variables: { id },//use the same name variable as you have mentioned in query if its id there and your passing something like bookid as variable name it wont just accept in any case try to keep the variables name if you feel like its dependent or connected
    })
    if (error) { console.log(error.message) }
    if (loading) return <p id="book-details">Loading Book Details...</p>
    // destructuring elements from data
    const { book } = data;

    // console.log(data.book.author.book[0].name)
    if( book ){
        return (
            <div id="book-details">
                <h2>{book.name}</h2>
                <p><b>Genre: {book.genre}</b></p>
                <p><b>Author Name: {book.author.name}</b></p>
                <p><b>All books by these author: </b></p>
                <ul className="other-books">
                    {
                        book.author.book.map(item => {
                            return <li key={item.id}><b><i>{item.name}</i></b></li>
                        })
                    }
                </ul>
            </div>
        )
    }else{
        return (
            <p id="book-details">No Book selected </p>
        )
    }
}

export default BookDetails;