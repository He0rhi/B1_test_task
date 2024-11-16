import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setPeriodFromSlice,
  setsearchDomainSlice,
  setSearchTextSlice,
  setShowTopicNewsSlice,
  setSortSlice,
  setShowDomainsNewsSlice,
} from '../slice/searchSlice';
import AdvancedSearchModal from './AdvancedSearchModal';

const HeaderComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); 

  const handleInputChange = (values: string) => {
    setInputText(values);
  };

  const handleAdvancedSearch = (searchParams: any) => {
    dispatch(setSearchTextSlice(searchParams.searchText || ''));
    dispatch(setsearchDomainSlice(searchParams.domains));
    dispatch(setSortSlice(searchParams.sortBy));
    dispatch(setPeriodFromSlice(searchParams.periodFrom));
    dispatch(setShowTopicNewsSlice(true));
    dispatch(setShowDomainsNewsSlice(true));
    setIsModalOpen(false);
  };

  const handleLogoInput = () => {
    dispatch(setSearchTextSlice(''));
    dispatch(setShowTopicNewsSlice(true));
    dispatch(setShowDomainsNewsSlice(true));
  };

  const handleSearch = () => {
    dispatch(setSearchTextSlice(inputText));
    dispatch(setShowTopicNewsSlice(false));
  };

  const handleSearchTopic = (value: string) => {
    dispatch(setsearchDomainSlice(''));
    dispatch(setSearchTextSlice(value));
    dispatch(setShowTopicNewsSlice(false));
  };

  const handleSearchDomain = (value: string) => {
    dispatch(setSearchTextSlice(''));
    dispatch(setsearchDomainSlice(value));
    dispatch(setShowTopicNewsSlice(true));
    dispatch(setShowDomainsNewsSlice(false));
  };

  return (
    <header>
      <button type="button" className="header-logo" onClick={handleLogoInput}>
        TECHNICAL NEWS
      </button>

      <div className="header-options-container">
        <div
          className={`search-container ${isSearchExpanded ? 'expanded' : ''}`}
          onClick={() => setIsSearchExpanded(!isSearchExpanded)} 
        >
          <button
            type="button"
            className="searchButton"
            onClick={handleSearch}
          ></button>
          <input
            className="searchInput"
            value={inputText}
            type="text"
            title="Поиск"
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <button
            type="button"
            className="advansed-search-button"
            onClick={() => setIsModalOpen(true)}
          >
            Фильтры
          </button>
        </div>

        <button
          type="button"
          className="menu-toggle-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Меню
        </button>

        {isMenuOpen && (
          <div className="menu-container">
            <div className="menu-container-topic">
              <p className="menu-container-title">Темы:</p>
              <button
                type="button"
                className="menu-topic-search-button"
                onClick={() => handleSearchTopic('Apps')}
              >
                Приложения
              </button>
              <button
                type="button"
                className="menu-topic-search-button"
                onClick={() => handleSearchTopic('AI')}
              >
                ИИ
              </button>
              <button
                type="button"
                className="menu-topic-search-button"
                onClick={() => handleSearchTopic('Security')}
              >
                Защита
              </button>
            </div>

            <div className="menu-container-domains">
              <p className="menu-container-title">Источники:</p>
              <button
                type="button"
                className="menu-topic-search-button"
                onClick={() => handleSearchDomain('bbc.co.uk')}
              >
                BBS
              </button>
              
              <button
                type="button"
                className="menu-topic-search-button"
                onClick={() => handleSearchDomain('engadget.com')}
              >
                Engadget
              </button>
             
              <button
                type="button"
                className="menu-topic-search-button"
                onClick={() => handleSearchDomain('medium.com')}
              >
                Medium
              </button>
            </div>

            <button
              type="button"
              className="menu-topic-search-button-main"
              onClick={handleLogoInput}
            >
              Главная
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AdvancedSearchModal
          onClose={() => setIsModalOpen(false)}
          onSearch={handleAdvancedSearch}
        />
      )}
    </header>
  );
};

export default HeaderComponent;
