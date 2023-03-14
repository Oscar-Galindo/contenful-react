import React, {useState, useEffect, useCallback} from 'react'
import {client} from '../../client'

function FeaturedTitle() {
  const [features, setFeatures] = useState([]);
  const [isFeatureLoading, setIsFeatureLoading] = useState(false);

  const cleanUpFeatures = useCallback(rawData => {
    return rawData.items.map(item => {
      const { sys, fields } = item;
      const { id } = sys;
      const featureImages = fields.iconFeatured.fields.file.url;
      const featureTitle = fields.iconTitle;
      const featureText = fields.iconContent;
      return { id, featureImages, featureTitle, featureText };
    });
  }, []);

  const getFeatures = useCallback(async () => {
    setIsFeatureLoading(true);
    try {
      const response = await client.getEntries({ content_type: 'featuredTitle'});
      if (response) {
        const cleanedFeatures = cleanUpFeatures(response);
        setFeatures(cleanedFeatures);
      } else {
        setFeatures([]);
      }
      setIsFeatureLoading(false);
    } catch (error) {
      console.log(error);
      setIsFeatureLoading(false);
    }
  }, [cleanUpFeatures]);

  useEffect(() => {
    getFeatures();
  }, [getFeatures]);

  return (
    <div>
      {features.map(item => (
        <div key={item.id}>
          <img src={item.featureImages} alt="featured" />
          <h2>{item.featureTitle}</h2>
          <p>{item.featureText}</p>
        </div>
      ))}
    </div>
  )
}

export default FeaturedTitle