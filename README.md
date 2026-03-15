# Pavan EstateFinder - Tirupati Real Estate Portal

A modern real estate application tailored for the Tirupati market, featuring AI-powered property descriptions and sentiment analysis.

## Getting Started

To run the application in development mode:

```bash
npm run dev
```

The app will be available at `http://localhost:9002`.

## Features

- **User Portal**: Browse properties in Tirupati (Alipiri, Renigunta, etc.), filter by type and price, and schedule site visits.
- **Admin Dashboard**: Manage property inventory, track sales analytics, and handle booking requests.
- **AI Integration (Genkit)**:
  - **Property Description Generator**: Automatically create engaging, localized descriptions for new listings.
  - **Review Summarizer**: Analyze user feedback to extract key themes and overall sentiment.
- **Manual Bookings**: Admins can manually schedule site visits for customers who call in.

## Admin Access

- **Login URL**: `/admin/login`
- **Credentials**: `admin@pavan.com` / `admin`

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS & ShadCN UI
- **AI Framework**: Genkit with Google Gemini
- **Icons**: Lucide React
- **Charts**: Recharts
