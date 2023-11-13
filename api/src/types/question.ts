import { Variable } from "./variable";

export interface Question {
  question: string;
  markScheme: string[];
  variables: Variable[];
}