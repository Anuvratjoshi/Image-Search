import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function BookmarkedImage() {
    const [bookMarkedImage, setBookMarkedImage] = useState([])
    useEffect(() => {
        fetch("http://localhost:8080/bookmarkedimage", {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const images = result.reverse()
                setBookMarkedImage(images)
            })
    }, [])
    return <>
        <div>
            <Link to="/"><button>Go back</button></Link>
        </div>
        <div className="bookmarked-image">
            {bookMarkedImage.map((item) => {
                return <div>
                    <img key={item._id} src={item.imageUrl} alt="flickr.jpg" />
                </div>
            })}
        </div>
    </>
}
export default BookmarkedImage