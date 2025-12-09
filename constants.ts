
import { Scenario, Category } from './types';

export const COACH_AVATAR_URL = "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix&glasses=prescription02&clothing=blazerAndShirt&hair=shortFlat&skinColor=f8d25c&mouth=smile&eyebrows=default&eyes=default";

// --- SYSTEM INSTRUCTIONS ---

export const RCA_SYSTEM_INSTRUCTION = `
You are **RCA Coach AI**, an expert Product Management Interview Coach specialized in Root Cause Analysis (RCA).
Your goal is to help PM aspirants practice diagnosing problems structurally.

**Core Behaviors:**
1.  **Role:** Act as a supportive, professional, but rigorous interview coach.
2.  **Interaction:** Ask **ONE** question at a time. Do not dump information.
3.  **Process:** Guide the user to:
    *   Clarify the metric/problem.
    *   Break down the problem (segmentation, funnel, equation).
    *   Hypothesize (internal vs external factors).
    *   Validate assumptions.
4.  **Tone:** Encouraging, concise, structured.
5.  **Restrictions:**
    *   **NEVER** reveal the final root cause until the user clicks "Complete" or explicitly gives up.
    *   If the user asks for a hint, give a directional nudge but do not solve it.
`;

export const GUESSTIMATE_SYSTEM_INSTRUCTION = `
You are a **Senior PM Interviewer** specialized in Guesstimates / Estimation Questions.
Your goal is to evaluate structured analytical thinking, assumptions, segmentation, model building, and clear communication.

**Core Behaviors:**
1.  **Think step-by-step**: Guide the user through the framework (Clarify -> Structure -> Assume -> Calculate -> Sanity Check).
2.  **Ask ONE question at a time**: Lead the user to structure the problem before calculating.
3.  **Calculator Usage**: Explicitly guide the user to use the calculator panel. Say things like "Let's calculate this step together using the calculator."
4.  **Assumptions**: Encourage measurable, defined assumptions. Ask "What assumption do you think makes sense here?"
5.  **Validation**: Perform sanity checks. Ask "Does this value look realistic?"
6.  **Restrictions**:
    *   **NEVER** provide the final calculation immediately.
    *   Accept near-correct reasoning and refine gently.
    *   If the user is stuck, suggest splitting the population or checking a specific input.

**Session Flow:**
1.  **Start:** Greet the user, confirm the estimation target, and ask "How would you like to structure this?"
2.  **Structuring:** Ensure they have a formula/equation before picking numbers.
3.  **Calculation:** Once assumptions are set, tell them to use the calculator to compute the result.
4.  **End:** When completing, provide a "Final Estimate", "Structured Approach Summary", and "Sanity Check" in the evaluation.
`;

export const STRATEGY_SYSTEM_INSTRUCTION = `
You are a **VP of Product** conducting a Strategy Interview.
Your goal is to evaluate the candidate's business acumen, ability to analyze markets, competitive landscapes, and long-term vision.

**Core Behaviors:**
1.  **Strategic Frameworks**: Encourage frameworks like 3Cs (Company, Customer, Competitors), SWOT, Ansoff Matrix, or Porter's 5 Forces where relevant.
2.  **Ask ONE question at a time**: Guide them from landscape analysis to decision making.
3.  **Challenge Assumptions**: Strategy is about trade-offs. If they pick a direction, ask "What are the risks?" or "Why not option B?".
4.  **Focus**: Move beyond features. Discuss monetization, go-to-market, moats, and acquisitions.
5.  **Restrictions**:
    *   **NEVER** give the strategy.
    *   Push for a clear "Go / No-Go" or specific recommendation at the end.

**Session Flow:**
1.  **Start:** Greet the user, set the high-level business context, and ask for their initial approach.
2.  **Analysis:** Guide them to analyze the market/landscape first.
3.  **Options:** Have them generate strategic options.
4.  **Recommendation:** Force a prioritized recommendation with justification.
`;

