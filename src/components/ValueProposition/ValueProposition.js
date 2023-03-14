import React, {useState, useEffect, useCallback} from 'react'
import { client } from '../../client';

function ValueProposition() {
  const [valueProposition, setValueProposition] = useState({});
  const [isvaluePropositionLoading, setIsValuePropositionLoading] = useState(false);

  const cleanUpValueProposition = useCallback(rawData => {
      const { sys, fields } = rawData;
      const { id } = sys;
      const valuePropositionImageThin = fields.thinFeaturedImage.fields.file.url;
      const valuePropositionImageLarge = fields.largeFeaturedImage.fields.file.url;
      const valuePropositionTitle = fields.featuredTitle;
      const valuePropositionContent = fields.featuredContent;
      let cleanValueProposition = { id, valuePropositionImageThin, valuePropositionImageLarge,valuePropositionTitle,valuePropositionContent };
  
      setValueProposition(cleanValueProposition);
    }, []);

    const getValueProposition = useCallback(async () => {
      setIsValuePropositionLoading(true);
      try {
        const response = await client.getEntry('3DB1gnvoX3x33gocfo1FoL');
        if (response) {
          cleanUpValueProposition(response);
          console.log(response);
        } else {
          setValueProposition({});
        }
        setIsValuePropositionLoading(false);
      } catch (error) {
        console.log(error);
        setIsValuePropositionLoading(false);
      }
    }, [cleanUpValueProposition]);
    useEffect(() => {
      getValueProposition();
    }, [getValueProposition]);

    const { valuePropositionImageThin, valuePropositionImageLarge,valuePropositionTitle,valuePropositionContent} = valueProposition || {};

return (
  <section className='' id=''>
      <p>{valuePropositionTitle}</p>
      <p>{valuePropositionContent}</p>
      <img src={valuePropositionImageThin} alt='value proposition'/>
      <img src={valuePropositionImageLarge} alt='value proposition'/>
    </section>
)
}


export default ValueProposition
