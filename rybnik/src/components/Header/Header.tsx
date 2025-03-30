import React from 'react';
import '../../components/styles/global.css'
import './Header.css'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';


const Header: React.FC = () => {
  return (
    <div className="holder_img" id='up'>
      <div className="holder_container">
        <div className="logo">
          <img src="img/icon/site_logo.png" alt="Logo" />
        </div>
        <div className="div_hover">
          <a className='hover' href="#swiper">Каталог</a>
          <a className='hover' href="#footer">Контакты</a>
          <a className='hover' href="#ocean">Предложения</a>
          <a className='hover' href="#footer">О Нас!</a>
        </div>
        <a className='circleUp'href="up">< ArrowCircleUpIcon/></a>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 25 160 40" className="waves">
        <defs><path id="wave" d="M-150 53c30.77 0 59.538-20 90-20 31.077 0 60.256 20 90 20 30.77 0 59.23-20 90-20 30.77 0 59.23 20 90 20v20h-360z"/></defs>
        <g>
          <use xlinkHref="#wave" x="50" y="0" fill="#7986cb"/>
          <use xlinkHref="#wave" x="50" y="2" fill="#5c6bc0"/>
          <use xlinkHref="#wave" x="50" y="4" fill="#ffffff"/>
        </g>
      </svg>
    </div>
  );
};

export default Header;