export const PRODUCT_DESIGN_SYSTEM_INSTRUCTION = `
You are a **Senior PM Interview Coach** specialized in Product Design / Product Sense interviews.
Your goal is to coach the user through real-world product design scenarios using structured frameworks (UPSM, JTBD, etc.).

**Core Behaviors:**
1.  **Guide with structured thinking**: Do not answer dump. Lead the user.
2.  **Clarify first**: Always ensure the user defines the problem and goal before discussing solutions.
3.  **Focus on Users**: Ask for personas, pain points, and user journeys.
4.  **Prioritization**: Push the user to justify reasoning with data or assumptions (ROI vs Effort).
5.  **Restrictions**:
    *   **NEVER** deliver the full solution unless requested.
    *   Provide hints only when asked.

**Session Flow:**
1.  **Problem Understanding**: "Who are the target users? What unmet need are we solving?"
2.  **User Segmentation**: "Which user groups are most impacted?"
3.  **Use Cases/JTBD**: "What are the primary use cases?"
4.  **Journey & Pain Points**: "Where are the friction points?"
5.  **Solutioning**: "What are your top 3 feature ideas? Why these?"
6.  **Metrics**: "How would you measure success?"
7.  **Edge Cases**: "What risks do you anticipate?"

**Tone**: Supportive, structured, concise, interview realistic.
`;

// --- SIDEBAR GUIDES ---

export const RCA_GUIDE = [
    'Clarify the metric',
    'Break problem down',
    'Hypothesize factors',
    'Validate with data'
];

export const GUESSTIMATE_GUIDE = [
    'Clarify scope',
    'Break problem into components',
    'Define assumptions explicitly',
    'Calculate step by step',
    'Validate reasonableness',
    'Sensitivity analysis',
    'Summarize final value'
];

export const STRATEGY_GUIDE = [
    'Analyze Landscape (3Cs)',
    'Define Strategic Goal',
    'Identify Options',
    'Evaluate Trade-offs',
    'Make Recommendation',
    'Discuss Risks/Moats'
];

export const PRODUCT_DESIGN_GUIDE = [
    'Clarify Goal & Constraints',
    'Define User Segments',
    'Prioritize Persona',
    'Identify Pain Points',
    'Brainstorm Solutions',
    'Prioritize Features',
    'Define Success Metrics'
];

// --- SCENARIOS ---

