import React from 'react';
import '../../components/styles/global.css'
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer_container">
        <div className="info">
          <div className="icons">
            <a className="bi-instagram" id="insta" href="https://www.instagram.com/bronovitskiialeksandr?igsh=bDhyOXcyYzZ1ZG5k"></a>
            <a className="bi-telegram" id="tg" href=" https://t.me/+375296857651"></a>
            <a className="bi-whatsapp" id="vb" href="viber://chat?number=375296857651"></a>
          </div>
          <div className="tel">
            <a className="bi-telephone-fill" id="tel">+375 29 685-76-51</a>
          </div>
        </div>
        <div className="service">
          <h2>Услуги</h2>
          <p>Обслуживание аквариумов</p>
          <p>Продажа аквариумных рыб</p>
          <p>Продажа кормов</p>
          <p>Консультация</p>
        </div>
        <div className="about">
          <h2>О Нас</h2>
          <p>Более 200 обслуживаний ежегодно</p>
          <p>На рынке более 20 лет</p>
          <p>Высокое качество и стабильные цены</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;