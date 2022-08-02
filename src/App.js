// import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ImgIdPage from "./pages/ImgIdPage";
import ListPage from "./pages/ListPage";

function App() {

  return (
    <BrowserRouter basename={'/mxm-course-finder'}>
        <Routes>
            <Route path={'/'} element={<ListPage/>}/>
            <Route path={'/img/:imgId'} element={<ImgIdPage/>}/>
        </Routes>

    </BrowserRouter>
  );
}

export default App;
