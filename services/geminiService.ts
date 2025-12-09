
import { GoogleGenAI, Chat, Type, Schema } from "@google/genai";
import { 
  RCA_SYSTEM_INSTRUCTION, 
  GUESSTIMATE_SYSTEM_INSTRUCTION, 
  STRATEGY_SYSTEM_INSTRUCTION,
  PRODUCT_DESIGN_SYSTEM_INSTRUCTION 
} from "../constants";
import { EvaluationResult, Category } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const createChatSession = (category: Category): Chat => {
  let instruction = RCA_SYSTEM_INSTRUCTION;
  if (category === 'Guesstimate') instruction = GUESSTIMATE_SYSTEM_INSTRUCTION;
  if (category === 'Strategy') instruction = STRATEGY_SYSTEM_INSTRUCTION;
  if (category === 'Product Design') instruction = PRODUCT_DESIGN_SYSTEM_INSTRUCTION;
  
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: instruction,
      temperature: 0.7, 
    },
  });
};

export const startScenario = async (chat: Chat, scenarioTitle: string, category: Category): Promise<string> => {
  try {
    let prompt = '';
    
    if (category === 'Guesstimate') {
        prompt = `
            SELECTED QUESTION: "${scenarioTitle}"
            
            INSTRUCTIONS:
            1. This is a Guesstimate / Estimation interview question.
            2. Greet the user as a Senior PM Interviewer.
            3. Ask them how they would approach this estimation.
            4. Do NOT reveal the answer.
        `;
    } else if (category === 'Strategy') {
        prompt = `
            SELECTED SCENARIO: "${scenarioTitle}"

            INSTRUCTIONS:
            1. This is a Product Strategy interview question.
            2. Greet the user as a VP of Product.
            3. Expand the one-liner into a brief business context (Company status, market condition).
            4. Ask the user for their high-level approach or framework.
        `;
    } else if (category === 'Product Design') {
        prompt = `
            SELECTED SCENARIO: "${scenarioTitle}"

            INSTRUCTIONS:
            1. This is a Product Design / Product Sense interview question.
            2. Greet the user as a Senior PM Interview Coach.
            3. Briefly mention the problem statement.
            4. Ask the user to start by defining the problem or target users.
            5. Do not offer a solution.
        `;
    } else {
        prompt = `
            SELECTED SCENARIO: "${scenarioTitle}"

            INSTRUCTIONS:
            1. Expand this one-liner into a detailed 4-5 sentence context (Persona, Product, Timeline, Metric Details).
            2. Do NOT reveal the root cause yet.
            3. Greet the user as "RCA Coach AI".
            4. Ask them to choose a framework or how they would like to start.
        `;
    }

    const response = await chat.sendMessage({ message: prompt });
    return response.text || "Error starting session.";
  } catch (error) {
    console.error("Error starting scenario:", error);
    return "I'm having trouble connecting to the coaching service. Please try again.";
  }
};

export const sendMessageToCoach = async (chat: Chat, userMessage: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message: userMessage });
    return response.text || "No response received.";
  } catch (error) {
    console.error("Error sending message:", error);
    return "Connection error. Please try again.";
  }
};

export const getHintFromCoach = async (chat: Chat): Promise<string> => {
  try {
    const prompt = `[SYSTEM: The user is stuck and requested a HINT. Provide a short, directional nudge based on the current state of the interview and the specific framework. Do NOT give the answer.]`;
    const response = await chat.sendMessage({ message: prompt });
    return response.text || "Try breaking the problem down further.";
  } catch (error) {
    console.error("Error getting hint:", error);
    return "Could not retrieve a hint at this time.";
  }
};

export const endSessionAndEvaluate = async (chat: Chat, category: Category): Promise<EvaluationResult> => {
  const evaluationSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      rootCauseSummary: { type: Type.STRING, description: "The answer or summary of the case." },
      reasoningSteps: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "Step-by-step logical breakdown of the ideal path."
      },
      recommendedActions: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "2-4 follow-up actions or conclusions."
      },
      scores: {
        type: Type.OBJECT,
        properties: {
          structuredThinking: { type: Type.NUMBER, description: "Score 1-5" },
          frameworkUsage: { type: Type.NUMBER, description: "Score 1-5" },
          communicationClarity: { type: Type.NUMBER, description: "Score 1-5" },
          mathAndReasoning: { type: Type.NUMBER, description: "Score 1-5 (Optional, for Guesstimates)" },
          strategicInsight: { type: Type.NUMBER, description: "Score 1-5 (Optional, for Strategy)" },
          userUnderstanding: { type: Type.NUMBER, description: "Score 1-5 (Optional, for Product Design)" },
          prioritizationClarity: { type: Type.NUMBER, description: "Score 1-5 (Optional, for Product Design)" },
          finalScore: { type: Type.NUMBER, description: "Total Score 0-100" },
        },
        required: ["structuredThinking", "frameworkUsage", "communicationClarity", "finalScore"]
      },
      improvementSuggestions: { type: Type.STRING, description: "Constructive feedback for the user." }
    },
    required: ["rootCauseSummary", "reasoningSteps", "recommendedActions", "scores", "improvementSuggestions"]
  };

  try {
    const prompt = `
      [SYSTEM: The user has completed the session. 
      1. Provide the Answer/Solution/Summary for the scenario.
      2. Evaluate the user's performance BRUTALLY. Be extremely strict and critical.
         - **Grading Standard**: 5/5 is reserved for perfect execution. 3/5 is average.
         - **Deductions**: Penalize heavily for unstructured answers.
         ${category === 'Guesstimate' ? '- **Focus**: Evaluate Assumptions Quality (use frameworkUsage field) and Math & Reasoning logic.' : ''}
         ${category === 'Strategy' ? '- **Focus**: Evaluate Strategic Insight (deep understanding of trade-offs, market dynamics) and Business Acumen.' : ''}
         ${category === 'Product Design' ? '- **Focus**: Evaluate User Understanding (empathy, persona depth) and Prioritization Clarity (logic for choosing features).' : ''}
      3. Return the result strictly in JSON format matching the schema.]
    `;

    const response = await chat.sendMessage({
      message: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: evaluationSchema
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text) as EvaluationResult;
  } catch (error) {
    console.error("Error generating evaluation:", error);
    return {
      rootCauseSummary: "Error retrieving evaluation.",
      reasoningSteps: [],
      recommendedActions: [],
      scores: {
        structuredThinking: 0,
        frameworkUsage: 0,
        communicationClarity: 0,
        finalScore: 0
      },
      improvementSuggestions: "Please try again."
    };
  }
};
