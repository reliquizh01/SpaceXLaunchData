import logo from './logo.svg';
import './App.css';
import SearchBar from './pages/SearchBar';
import SearchResult from './pages/SearchResult';
import axios from 'axios';
import { useState } from 'react';
import './css/mainApp.css';

axios.defaults.baseURL = 'https://api.spacexdata.com/v4';

function App() {
  const [searchKeyword, setKeyWord] = useState("");

  const updateKeyWord = (e) =>{
    setKeyWord(e.target.value);
  }
  return (
    <div className="App bg">
      <br />
      <SearchBar setKeyWord={setKeyWord} />
      <br />
      <SearchResult keyWord={searchKeyword}/>
    </div>
  );
}

export default App;
