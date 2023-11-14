import { Question } from "./question";
import { QuestionDefinition } from "./subjects";
import { EvaluatedExpressionVariable, EvaluatedHexadecimalVariable, EvaluatedTwosComplementVariable, EvaluatedVariable, NumberGeneratedVariable, Variable, VariableType } from "./variable";

export function twosComplement(value: number, bitCount: number) {
  let binaryStr;
  
  if (value >= 0) {
    let twosComp = value.toString(2);
    binaryStr = padAndChop(twosComp, '0', (bitCount || twosComp.length));
  } else {
    binaryStr = (Math.pow(2, bitCount) + value).toString(2);
    
    if (Number(binaryStr) < 0) {
      return undefined
    }
  }
  
  return `${binaryStr}`;
}

export function getQuestions(subTopic: QuestionDefinition) {
  const evaluatedQuestions = [];

  for (const question of subTopic.questions) {
    if(question.repeat) {
      for (let index = 0; index < question.repeat; index++) {
        const copiedQuestion: Question = JSON.parse(JSON.stringify(question));
        
        // Evaluate all the variables.
        if (copiedQuestion.variables != undefined) {
          const evaluatedVariables: EvaluatedVariable[] = [];

          copiedQuestion.variables.forEach((variable: any) => {
            if (variable.type == VariableType.number_generated) {
              const numberGeneratedVariable = new NumberGeneratedVariable(variable.name, variable.min, variable.max);
              evaluatedVariables.push(numberGeneratedVariable.getValue(evaluatedVariables))
            }
            
            if (variable.type == VariableType.evaluated_expression) {
              const evaluatedExpressionVariable = new EvaluatedExpressionVariable(variable.name, variable.value);
              evaluatedVariables.push(evaluatedExpressionVariable.getValue(evaluatedVariables));
            }

            if (variable.type == VariableType.evaluated_twos_complement) {
              const evaluatedTwosComplement = new EvaluatedTwosComplementVariable(variable.name, variable.value, variable.bits)
              evaluatedVariables.push(evaluatedTwosComplement.getValue(evaluatedVariables));
            }

            if (variable.type == VariableType.evaluated_hexadecimal) {
              const evaluatedHexadecimal = new EvaluatedHexadecimalVariable(variable.name, variable.value);
              evaluatedVariables.push(evaluatedHexadecimal.getValue(evaluatedVariables));
            }
          });

          // Fill in the variables in the mark scheme and question with their values.
          copiedQuestion.markScheme = copiedQuestion.markScheme.map(markScheme => {
            evaluatedVariables.forEach(variable => {
              markScheme = markScheme.replace(`{{${variable.name}}}`, variable.value);
            });

            return markScheme;
          });

          for (const variable of evaluatedVariables) {
            copiedQuestion.question = copiedQuestion.question.replace(`{{${variable.name}}}`, variable.value);
          }
        }

        console.log(copiedQuestion);

        evaluatedQuestions.push(copiedQuestion);
      }
    } else {
      evaluatedQuestions.push(question);
    }

  }

  return evaluatedQuestions;
}

function padAndChop(str: string, padChar: string, length: number) {
  return (Array(length).fill(padChar).join('') + str).slice(length * -1);
}
