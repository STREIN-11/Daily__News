import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Load from './Load';
import PropTypes from 'prop-types'



export class News extends Component {

    static defaultProps = {
        category: 'general',
        pageSize: 12
    }
    static propTypes = {
        category: PropTypes.string,
        pageSize: PropTypes.number,
    }
    
    constructor() {
        super();
        this.state = {
            articles: [],
            page:1,
            loading: false
            
        }
    }

    async componentDidMount(){
        let url =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&from=2024-08-14&to=2024-08-14&sortBy=popularity&apiKey=82549a4c79ac4618b2eea47cd49dbb9b&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json()

        this.setState({articles: parseData.articles, 
            totalResults: parseData.totalResults,
            loading: false
        })
    }

    left = async() =>{
        console.log("Left");
        let url =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&from=2024-08-14&to=2024-08-14&sortBy=popularity&apiKey=82549a4c79ac4618b2eea47cd49dbb9b&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json()

        this.setState({
            page: this.state.page-1,
            articles: parseData.articles,
            loading: false
        })
    }
    right = async() =>{
        if (!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
        console.log("Right");

        let url =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&from=2024-08-14&to=2024-08-14&sortBy=popularity&apiKey=82549a4c79ac4618b2eea47cd49dbb9b&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json()

        this.setState({
            page: this.state.page+1,
            articles: parseData.articles,
            loading: false
        })
        }
    }
    render() {
        return (
            <>
                <div className="container my-3">
                    <h2>Get Updated</h2>
                    {this.state.loading && <Load/>}
                    <div className="row">
                        {!this.state.loading &&  this.state.articles.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <NewsItem title={element.title?element.title.slice(0, 20):""} 
                                description={element.description?element.description.slice(0,80):""} 
                                image_url={element.urlToImage?element.urlToImage:"No Image Found"} 
                                newsUrl={element.url} />
                            </div>
                        })}
                    </div>
                    <div className="d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" onClick={this.left} class="btn btn-dark">&larr; Previous</button>
                    <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" class="btn btn-dark" onClick={this.right}>Next &rarr;</button>
                    </div>
                </div>
            </>
        )
    }
}

export default News
