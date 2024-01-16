export type testObject = {
    id: string,
    shortName: string,
    fullName: string,
    keyWords: string,
    description: string,
    descriptionArray: string[],
    instruction: string,
    resultProcessing: string,
    questions: questionObject[],
    scales: scaleObject[]
} | null;

type questionObject = {
    text: string,
    options: string[],
    column: boolean
}
export type scaleObject = {
    name: string,
    levels: levelObject[],
    key: keyScaleObject[],
    description: string
}

export type levelObject = {
    level: string,
    condition: number[],
    description: string
}

export type keyScaleObject = {
    number: number,
    answer: string
}

export type answerObject = {
    numberQuestion: number,
    answer: string
}

export type resultObject = {
    nameScale: string,
    score: number,
    level: string,
    descriptionScale: string
}