import {inspect} from 'util';
// import colors = module
// import colors = module

const { writeFile } = require('fs');

const targetPath = './src/environments/environment.ts';
// const targetPathProd = './src/environments/environment.prod.ts';
// Load node modules
// const colors = require('colors');
require('dotenv').config();
// `environment.ts` file structure

const envConfigFile = `export const environment = {
    production: ${process.env.PRODUCTION},
    currentThemeLife: 604800000,
    API_TRACK: '${process.env.API}'
};
`;

if (process.env.NODE_ENV === 'prod'){
  console.log('The file `environment.ts` will be written with the following content: \n');
  console.log(envConfigFile);
  writeFile(targetPath, envConfigFile,  (err) => {
    if (err) {
      throw console.error(err);
    } else {
      console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
    }
  });
}
