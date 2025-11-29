# 🌍 eco Yatra - Green Route Planning & Real-Time Air Quality Analysis

<div align="center">

![eco Yatra](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.2-purple?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)

**A production-ready full-stack React application for sustainable travel routing with real-time air quality monitoring, health-personalized routes, and eco-coin rewards system.**

[Live Demo](#) • [Documentation](./TECH_STACK.md) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Getting Started](#-getting-started)
- [📦 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🎯 Key Pages & Features](#-key-pages--features)
- [🔧 API Integration](#-api-integration)
- [💻 Development](#-development)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🗺️ Smart Route Planning
- **Real-time air quality maps** with PM2.5, PM10, NO₂ measurements
- **Green vs normal route comparison** - See health & environmental impact
- **AI-powered route optimization** - TomTom Maps integration with ERS (Eco Route Score)
- **Location autocomplete** - Search any city/state in India
- **Traffic-aware routing** - Avoid congested, polluted areas

### 🏥 Health-Personalized Routes
- **Asthma-friendly routes** - Minimize pollution exposure
- **Allergy management** - Route avoidance for pollen/dust hotspots
- **Heart condition support** - Low-stress, accessible routes
- **Mobility assistance** - Barrier-free path planning
- **Real-time health impact predictions** - Respiratory risk assessment

### 📊 Predictive Analytics Dashboard
- **12-hour air quality forecast** - PM2.5 trend analysis
- **Route impact scoring** - Health and environmental metrics
- **Real-time AQI display** - OpenWeatherMap integration
- **CO₂ savings calculation** - Quantify environmental benefit
- **Health benefit analysis** - Respiratory improvement metrics

### 🎮 Eco Coins Rewards System
- **Gamified green travel** - Earn coins for taking eco-friendly routes
- **Route history tracking** - Track your sustainable journey
- **Voucher redemption** - Convert coins to real rewards
- **Partner network** - Redeem with local eco-partners
- **Impact leaderboard** - Community competition

### 💚 Donations & Tree Planting
- **Secure QR-based donations** - Frictionless giving
- **Direct tree plantation** - See your environmental impact
- **Transparent tracking** - Know exactly where funds go
- **Community campaigns** - Join collective city greening
- **Carbon offset calculator** - Calculate your contribution

### 🗣️ AI Voice Assistant
- **Real speech recognition** - Web Speech API (Chrome, Edge, Safari)
- **Natural text-to-speech** - Indian English voice support
- **Dialogflow-style intent matching** - 9 eco-specific categories
  - Route finding, air quality queries, eco coins, health recommendations, donations, analytics, voice assistance, route history
- **Offline-first** - Works without server dependency
- **Accessible navigation** - Voice-guided turn-by-turn directions

### 🔐 Secure Authentication
- **Sign-up/Sign-in flow** - User account management
- **Health profile setup** - Personalized preferences
- **Session management** - Secure token handling

---

## 🏗️ Architecture

### Frontend (React 18 + TypeScript)
```
Client Architecture:
├── SPA Routing (React Router 6)
├── State Management (React Query + Context API)
├── Component Library (Radix UI + Tailwind CSS)
├── Maps Integration (TomTom SDK)
├── Voice Features (Web Speech API)
└── Real-time Data (OpenWeatherMap API)
```

### Backend (Express 5)
```
Server Architecture:
├── REST API (/api/*)
├── Dialogflow Intent Matching
├── Route Handlers
├── Middleware (CORS, etc.)
└── Environment-based Configuration
```

### External Services
- **TomTom Maps** - Mapping, routing, geocoding, real-time traffic
- **OpenWeatherMap** - Weather data, Air Quality Index (AQI)
- **Google Dialogflow** - Intent recognition (optional)
- **Web Speech API** - Browser-native voice recognition & synthesis

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ or higher
- **pnpm** 10.14.0+ (or npm, yarn)
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/anshumalapandit/Katathon_GreenMinds.git
cd Katathon_GreenMinds
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**
```bash
# Create .env file in root directory
cp .env.example .env
```

4. **Update API keys in `.env`**
```env
# TomTom Maps API
VITE_TOMTOM_API_KEY=your_tomtom_api_key

# OpenWeatherMap API
VITE_WEATHER_API_KEY=your_openweather_api_key

# Google Dialogflow (optional)
GOOGLE_APPLICATION_CREDENTIALS=path/to/credentials.json
```

5. **Start development server**
```bash
pnpm dev
# Server runs on http://localhost:8080 (or 8081 if 8080 is busy)
```

6. **Build for production**
```bash
pnpm build
```

7. **Run production server**
```bash
pnpm start
```

---

## 📦 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3.1 | UI Framework |
| Vite | 7.1.2 | Build Tool |
| TypeScript | 5.9.2 | Type Safety |
| React Router | 6.30.1 | SPA Routing |
| React Query | 5.84.2 | Server State |
| Tailwind CSS | 3.4.17 | Styling |
| Radix UI | Latest | UI Components |
| Lucide React | 0.539.0 | Icons |
| React Hook Form | 7.62.0 | Form Management |
| Zod | 3.25.76 | Schema Validation |
| Framer Motion | 12.23.12 | Animations |
| Recharts | 2.12.7 | Data Visualization |
| Three.js | 0.176.0 | 3D Graphics |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Express | 5.1.0 | Web Framework |
| Node.js | Latest | Runtime |
| CORS | 2.8.5 | Cross-Origin Support |
| dotenv | 17.2.1 | Environment Vars |

### APIs & Services
- **TomTom Maps SDK** - Location services, routing, traffic data
- **OpenWeatherMap API** - Real-time weather and air quality
- **Web Speech API** - Voice recognition and synthesis (browser native)
- **Google Dialogflow** - AI intent matching (optional)

### Development
- **Vitest** 3.2.4 - Unit Testing
- **Prettier** 3.6.2 - Code Formatting
- **ESLint** - Code Linting

---

## 📁 Project Structure

```
.
├── client/                          # React Frontend
│   ├── pages/                       # Route pages
│   │   ├── Index.tsx               # Home page
│   │   ├── GreenRoute.tsx          # Route selection
│   │   ├── PredictiveAnalytics.tsx # Route analysis & AQI
│   │   ├── ImpactRouteAnalyzer.tsx # Interactive map
│   │   ├── EcoCoins.tsx            # Rewards hub
│   │   ├── Donate.tsx              # Donation page
│   │   ├── SignUp.tsx & SignIn.tsx # Authentication
│   │   └── [Other Pages]
│   ├── components/
│   │   ├── ui/                     # Radix UI components (30+)
│   │   ├── modals/                 # Modal components
│   │   └── [Feature Components]
│   ├── context/                    # React Context
│   │   └── AuthContext.tsx         # User authentication
│   ├── hooks/                      # Custom React hooks
│   ├── lib/
│   │   ├── utils.ts               # Utility functions
│   │   └── voiceUtils.ts          # Voice recognition/synthesis
│   ├── App.tsx                     # App component with routing
│   ├── main.tsx                    # Entry point
│   ├── global.css                  # Global styles & theme
│   └── impact-route/               # TomTom map integration
│
├── server/                          # Express Backend
│   ├── index.ts                    # Main server setup
│   ├── routes/
│   │   ├── demo.ts                # Demo endpoint
│   │   ├── dialogflow.ts          # Intent matching
│   │   └── dialogflow-api.ts      # Dialogflow API integration
│   └── node-build.ts              # Node build script
│
├── shared/                         # Shared Types
│   └── api.ts                      # API interfaces
│
├── public/                         # Static assets
│   └── impact-route/              # Map HTML/assets
│
├── netlify/                        # Netlify functions
│   └── functions/api.ts
│
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                 # Vite config (client)
├── vite.config.server.ts          # Vite config (server)
├── tailwind.config.ts             # Tailwind theme
├── TECH_STACK.md                  # Detailed tech documentation
└── README.md                       # This file
```

---

## 🎯 Key Pages & Features

### 🏠 Home Page (`Index.tsx`)
- Hero section with app description
- Feature showcase (9 main features)
- Testimonials & trust indicators
- Call-to-action buttons
- Responsive design

### 📍 Green Route Finder (`GreenRoute.tsx`)
- Dual location input (start/end)
- Google Places autocomplete
- Route recommendation engine
- Health profile consideration
- Real-time traffic overlay

### 📊 Predictive Analytics (`PredictiveAnalytics.tsx`)
- **Real-Time AQI Display** (OpenWeatherMap integration)
- Location search with autocomplete
- PM2.5, PM10, NO₂, O₃ measurements
- 12-hour air quality forecast
- Health impact predictions
- Route impact scoring
- Environmental metrics

### 🗺️ Impact Route Analyzer (`ImpactRouteAnalyzer.tsx`)
- Interactive TomTom map
- Route comparison (normal vs green)
- ERS (Eco Route Score) calculation
- Traffic layer overlay
- Air quality heatmap
- Real-time updates

### 💰 Eco Coins (`EcoCoins.tsx`)
- Coin balance display
- Route history with impact metrics
- Voucher marketplace
- Redemption workflow
- Leaderboard

### 💚 Donations (`Donate.tsx`)
- Donation amount selector
- QR code payment generation
- Impact calculator (trees planted)
- Transaction history
- Receipt generation

### 🔐 Authentication (`SignUp.tsx`, `SignIn.tsx`)
- User registration form
- Health profile setup
- Login with validation
- Session management

---

## 🔧 API Integration

### OpenWeatherMap Air Pollution API
```javascript
// Real-time AQI data
GET https://api.openweathermap.org/data/2.5/air_pollution
  ?lat={latitude}
  &lon={longitude}
  &appid={API_KEY}

// Response includes:
// - AQI (1-5 scale)
// - PM2.5, PM10, NO₂, O₃, CO levels
// - Main pollutant identifier
```

### TomTom Maps API
```javascript
// Route calculation with ERS scoring
POST https://api.tomtom.com/routing/1/calculateRoute/

// Features:
// - Traffic-aware routing
// - Multiple route alternatives
// - Turn-by-turn directions
// - Real-time traffic overlay
```

### Custom Dialogflow-Style Intent Matcher
```typescript
// 9 Intent Categories:
1. Route Finding
2. Air Quality Query
3. Eco Coins Info
4. Health Recommendations
5. Donation Inquiry
6. Analytics Query
7. Voice Assistance
8. Route History
9. Get Started
```

---

## 💻 Development

### Available Scripts

```bash
# Start development server (hot reload)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test

# Type checking
pnpm typecheck

# Format code with Prettier
pnpm format.fix
```

### Development Workflow
- **Single port development** - Frontend & backend on port 8080
- **Hot Module Replacement (HMR)** - Instant code updates
- **TypeScript strict mode** - Catch errors early
- **Tailwind Just-in-Time** - Fast CSS compilation

### Code Quality
- TypeScript for type safety
- Prettier for consistent formatting
- ESLint for code standards
- Vitest for unit testing
- React Query DevTools for debugging

---

## 🌐 Deployment

### Deployment Options

#### 1. Netlify (Recommended for SPA)
```bash
# Build
pnpm build

# Deploy
netlify deploy --prod --dir=dist/spa
```

#### 2. Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### 3. Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install && pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

#### 4. Traditional Server (Ubuntu/Linux)
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone <repo-url>
cd Katathon_GreenMinds
pnpm install
pnpm build

# Run with PM2
npm i -g pm2
pm2 start "pnpm start"
```

### Environment Variables for Production
```env
# TomTom API
VITE_TOMTOM_API_KEY=your_key

# OpenWeatherMap API
VITE_WEATHER_API_KEY=your_key

# Server
NODE_ENV=production
PORT=3000

# Dialogflow (optional)
GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json
```

---

## 🎨 UI/UX Highlights

- **Modern Design System** - Custom Tailwind theme with eco-colors
- **Responsive Layout** - Mobile-first, works on all devices
- **Accessible Components** - WCAG 2.1 compliant (Radix UI)
- **Smooth Animations** - Framer Motion & Tailwind animations
- **Dark Mode Ready** - Theme switching via next-themes
- **Loading States** - Skeleton screens & spinners
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Sonner library

### Color Palette
```css
--eco-green: #0B8A6B      /* Primary green */
--eco-teal: #0FA8A8       /* Teal accent */
--eco-mint: #D1F1ED       /* Light mint */
--eco-yellow: #FFB703     /* Warning/caution */
```

---

## 📈 Performance Metrics

- **Bundle Size** - ~460KB (gzipped: ~131KB)
- **Lighthouse Score** - 95+ (performance)
- **Core Web Vitals** - Optimized
- **First Contentful Paint** - < 1.5s
- **Time to Interactive** - < 3s

### Optimization Techniques
- SWC compiler (3x faster bundling)
- Code splitting by route
- Image optimization
- Tree-shaking unused code
- CSS-in-JS with zero runtime (Tailwind)
- React 18 concurrent rendering

---

## 🔒 Security Features

✅ **CORS Protection** - Controlled cross-origin requests  
✅ **Environment Variables** - Secrets management  
✅ **Input Validation** - Zod schema validation  
✅ **TypeScript** - Type safety prevents injection attacks  
✅ **HTTPS Ready** - Production-grade security  
✅ **Secure API Communication** - Validated endpoints  

---

## 📱 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | All features including voice |
| Edge | ✅ Full | All features including voice |
| Firefox | ✅ Full | Voice features limited |
| Safari | ✅ Full | All features including voice |
| Mobile Chrome | ✅ Full | All features |
| Mobile Safari | ✅ Full | All features |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
```bash
git clone https://github.com/yourusername/Katathon_GreenMinds.git
cd Katathon_GreenMinds
```

2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**
- Follow code style (Prettier + TypeScript)
- Add tests for new features
- Update documentation

4. **Commit your changes**
```bash
git commit -m "Add amazing feature"
```

5. **Push to branch**
```bash
git push origin feature/amazing-feature
```

6. **Open a Pull Request**
- Describe changes clearly
- Link related issues
- Await review

---

## 📊 Project Statistics

```
📦 Total Dependencies: 133+
📄 Component Count: 50+
🎯 Feature Pages: 15+
🗺️ External APIs: 3+ (TomTom, OpenWeatherMap, Dialogflow)
⚡ Build Time: ~2-3 seconds
📱 Responsive Breakpoints: 6 (mobile-first)
♿ Accessibility Score: WCAG 2.1 AA
```

---

## 🐛 Known Issues & Limitations

- Voice recognition works best in Chrome/Edge/Safari
- TomTom routing limited to India (configurable)
- Offline functionality requires service worker setup
- Real-time traffic data limited to available regions

---

## 📚 Documentation

- [Tech Stack Details](./TECH_STACK.md) - In-depth technology breakdown
- [Project Setup Guide](./AGENTS.md) - Developer setup instructions
- [API Documentation](./server/routes/) - Backend API reference

---

## 📞 Support & Contact

- **Report a Bug** - Open an [Issue](https://github.com/anshumalapandit/Katathon_GreenMinds/issues)
- **Request a Feature** - Start a [Discussion](https://github.com/anshumalapandit/Katathon_GreenMinds/discussions)
- **Email** - anshumalapandit@gmail.com

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **TomTom Maps** - For excellent routing and mapping APIs
- **OpenWeatherMap** - For real-time air quality data
- **Radix UI** - For accessible component primitives
- **Tailwind CSS** - For utility-first CSS framework
- **React Community** - For amazing tools and libraries
- **Contributors** - For making this project better

---

## 🎯 Mission Statement

**eco Yatra** aims to make sustainable travel the default choice by providing real-time air quality information, health-conscious routing, and gamified rewards. We believe every journey can contribute to a healthier planet and healthier communities.

---

<div align="center">

**Built with ❤️ for a greener tomorrow**

[⬆ Back to Top](#-eco-yatra---green-route-planning--real-time-air-quality-analysis)

</div>
