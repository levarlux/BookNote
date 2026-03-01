<div align="center">
  <br />
    <a href="https://github.com/yourusername/booknote" target="_blank">
      <img src="public/readme/readme-hero-new.webp" alt="Project Banner">
    </a>
  <br />

  <div>
<img src="https://img.shields.io/badge/-Next.js_16-000000?style=for-the-badge&logo=Next.js&logoColor=white" />
<img src="https://img.shields.io/badge/-ElevenLabs-FFFFFF?style=for-the-badge&logo=ElevenLabs&logoColor=black" />
<img src="https://img.shields.io/badge/-Vapi-62F6B5?style=for-the-badge&logo=Vapi&logoColor=black" />
<img src="https://img.shields.io/badge/-Clerk-6C47FF?style=for-the-badge&logo=Clerk&logoColor=white" /><br/>
<img src="https://img.shields.io/badge/-Convex-1369B9?style=for-the-badge&logo=Convex&logoColor=white" />
<img src="https://img.shields.io/badge/-Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white" />
<img src="https://img.shields.io/badge/-Tailwind-06B6D4?style=for-the-badge&logo=Tailwind-CSS&logoColor=white" />
<img src="https://img.shields.io/badge/-Shadcn/UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
  </div>

  <h3 align="center">AI Book Companion | Vapi, ElevenLabs</h3>

  <p align="center">
    <a href="https://github.com/yourusername/booknote/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/yourusername/booknote?style=for-the-badge" alt="License">
    </a>
    <a href="https://github.com/yourusername/booknote/stargazers">
      <img src="https://img.shields.io/github/stars/yourusername/booknote?style=for-the-badge" alt="Stars">
    </a>
    <a href="https://github.com/yourusername/booknote/issues">
      <img src="https://img.shields.io/github/issues/yourusername/booknote?style=for-the-badge" alt="Issues">
    </a>
    <a href="https://github.com/yourusername/booknote/pulls">
      <img src="https://img.shields.io/github/issues-pr/yourusername/booknote?style=for-the-badge" alt="Pull Requests">
    </a>
  </p>

   <div align="center">
     An AI-powered platform that transforms your books into interactive voice conversations.
   </div>
</div>

## Table of Contents

