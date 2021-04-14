// https://docs.soliditylang.org/en/v0.6.8/grammar.html

export const LIST = [
  'after',
  'case',
  'default',
  'final',
  'in',
  'inline',
  'let',
  'match',
  'null',
  'of',
  'relocatable',
  'static',
  'switch',
  'typeof',
];

const SET = new Set(LIST);

export function isReservedWord(word: string): boolean {
  return SET.has(word);
}
