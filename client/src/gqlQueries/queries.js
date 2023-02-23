import { gql } from '@apollo/client';

// making querie to get all books
export const getBooksQuery = gql`
  {
    books{
      name
      id 
    }
  }
`
export const getAuthorQuery = gql`
{
  authors{
    name
    id 
  }
}
`
export const addBookMutation = gql`
mutation($name: String!, $genre: String!, $author: ID!) {
  addBook(name:$name,  genre:$genre ,author:$author ){
   name
   id
	}
}
`

export const getBookQuery = gql`
  query($id:ID){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        book{
          name
          id
        }
      }
    }
  }
`