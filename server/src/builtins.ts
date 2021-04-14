export const LIST = [''];

const SET = new Set(LIST);

export function isBuiltin(word: string): boolean {
  return SET.has(word);
}
