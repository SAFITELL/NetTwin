# NetTwin AI

NetTwin AI is a production-grade telecom network intelligence platform designed for operators, network engineers, and enterprise clients. It acts as an AI-powered digital twin that predicts network congestion, recommends optimizations, and enables autonomous network management.

## Core Capabilities

- Digital Twin Visualization: Real-time interactive map of base stations and network topology.
- AI Operations: Integrated Mistral AI engine for automated reasoning, root cause analysis, and network optimization recommendations.
- Predictive Analytics: Forecasting network load spikes and congestion events before they happen.
- Energy Management: Smart sleep calculations to optimize power consumption across the network during low-demand periods.
- API Gateway: Secure API credentials and endpoints for integrating with existing Element Management Systems (EMS) and Operations Support Systems (OSS).

## Technical Architecture

The platform is designed as a modern, decoupled web application:
1. Frontend (Next.js): Built with Next.js 14 (App Router), leveraging React, Leaflet for geographic rendering, and Recharts for live telemetry dashboards.
2. Backend (FastAPI): A high-performance Python microservice that houses the simulation engine and Mistral AI logic.
3. Database (PostgreSQL): Stores network metrics, decision logs, organization data, and API keys, managed entirely via Prisma ORM.

## Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.10+ 
- PostgreSQL
- Valid Mistral AI API Key

### Installation

1. Install Frontend Dependencies:
   npm install

2. Configure Environment Variables:
   Ensure your `.env` file has the correct database connection and API keys.
   DATABASE_URL="postgresql://<user>:<password>@localhost:5432/nettwin"
   MISTRAL_API_KEY="your_mistral_api_key"

3. Initialize the Database:
   npx prisma db push

4. Install Backend Dependencies:
   cd backend
   pip install -r requirements.txt

### Running the Environment

1. Start the Frontend (from the project root):
   npm run dev

2. Start the Backend:
   cd backend
   uvicorn main:app --reload

## License

Copyright (c) 2026 T756-Tech. All Rights Reserved.

This software is proprietary and source-available for evaluation and review purposes only. It is not open source. You are permitted to view the source code, but you may not copy, modify, distribute, sublicense, or sell copies of this software, nor use it for commercial purposes, without explicit written permission from the copyright holder.
