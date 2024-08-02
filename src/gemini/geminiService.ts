import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
const genAI =  new GoogleGenerativeAI("AIzaSyBH5fxx1WfaLgHO2klA3f1eMxGXPBBefoc") 
const model = genAI?.getGenerativeModel({model: "gemini-pro", safetySettings})

const doingPrompt = async (prompt: string) => {
    try {
        const result = await model.generateContent(prompt)

        const response = result.response.text()
       
        return response;
    } catch (error) {
        console.error("Error fetching response:", error);
    }
   
}

export default {
    doingPrompt
}