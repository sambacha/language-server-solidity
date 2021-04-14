export const DEFAULT_GLOB_PATTERN = '**/*@(.sol|.solidity|.evm)';

export function getExplainsolidityEndpoint(): string | null {
  const { EXPLAINSOLIDITY_ENDPOINT } = process.env;
  return typeof EXPLAINSOLIDITY_ENDPOINT === 'string' &&
    EXPLAINSOLIDITY_ENDPOINT.trim() !== ''
    ? EXPLAINSOLIDITY_ENDPOINT
    : null;
}

export function getGlobPattern(): string {
  const { GLOB_PATTERN } = process.env;
  return typeof GLOB_PATTERN === 'string' && GLOB_PATTERN.trim() !== ''
    ? GLOB_PATTERN
    : DEFAULT_GLOB_PATTERN;
}

export function getHighlightParsingError(): boolean {
  const { HIGHLIGHT_PARSING_ERRORS } = process.env;
  return typeof HIGHLIGHT_PARSING_ERRORS !== 'undefined'
    ? HIGHLIGHT_PARSING_ERRORS === 'true' || HIGHLIGHT_PARSING_ERRORS === '1'
    : false;
}
