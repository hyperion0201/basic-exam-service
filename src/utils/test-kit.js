import get from 'lodash/get'

export function questionToTestClient(questions) {
  const deleteAnswerCorrect = questions.map((item) => {
    const data = get(item, 'dataValues')
    const parseAnswer = JSON.parse(data?.choices)
    const answer = parseAnswer.map((itemAnswer) => {
      delete itemAnswer.is_correct
      return itemAnswer
    })
    return {...data, choices: answer}
  })
  return deleteAnswerCorrect
}
