import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    let [articles, setArticals] = useState([]);
    let [totalResults, setTotalResults] = useState(0);
    let [page, setPage] = useState(1);
    let [loading, setLoading] = useState(true);

    const CapitalizeFirstChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
        
    }

    const UpdateNews = async(page)=> {
        props.changeProgress(10);
        // console.log(props.country);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.changeProgress(30);
        let parsedData = await data.json();
        //   console.log(parsedData);
        props.changeProgress(70);
        
        setArticals(articles = parsedData.articles);
        setLoading(loading = false);
        setTotalResults(totalResults = parsedData.totalResults);
        
        props.changeProgress(100);
        
    }
    
    useEffect(() => {
        UpdateNews(page);
        document.title = `NewsArena -${CapitalizeFirstChar(props.category)}`; 

    }, [])

    const fetchMoreData = async () => {

        // we can't set page=page+1 here beacuse it does'nt changes imediately, that's why we pass "page+1" in url
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        setPage(page = page + 1);
        setArticals(articles = articles.concat(parsedData.articles));
        setTotalResults(totalResults = parsedData.totalResults);
    }

    return (
        <>

            <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Top {CapitalizeFirstChar(props.category)} Headlines</h2>
            {/* When loading is true then Spinner component is called */}
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}

                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
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

export default News