const fs = require('fs')
const path = require('path');
const { exit } = require('process');

const CONFIG_FILE = './bundle.config.json'
const BASE_DIR = process.cwd()

function getConfigContent(file) {
  const filePath = path.resolve(file);

  try {
    var fileContent = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Configuration File is not exists!\n${error.message}`);
      exit(-1);
    }

    console.error(error);
    exit(-1);
  }

  return fileContent;
}

function contentToJson(content) {
  try {
    var contentJSON = JSON.parse(content);
  } catch (error) {
    if (error.name === 'SyntaxError') {
      console.error(`Configuratoin File is not written in JSON format!\n${error.message}`)
      exit(-1);
    }

    console.error(error.name);
    exit(-1);
  }


  return contentJSON
}

function getEntry(config) {
  if (config.entry) {
    if (fs.existsSync(config.entry)) {
      return config.entry
    }
    console.error('Entry File is not exists!');
    exit(-1);
  }

  console.error('Configuartion File does not have \'entry\' property!');
  exit(-1);
}


function getOutput(config) {
  if (config.output) {
    const { path, filename } = config.output
    if (path === undefined || filename === undefined) {
      console.error('Output property should has path and filename properties!');
      exit(-1);
    }

    const len = filename.length
    if (filename.split('.').pop() != 'js'){
      console.log(len);
      console.error('Output filename has to have .js extenstion!');
      exit(-1);
    }
    return { path, filename };
  }

  config.output = {
    path: path.resolve(BASE_DIR, 'dist'),
    filename: 'bundle.js'
  }
  return config.output;
}

function createOutputfile(filepath, filname, data) {
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath, { recursive: true });
  }

  const file = path.resolve(filepath, filname);
  fs.writeFileSync(file, data);
  return file;
}

module.exports = {
  CONFIG_FILE,
  getConfigContent,
  contentToJson,
  getEntry,
  getOutput,
  createOutputfile
}