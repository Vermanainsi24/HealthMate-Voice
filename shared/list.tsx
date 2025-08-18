// export const AIDoctorAgents = [
//     {
//         id: 1,
//         specialist: "General Physician",
//         description: "Helps with everyday health concerns and common symptoms.",
//         image: "/doctor1.png",
//         agentPrompt: "You are a friendly General Physician AI. Greet the user and quickly ask what symptoms they’re experiencing. Keep responses short and helpful.",
//         voiceId: "7bf67c8f-93ec-46ca-a292-f7d2fc9300d9",
//         subscriptionRequired: false
//     },
//     {
//         id: 2,
//         specialist: "Pediatrician",
//         description: "Expert in children's health, from babies to teens.",
//         image: "/doctor2.png",
//         agentPrompt: "You are a kind Pediatrician AI. Ask brief questions about the child’s health and share quick, safe suggestions.",
//         voiceId: "b383d090-daa3-4ce7-8164-1ab4e362f508",
//         subscriptionRequired: true
//     },
//     {
//         id: 3,
//         specialist: "Dermatologist",
//         description: "Handles skin issues like rashes, acne, or infections.",
//         image: "/doctor3.png",
//         agentPrompt: "You are a knowledgeable Dermatologist AI. Ask short questions about the skin issue and give simple, clear advice.",
//         voiceId: "a5f24dc6-a923-4162-ae77-d7cbc4a9067f",
//         subscriptionRequired: true
//     },
//     {
//         id: 4,
//         specialist: "Psychologist",
//         description: "Supports mental health and emotional well-being.",
//         image: "/doctor4.png",
//         agentPrompt: "You are a caring Psychologist AI. Ask how the user is feeling emotionally and give short, supportive tips.",
//         voiceId: "Letizia",
//         subscriptionRequired: true
//     },
//     {
//         id: 5,
//         specialist: "Nutritionist",
//         description: "Provides advice on healthy eating and weight management.",
//         image: "/doctor5.png",
//         agentPrompt: "You are a motivating Nutritionist AI. Ask about current diet or goals and suggest quick, healthy tips.",
//         voiceId: "jennifer",
//         subscriptionRequired: true
//     },
//     {
//         id: 6,
//         specialist: "Cardiologist",
//         description: "Focuses on heart health and blood pressure issues.",
//         image: "/doctor6.png",
//         agentPrompt: "You are a calm Cardiologist AI. Ask about heart symptoms and offer brief, helpful advice.",
//         voiceId: "Smriti",
//         subscriptionRequired: true
//     },
//     {
//         id: 7,
//         specialist: "ENT Specialist",
//         description: "Handles ear, nose, and throat-related problems.",
//         image: "/doctor7.png",
//         agentPrompt: "You are a friendly ENT AI. Ask quickly about ENT symptoms and give simple, clear suggestions.",
//         voiceId: "Devi",
//         subscriptionRequired: true
//     },
//     {
//         id: 8,
//         specialist: "Orthopedic",
//         description: "Helps with bone, joint, and muscle pain.",
//         image: "/doctor8.png",
//         agentPrompt: "You are an understanding Orthopedic AI. Ask where the pain is and give short, supportive advice.",
//         voiceId: "olivia",
//         subscriptionRequired: true
//     },
//     {
//         id: 9,
//         specialist: "Gynecologist",
//         description: "Cares for women’s reproductive and hormonal health.",
//         image: "/doctor9.png",
//         agentPrompt: "You are a respectful Gynecologist AI. Ask brief, gentle questions and keep answers short and reassuring.",
//         voiceId: "paul",
//         subscriptionRequired: true
//     },
//     {
//         id: 10,
//         specialist: "Dentist",
//         description: "Handles oral hygiene and dental problems.",
//         image: "/doctor10.png",
//         agentPrompt: "You are a cheerful Dentist AI. Ask about the dental issue and give quick, calming suggestions.",
//         voiceId: "john",
//         subscriptionRequired: true
//     }
// ];

// shared/list.ts

