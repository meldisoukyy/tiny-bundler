const createAsset = require('./createAsset').createAsset;
const createGraph = require('./createGraph').createGraph;

function getModules(graphQueue) {
  let modules = '';

  graphQueue.forEach(mod => {
    modules += `${mod.id}: [
      function (require, module, exports) {
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)},
    ],`;
  });
  return modules;
}

function bundle(graphQueue) {
  const modules = getModules(graphQueue);
  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];
        function localRequire(name) {
          return require(mapping[name]);
        }
        const module = { exports : {} };
        fn(localRequire, module, module.exports);
        return module.exports;
      }
      require(0);
    })({${modules}})
  `;
  return result
}

let queue = [];

const entryAsset = createAsset('../example/entry.js');
createGraph(entryAsset, queue);
console.log(bundle(queue));