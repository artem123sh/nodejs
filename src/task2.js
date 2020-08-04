import { promises as fsPromises, createReadStream, createWriteStream } from 'fs';
import path from 'path';
import csvtojson from 'csvtojson';
import { Readable, Transform, pipeline } from 'stream';
import readline from 'readline';

const columns = /Book|Author|Price/;

const transformParsedBook = (parsedBook) => Object.entries(parsedBook)
  .reduce((result, [key, value]) => Object.assign(result, { [key.toLowerCase()]: value }), {});

export const convertCsvToJson = (inputFile, outputFile) => fsPromises.readFile(inputFile, 'utf-8')
  .then((fileContent) => csvtojson(
    { checkType: true, includeColumns: columns },
  ).fromString(fileContent))
  .then((parsedBooks) => {
    const books = parsedBooks.map((parsedBook) => transformParsedBook(parsedBook));
    const stringifiedBook = books.reduce((str, book) => `${str + JSON.stringify(book)}\n`, '');
    return fsPromises.writeFile(outputFile, stringifiedBook, 'utf-8');
  })
  .catch((error) => console.error(error));

export const streamifyCsvToJson = (inputFile, outputFile) => {
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

  const bookTransform = new Transform({
    transform(parsedBook, encoding, callback) {
      if (this._last === undefined) {
        this._last = '';
      }
      const book = transformParsedBook(JSON.parse(parsedBook.toString()));
      this._last += `${JSON.stringify(book)}\n`;
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
    csvtojson({ checkType: true, includeColumns: columns }),
    bookTransform,
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