export const AIDoctorAgents = [
  {
    id: 1,
    specialist: "General Physician",
    description: "Helps with everyday health concerns and common symptoms.",
    image: "/doctor1.png",
    agentPrompt:
      "You are a friendly General Physician AI. Greet the user and quickly ask what symptoms they’re experiencing. Keep responses short and helpful.",
    voiceId: "Will", // Voice model ID for Vapi TTS
    vapiAgentId: "7bf67c8f-93ec-46ca-a292-f7d2fc9300d9", // Your Vapi agent ID
    subscriptionRequired: false,
  },
  {
    id: 2,
    specialist: "Pediatrician",
    description: "Expert in children's health, from babies to teens.",
    image: "/doctor2.png",
    agentPrompt:
      "You are a kind Pediatrician AI. Ask brief questions about the child’s health and share quick, safe suggestions.",
    voiceId: "Harry",
    vapiAgentId: "b383d090-daa3-4ce7-8164-1ab4e362f508",
    subscriptionRequired: true,
  },
  {
    id: 3,
    specialist: "Dermatologist",
    description: "Handles skin issues like rashes, acne, or infections.",
    image: "/doctor3.png",
    agentPrompt:
      "You are a knowledgeable Dermatologist AI. Ask short questions about the skin issue and give simple, clear advice.",
    voiceId: "Cole",
    vapiAgentId: "a5f24dc6-a923-4162-ae77-d7cbc4a9067f", // Your actual Dermatologist Vapi agent ID
    subscriptionRequired: true,
  },
  {
    id: 4,
    specialist: "Psychologist",
    description: "Supports mental health and emotional well-being.",
    image: "/doctor4.png",
    agentPrompt:
      "You are a caring Psychologist AI. Ask how the user is feeling emotionally and give short, supportive tips.",
    voiceId: "Hana",
    vapiAgentId: "27b491b6-b4da-494d-ad60-219b725d6031",
    subscriptionRequired: true,
  },
  {
    id: 5,
    specialist: "Nutritionist",
    description: "Provides advice on healthy eating and weight management.",
    image: "/doctor5.png",
    agentPrompt:
      "You are a motivating Nutritionist AI. Ask about current diet or goals and suggest quick, healthy tips.",
    voiceId: "Neha",
    vapiAgentId: "a08d4115-0146-4eb2-9910-a5d9629de925",
    subscriptionRequired: true,
  },
  {
    id: 6,
    specialist: "Cardiologist",
    description: "Focuses on heart health and blood pressure issues.",
    image: "/doctor6.png",
    agentPrompt:
      "You are a calm Cardiologist AI. Ask about heart symptoms and offer brief, helpful advice.",
    voiceId: "Paige",
    vapiAgentId: "24d3bcf4-f825-44c0-872a-2322ada08dd6",
    subscriptionRequired: true,
  },
  {
    id: 7,
    specialist: "ENT Specialist",
    description: "Handles ear, nose, and throat-related problems.",
    image: "/doctor7.png",
    agentPrompt:
      "You are a friendly ENT AI. Ask quickly about ENT symptoms and give simple, clear suggestions.",
    voiceId: "Kylie",
    vapiAgentId: "39a7dd3a-c5ba-442e-9a4b-45b079d7e90b",
    subscriptionRequired: true,
  },
  {
    id: 8,
    specialist: "Orthopedic",
    description: "Helps with bone, joint, and muscle pain.",
    image: "/doctor8.png",
    agentPrompt:
      "You are an understanding Orthopedic AI. Ask where the pain is and give short, supportive advice.",
    voiceId: "Spencer",
    vapiAgentId: "7f41e5cb-ed15-4c9c-965c-a998b7473bd2",
    subscriptionRequired: true,
  },
  {
    id: 9,
    specialist: "Gynecologist",
    description: "Cares for women’s reproductive and hormonal health.",
    image: "/doctor9.png",
    agentPrompt:
      "You are a respectful Gynecologist AI. Ask brief, gentle questions and keep answers short and reassuring.",
    voiceId: "Elliot",
    vapiAgentId: "d9efd613-0ed3-460e-abe9-62c1d7576d83",
    subscriptionRequired: true,
  },
  {
    id: 10,
    specialist: "Dentist",
    description: "Handles oral hygiene and dental problems.",
    image: "/doctor10.png",
    agentPrompt:
      "You are a cheerful Dentist AI. Ask about the dental issue and give quick, calming suggestions.",
    voiceId: "rohan",
    vapiAgentId: "854e571e-b75c-43d3-9242-b574f771dd11",
    subscriptionRequired: true,
  },
];
