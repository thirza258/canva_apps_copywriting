import { GoogleGenerativeAI } from "@google/generative-ai";
// require('dotenv').config()

// const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : undefined;

// const model = genAI?.getGenerativeModel({model: "gemini-1.5-flash"})

const doingPrompt = async (): Promise<string> => {
    // const prompt = "A beautiful sunset over the city skyline"

    // const result = await model?.generateContent(prompt)

    // const response = result?.response?.text
    // console.log(response)
    return "Hello world!"
}

export default {
    doingPrompt
}