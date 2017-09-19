import fs from 'fs';
import path from 'path';
import pathIsAbsolute from 'path-is-absolute';

import { renderString } from 'template-file';

const templateDir = ({ source = '', destination = 'destination', onlyFiles = false, exclude = [] } = {}, data = {}) => {
  const cwd = process.cwd();

  const thisSource = pathIsAbsolute(source) ? source : path.join(cwd, source);
  const thisDestination = pathIsAbsolute(destination) ? destination : path.join(cwd, destination);
  const thisOnlyFiles = onlyFiles;
  const thisExclude = exclude;


  try {
    const listOfFiles = fs.readdirSync(thisSource);
    const destinationExists = fs.existsSync(thisDestination);

    if (!destinationExists) {
      fs.mkdirSync(thisDestination);
    }

    listOfFiles.forEach((file) => {
      const thisFile = path.join(thisSource, file);
      const stat = fs.statSync(thisFile);

      if (stat && stat.isDirectory() && !thisOnlyFiles && !thisExclude.includes(file)) {
        const nextDestination = path.join(thisDestination, file);

        templateDir({
          source: thisFile,
          destination: nextDestination,
          onlyFiles: thisOnlyFiles,
          exclude: thisExclude,
        }, data);
      } else if (!stat.isDirectory()) {
        const template = fs.readFileSync(thisFile, 'utf-8');
        const filledTemplate = renderString(template, data);

        fs.writeFileSync(path.join(thisDestination, file), filledTemplate);
      }
    });
  } catch (e) {
    throw new Error(e);
  }
};

export default templateDir;
