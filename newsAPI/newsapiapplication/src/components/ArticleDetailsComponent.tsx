import React from 'react';
import { Article } from '../hooks/useFetchNews';
interface ArticleDetailsProps {
    article: Article;
    onBack: () => void; 
}

const ArticleDetailsComponent: React.FC<ArticleDetailsProps> = ({ article, onBack }) => {
    return (
        <div className="article-details-container">
            <button className='article-details-container-button-back' onClick={onBack} >
                Назад
            </button>
            <p className='article-details-publishedAt'>
  <strong>Опубликовано:</strong> {new Date(article.publishedAt).toLocaleString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })}
</p>
            <h1 className='article-details-title'>{article.title}</h1>

            <img className='article-details-image' src={article.urlToImage} alt="Article"  />
            <p className='article-details-author' ><strong>Автор:</strong> {article.author || 'Неизвестно'}</p>

            <p className='article-details-discription'><strong>Описание:</strong> {article.description}</p>
            <p className='article-details-content'><strong>Контент:</strong> {article.content}</p>
            <a className='article-details-more' href={article.url} target="_blank" rel="noopener noreferrer">Читать полностью</a>
        </div>
    );
};

export default ArticleDetailsComponent;
