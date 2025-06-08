# ☀️ WeatherWise

A sleek, AI-enhanced weather and travel assistant built with **Next.js**, **Weather API**, and **Google Gemini**, deployed effortlessly on **Vercel**.

---

## Table of Contents

* [Overview](#overview)
* [🎯 Features](#-features)
* [🛠️ Technology Stack](#🛠️-technology-stack)
* [📆 Getting Started](#-getting-started)
* [🚀 Deployment](#-deployment)
* [💡 Usage](#-usage)
* [📈 Roadmap](#-roadmap)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)

---

## Overview

WeatherWise delivers real-time weather updates, multi-day forecasts, and personalized trip plans—all in one user-friendly interface. Powered by **Google Gemini AI**, it also offers smart travel suggestions based on your weather queries.

---

## 🎯 Features

* **Current Weather & Forecasts**
  Real-time data and 7-day forecasts based on city search and geolocation.

* **AI ‑Powered Trip Planner**
  With just your location, date range, and preferences, Gemini generates detailed daily itineraries—complete with sights, timings, and map links.

* **Intelligent Suggestions**
  Gemini suggests activities tailored to weather conditions—like indoor places on rainy days or beach visits on sunny afternoons.

* **Search History & Units Toggle**
  Keeps your recent city searches and lets you switch Celsius ↔ Fahrenheit.

* **Responsive & Light Design**
  Beautiful UX across devices, built with CSS modules and responsive layouts.

---

## 🛠️ Technology Stack

* **Framework**: Next.js for SSR & static deployments
* **Weather API**: OpenWeatherMap (or your chosen provider)
* **AI**: Google Gemini for itinerary generation and weather-aware tips
* **Hosting**: Deployed on Vercel—zero configuration, full CI/CD

---

## 📆 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/Abhiyashweb/WeatherWise.git
   cd WeatherWise
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Environment Variables**

   Create a `.env.local` file in your root directory with the following:

   ```env
   NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key_here
   GEMINI_API_KEY=your_gemini_key_here
   ```

4. **Run locally**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment

WeatherWise is seamlessly deployed using [Vercel](https://vercel.com). Push to your GitHub repo and enjoy auto-deployments with zero configuration.

---

## 💡 Usage

* Search any city to get weather and forecast
* Plan your trip using the AI-powered planner
* Toggle between units and explore suggestions

---

## 📈 Roadmap

*

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)
