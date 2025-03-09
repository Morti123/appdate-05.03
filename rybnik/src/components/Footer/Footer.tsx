import React from 'react';
import '../../components/styles/global.css'
import './Footer.css'
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer_container">
        <div className="info">
          <div className="icons">
            <a href="https://www.instagram.com/bronovitskiialeksandr?igsh=bDhyOXcyYzZ1ZG5k"><InstagramIcon className="icon" id="insta"></InstagramIcon></a>
            <a href=" https://t.me/+375296857651"><TelegramIcon className="icon" id="tg"></TelegramIcon></a>
            <a href="viber://chat?number=375296857651"><WhatsAppIcon  className="icon" id="vb" ></WhatsAppIcon></a>
          </div>
          <div className="tel">
            <div className="cont"><PhoneIcon  className="i" id="tel"></PhoneIcon><p>+375 29 685-76-51</p></div>
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
          <p>Высокое качество и стабильные цены </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;