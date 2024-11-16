// LastNewsComponent.tsx
import React from 'react';

import { Article } from '../hooks/useFetchNews';

interface LastNewsComponentProps {
    articles: Article[];
    formatDate: (dateStr: string) => string;
    formatTitle: (title: string, limit: number) => string;
    onArticleClick: (article: Article) => void;

}

const LastNewsComponent: React.FC<LastNewsComponentProps> = ({ articles, formatDate, formatTitle, onArticleClick  }) => (
    <div className='last-news-container'>
        <div className='last-news-header'>
            <h4>Последние новости</h4>
        </div>
        <div className="last-news-list">
            {articles.length === 0 ? (
                <p>Нет новостей по вашему запросу.</p>
            ) : (
                articles.map((article, index) => (
                    <div key={index} className="last-news-card">
                        <p className='last-news-datetime'>{formatDate(article.publishedAt)}</p>
                        <p 
                                className="last-news-title" 
                                onClick={() => onArticleClick(article)}
                            >{formatTitle(article.title,15)}</p>
                    </div>
                ))
            )}
        </div>
    </div>
);

export default LastNewsComponent;
