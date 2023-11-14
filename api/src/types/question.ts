import { Variable } from "./variable";

export interface Question {
  question: string;
  repeat: number | undefined;
  markScheme: string[];
  variables: Variable[] | undefined;
}