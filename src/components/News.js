import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            page:1,
            loading: false
        }
    }

    async componentDidMount(){
        let url ="https://newsapi.org/v2/everything?q=india&from=2024-08-10&to=2024-08-10&sortBy=popularity&apiKey=129d6acd80354a1db2e1beae94db188f&page=1"
        let data = await fetch(url);
        let parseData = await data.json()

        this.setState({articles: parseData.articles})
    }

    left = async() =>{
        console.log("Left");
        let url =`https://newsapi.org/v2/everything?q=india&from=2024-08-10&to=2024-08-10&sortBy=popularity&apiKey=129d6acd80354a1db2e1beae94db188f&page=${this.state.page-1}&pageSize=10`;
        let data = await fetch(url);
        let parseData = await data.json()

        this.setState({
            page: this.state.page-1,
            articles: parseData.articles})
    }
    right = async() =>{
        console.log("Right");

        let url =`https://newsapi.org/v2/everything?q=india&from=2024-08-10&to=2024-08-10&sortBy=popularity&apiKey=129d6acd80354a1db2e1beae94db188f&page=${this.state.page+1}&pageSize=10`;
        let data = await fetch(url);
        let parseData = await data.json()

        this.setState({
            page: this.state.page+1,
            articles: parseData.articles})
    }
    render() {
        return (
            <>
                <div className="container my-3">
                    <h2>Get Updated</h2>
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <NewsItem title={element.title?element.title.slice(0, 20):""} 
                                description={element.description?element.description.slice(0,80):""} 
                                image_url={element.urlToImage?element.urlToImage:"No Image Found"} newsUrl={element.url} />
                            </div>
                        })}
                    </div>
                    <div className="d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" onClick={this.left} class="btn btn-dark">&larr; Previous</button>
                    <button type="button" class="btn btn-dark" onClick={this.right}>Next &rarr;</button>
                    </div>
                </div>
            </>
        )
    }
}

export default News
