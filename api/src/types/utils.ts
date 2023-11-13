export function twosComplement(value: number, bitCount: number): string {
  let binaryStr;

  if (value >= 0) {
    let twosComp = value.toString(2);
    binaryStr = padAndChop(twosComp, '0', (bitCount || twosComp.length));
  } else {
    binaryStr = (Math.pow(2, bitCount) + value).toString(2);

    if (Number(binaryStr) < 0) {
      return "0".repeat(bitCount);
    }
  }

  return `${binaryStr}`;
}

export function padAndChop(str: string, padChar: string, length: number) {
  return (Array(length).fill(padChar).join('') + str).slice(length * -1);
}