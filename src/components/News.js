import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Load from './Load';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        q: "india",
        pageSize: 12
    }
    static propTypes = {
        q: PropTypes.string,
        pageSize: PropTypes.number,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            loading: true,
            totalResults: 0

        }
    }

    async componentDidMount() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/everything?q=${this.props.q}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(40);
        let parseData = await data.json()
        this.props.setProgress(80);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    left = async () => {
        console.log("Left");
        let url = `https://newsapi.org/v2/everything?q=${this.props.q}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json()

        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
    }
    right = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            console.log("Right");

            let url = `https://newsapi.org/v2/everything?q=${this.props.q}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parseData = await data.json()

            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false
            })
        }
    }
    fetchMoreData = async() => {
        this.setState({page: this.state.page +1})
        const url =`https://newsapi.org/v2/everything?q=${this.props.q}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            loading: false,
        })
      };

    render() {
        return (
            <>
                    <h2 className='text-center' style={{margin: '25px 0px'}}>Get Updated</h2>
                    {this.state.loading && <Load/>}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length != this.state.totalResults}
                        loader={<Load/>}
                    >
                        <div className="container">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 20) : element.title}
                                    description={element.description ? element.description.slice(0, 80) : ""}
                                    image_url={element.urlToImage ? element.urlToImage : "No Image Found"}
                                    author={element.author ? ("author: " + element.author) : "author: Unknown"}
                                    publishedAt={element.publishedAt ? element.publishedAt : "Unknown"}
                                    newsUrl={element.url} />
                            </div>
                        })}
                    </div>
                    </div>
                    </InfiniteScroll>
                    {/* <div className="d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" onClick={this.left} class="btn btn-dark">&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.right}>Next &rarr;</button>
                    </div> */}
            </>
        )
    }
}

export default News
