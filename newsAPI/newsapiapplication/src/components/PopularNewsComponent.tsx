import React, { useState, useEffect } from 'react';
import { Article } from '../hooks/useFetchNews';


interface PopularNewsComponentProps {
    articles: Article[];
    formatDate: (dateStr: string) => string;
    formatTitle: (title: string, limit: number) => string;
    onArticleClick: (article: Article) => void;
}

const PopularNewsComponent: React.FC<PopularNewsComponentProps> = ({ articles, formatDate, formatTitle, onArticleClick  }) => {
    const PAGE_SIZE = 10; 
    const [visibleArticles, setVisibleArticles] = useState(PAGE_SIZE);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            setVisibleArticles((prev) => Math.min(prev + PAGE_SIZE, articles.length));
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [articles.length]);

    return (
        <div className="search-news-container">
            <div className="search-news-list">
                {articles.slice(0, visibleArticles).map((article, index) => (
                    <div key={index} className="search-news-card fade-in">
                        <img
                            className="search-news-image"
                            src={article.urlToImage}
                            alt="News"
                        />
                        <div className="search-news-text">
                        <p className='last-news-datetime'>{formatDate(article.publishedAt)}</p>

                        <p 
                                className="search-news-title" 
                                onClick={() => onArticleClick(article)}
                            >
                                {article.title}
                            </p>       
                  
                        </div>
                    </div>
                ))}
            </div>
            {visibleArticles < articles.length && <p>Загрузка...</p>}
        </div>
    );
};

export default PopularNewsComponent;
