import React, {useState, useEffect, useCallback} from 'react'
import {client} from '../../client'


function Hero() {
    const [hero, setHero] = useState({});
    const [isHeroLoading, setIsHeroLoading] = useState(false);

    const cleanUpHero = useCallback(rawData => {
        const { sys, fields } = rawData;
        const { id } = sys;
        const heroTitle = fields.title;
        const heroText = fields.content;
        const heroBtnTitle = fields.buttonTitle;
        const heroBtnUrl = fields.buttonUrl;
        const heroBtnText = fields.text;
        const heroImages = fields.heroImage.fields.file.url;
        let cleanHero = { id, heroTitle, heroText, heroImages, heroBtnTitle, heroBtnUrl, heroBtnText};
    
        setHero(cleanHero);
      }, []);

      const getHero = useCallback(async () => {
        setIsHeroLoading(true);
        try {
          const response = await client.getEntry('62tf8PHYYiwscGe9C0B7f5');
          if (response) {
            cleanUpHero(response);
          } else {
            setHero({});
          }
          setIsHeroLoading(false);
        } catch (error) {
          console.log(error);
          setIsHeroLoading(false);
        }
      }, [cleanUpHero]);
      useEffect(() => {
        getHero();
      }, [getHero]);

      const { heroTitle, heroText, heroImages, heroBtnTitle, heroBtnUrl, heroBtnText} = hero || {};

  return (
    <section className='hero' id='hero'>
        <div className='hero_row'>
          
          <div className='hero_column_logobtn'>
            <h1>{heroTitle}</h1>
            <p>{heroText}</p>
          <a href={heroBtnUrl} className="btn" target="_blank" rel="noopener noreferrer">{heroBtnTitle}</a>
          </div>
          <div className='hero_column_logo'>
            <img src={heroImages} alt="hero" />
          </div>
        </div>
      </section>
  )
}

export default Hero
