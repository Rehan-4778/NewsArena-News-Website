import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        const {urlToImage, title , description, url, source , author , publishDate} = this.props;
        return (
            <div className="my-3">
                <div className="card">
                <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">{source}
                 </span>
                    <img src={urlToImage} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <span className="display-block badge bg-secondary">By <strong>{author}</strong> Published on {new Date(publishDate).toDateString()}</span>
                            <p className="card-text">{description}</p>
                            <a rel="noopener noreferrer" href={url} target='_blank' className="btn btn-sm btn-primary">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}
