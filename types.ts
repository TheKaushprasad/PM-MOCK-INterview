
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Category = 'RCA' | 'Guesstimate' | 'Strategy' | 'Product Design';

export interface Scenario {
  id: string;
  category: Category;
  title: string;
  difficulty: Difficulty;
  companyStyle?: string; // Optional field for Product Design scenarios
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  isThinking?: boolean;
}

export interface EvaluationResult {
  rootCauseSummary: string;
  reasoningSteps: string[];
  recommendedActions: string[];
  scores: {
    structuredThinking: number; // All
    frameworkUsage: number; // All
    communicationClarity: number; // All
    mathAndReasoning?: number; // Guesstimate specific
    strategicInsight?: number; // Strategy specific
    userUnderstanding?: number; // Product Design specific
    prioritizationClarity?: number; // Product Design specific
    finalScore: number;
  };
  improvementSuggestions: string;
}

export type AppState = 'landing' | 'selection' | 'coaching' | 'evaluation';
