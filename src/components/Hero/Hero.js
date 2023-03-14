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
        <div className='hero_flex'>
            <div className='container-width'>
          <div className='hero_content'>
            <h1>{heroTitle}</h1>
            <p>{heroText}</p>

            <div className='hero_btn_container'>
                <div className='hero_button'>
                <a href={heroBtnUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">{heroBtnTitle}</a>
                </div>
                <div className='tagline'>
                    <p>{heroBtnText}</p>
                </div>
            </div>
          </div>
          <div className='hero_img'>
            <img src={heroImages} alt="hero" />
          </div>
          </div>
        </div>
      </section>
  )
}

export default Hero
