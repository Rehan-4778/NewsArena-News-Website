import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

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

    CapitalizeFirstChar = (string)=> {
       return string.charAt(0).toUpperCase() + string.slice(1);
        
    }

    async UpdateNews(page){
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
        //same code executed in UpdateNews()
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.pages}&pageSize=${this.props.pageSize}`;
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({
    //         articles: parsedData.articles,
    //         loading: false,
    //         totalResults: parsedData.totalResults
    //     });

    }

    handleNextClick = async () => {
        //move to the top of window
        window.scroll(0,0);
        this.setState({loading:true});
        this.UpdateNews(this.state.pages + 1);
        this.setState({
            pages: this.state.pages + 1
        });
    }

    handlePreviousClick = async () => {
        //move to the top of window
        window.scroll(0,0);
        this.setState({loading:true});
        this.UpdateNews(this.state.pages - 1);
        this.setState({
            pages: this.state.pages - 1
        });
    }


    render() {

        return (
        <>

            <div className="container my3">
                <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Top {this.CapitalizeFirstChar(this.props.category)} Headlines</h2>
                {/* When loading is true then Spinner component is called */}
                {this.state.loading && <Spinner />}
                <div className="row">
                    {/* When loading is true then News Item component not called */}
                    {!(this.state.loading) && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} urlToImage={element.urlToImage ? element.urlToImage : "https://cdn.vox-cdn.com/thumbor/9HFTSljCSe_x6KGFU5yXjExaiYU=/0x305:4252x2531/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23897618/aurora32collection.jpg"} description={element.description ? element.description : ""} url={element.url} author={(element.author)? element.author.slice(0,17) : 'Unknown'} publishDate={element.publishedAt} source={element.source.name} />
                        </div>

                    })}

                    {!(this.state.loading) &&<div className="container d-flex justify-content-between" style={{ marginBottom: '2rem' }}>
                        <button disabled={this.state.pages <= 1} type="button" onClick={this.handlePreviousClick} className="btn space-between btn-dark"> &larr; Previous</button>
                        <button disabled={this.state.pages + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn space-between btn-dark">Next &rarr; </button>
                    </div>}

                </div>
            </div>
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
    country:PropTypes.string,
    category:PropTypes.string,
    apiKey:PropTypes.string,
    pageSize:PropTypes.number
  };
