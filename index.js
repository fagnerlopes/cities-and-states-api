import express from 'express';
import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());

async function createJsonStates() {
  try {
    const cities = JSON.parse(await readFile('./source/Cidades.json'));
    const states = JSON.parse(await readFile('./source/Estados.json'));
    
    states.forEach(state =>{      
      const citiesByState = cities.filter(city => {
        return city.Estado === state.ID;            
      });
      let fileNameState = './states/' + state.Sigla + '.json';
      writeFile(fileNameState, JSON.stringify(citiesByState));      
    });
  } catch (err) {
    console.log(err);
  }  
}

app.listen(3000, async () => {
  console.log('API started');
  createJsonStates();
  
});