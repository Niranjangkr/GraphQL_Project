import { useQuery } from "@apollo/client";
import { getAuthorQuery } from "../gqlQueries/queries";

function DisplayAuthor(){
    const {loading, error, data} = useQuery(getAuthorQuery)
    if (loading) return <option>Loading Books...</option>
    if (error){
     console.log(error.message)
    }

    // console.log(data)
    return (
        <>
            {
            data.authors.map(authors =>{
                return (
                <option key = {authors.id} value = {authors.id}>{authors.name}</option>
              )
            })
        }
        </>
    )
}

export default DisplayAuthor