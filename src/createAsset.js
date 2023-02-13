const fs = require('fs');
const parser = require('babylon');
const traverse = require('babel-traverse').default;
const {transformFromAst} = require('@babel/core');

let ID = 0;

function createAsset(filepath) {
  const id = ID++;

  const file = fs.readFileSync(filepath, 'utf-8');

  const ast = parser.parse(file, {
    sourceType: 'module',
  })

  const dependencies = [];
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    }
  })

  const code = transformFromAst(ast, null, {presets: ['@babel/preset-env']}).code;

  return {
    id,
    filepath,
    dependencies,
    code
  };
}

module.exports(createAsset);