1. [About](#about)
2. [How It Works](#how-it-works)
3. [Architecture](#architecture)
4. [Tech Stack](#tech-stack)
5. [Features](#features)
6. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
   - [Running the Project](#running-the-project)
7. [Project Structure](#project-structure)
8. [Contributing](#contributing)
   - [Code of Conduct](#code-of-conduct)
   - [How to Contribute](#how-to-contribute)
   - [Development Workflow](#development-workflow)
9. [License](#license)
10. [Acknowledgments](#acknowledgments)

---

## About

**BookNote** is an AI-powered platform that lets you have real-time voice conversations with your books. Upload any PDF, and our AI will process it into an interactive entity that you can chat with using natural voice synthesis.

### Key Highlights

- **Voice-First Experience**: Have natural conversations with your books using AI-powered voice technology
- **Smart Document Processing**: Automatic text extraction, intelligent chunking, and embeddings for precise context retrieval
- **Multiple AI Personas**: Choose from various AI personalities powered by ElevenLabs
- **Real-time Transcripts**: Get live transcripts of all your conversations
- **Modern Tech Stack**: Built with Next.js 16, TypeScript, and modern UI components

---

## How It Works

### 1. PDF Upload & Processing

```
User Upload → PDF Parsing → Text Extraction → Chunking → Embedding Generation → Vector Storage
```

When a user uploads a PDF:
1. The PDF is processed using `pdfjs-dist` for text extraction
2. Text is split into meaningful chunks (overlapping for context)
3. Each chunk is converted to vector embeddings using Google Gemini API
4. Embeddings are stored in Convex for similarity search

### 2. Voice Conversation Flow

```
User Voice Input → Vapi (Voice AI) → Query Processing → Similarity Search → Context Retrieval → AI Response → Voice Output
```

1. User speaks to the AI via Vapi's voice interface
2. The spoken query is transcribed
3. Convex performs similarity search against book embeddings
4. Relevant context is retrieved and sent to the AI
5. ElevenLabs generates the voice response
6. User hears the AI's response in real-time

### 3. System Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Next.js API   │────▶│   Convex        │
│   (Next.js 16)  │     │   Routes        │     │   (Database)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                                               │
        │                                               ▼
        │                                     ┌─────────────────┐
        │                                     │   Vector Store  │
        │                                     │   (Embeddings)  │
        │                                     └─────────────────┘
        ▼
┌─────────────────┐     ┌─────────────────┐
│   Vapi          │────▶│   ElevenLabs    │
│   (Voice AI)    │     │   (TTS)         │
└─────────────────┘     └─────────────────┘
```

### 4. Data Models

#### Book
```typescript
{
  _id: Id<"books">,
  title: string,
  author: string,
  description: string,
  coverURL?: string,
  coverBlobKey?: string,
  userId: string,
  persona?: string,
  isPublic: boolean,
  totalSegments: number,
  _creationTime: number
}
```

#### BookSegment
```typescript
{
  _id: Id<"bookSegments">,
  bookId: Id<"books">,
  content: string,
  embedding: number[],
  _creationTime: number
}
```

---

## Tech Stack

- **[Next.js 16](https://nextjs.org/docs)** - Full-stack React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Convex](https://convex.dev/)** - Real-time database and serverless functions
- **[Vapi](https://vapi.ai/)** - Voice AI platform for real-time conversations
- **[ElevenLabs](https://elevenlabs.io/)** - AI-powered text-to-speech
- **[Clerk](https://clerk.com)** - Authentication and user management
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn UI](https://ui.shadcn.com/)** - Accessible UI component library
- **[Google Gemini](https://ai.google.dev/)** - AI embeddings for semantic search

---

## Features

- **PDF Upload & Ingestion**: Seamlessly upload PDF books with automated text extraction
- **Voice-First Conversations**: Engage in natural, real-time voice dialogues with your books
- **AI Voice Personas**: Choose from distinct AI personalities with ElevenLabs voices
- **Smart Summaries**: Extract key insights and summaries from any chapter
- **Session Transcripts**: Auto-generated text transcripts of all conversations
- **Library Management**: Organize and search through your personal collection
- **Authentication**: Secure access via Clerk with social login support

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Convex CLI](https://docs.convex.dev/quick-start) (`npm install -g convex`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/booknote.git
cd booknote
```

2. Install dependencies:
```bash
npm install
```

3. Set up Convex:
```bash
npx convex dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Deployment (from npx convex dev)
CONVEX_DEPLOYMENT=your_convex_deployment
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Vercel Blob (legacy - using Convex Storage)
BLOB_READ_WRITE_TOKEN=your_blob_token

# Vapi Voice AI
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_key
VAPI_SERVER_SECRET=your_vapi_secret

# AI Services
GOOGLE_GEMINI_API_KEY=your_gemini_key
ELEVENLABS_API_KEY=your_elevenlabs_key
MISTRAL_API_KEY=your_mistral_key
```

#### Getting API Keys:

| Service | Sign Up Link |
|---------|-------------|
| Clerk | [clerk.com](https://clerk.com) |
| Vapi | [vapi.ai](https://vapi.ai) |
| ElevenLabs | [elevenlabs.io](https://elevenlabs.io) |
| Google AI Studio | [aistudio.google.com](https://aistudio.google.com) |

### Running the Project

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
booknote/
├── app/                    # Next.js App Router
│   ├── (root)/            # Main routes
│   │   ├── page.tsx       # Home/Library page
│   │   └── books/
│   │       ├── new/       # Add new book
│   │       └── [slug]/    # Book landing page
│   ├── api/               # API routes
│   │   └── upload/        # File upload handler
│   ├── read/
│   │   └── [id]/          # Reading/chat page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── BookCard.tsx      # Book display card
│   ├── Navbar.tsx        # Navigation
│   ├── HeroSection.tsx   # Landing hero
│   ├── Search.tsx        # Book search
│   ├── UploadForm.tsx    # PDF upload form
│   └── VapiControls.tsx  # Voice controls
├── convex/               # Convex backend
│   ├── books.ts          # Book queries/mutations
│   └── ...               # Other Convex functions
├── lib/                  # Utility functions
│   ├── actions/         # Server actions
│   ├── constants.ts     # App constants
│   └── utils.ts         # Helper utilities
├── public/              # Static assets
│   └── assets/          # Images, icons
├── types/               # TypeScript types
├── .env.local           # Environment variables
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Contributing

We welcome contributions! Here's how you can help:

### Code of Conduct

By participating in this project, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Please be respectful and inclusive.

### How to Contribute

1. **Fork the Repository**
   Click the "Fork" button on GitHub or run:
   ```bash
   git fork https://github.com/yourusername/booknote
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/yourusername/booknote.git
   cd booknote
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make Changes**
   - Follow the existing code style
   - Write meaningful commit messages
   - Add tests if applicable

5. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Fill out the template
   - Link any related issues

### Development Workflow

1. **Setup**: Follow the [Getting Started](#getting-started) guide
2. **Coding Standards**:
   - Use TypeScript for all new code
   - Follow ESLint rules (`npm run lint`)
   - Use meaningful variable and function names
3. **Testing**:
   - Test your changes locally
   - Verify no linting errors
4. **Commit Messages**:
   ```
   feat: add new voice persona selection
   fix: resolve PDF upload timeout issue
   docs: update API documentation
   refactor: simplify book chunking logic
   ```

### Types of Contributions

- 🐛 **Bug Reports**: Found a bug? Open an issue
- 💡 **Features**: Suggest new features
- 📖 **Documentation**: Improve docs
- 🎨 **UI/UX**: Improve the interface
- 🔧 **Code**: Submit pull requests

---

## License

This project is licensed under the MIT License.

### MIT License

```
MIT License

Copyright (c) 2024 BookNote

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Acknowledgments

- [JavaScript Mastery](https://youtube.com/@javascriptmastery) for the original inspiration
- [Vapi](https://vapi.ai/) for the voice AI infrastructure
- [ElevenLabs](https://elevenlabs.io/) for exceptional text-to-speech
- [Clerk](https://clerk.com) for authentication
- [Convex](https://convex.dev/) for the backend infrastructure
- [Shadcn](https://ui.shadcn.com/) for beautiful UI components

---

<div align="center">
  <p>Built with ❤️ using Next.js, Vapi, and ElevenLabs</p>
  <p>Star us on GitHub if you find this project useful!</p>
</div>
