'use strict';
import * as path from 'path';
import { ExtensionContext, workspace } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient';

export async function activate(context: ExtensionContext) {
  const explainsolidityEndpoint = workspace
    .getConfiguration('solidityIde')
    .get('explainsolidityEndpoint', '');

  const globPattern = workspace
    .getConfiguration('solidityIde')
    .get('globPattern', '');

  const highlightParsingErrors = workspace
    .getConfiguration('solidityIde')
    .get('highlightParsingErrors', false);

  const env: any = {
    ...process.env,
    EXPLAINSOLIDITY_ENDPOINT: explainsolidityEndpoint,
    GLOB_PATTERN: globPattern,
    HIGHLIGHT_PARSING_ERRORS: highlightParsingErrors,
  };

  const serverExecutable = {
    module: context.asAbsolutePath(path.join('out', 'server.js')),
    transport: TransportKind.ipc,
    options: {
      env,
    },
  };

  const debugServerExecutable = {
    ...serverExecutable,
    options: {
      ...serverExecutable.options,
      execArgv: ['--nolazy', '--inspect=6009'],
    },
  };

  const serverOptions: ServerOptions = {
    run: serverExecutable,
    debug: debugServerExecutable,
  };

  // FIXME LanguageClientOptions
  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      {
        scheme: 'file',
        language: 'shellscript',
      },
    ],
    synchronize: {
      configurationSection: 'Solidity IDE',
      // Notify the server about file changes to '.clientrc files contain in the workspace
      fileEvents: workspace.createFileSystemWatcher('**/.clientrc'),
    },
  };

  const client = new LanguageClient(
    'Solidity IDE',
    'Solidity IDE',
    serverOptions,
    clientOptions
  );

  // Push the disposable to the context's subscriptions so that the
  // client can be deactivated on extension deactivation
  context.subscriptions.push(client.start());
}
