import React, { useState, useEffect } from 'react';
import useFetchNews from '../hooks/useFetchNews';
import '../css/App.css';
import { Article } from '../hooks/useFetchNews';
interface TopicOrDomainNewsProps {
  topic: string;
  domains: string;
  onArticleClick: (article: Article) => void;

}

const TopicOrDomainNews: React.FC<TopicOrDomainNewsProps> = ({ topic, domains, onArticleClick  }) => {
  const { articles, loading, error } = useFetchNews(topic || domains);
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

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div className="topic-news-container">
      <div className="topic-news-list">
        {articles.length === 0 ? (
          <p>Нет новостей по вашему запросу.</p>
        ) : (
          articles.slice(0, visibleArticles).map((article, index) => (
            <div key={index} className="topic-news-card fade-in">
              <img
                className="topic-news-image"
                src={article.urlToImage}
                alt="News"
              />
              <div className="topic-news-text">
               <p className="topic-news-title" onClick={() => onArticleClick(article)}>{article.title}</p>
                <p className="topic-news-description">{article.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {visibleArticles < articles.length && <p>Загрузка...</p>}
    </div>
  );
};

export default TopicOrDomainNews;
