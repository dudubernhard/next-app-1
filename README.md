This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 🦙 Using Llama (Ollama) Locally

This project supports running Llama models locally using [Ollama](https://ollama.com/).

### 1. Install Ollama

```bash
brew install ollama
```

### 2. Pull a Llama Model

For example, to pull Llama 3:

```bash
ollama pull llama3
```

### 3. Start the Ollama Server

You can start the Ollama server with:

```bash
yarn llama
```

This will run `ollama serve` in the background, making the Llama model available to your app.

### 4. Use the Chat Playground

- By default, the chat UI uses Llama (Ollama) as the LLM.
- You can switch between Llama and OpenAI using the dropdown in the chat interface.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
