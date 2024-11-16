import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Article } from '../hooks/useFetchNews';
interface SearchResultsComponentProps {
    articles: Article[];
    formatDate: (dateStr: string) => string;
    formatTitle: (title: string, limit: number) => string;
    onArticleClick: (article: Article) => void;

}

const SearchResultsComponent: React.FC<SearchResultsComponentProps> = ({articles,formatDate,formatTitle,onArticleClick 
}) => {
    const searchText = useSelector((state: RootState) => state.search.searchTextSlice);

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
        <div className="search-results-container">
            <h2>Результаты поиска по запросу {searchText}</h2>
            <div className="search-results-list">
                {articles.length === 0 ? (
                    <p>Нет новостей по вашему запросу.</p>
                ) : (
                    articles.slice(0, visibleArticles).map((article, index) => (
                        <div key={index} className="search-results-card fade-in">
                            <img
                                className="search-results-image"
                                src={article.urlToImage}
                                alt="News"
                            />
                            <div className="search-results-text">
                                <p className="search-results-title"       onClick={() => onArticleClick(article)}>
                                    {formatTitle(article.title, 20)}
                                </p>
                                <p className="search-results-description">{article.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {visibleArticles < articles.length && <p>Загрузка...</p>}
        </div>
    );
};

export default SearchResultsComponent;
