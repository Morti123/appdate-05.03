import React from 'react';
import './Filter.css'
import '../../components/styles/global.css'

interface FilterProps {
  filterProducts: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ filterProducts }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterProducts(e.target.value);
  };

  return (
    <div className="filter">
      <div>
        <input type="checkbox" id="All" className="input" onChange={handleFilterChange} value="All" />
        <p className="All">Все</p>
      </div>
      {/* Остальные фильтры */}
    </div>
  );
};

export default Filter;