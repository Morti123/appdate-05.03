
import React from 'react';
import './Filter.css';
import '../../components/styles/global.css';
import {FilterProps} from '../methods/interfaces'

const Filter: React.FC<FilterProps> = ({ filterProducts, isVisible }) => {
  const categories = ['All', 'Скалярия', 'Снежный принц','Анциструс',"Данио","Хаплохромис","Креветки","Тернеция","Попугай","Гуппи","Гурами","Ампулярия","Барбус"];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterProducts(e.target.value); 
  };

  return (
    <div className={`filter ${isVisible ? 'filter_visible' : ''}`}>
      {categories.map(category => (
        <div key={category}>
          <input
            type="radio" 
            id={category}
            name="filter"
            className="input"
            onChange={handleFilterChange}
            value={category}
          />
          <label htmlFor={category}>{category}</label>
        </div>
      ))}
    </div>
  );
};

export default Filter;