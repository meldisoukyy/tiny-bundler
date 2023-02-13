const path = require('path');
const createAsset = require('./createAsset').createAsset;

function createGraph(entryAsset, queue) {
  entryAsset.mapping = {}

  queue.push(entryAsset);

  entryAsset.dependencies.forEach(relativePath => {
    const absolutePath = path.join(path.dirname(entryAsset.filepath), relativePath);
    const childAsset = createAsset(absolutePath);

    entryAsset.mapping[relativePath] = childAsset.id;

    createGraph(childAsset, queue);
  });
}

module.exports = {
  createGraph
}