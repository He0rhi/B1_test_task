// AdvancedSearchModal.tsx
import React, { useState } from "react";

interface AdvancedSearchModalProps {
  onClose: () => void;
  onSearch: (searchParams: any) => void; 
}

const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({ onClose, onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [domains, setDomain] = useState<string[]>([]);
  const [periodTo, setPeriodTo] = useState(new Date(Date.now()).toISOString().split('T')[0]);
  const [periodFrom, setPeriodFrom] = useState("");

  const [isClosing, setIsClosing] = useState(false);
  const [customPeriod, setCustomPeriod] = useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });
  const [sortBy, setSortBy] = useState("date");
 
  const handleCustomPeriodClick = (date: string, isStart: boolean) => {
    setCustomPeriod((prev) => ({
      ...prev,
      [isStart ? "from" : "to"]: date,
    }));
  };

  const handleSearchClick = () => {
    onSearch({
      searchText,
      domains,
      periodFrom,
      sortBy,
    });
    closeModal();

  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  return (
    <div className={`modal-overlay ${isClosing ? "closing" : ""}`}>
      <div className="modal-content">
        <div className="modal-content-header">
          <h2>Расширенный поиск</h2>
          <button className="close-button" onClick={closeModal}>
            ✖
          </button>
        </div>
        <div className="form-group">
          <label>Текст для поиска:</label>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Введите текст для поиска"
            className="form-group-input"
          />
        </div>
     
  <div className="form-group">
  <label htmlFor="domains">Источники:</label>
  <select
    id="domains"
    multiple
    value={domains}
    onChange={(e) =>
      setDomain(Array.from(e.target.selectedOptions, (option) => option.value))
    }
    className="form-control"
  >
    <option className="form-option" value="bbc.co.uk">BBC</option>
    <option className="form-option" value="techcrunch.com">TechCrunch</option>
    <option className="form-option" value="engadget.com">Engadget</option>
    <option className="form-option" value="theverge.com">Theverge</option>
    <option className="form-option" value="techxplore.com">Techxplore</option>
    <option className="form-option" value="medium.com">Medium</option>
  </select>
</div>



        <div className="form-group">       
        <label>Период новостей:</label>
<select className="form-option" value={periodFrom} onChange={(e) => setPeriodFrom(e.target.value)}>
  <option className="form-option" value="">Все время</option>
  
  <option className="form-option" value={new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]}>
    За день
  </option>
  <option className="form-option" value={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}>
    За неделю
  </option>
  <option className="form-option" value={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}>
    За месяц
  </option>
</select>

        </div>
        <div className="form-group">
          <label>Сортировать по:</label>
          <select className="form-option" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option className="form-option" value="date">Дате</option>
            <option className="form-option" value="popularity">Популярности</option>
          </select>
        </div>
        <div className="form-group">
          <button className="search-button" onClick={handleSearchClick}>
            Искать
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchModal;
