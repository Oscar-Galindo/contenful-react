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
  <section className='value' id='value_proposition'>
    <div className='value_flex'>
      <div className='container-width'>
        <div className='value_img'>
          <div className='value_img_slim'>
          <img src={valuePropositionImageThin} alt='value proposition'/>
          </div>
          <div className='value_img_thick'>
          <img src={valuePropositionImageLarge} alt='value proposition'/>
          </div>
        </div>
        <div className='value_content'>
         <h3>{valuePropositionTitle}</h3>
          <p>{valuePropositionContent}</p>        
        </div>
      </div>
    </div>
    </section>
)
}


export default ValueProposition
