# Medical AI Voice Agent

## Project Description

The Medical AI Voice Agent is an interactive web application that enables users to consult AI-powered medical voice agents simulating doctors specializing in various fields. Users can talk to the AI agent, receive real-time voice interaction, and generate detailed, AI-driven medical session reports stored within their account for later review.

---

## Key Features / Functions

- **Voice-enabled AI Medical Consultation:** Start and interact with an AI doctor agent via voice, with live transcription displayed.
- **Real-time Transcript Display:** View ongoing conversation transcripts streamed live with partial and final updates.
- **Session History:** Users can view a history of their previous consultations with associated generated medical reports.
- **AI-powered Medical Report Generation:** After each session, an AI-generated comprehensive medical report is created and saved.
- **Multi-specialty Doctor Agents:** Choose from multiple AI medical specialists with unique voice agents for personalized experience.
- **Subscription & Access Control:** Support for subscription-based access plans and usage limits.

---

## Project Directory Structure

```
src/
├── app/
│ └── dashboard/
│ ├── medical-agent/
│ │ └── [sessionId]/page.tsx # Main consultation & call UI component
│ ├── history/ # User session history and reports
│ └── _components/ # Reusable UI components (Tables, Dialogs)
├── components/
│ ├── DoctorAgentCard.tsx # Doctor card with profile info
│ ├── SuggestedDoctorCard.tsx # Suggested doctor selection UI
│ ├── ViewReportDialog.tsx # Modal to view generated session reports
│ └── UI/ # Shared UI elements (Buttons, Dialog, Table, etc.)
├── lib/ # Utility files (e.g., cn.ts)
├── pages/
│ └── api/
│ ├── session-chat.ts # API for session management & fetching
│ ├── suggest-doctors.ts # API to fetch AI-suggested doctors based on notes
│ └── medical-report.ts # API for AI medical report generation
├── db/
│ ├── schema.ts # Drizzle ORM database schema definition
│ └── index.ts # DB connection setup
└── config/
└── OpenAiModel.ts # OpenAI API setup and config
```

---

## Getting Started: Installation & Running

### Prerequisites

- Node.js (>= 15.x recommended)
- npm or yarn package manager
- Access to VAPI and OpenAI API keys
- PostgreSQL or your preferred DB configured as per `db/schema.ts`

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/medical-ai-voice-agent.git
cd medical-ai-voice-agent
```

2. Install dependencies:
```
npm install
or
yarn install
```

3. Create a `.env` file at the project root and add environment variables:
```
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=your_database_connection_string
```
### Running the project locally
```
npm run dev
or
yarn dev
```

Open https://health-mate-voice.vercel.app/ in your browser to see the app.

---

## Tech Stack

- **Next.js 15** (App Router) - React framework for SSR and client rendering.
- **TypeScript** - Statically typed JavaScript for improved dev experience and safety.
- **Tailwind CSS** - Utility-first CSS framework for styling and responsive UI.
- **VAPI AI Web SDK** - For voice interaction with AI agents.
- **OpenAI / Gemini API** - For generating AI-powered medical reports and conversation assistance.
- **Drizzle ORM** - For database schema and query building with PostgreSQL.
- **Axios** - Promise-based HTTP client for API requests.
- **Sonner** - Toast notifications library for user feedback.
- **Lucide React** - Icon library for UI icons.
- **Moment.js** - Date-time formatting library.

---

## Additional Notes

- This project includes both frontend UI components and backend API routes organized within Next.js.
- The medical report generation utilizes advanced AI instructions to produce professional medical summaries.
- Voice interaction uses VAPI Web SDK to handle real-time voice calls with the AI agent.

---

## License

MIT License

---

## Contact

For questions or contributions, please open an issue or submit a pull request.

---

*Thank you for exploring the Medical AI Voice Agent project!*  


