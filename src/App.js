import './App.css';
import BookmarkedImage from './component/BookmarkedImage';
import ImageSearch from './component/ImageSearch';

import {BrowserRouter, Route, Routes} from "react-router-dom"
function App(){
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<ImageSearch/>} />
    <Route path='/bookmarkedimage' element={<BookmarkedImage/>} />
  </Routes>
  </BrowserRouter>
}
export default App