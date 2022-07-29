import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {

  let [country, setCountry] = useState('us');
  let [pageSize, setPageSize] = useState(10);
  let [apiKey, setApiKey] = useState('e9545bc497ff4025b227d26c98cd6cec');
  let [progress, setProgress] = useState(0);

  const ChangeProgress = (progress) => {
    setProgress({ progress: progress });
  }

  return (
    <>
      <LoadingBar
        color='#1F77FE'
        progress={progress}
      />

      <Navbar navTitle='NewsArena' />
      <Routes>
        <Route exact path="/"
          element={<News changeProgress={ChangeProgress} key="/" apiKey={apiKey} pageSize={pageSize} category='general' country={country} />}
        />
        <Route exact path="general"
          element={<News changeProgress={ChangeProgress} key="general" apiKey={apiKey} pageSize={pageSize} category='general' country={country} />}
        />
        <Route exact path="business"
          element={<News changeProgress={ChangeProgress} key="business" apiKey={apiKey} pageSize={pageSize} category='business' country={country} />}
        />
        <Route exact path="science"
          element={<News changeProgress={ChangeProgress} key="science" apiKey={apiKey} pageSize={pageSize} category='science' country={country} />}
        />
        <Route exact path="sports"
          element={<News changeProgress={ChangeProgress} key="sports" apiKey={apiKey} pageSize={pageSize} category='sports' country={country} />}
        />
        <Route exact path="technology"
          element={<News changeProgress={ChangeProgress} key="technology" apiKey={apiKey} pageSize={pageSize} category='technology' country={country} />}
        />
        <Route exact path="entertainment"
          element={<News changeProgress={ChangeProgress} key="entertainment" apiKey={apiKey} pageSize={pageSize} category='entertainment' country={country} />}
        />
        <Route exact path="health"
          element={<News changeProgress={ChangeProgress} key="health" apiKey={apiKey} pageSize={pageSize} category='health' country={country} />}
        />
      </Routes>
    </>
  )
}

export default App