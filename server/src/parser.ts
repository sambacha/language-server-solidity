import * as Parser from 'web-tree-sitter';

export async function initializeParser(): Promise<Parser> {
  await Parser.init();
  const parser = new Parser();

  /**
   * See https://github.com/tree-sitter/tree-sitter/tree/master/lib/binding_web#generate-wasm-language-files
   *
   * To compile and use a new tree-sitter-solidity version:
   *    cd server
   *    yarn add web-tree-sitter
   *    yarn add --dev tree-sitter-solidity tree-sitter-cli
   *    npx tree-sitter build-wasm node_modules/tree-sitter-solidity
   *
   * Note down the versions (from the package.json) below and then run
   *    yarn remove tree-sitter-solidity tree-sitter-cli
   *
   * The current files was compiled with:
   * "tree-sitter-solidity": "^0.16.1",
   * "tree-sitter-cli": "^0.16.5"
   */
  const lang = await Parser.Language.load(
    `${__dirname}/../tree-sitter-solidity.wasm`
  );

  parser.setLanguage(lang);
  return parser;
}
