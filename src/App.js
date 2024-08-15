import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';

export default class App extends Component {
  render() {
    let ui  = "82549a4c79ac4618b2eea47cd49dbb9b";
    return (
      <div>
        <Router>
        <Navbar />
        <Routes>
        <Route path='/' element={<News key="india" category="india" pageSize={12}/>}/>
        <Route path='/about' element={<News key="about" category="about" pageSize={12}/>}/>
        <Route path='/business' element={<News key="business" category="business" pageSize={12}/>}/>
        <Route path='/entertainment' element={<News key="entertainment"  category="entertainment" pageSize={12}/>}/>
        <Route path='/general' element={<News key="general"  category="general" pageSize={12}/>}/>
        <Route path='/health' element={<News key="health"  category="health" pageSize={12}/>}/>
        <Route path='/science' element={<News key="science"  category="science" pageSize={12}/>}/>
        <Route path='/sports' element={<News key="sports"  category="sports" pageSize={12}/>}/>
        </Routes>
        </Router>
      </div>
    )
  }
}

