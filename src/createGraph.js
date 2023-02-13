const path = require('path');
const createAsset = require('./createAsset').createAsset;

function createGraph(entryFile, queue) {
  const entryAsset = createAsset(entryFile);
  entryAsset.mapping = {}

  queue.push(entryAsset);

  entryAsset.dependencies.forEach(relativePath => {
    const absolutePath = path.join(path.dirname(entryAsset.filepath), relativePath);
    const childAsset = createAsset(absolutePath);

    entryAsset.mapping[relativePath] = childAsset.id;

    createGraph(childAsset.filepath, queue);
  });
}

module.exports = {
  createGraph
}