const RCA_SCENARIOS: Scenario[] = [
  // Easy
  { id: 'e1', category: 'RCA', difficulty: 'Easy', title: 'A key product metric (DAU) suddenly drops by 5%.' },
  { id: 'e2', category: 'RCA', difficulty: 'Easy', title: 'Sign-ups for your app are flat week-on-week.' },
  { id: 'e3', category: 'RCA', difficulty: 'Easy', title: 'Website conversion rate (Visit -> Sign-up) has dipped slightly.' },
  { id: 'e4', category: 'RCA', difficulty: 'Easy', title: 'Customer support tickets for “wrong item delivered” increased.' },
  { id: 'e5', category: 'RCA', difficulty: 'Easy', title: 'Push notification click-through rate has declined recently.' },
  { id: 'e6', category: 'RCA', difficulty: 'Easy', title: 'App store rating has dropped from 4.5 to 4.3 over a month.' },
  { id: 'e7', category: 'RCA', difficulty: 'Easy', title: 'Payment success rate has decreased marginally.' },
  { id: 'e8', category: 'RCA', difficulty: 'Easy', title: 'A newly launched feature shows lower-than-expected usage.' },
  { id: 'e9', category: 'RCA', difficulty: 'Easy', title: 'Email open rates have dropped for your weekly newsletter.' },
  { id: 'e10', category: 'RCA', difficulty: 'Easy', title: 'Average session duration is down, but retention is stable.' },
  // Medium
  { id: 'm1', category: 'RCA', difficulty: 'Medium', title: 'Orders are down 15% WoW, but traffic is stable.' },
  { id: 'm2', category: 'RCA', difficulty: 'Medium', title: 'Order cancellations up 20% within the 24h window.' },
  { id: 'm3', category: 'RCA', difficulty: 'Medium', title: 'Digital wallet transactions dropped by 30%.' },
  { id: 'm4', category: 'RCA', difficulty: 'Medium', title: 'Dating app DAU dropped 10% last month.' },
  { id: 'm5', category: 'RCA', difficulty: 'Medium', title: 'Ride-hailing trip completion rate declined; bookings constant.' },
  { id: 'm6', category: 'RCA', difficulty: 'Medium', title: 'Decrease in new banking app installations over last quarter.' },
  { id: 'm7', category: 'RCA', difficulty: 'Medium', title: 'Add to Cart -> Purchase drop-off increased at payment step.' },
  { id: 'm8', category: 'RCA', difficulty: 'Medium', title: 'SaaS churn increased for SMBs but not Enterprise.' },
  { id: 'm9', category: 'RCA', difficulty: 'Medium', title: 'Escalations for "late delivery" up 15%. Is it ops or logistics?' },
  { id: 'm10', category: 'RCA', difficulty: 'Medium', title: 'Signup-to-KYC rate dropped after UI revamp.' },
  // Hard
  { id: 'h1', category: 'RCA', difficulty: 'Hard', title: 'GMV is flat, but all health metrics are moving slightly.' },
  { id: 'h2', category: 'RCA', difficulty: 'Hard', title: 'Digital bank: Active users, tx volume, and cross-sell all worsened.' },
  { id: 'h3', category: 'RCA', difficulty: 'Hard', title: 'Major 2-hour downtime during peak. Full RCA required.' },
  { id: 'h4', category: 'RCA', difficulty: 'Hard', title: 'Engagement dropped 15% after "improved" algo launch.' },
  { id: 'h5', category: 'RCA', difficulty: 'Hard', title: 'Rising fraud, higher review load, and declining trust simultaneously.' },
  { id: 'h6', category: 'RCA', difficulty: 'Hard', title: 'Driver churn, rider cancellation, and ETA complaints all spiked.' },
  { id: 'h7', category: 'RCA', difficulty: 'Hard', title: 'SaaS expansion slowed, renewals down, usage depth down.' },
  { id: 'h8', category: 'RCA', difficulty: 'Hard', title: 'Security breach exposed user data. RCA on technical & process failures.' },
];

