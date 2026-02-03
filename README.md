# DROP_CULT | Gen-Z Streetwear Platform

> "STREETWEAR FOR THE DIGITAL AGE"

A full-stack MERN e-commerce experience featuring 3D interactions, AI styling, and limited drops.

## 🧱 Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, TypeScript, MongoDB
- **State**: Redux Toolkit (RTK Query)
- **AI**: OpenAI API (Custom Stylist Persona)
- **Payments**: Stripe
- **Storage**: Cloudinary

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Cloudinary Account
- Stripe Account
- OpenAI Key

### 2. Environment Setup

Create `.env` in `/server`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/drop_cult
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_secret
OPENAI_API_KEY=your_openai_key
FRONTEND_URL=http://localhost:5173
```

### 3. Installation

Run from root:
```bash
npm install
npm run install-all
```

### 4. Run Development

```bash
npm start
```
- Server: http://localhost:5000
- Client: http://localhost:5173

## 🎨 Design System

- **Fonts**: Monument Extended (Display), Inter (Body), Space Mono (Code/Details)
- **Colors**:
  - `neon-green`: #ccff00
  - `neon-purple`: #b026ff
  - `off-black`: #0a0a0a
  - `dark-gray`: #121212

## 🤖 Features

- **VIBE_CHECK AI**: Chat with our stylist to find your look.
- **Style DNA**: Take the quiz to generate your profile.
- **Drops**: Limited time releases with countdowns.
- **Crypto-style Checkout**: Fast, minimal, secure.

## 🤝 Contribution

STAY RAW. COMMIT OFTEN.
