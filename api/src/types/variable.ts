import { twosComplement } from "./utils";

export enum VariableType {
  number_generated = "number_generated",
  evaluated_twos_complement = "evaluated_twos_complement",
  evaluated_expression = "evaluated_expression",
}

export interface Variable {
  name: string;
  type: VariableType;
  getValue: (variables: EvaluatedVariable[]) => EvaluatedVariable;
}

export interface EvaluatedVariable {
  name: string;
  value: string;
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

  public getValue(variables: EvaluatedVariable[]): EvaluatedVariable {
    return {
      name: this.name,
      value: String(Math.floor(Math.random() * (this.max - this.min + 1) + this.min))
    };
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
    return twosComplement(numberValue, this.bits) ?? "0".repeat(this.bits);
  }

  public getValue(variables: EvaluatedVariable[]): EvaluatedVariable {
    const evaluatedValue = this.value.replace(/{{(.*?)}}/g, (match, p1) => {
      const variable = variables.find((variable) => variable.name === p1);
      if (!variable) {
        throw new Error(`Variable ${p1} not found or hasn't been evaluated yet.`);
      }
      return variable.value;
    });

    return {
      name: this.name,
      value: this.twosComplement(evaluatedValue)
    };
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

  public getValue(variables: EvaluatedVariable[]): EvaluatedVariable {
    let evaluatedValue = this.value.replace(/{{(.*?)}}/g, (match, p1) => {
      const variable = variables.find((variable) => variable.name === p1);
      if (!variable) {
        throw new Error(`Variable ${p1} not found or hasn't been evaluated yet.`);
      }
      return variable.value;
    });

    // Evaluate expression.
    return {
      name: this.name,
      value: eval(evaluatedValue)
    };
  }
}
