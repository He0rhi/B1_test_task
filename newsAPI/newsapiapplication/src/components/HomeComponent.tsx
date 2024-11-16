import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFetchNews from '../hooks/useFetchNews';
import HeaderComponent from './HeaderComponent';
import LastNewsComponent from './LastNewsComponent';
import PopularNewsComponent from './PopularNewsComponent';
import SearchResultsComponent from './SearchResultComponent';
import ErrorModal from './ErrorModal';
import { RootState } from '../store/store';
import { setErrorCodeSlice, setSearchTextSlice, setShowDomainsNewsSlice, setShowTopicNewsSlice } from '../slice/searchSlice';
import TopicOrDomainNews from './TopicOrDomainNews';
import { Article } from '../hooks/useFetchNews';
import ArticleDetailsComponent from './ArticleDetailsComponent';
const HomeComponent: React.FC = () => {
    const dispatch = useDispatch();
    const showTopicNews = useSelector((state: RootState) => state.search.showTopicNewsSlice);
    const showDomainNews = useSelector((state:RootState)=>state.search.showDomainsNewsSlice);
    const searchText = useSelector((state: RootState) => state.search.searchTextSlice);
    const periodFrom = useSelector((state: RootState) => state.search.periodFromSlice);
    const searchDomain = useSelector((state: RootState) => state.search.searchDomainSlice);
    const searchSort = useSelector((state: RootState) => state.search.sortSlice);
    const errorCode = useSelector((state: RootState) => state.search.errorCodeSlice);

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const handleBack = () => {
        setSelectedArticle(null);
    };
    const handleArticleClick = (article: Article) => {
        setSelectedArticle(article);
        dispatch(setSearchTextSlice (''));
        dispatch(setShowTopicNewsSlice(true));
        dispatch(setShowDomainsNewsSlice(true));
    };
    const handleApiError = (error: string | null): string => {
        if (!error) return "Произошла неизвестная ошибка.";
        const errorCode = error.slice(-3);
        switch (errorCode) {
            case "400":
                return "Некорректный запрос. Проверьте параметры поиска.";
            case "403":
                return "Доступ запрещён. У вас недостаточно прав.";
            case "404":
                return "Ресурс не найден. Проверьте URL или параметры.";
            case "500":
                return "Внутренняя ошибка сервера. Попробуйте позже.";
            case "503":
                return "Сервер временно недоступен. Попробуйте позже.";
            case "429":
                return "Слишком много запросов. Запросы можно отправлять 50 раз каждые 12 часов, попробуйте позже.";
            default:
                return `Неизвестная ошибка: ${error}`;
        }
    };

    const { articles: actualArticles, loading: actualLoading, error: actualError } = useFetchNews('', '', 'publishedAt', '', 'latestNewsCache');
    const { articles: popularityArticles, loading: popularityLoading, error: popularityError } = useFetchNews('', '', 'popularity', '', 'popularNewsCache');
    const { articles: advancedSearchArticles, loading: advancedSearchLoading, error: advancedSearchError } = useFetchNews(
        searchText,
        periodFrom,
        searchSort,
        searchDomain,
        'searchResultNewsCache'
    );

    useEffect(() => {
        const combinedError = actualError || popularityError || advancedSearchError;
        if (combinedError) {
            const errorMessage = handleApiError(combinedError);
            dispatch(setErrorCodeSlice(errorMessage));
            setModalMessage(errorMessage);
            setShowModal(true);
        }
    }, [actualError, popularityError, advancedSearchError, dispatch]);

    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        const day = date.getDate().toString().padStart(2, '0');
        const monthNames = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
        const month = monthNames[date.getMonth()];
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day} ${month} ${hours}:${minutes}`;
    };

    const formatTitle = (title: string, limit: number): string => {
        const words = title.split(" ");
        return words.length > limit ? words.slice(0, limit).join(" ") + "..." : title;
    };

    if (actualLoading || popularityLoading || advancedSearchLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Загрузка...</p>
            </div>
        );
    }

    return (
        <div className='mainpage'>
            <HeaderComponent />
            <div>
                {!showTopicNews  ? (
                    <div className='news-body'>                        

                                                <TopicOrDomainNews topic={searchText} domains='' onArticleClick={handleArticleClick}/>

                    </div>
                ) :!showDomainNews  ? (
                    <div className='news-body'>
                                            <TopicOrDomainNews topic = '' domains = {searchDomain} onArticleClick={handleArticleClick}/>

                    </div>
                ) : searchText ? (
                    <div className='news-body'>
                    <SearchResultsComponent articles={advancedSearchArticles} formatDate={formatDate} formatTitle={formatTitle} onArticleClick={handleArticleClick} />
                </div>
                    
                    
                )  : selectedArticle ?(
                    <div className='news-body'><ArticleDetailsComponent article={selectedArticle} onBack={handleBack} /></div>
                ):(
                    <div className='news-body'>
                    <LastNewsComponent articles={actualArticles} formatDate={formatDate} formatTitle={formatTitle} onArticleClick={handleArticleClick}/>
                    <PopularNewsComponent articles={popularityArticles} formatDate={formatDate} formatTitle={formatTitle} onArticleClick={handleArticleClick} />
                </div>
                )}
            </div>
            {showModal && <ErrorModal message={modalMessage} onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default HomeComponent;
