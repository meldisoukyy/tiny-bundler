const createAsset = require('./src/createAsset').createAsset;
const createGraph = require('./src/createGraph').createGraph;
const bundle = require('./src/bundle.js').bundle;
const utils = require('./src/utils');

let queue = [];

const configFile = utils.getConfigContent(utils.CONFIG_FILE)
const config = utils.contentToJson(configFile);
const target = utils.getTarget(config);
const output = utils.getOutput(config);

entryAssit = createAsset(target);
createGraph(entryAssit, queue)

const bundledData = bundle(queue)
utils.createOutputfile(output.path, output.filename, bundledData);