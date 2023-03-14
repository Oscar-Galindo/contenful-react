import { createClient } from 'contentful';

const spaceId = 'ge20ega7j1zb';
const accessToken = 'pl0nUNcIZBHMgtGopcWNm7KoP7eFWx0xvND_BFtyLaw';


export const client = createClient({
  space: spaceId ,
  accessToken: accessToken
});