const GUESSTIMATE_SCENARIOS: Scenario[] = [
    // Easy
    { id: 'ge1', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate the number of tube lights in a city like Bangalore.' },
    { id: 'ge2', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate how many McDonald’s burgers are sold per month in India.' },
    { id: 'ge3', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate how many pizzas are sold daily in New York City.' },
    { id: 'ge4', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate number of daily Uber ride requests in a metro city.' },
    { id: 'ge5', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate daily water consumption for a city of 5M people.' },
    { id: 'ge6', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate how many coffee shops are needed for a city of 10M people.' },
    { id: 'ge7', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate number of taxi rides taken globally per day.' },
    { id: 'ge8', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate daily email sends worldwide on Gmail.' },
    { id: 'ge9', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate the number of photos uploaded daily to Instagram.' },
    { id: 'ge10', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate number of plastic bottles used daily in a metro city.' },
    { id: 'ge11', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate number of petrol pumps in India.' },
    { id: 'ge12', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate daily credit card transactions in India.' },
    { id: 'ge13', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate number of bicycles sold annually in a country.' },
    { id: 'ge14', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate number of rooms cleaned daily in hotels in a city.' },
    { id: 'ge15', category: 'Guesstimate', difficulty: 'Easy', title: 'Estimate monthly mobile data consumption in a country.' },
    // Medium
    { id: 'gm1', category: 'Guesstimate', difficulty: 'Medium', title: 'How many tennis balls fit inside a Boeing 747?' },
    { id: 'gm2', category: 'Guesstimate', difficulty: 'Medium', title: 'Estimate the number of cars sold in India in 2023.' },
    { id: 'gm3', category: 'Guesstimate', difficulty: 'Medium', title: 'Estimate total annual streaming hours on Netflix in India.' },
    { id: 'gm4', category: 'Guesstimate', difficulty: 'Medium', title: 'Estimate annual e-commerce shipments globally.' },
    { id: 'gm5', category: 'Guesstimate', difficulty: 'Medium', title: 'Estimate daily Google search volume in a country.' },
    { id: 'gm6', category: 'Guesstimate', difficulty: 'Medium', title: 'Estimate annual food delivery orders in New York City.' },
    { id: 'gm7', category: 'Guesstimate', difficulty: 'Medium', title: 'Estimate total number of hotel bookings worldwide per month.' },
    { id: 'gm8', category: 'Guesstimate', difficulty: 'Medium', title: 'Estimate daily messages sent via SMS + messaging apps.' },
    { id: 'gm9', category: 'Guesstimate', difficulty: 'Medium', title: 'Estimate the size of digital advertising spending by SMBs in India.' },
    { id: 'gm10', category: 'Guesstimate', difficulty: 'Medium', title: 'Estimate total number of cloud storage TB consumed globally annually.' },
    // Hard
    { id: 'gh1', category: 'Guesstimate', difficulty: 'Hard', title: 'Estimate first-year sales volume for Apple Vision Pro in India.' },
    { id: 'gh2', category: 'Guesstimate', difficulty: 'Hard', title: 'Estimate annual global market size for wearables (fitness trackers).' },
    { id: 'gh3', category: 'Guesstimate', difficulty: 'Hard', title: 'Estimate global OTT revenue opportunity if Netflix enters 5 new countries.' },
    { id: 'gh4', category: 'Guesstimate', difficulty: 'Hard', title: 'Estimate SaaS subscription revenue for a productivity tool targeting SMBs globally.' },
    { id: 'gh5', category: 'Guesstimate', difficulty: 'Hard', title: 'Estimate annual e-commerce GMV impact of 10% increase in delivery fees.' },
    { id: 'gh6', category: 'Guesstimate', difficulty: 'Hard', title: 'Estimate annual demand for bike-sharing fleet size in Bangalore.' },
    { id: 'gh7', category: 'Guesstimate', difficulty: 'Hard', title: 'Estimate global number of active Uber drivers.' },
    { id: 'gh8', category: 'Guesstimate', difficulty: 'Hard', title: 'Estimate global demand for airline seats in the year 2030.' },
    { id: 'gh9', category: 'Guesstimate', difficulty: 'Hard', title: 'Estimate the number of Amazon Prime orders placed daily worldwide.' },
    { id: 'gh10', category: 'Guesstimate', difficulty: 'Hard', title: 'Estimate annual shipping container movement globally in TEUs.' }
];

const STRATEGY_SCENARIOS: Scenario[] = [
    // Easy
    { id: 's1', category: 'Strategy', difficulty: 'Easy', title: 'Should Spotify launch its own hardware (headphones/speakers)?' },
    { id: 's2', category: 'Strategy', difficulty: 'Easy', title: 'How would you monetize WhatsApp without ads?' },
    { id: 's3', category: 'Strategy', difficulty: 'Easy', title: 'Should Netflix offer a free, ad-supported tier (assuming they haven’t)?' },
    { id: 's4', category: 'Strategy', difficulty: 'Easy', title: 'Pick a favorite product. What is its biggest strategic threat?' },
    { id: 's5', category: 'Strategy', difficulty: 'Easy', title: 'How would you increase market share for a new local coffee shop?' },
    { id: 's6', category: 'Strategy', difficulty: 'Easy', title: 'Should Uber Eats acquire a grocery delivery startup?' },
    { id: 's7', category: 'Strategy', difficulty: 'Easy', title: 'Design a go-to-market strategy for a new fitness app.' },
    { id: 's8', category: 'Strategy', difficulty: 'Easy', title: 'Should Apple launch a search engine to compete with Google?' },
    { id: 's9', category: 'Strategy', difficulty: 'Easy', title: 'How would you improve Instagram’s strategy against TikTok?' },
    { id: 's10', category: 'Strategy', difficulty: 'Easy', title: 'Should Peloton lower its bike prices significantly?' },
    // Medium
    { id: 'sm1', category: 'Strategy', difficulty: 'Medium', title: 'You are PM for Airbnb. Should you enter the business travel market?' },
    { id: 'sm2', category: 'Strategy', difficulty: 'Medium', title: 'Should Amazon launch a traditional bank?' },
    { id: 'sm3', category: 'Strategy', difficulty: 'Medium', title: 'Facebook wants to enter the dating market. Define the GTM strategy.' },
    { id: 'sm4', category: 'Strategy', difficulty: 'Medium', title: 'Should Google acquire Pinterest? Analyze the strategic fit.' },
    { id: 'sm5', category: 'Strategy', difficulty: 'Medium', title: 'How would you turn around a declining SaaS product with high churn?' },
    { id: 'sm6', category: 'Strategy', difficulty: 'Medium', title: 'Set the 5-year strategy for Tesla in the Indian market.' },
    { id: 'sm7', category: 'Strategy', difficulty: 'Medium', title: 'Should Disney+ acquire a major gaming studio?' },
    { id: 'sm8', category: 'Strategy', difficulty: 'Medium', title: 'How should Dropbox compete with Google Drive’s free tiers?' },
    { id: 'sm9', category: 'Strategy', difficulty: 'Medium', title: 'Evaluate the pros and cons of Netflix getting into live sports.' },
    { id: 'sm10', category: 'Strategy', difficulty: 'Medium', title: 'Define a path to profitability for a rapid-delivery app.' },
    // Hard
    { id: 'sh1', category: 'Strategy', difficulty: 'Hard', title: 'You are CEO of Twitter (X). Define the turnaround strategy.' },
    { id: 'sh2', category: 'Strategy', difficulty: 'Hard', title: 'Should Microsoft acquire Discord? Valuation and strategic fit.' },
    { id: 'sh3', category: 'Strategy', difficulty: 'Hard', title: 'Design a strategy for a traditional bank to compete with DeFi.' },
    { id: 'sh4', category: 'Strategy', difficulty: 'Hard', title: 'Evaluate the existential threat of AI to Google Search. Strategy to mitigate?' },
    { id: 'sh5', category: 'Strategy', difficulty: 'Hard', title: 'Should Apple buy Disney? Analyze the mega-merger.' },
    { id: 'sh6', category: 'Strategy', difficulty: 'Hard', title: 'Set the expansion strategy for a US fintech into Southeast Asia.' },
    { id: 'sh7', category: 'Strategy', difficulty: 'Hard', title: 'Teams is bundling for free. You are Slack\'s CEO. What is your response?' },
    { id: 'sh8', category: 'Strategy', difficulty: 'Hard', title: 'Assess the strategic viability of the Metaverse for Meta long-term.' },
    { id: 'sh9', category: 'Strategy', difficulty: 'Hard', title: 'Should Amazon spin off AWS into a separate entity?' },
    { id: 'sh10', category: 'Strategy', difficulty: 'Hard', title: 'Create a strategic roadmap for Waymo (Self-driving) for the next 5 years.' }
];

const PRODUCT_DESIGN_SCENARIOS: Scenario[] = [
    // Easy
    { id: 'pde1', category: 'Product Design', difficulty: 'Easy', title: 'Design a better alarm clock.', companyStyle: 'Google' },
    { id: 'pde2', category: 'Product Design', difficulty: 'Easy', title: 'Improve the experience of using a TV remote.', companyStyle: 'Netflix' },
    { id: 'pde3', category: 'Product Design', difficulty: 'Easy', title: 'Design a solution to reduce waiting time at elevators.', companyStyle: 'Amazon' },
    { id: 'pde4', category: 'Product Design', difficulty: 'Easy', title: 'Improve the experience of using a school library app.', companyStyle: 'Byju’s' },
    { id: 'pde5', category: 'Product Design', difficulty: 'Easy', title: 'Improve the onboarding experience for a new mobile app.', companyStyle: 'Notion' },
    { id: 'pde6', category: 'Product Design', difficulty: 'Easy', title: 'Design a water bottle for athletes.', companyStyle: 'Adidas' },
    { id: 'pde7', category: 'Product Design', difficulty: 'Easy', title: 'Improve the online movie ticket booking experience.', companyStyle: 'BookMyShow' },
    { id: 'pde8', category: 'Product Design', difficulty: 'Easy', title: 'Design a digital notice board for universities.', companyStyle: 'Microsoft' },
    { id: 'pde9', category: 'Product Design', difficulty: 'Easy', title: 'Improve push notification relevance for a mobile app.', companyStyle: 'Swiggy' },
    { id: 'pde10', category: 'Product Design', difficulty: 'Easy', title: 'Design a lost & found app for airports.', companyStyle: 'MakeMyTrip' },
    { id: 'pde11', category: 'Product Design', difficulty: 'Easy', title: 'Improve customer support experience for D2C brands.', companyStyle: 'Shopify' },
    { id: 'pde12', category: 'Product Design', difficulty: 'Easy', title: 'Design a dog walking and care app.', companyStyle: 'PetCare' },
    { id: 'pde13', category: 'Product Design', difficulty: 'Easy', title: 'Improve the wishlist experience for an e-commerce app.', companyStyle: 'Flipkart' },
    { id: 'pde14', category: 'Product Design', difficulty: 'Easy', title: 'Design a system to track home expenses.', companyStyle: 'PhonePe' },
    { id: 'pde15', category: 'Product Design', difficulty: 'Easy', title: 'Improve the camera experience on mid-range phones.', companyStyle: 'Samsung' },
    // Medium
    { id: 'pdm1', category: 'Product Design', difficulty: 'Medium', title: 'Design a solution to reduce food wastage using Swiggy/Zomato.', companyStyle: 'Swiggy/Zomato' },
    { id: 'pdm2', category: 'Product Design', difficulty: 'Medium', title: 'Improve navigation for visually impaired users using Google Maps.', companyStyle: 'Google' },
    { id: 'pdm3', category: 'Product Design', difficulty: 'Medium', title: 'Improve seller onboarding for a marketplace like Amazon/Flipkart.', companyStyle: 'Flipkart' },
    { id: 'pdm4', category: 'Product Design', difficulty: 'Medium', title: 'Redesign Airbnb experience for families with young children.', companyStyle: 'Airbnb' },
    { id: 'pdm5', category: 'Product Design', difficulty: 'Medium', title: 'Improve WhatsApp groups for large-scale community communication.', companyStyle: 'WhatsApp' },
    { id: 'pdm6', category: 'Product Design', difficulty: 'Medium', title: 'Design Spotify feature to share songs based on mood.', companyStyle: 'Spotify' },
    { id: 'pdm7', category: 'Product Design', difficulty: 'Medium', title: 'Improve collaboration experience for college project teams.', companyStyle: 'Canva' },
    { id: 'pdm8', category: 'Product Design', difficulty: 'Medium', title: 'Design an education app for UPSC aspirants.', companyStyle: 'Unacademy' },
    { id: 'pdm9', category: 'Product Design', difficulty: 'Medium', title: 'Improve LinkedIn job search experience for freshers.', companyStyle: 'LinkedIn' },
    { id: 'pdm10', category: 'Product Design', difficulty: 'Medium', title: 'Improve onboarding experience for Microsoft Teams first-time users.', companyStyle: 'Microsoft' },
    { id: 'pdm11', category: 'Product Design', difficulty: 'Medium', title: 'Design product returns & refund experience for e-commerce.', companyStyle: 'Flipkart' },
    { id: 'pdm12', category: 'Product Design', difficulty: 'Medium', title: 'Improve trust & verification for OLX buyers/sellers.', companyStyle: 'OLX' },
    { id: 'pdm13', category: 'Product Design', difficulty: 'Medium', title: 'Design YouTube for school classrooms.', companyStyle: 'YouTube' },
    { id: 'pdm14', category: 'Product Design', difficulty: 'Medium', title: 'Improve Netflix content discovery experience.', companyStyle: 'Netflix' },
    { id: 'pdm15', category: 'Product Design', difficulty: 'Medium', title: 'Design a mobile app for hobby gardening.', companyStyle: 'Atlassian' },
    { id: 'pdm16', category: 'Product Design', difficulty: 'Medium', title: 'Improve breakout room experience for Zoom teachers.', companyStyle: 'Zoom' },
    { id: 'pdm17', category: 'Product Design', difficulty: 'Medium', title: 'Design an app to help people track gym progress.', companyStyle: 'CultFit' },
    { id: 'pdm18', category: 'Product Design', difficulty: 'Medium', title: 'Create a hyperlocal community platform.', companyStyle: 'Meta' },
    { id: 'pdm19', category: 'Product Design', difficulty: 'Medium', title: 'Design a roommate finding app.', companyStyle: 'Airbnb' },
    { id: 'pdm20', category: 'Product Design', difficulty: 'Medium', title: 'Improve ride-booking experience for senior citizens.', companyStyle: 'Uber' },
    // Hard
    { id: 'pdh1', category: 'Product Design', difficulty: 'Hard', title: 'Design Uber for Kids with safety and operations in mind.', companyStyle: 'Uber' },
    { id: 'pdh2', category: 'Product Design', difficulty: 'Hard', title: 'Design a car parking management system for large cities.', companyStyle: 'Atlassian' },
    { id: 'pdh3', category: 'Product Design', difficulty: 'Hard', title: 'Design Netflix for senior citizens worldwide.', companyStyle: 'Netflix' },
    { id: 'pdh4', category: 'Product Design', difficulty: 'Hard', title: 'Create a digital vaccination passport product.', companyStyle: 'Google' },
    { id: 'pdh5', category: 'Product Design', difficulty: 'Hard', title: 'Design a cross-border remittance product for migrants.', companyStyle: 'PayPal' },
    { id: 'pdh6', category: 'Product Design', difficulty: 'Hard', title: 'Design an operating system-level parental control platform.', companyStyle: 'Apple' },
    { id: 'pdh7', category: 'Product Design', difficulty: 'Hard', title: 'Build Amazon warehouse automation dashboard.', companyStyle: 'Amazon' },
    { id: 'pdh8', category: 'Product Design', difficulty: 'Hard', title: 'Create Smart Fridge + Home AI ecosystem.', companyStyle: 'Samsung' },
    { id: 'pdh9', category: 'Product Design', difficulty: 'Hard', title: 'Design experience for in-flight entertainment on long journeys.', companyStyle: 'Delta/Airlines' },
    { id: 'pdh10', category: 'Product Design', difficulty: 'Hard', title: 'Design a logistics optimization platform for delivery fleets.', companyStyle: 'Delhivery' },
    { id: 'pdh11', category: 'Product Design', difficulty: 'Hard', title: 'Improve recommendation system for sellers in marketplaces.', companyStyle: 'Flipkart' },
    { id: 'pdh12', category: 'Product Design', difficulty: 'Hard', title: 'Build a healthcare appointment scheduling system for hospitals.', companyStyle: 'Practo' },
    { id: 'pdh13', category: 'Product Design', difficulty: 'Hard', title: 'Design a collaboration dashboard for remote-first companies.', companyStyle: 'Slack' },
    { id: 'pdh14', category: 'Product Design', difficulty: 'Hard', title: 'Design an AI-powered writing assistant for content teams.', companyStyle: 'Grammarly' },
    { id: 'pdh15', category: 'Product Design', difficulty: 'Hard', title: 'Build a super-app for mobility, payments & commerce in India.', companyStyle: 'PhonePe/Paytm' },
];

export const SCENARIOS: Scenario[] = [...RCA_SCENARIOS, ...GUESSTIMATE_SCENARIOS, ...STRATEGY_SCENARIOS, ...PRODUCT_DESIGN_SCENARIOS];
