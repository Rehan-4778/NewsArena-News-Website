import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      country: 'us',
      pageSize: 10,
      apiKey: '62c4cb7ca1454b96981ad3c93d89d07e',
      progress:0
    }
    
  }
 
  setProgress = (progress) =>{
    this.setState({progress:progress});
    }
  
  
  render() {
    return (
      <>
        <LoadingBar
          color='#1F77FE'
          progress={this.state.progress}
        />
        <Navbar navTitle='NewsArena' />
        <Routes>
          <Route exact path="/"
            element={<News setProgress={this.setProgress}  key="/" apiKey={this.state.apiKey} pageSize={this.state.pageSize} category='general' country={this.state.country} />}
          />
          <Route exact path="general"
            element={<News setProgress={this.setProgress}  key="general" apiKey={this.state.apiKey} pageSize={this.state.pageSize} category='general' country={this.state.country} />}
          />
          <Route exact path="business"
            element={<News setProgress={this.setProgress}  key="business" apiKey={this.state.apiKey} pageSize={this.state.pageSize} category='business' country={this.state.country} />}
          />
          <Route exact path="science"
            element={<News setProgress={this.setProgress}  key="science" apiKey={this.state.apiKey} pageSize={this.state.pageSize} category='science' country={this.state.country} />}
          />
          <Route exact path="sports"
            element={<News setProgress={this.setProgress}  key="sports" apiKey={this.state.apiKey} pageSize={this.state.pageSize} category='sports' country={this.state.country} />}
          />
          <Route exact path="technology"
            element={<News setProgress={this.setProgress}  key="technology" apiKey={this.state.apiKey} pageSize={this.state.pageSize} category='technology' country={this.state.country} />}
          />
          <Route exact path="entertainment"
            element={<News setProgress={this.setProgress}  key="entertainment" apiKey={this.state.apiKey} pageSize={this.state.pageSize} category='entertainment' country={this.state.country} />}
          />
          <Route exact path="health"
            element={<News setProgress={this.setProgress}  key="health" apiKey={this.state.apiKey} pageSize={this.state.pageSize} category='health' country={this.state.country} />}
    />
        </Routes>
      </>
    )
  }
}
