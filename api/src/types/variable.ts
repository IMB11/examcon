import { twosComplement } from "./utils";

export enum VariableType {
  number_generated = "number_generated",
  evaluated_twos_complement = "evaluated_twos_complement",
  evaluated_expression = "evaluated_expression",
}

export interface Variable {
  name: string;
  type: VariableType;
  getValue: (variables: Variable[]) => string;
}

export class NumberGeneratedVariable implements Variable {
  name: string;
  type: VariableType;
  min: number;
  max: number;

  public constructor(name: string, min: number, max: number) {
    this.name = name;
    this.type = VariableType.number_generated;
    this.min = min;
    this.max = max;
  }

  public getValue(variables: Variable[]): string {
    return String(Math.floor(Math.random() * (this.max - this.min + 1) + this.min));
  }
}

export class EvaluatedTwosComplementVariable implements Variable {
  name: string;
  type: VariableType;
  value: string;
  bits: number

  public constructor(name: string, value: string, bits: number) {
    this.name = name;
    this.type = VariableType.evaluated_twos_complement;
    this.value = value;
    this.bits = bits;
  }

  public twosComplement(value: string): string {
    // Check if value is a number.
    let numberValue = Number(value);
    if (isNaN(numberValue)) {
      throw new Error(`Value ${value} is not a number.`);
    }

    // Convert number value to twos complement binary string.
    return twosComplement(numberValue, this.bits);
  }

  public getValue(variables: Variable[]): string {
    const evaluatedValue = this.value.replace(/{{(.*?)}}/g, (match, p1) => {
      const variable = variables.find((variable) => variable.name === p1);
      if (!variable) {
        throw new Error(`Variable ${p1} not found or hasn't been evaluated yet.`);
      }
      return variable.getValue(variables);
    });

    return this.twosComplement(evaluatedValue);
  }
}

export class EvaluatedExpressionVariable implements Variable {
  name: string;
  type: VariableType;
  value: string;

  public constructor(name: string, value: string) {
    this.name = name;
    this.type = VariableType.evaluated_expression;
    this.value = value;
  }

  public getValue(variables: Variable[]): string {
    let evaluatedValue = this.value.replace(/{{(.*?)}}/g, (match, p1) => {
      const variable = variables.find((variable) => variable.name === p1);
      if (!variable) {
        throw new Error(`Variable ${p1} not found or hasn't been evaluated yet.`);
      }
      return variable.getValue(variables);
    });

    // Evaluate expression.
    return eval(evaluatedValue);
  }
}
