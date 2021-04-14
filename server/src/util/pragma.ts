//** @file pragma */
export function getSolcVersion(fileContent: string): string {
  const regex = /^pragma solidity [\^\~]?([0-9\.]*);/g;
  const match = regex.exec(fileContent);
  if (!match) throw new Error('no pragma solidity version set');
  return match[1];
}

/**
  return match[1].replace('-', '').trim()
}
 */

// FIXME terrible way to do this
export function isSolidityContract(pragma: string): boolean {
  return pragma.startsWith('pragma solidity') || pragma.startsWith('pragma');
}

export function hasSolidityPragma(fileContent: string): boolean {
  const pragma = getSolcVersion(fileContent);
  return pragma ? isSolidityContract(pragma) : false;
}
