import SolidityLanguageServer from 'solidity-language-server';
import {
  createConnection,
  //  IConnection,
  Connection,
  InitializeParams,
  InitializeResult,
  ProposedFeatures,
} from 'vscode-languageserver';

const connection: Connection = createConnection(ProposedFeatures.all);

connection.onInitialize(
  async (params: InitializeParams): Promise<InitializeResult> => {
    connection.console.info('SolidityLanguageServer initializing...');

    const server = await SolidityLanguageServer.initialize(connection, params);
    server.register(connection);

    connection.console.info('SolidityLanguageServer initialized');

    return {
      capabilities: server.capabilities(),
    };
  }
);

connection.listen();

// Don't die on unhandled Promise rejections
process.on('unhandledRejection', (reason, p) => {
  connection.console.error(
    `Unhandled Rejection at promise: ${p}, reason: ${reason}`
  );
});

process.on('SIGPIPE', () => {
  // Don't die when attempting to pipe stdin to a bad spawn
  // https://github.com/electron/electron/issues/13254
});
