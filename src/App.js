import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS
  state = {
    progress: 0
  }
  setProgress =(progress)=>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <Router>
        <Navbar />
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
        <Route path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="india" q="india" pageSize={12}/>}/>
        <Route path='/about' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="about" q="about" pageSize={12}/>}/>
        <Route path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" q="business" pageSize={12}/>}/>
        <Route path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment"  q="entertainment" pageSize={12}/>}/>
        <Route path='/general' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general"  q="general" pageSize={12}/>}/>
        <Route path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health"  q="health" pageSize={12}/>}/>
        <Route path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science"  q="science" pageSize={12}/>}/>
        <Route path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports"  q="sports" pageSize={12}/>}/>
        </Routes>
        </Router>
      </div>
    )
  }
}

