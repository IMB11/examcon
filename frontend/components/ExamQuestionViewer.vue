<template>
  <div class="exam-question-viewer">
    <div class="buttons">
      <Button @click="printQuestion">Print</Button>
      <Button @click="showMarkScheme = !showMarkScheme" color="red"
        >Show Mark Scheme</Button
      >
      <span><Toggle v-model="showAllQuestions" /> Show All</span>
      <hr class="invisible"/>
      <Button @click="previousQuestion" v-if="!showAllQuestions">Previous Question</Button>
      <Button @click="nextQuestion" v-if="!showAllQuestions">Next Question</Button>
    </div>
    <div id="eq">
      <div class="exam_question_generator" v-if="!showAllQuestions">
        <div class="question">
          <div class="number">
            <p
              v-for="digit in convertNumberToBlockFormat(
                currentNumber.toString()
              )"
            >
              {{ digit }}
            </p>
          </div>
          <div class="prompt" v-html="renderHighlightedString(questions[currentNumber - 1].question)"></div>
          <p class="mark">
            [{{ questions[currentNumber - 1].markScheme.length }}]
          </p>
        </div>
        <div class="answer_lines" v-if="!showMarkScheme">
          <hr
            v-for="mark in Array(
              questions[currentNumber - 1].markScheme.length
            )"
          />
        </div>
        <div v-else>
          <div
            class="mark_given"
            v-for="markGiven in questions[currentNumber - 1].markScheme"
          >
            <b>1 mark</b> for:
            <div
              class="markdown"
              v-html="renderHighlightedString(markGiven)"
            ></div>
          </div>
        </div>
      </div>
      <div v-else class="exam_question_generator">
        <div v-for="question in questions">
          <div class="question">
          <div class="number">
            <p
              v-for="digit in convertNumberToBlockFormat(
                (questions.indexOf(question) + 1).toString()
              )"
            >
              {{ digit }}
            </p>
          </div>
          <div class="prompt" v-html="renderHighlightedString(question.question)"></div>
          <p class="mark">
            [{{ question.markScheme.length }}]
          </p>
        </div>
        <div class="answer_lines" v-if="!showMarkScheme">
          <hr
            v-for="mark in Array(
              question.markScheme.length
            )"
          />
        </div>
        <div v-else>
          <div
            class="mark_given"
            v-for="markGiven in question.markScheme"
          >
            <b>1 mark</b> for:
            <div
              class="markdown"
              v-html="renderHighlightedString(markGiven)"
            ></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { Button, renderHighlightedString, Toggle } from "omorphia";
import { usePaperizer } from "paperizer";

const { paperize } = usePaperizer("eq", {
  styles: ["/print.css"],
});

const props = defineProps(["questions"]);

const showAllQuestions = ref(false);
const currentNumber = ref(1);
const showMarkScheme = ref(false);

function nextQuestion() {
  currentNumber.value = (currentNumber.value % props.questions.length) + 1;
  showMarkScheme.value = false;
}

function previousQuestion() {
  currentNumber.value = (currentNumber.value - 2 + props.questions.length) % props.questions.length + 1;
  showMarkScheme.value = false;
}

/**
 * @param {string} questionNumber
 */
function convertNumberToBlockFormat(questionNumber) {
  if (questionNumber > 99) return undefined;

  let questionNumberDigits = questionNumber.split("");

  if (questionNumber < 10) {
    questionNumberDigits.unshift("0");
  }

  return questionNumberDigits;
}

async function printQuestion() {
  paperize();
}

async function printAllQuestions() {
  showAllQuestions.value = true;
  paperize();
  showAllQuestions.value = false;
}
</script>

<style scoped lang="scss">
.invisible {
  // not display: none;
  visibility: hidden;
}

#eq {
  display: block;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.exam_question_generator {
  border: 2px solid grey;
  color: black;
  background-color: whitesmoke;
  width: 100%;
  display: block;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.25vw;
  margin-top: var(--gap-xl);
  align-self: center;
  font-weight: normal;
  padding: 10px;

  .question, div > .question {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0;

    * {
      margin-top: 5px;
    }

    .mark {
      font-weight: bold;
    }

    .prompt {
      margin-left: var(--gap-xl);
      margin-right: auto;
    }

    .number {
      display: flex;
      flex-direction: row;

      p {
        border: 1px solid black;
        width: 1.5rem;
        height: 1.5rem;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .answer_lines, div > .answer_lines {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 2.5rem;
    margin: 0;

    hr {
      margin: 0;
      border: 0.5px solid black;
    }

    hr:not(:first-child) {
      margin-top: 3rem;
    }
  }
}
</style>
