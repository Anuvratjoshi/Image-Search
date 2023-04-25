import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function ImageSearch() {
    const searchData = useRef(null);
    const [searchText, setSearchText] = useState("");
    const [imageData, setImageData] = useState([])
    useEffect(() => {
        const options = {
            method: "flickr.photos.search",
            api_key: "ce0dcd91841d5929b585b53d173b7952",
            text: searchText,
            sort: "",
            per_page: 45,
            license: '4',
            extras: "owner_name, license",
            format: "json",
            nojsoncallback: 1
        }
        const parameters = new URLSearchParams(options);
        if (searchText) {
            const url = `https://api.flickr.com/services/rest/?${parameters}`
            axios.get(url).then((resp) => {
                console.log(resp.data)
                const arr = resp.data.photos.photo.map((imgData) => {
                    return fetchFlickrImageUrl(imgData, 'q');
                });
                setImageData(arr);
            }).catch((err) => {
                console.log(err)
            })
        }


    }, [searchText])
    const fetchFlickrImageUrl = (photo, size) => {
        let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
        if (size) {
            url += `_${size}`
        }
        url += '.jpg'
        return url
    }


    const bookmarkImage = (bookmarkImageUrl) => {
        //   console.log(bookmarkImageUrl)
        fetch("http://localhost:8080/bookmarkimage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                imageUrl: bookmarkImageUrl
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    return alert(data.error)
                }
                return alert(data.message)
            })

    }
    return (
        <>
            <center>
                <h2>React Photo Search
                    <Link to="/bookmarkedimage">
                        <button
                            style={{ cursor: "pointer", marginLeft: "40px", height: "25px", width: "120px" }}>
                            Bookmarks
                        </button>
                    </Link>
                </h2>
                <input
                    placeholder='Search for High resolution images'
                    onChange={(e) => { searchData.current = e.target.value }} />
                <button className='search' onClick={() => { setSearchText(searchData.current) }}>Search</button>

            </center>
            <section className='image-container'>

                {imageData.map((imageurl, key) => {
                    return (
                        <div className='flickr-image'>
                            <img onClick={() => bookmarkImage(imageurl)} src={imageurl} key={key} alt="searchImg.jpg" />
                        </div>
                    )

                })}

            </section>
        </>
    );
}

export default ImageSearch;
