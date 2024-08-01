import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI =  new GoogleGenerativeAI("AIzaSyBH5fxx1WfaLgHO2klA3f1eMxGXPBBefoc") 
const model = genAI?.getGenerativeModel({model: "gemini-pro"})

const doingPrompt = async (prompt: string) => {
    try {
        console.log("Prompt: ", prompt)
        const result = await model.generateContent(prompt)

        const response = result.response.text()
        console.log("Response: ", response)
        return response;
    } catch (error) {
        console.error("Error fetching response:", error);
    }
   
}

export default {
    doingPrompt
}