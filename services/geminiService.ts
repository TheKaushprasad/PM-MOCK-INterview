import { GoogleGenAI, Chat, Type, Schema, Modality } from "@google/genai";
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

export const generateSpeech = async (text: string): Promise<string | undefined> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Fenrir' }, // Fenrir sounds authoritative and professional
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("TTS Error:", error);
    return undefined;
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

  // Define Category-Specific Grading Criteria
  let criteria = "";
  if (category === 'RCA') {
      criteria = `
      - **Metric Definition (CRITICAL)**: Did they clarify what the metric implies before solving? (Score 1/5 if they skipped this).
      - **Problem Structuring**: Did they use a specific framework (Internal/External, Funnel, Equation)? Random guessing = Max 2/5.
      - **MECE**: Was the breakdown Mutually Exclusive, Collectively Exhaustive?
      - **Hypothesis Validation**: Did they ask for data to validate hypotheses before jumping to conclusions?
      - **Root Cause Accuracy**: Did they actually identify the correct root cause or just stop at a symptom?
      `;
  } else if (category === 'Product Design') {
      criteria = `
      - **Segmentation (CRITICAL)**: Did they narrow down to a *specific* persona? (Score 1-2/5 if "Everyone" or broad segments).
      - **Problem Clarity**: Did they solve a real pain point or just build features?
      - **Solution**: Is it unique/innovative or generic?
      - **Metrics**: Did they define *specific* success metrics (e.g. Day-30 retention) vs vanity metrics (e.g. "Downloads")?
      - **Trade-offs**: Did they discuss risks/cannibalization/ethics? (Missing trade-offs = Max 3/5).
      `;
  } else if (category === 'Guesstimate') {
      criteria = `
      - **Structure (CRITICAL)**: Did they define an equation/formula BEFORE plugging in numbers? (Score < 3 if they just guessed numbers).
      - **Assumptions**: Are inputs based on proxies, facts, or logic? (e.g., "India pop ~1.4B" is good; "I guess 500k" is bad).
      - **Math**: Precision isn't required, but order-of-magnitude correctness is.
      - **Sanity Check**: Did they cross-check the final result against reality? (Missing sanity check = Max score 3/5).
      - **Confidence**: Did they state the final number clearly?
      `;
  } else if (category === 'Strategy') {
      criteria = `
      - **Competitive Advantage**: Did they identify a real moat (Network effect, Switch cost, Data) or just "better UX"? (Generic = 1/5).
      - **Market Dynamics**: Did they use frameworks like 5-Forces or 3Cs appropriately?
      - **Decision**: Did they make a hard Go/No-Go choice? (Waffling = 2/5).
      - **North Star**: Is the strategic goal aligned with long-term business value?
      - **Risks**: Deep analysis of failure modes?
      `;
  } else if (category === 'Behavioral') {
      criteria = `
      - STAR Framework: Adherence to Situation, Task, Action, Result?
      - Ownership: "I" vs "We" language?
      - Results: Data-driven and quantified?
      - Introspection: Depth of learning?
      `;
  }

  try {
    const prompt = `
      ACT AS A BRUTALLY HONEST, HYPER-EXPERIENCED SENIOR PRODUCT MANAGER (10+ yrs, ex-FAANG).
      You are evaluating a candidate's answer for a ${category} interview.
      
      **YOUR GOAL:** Destroy weak answers. Expose every flaw. Do not sugarcoat.
      
      **EVALUATION RULES:**
      1. **Tone**: Cold, direct, professional, strictly fact-based. No "Good job" or "Nice try".
      2. **Score Harshly (Scale 1-5)**:
         - **1-2/5 (Fail/Weak)**: Unstructured, random brainstorming, missing definitions, no data usage.
         - **3/5 (Average)**: Standard answer. Found a solution but lacked depth, segmentation rigor, or strategic insight.
         - **4/5 (Strong)**: Clear structure, good data intuition, correct reasoning.
         - **5/5 (Exceptional)**: Flawless MECE breakdown, excellent business sense, zero prompts needed. (Reserve for top 5% only).
      
      **CRITERIA FOR ${category}:**
      ${criteria}

      **OUTPUT INSTRUCTIONS (JSON):**
      1. **rootCauseSummary**: The actual correct solution/summary of the case (or best approach).
      2. **reasoningSteps**: "What a Strong Answer WOULD Have Done". The ideal path.
      3. **improvementSuggestions**: "Brutal Feedback". Write 5-10 bullets of harsh critique. (e.g., "You failed to segment users.", "Your hypothesis was random.").
      4. **scores**: Rate strictly based on the scale above.
      5. **finalScore**: 0-100 based on overall impression (Aggragate of sub-scores).

      Return the result strictly in JSON format matching the schema.
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
