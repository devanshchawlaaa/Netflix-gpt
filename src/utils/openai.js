import OpenAI from 'openai';
import { OPEN_AI } from './constants';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true 
});

export default openai