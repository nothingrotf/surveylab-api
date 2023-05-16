export interface AddSurveyModel {
  question: string
  answers: SurveyAnswer[]
  date: Date
}

export interface SurveyAnswer {
  answer: string
  image?: string
}

export interface AddSurvey {
  add: (survey: AddSurveyModel) => Promise<void>
}
