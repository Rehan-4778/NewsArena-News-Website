import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

    constructor(props) {
        super(props);
        document.title = `NewsArena -${this.CapitalizeFirstChar(this.props.category)}`;
        this.state = {
            articles: [],
            totalResults: 0,
            pages: 1,
            loading: true
        }
    }

    CapitalizeFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }

    async UpdateNews(page) {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        //   console.log(parsedData);
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            loading: false,
            totalResults: parsedData.totalResults
        });
        this.props.setProgress(100);

    }

    async componentDidMount() {
        this.UpdateNews(this.state.pages);

    }

    fetchMoreData = async()=>{

        // we can't set page=page+1 here beacuse it does'nt changes imediately, that's why we pass "page+1" in url
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.pages+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            pages: this.state.pages+1,
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        });
        
    }
    
    
    render() {

        return (
            <>

                <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Top {this.CapitalizeFirstChar(this.props.category)} Headlines</h2>
                {/* When loading is true then Spinner component is called */}
                {this.state.loading && <Spinner />}
               
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    
                    loader={<Spinner/>}
                    >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} urlToImage={element.urlToImage ? element.urlToImage : "https://cdn.vox-cdn.com/thumbor/9HFTSljCSe_x6KGFU5yXjExaiYU=/0x305:4252x2531/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23897618/aurora32collection.jpg"} description={element.description ? element.description : ""} url={element.url} author={(element.author) ? element.author.slice(0, 17) : 'Unknown'} publishDate={element.publishedAt} source={element.source.name} />
                                </div>

                            })}
                        </div>
                     </div>
                </InfiniteScroll>
            </>
        )
    }
}

// setting default props
News.defaultProps = {
    country: 'us',
    category: 'general',
    pageSize: 10
};

// setting Proptypes
News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    apiKey: PropTypes.string,
    pageSize: PropTypes.number
};
