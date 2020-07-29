import { promises as fsPromises, createReadStream, createWriteStream } from 'fs';
import path from 'path';
import csvtojson from 'csvtojson';
import { Readable, Transform, pipeline } from 'stream';
import readline from 'readline';

const convertCsvToJson = (inputFile, outputFile) => fsPromises.readFile(inputFile, 'utf-8')
  .then((fileContent) => csvtojson().fromString(fileContent))
  .then((json) => {
    const stringifiedData = json.reduce((str, obj) => `${str + JSON.stringify(obj)}\n`, '');
    return fsPromises.writeFile(outputFile, stringifiedData, 'utf-8');
  })
  .catch((error) => console.error(error));

const streamifyCsvToJson = (inputFile, outputFile) => {
  const rl = readline.createInterface({ input: createReadStream(inputFile) });

  /* eslint no-underscore-dangle: 0 */
  const appendNewLineTransform = new Transform({
    transform(line, encoding, callback) {
      if (this._last === undefined) {
        this._last = '';
      }
      this._last += `${line.toString()}\n`;
      callback();
    },

    flush(callback) {
      if (this._last) { this.push(this._last); }
      callback();
    },
  });

  pipeline(
    Readable.from(rl),
    appendNewLineTransform,
    csvtojson(),
    createWriteStream(outputFile),
    (error) => {
      if (error) {
        console.error(error);
      }
    },
  );
};

const input = path.join(__dirname, '..', 'csv', 'csv.csv');
const output = path.join(__dirname, '..', 'txt.txt');
const streamOutput = path.join(__dirname, '..', 'txtFromStream.txt');
convertCsvToJson(input, output);
streamifyCsvToJson(input, streamOutput);
