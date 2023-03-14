import React, { useState, useEffect, useCallback} from 'react'
import {client} from '../../client'

function KeyboardNavigation() {
    const [keyboardNavigation, setKeyboardNavigation] = useState({});
    const [isKeyboardNavigationLoading, setIsKeyboardNavigationLoading] = useState(false);
  
    const cleanUpKeyboardNavigation = useCallback(rawData => {
      const { sys, fields } = rawData;
      const { id } = sys;
      const keyboardNavigationTitle = fields.buttonTitle;
      const keyboardNavigationB = fields.preOrderUrl;
      const keyboardNavigationLogo = fields.logo.fields.file.url;
      let cleanKeyboardNavigation = { id, keyboardNavigationTitle, keyboardNavigationB, keyboardNavigationLogo };
  
      setKeyboardNavigation(cleanKeyboardNavigation);
    }, []);
  
    const getKeyboardNavigation = useCallback(async () => {
      setIsKeyboardNavigationLoading(true);
      try {
        const response = await client.getEntry('1C9t7rKT7dsPdyXpIe1IlR');
        if (response) {
          cleanUpKeyboardNavigation(response);
        } else {
          setKeyboardNavigation({});
        }
        setIsKeyboardNavigationLoading(false);
      } catch (error) {
        console.log(error);
        setIsKeyboardNavigationLoading(false);
      }
    }, [cleanUpKeyboardNavigation]);
  
    useEffect(() => {
      getKeyboardNavigation();
    }, [getKeyboardNavigation]);
  
    const { keyboardNavigationTitle, keyboardNavigationB, keyboardNavigationLogo } = keyboardNavigation || {};

  
    return (
      <section className='navigation' id='navigation'>
        <div className='navigation_row'>
          <div className='navigation_column_logo'>
            <img src={keyboardNavigationLogo} alt="hero" />
          </div>
          <div className='navigation_column_logobtn'>
          <a href={keyboardNavigationB} className="btn" target="_blank" rel="noopener noreferrer">{keyboardNavigationTitle}</a>
          </div>
        </div>
      </section>
    );
  }
  
  export default KeyboardNavigation;
