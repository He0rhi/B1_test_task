import { useState, useEffect } from 'react';
import { fetchNews } from '../api/newsApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setErrorCodeSlice } from '../slice/searchSlice';
export  interface Article {
    id:number;
    publishedAt: string;
    title: string;
    description: string;
    urlToImage: string;
    content:string;
    author:string;
    url:string;
}

interface UseFetchNewsReturn {
    articles: Article[];
    loading: boolean;
    error: string | null;
    getCachedNews: (type: string) => Article[] | null;
}

const useFetchNews = (
    query: string,
    from?: string,
    sortBy?: string,
    domains:string = '',
    cacheKey: string = 'defaultCacheKey'
): UseFetchNewsReturn => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
const errorSlice = useSelector((state:RootState)=>state.search.errorCodeSlice);
const dispatch = useDispatch();
    const getCachedNews = (type: string): Article[] | null => {
        const cachedData = localStorage.getItem(type);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            const currentTime = new Date().getTime();
            if (currentTime - parsedData.timestamp < 3600000) { 
                return parsedData.articles;
            }
        }
        return null;
    };

    useEffect(() => {
        const fetchNewsData = () => {
            setLoading(true);
            setError(null);

            fetchNews(query, from, sortBy,domains)
                .then((data: Article[]) => {
                    const validArticles = data.filter(article =>
                        article.title &&
                        article.title !== '[Removed]' &&
                        article.description &&
                        article.description !== '[Removed]' &&
                        article.urlToImage
                    );

                    const sortedArticles = sortBy === 'publishedAt'
                        ? validArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                        : validArticles;

                    setArticles(sortedArticles);

                    if (!query) {
                        localStorage.setItem(
                            cacheKey,
                            JSON.stringify({
                                articles: sortedArticles,
                                timestamp: new Date().getTime(),
                            })
                        );
                    }
                })
                .catch((err: Error) => {
                    setError(err.message);
                    const errorCode = parseInt(err.message.split(':')[1]) 
                     dispatch(setErrorCodeSlice(errorCode))

                })
                .finally(() => {
                    setLoading(false);
                });};

        if (!query) {
            const cachedArticles = getCachedNews(cacheKey);
            
                query='technology';
                fetchNewsData();
            
        } else {
            fetchNewsData();
        }
    }, [query, from, sortBy,domains, cacheKey]);

    return { articles, loading, error, getCachedNews };
};

export default useFetchNews;
