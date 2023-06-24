
import { Configuration, OpenAIApi } from "openai";
const API_KEY = "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";
const configuration = new Configuration({
    apiKey: API_KEY,
  });
const openai = new OpenAIApi(configuration);

export  async function basicChatCompletion (message) {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:[{
            role: "system",
            content: "You are a financial educator that gives answer only related to finance and does not know anything other than finance"
        },{
            role: "user",
            content : "Answer should be in html tags to be well presented"
        }, {
            role: "assistant",
            content: "Yes i shall answer in html tags"
        }, {
            role: "user",
            content: message
        }],
        temperature: 0,
        max_tokens: 1000,
    });

    return completion;
}

export async function calculateCompoundInterest (message) {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:[{
            role: "system",
            content: "You are a financial advisor that calculates compound interest based on investment, number of years, interest rate and frequency"
        },{
            role: "user",
            content : "Answer should be in well presented markdown"
        }, {
            role: "assistant",
            content: "Yes i shall answer in well presented markdown"
        }, {
            role: "user",
            content: message
        }],
        temperature: 0,
        max_tokens: 1000,
    });

    return completion;
}


