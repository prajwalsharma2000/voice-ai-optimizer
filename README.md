## Live Demo
Frontend: https://voice-ai-optimizer-demo.vercel.app
Backend API: https://voice-ai-optimizer-api.onrender.com

## Architecture

The Voice AI Performance Optimizer is designed as a lightweight full-stack application that simulates a **Validation Flywheel** for improving Voice AI agent prompts.

The system automatically analyzes an agent prompt, generates test scenarios, simulates conversations, evaluates responses against success criteria, and produces an optimized prompt.

### System Architecture

User
↓
Frontend (React + Vite Dashboard)
↓
Backend API (Node.js + Express)
↓
LLM Layer (Groq – Llama 3.3 70B)
↓
AI Pipeline Services

### Frontend

The frontend is a React-based dashboard designed to resemble a **HighLevel marketplace application**.

Technologies used:

* React (Vite)
* TailwindCSS
* shadcn/ui components
* Axios for API communication

The UI focuses on visualizing the AI pipeline through:

* Prompt input interface
* AI pipeline progress visualization
* Test results analytics dashboard
* Scenario evaluation table
* Prompt optimization diff viewer

### Backend

The backend is a modular Node.js API that orchestrates the AI optimization pipeline.

Backend components:

Controllers
Handle API requests and orchestrate the workflow.

Services
Encapsulate the AI pipeline logic:

* Prompt Analyzer
* Test Generator
* Test Runner
* Evaluator
* Prompt Optimizer

LLM Client
Handles communication with the Groq LLM API.

### AI Optimization Pipeline

The system implements the following pipeline:

Analyze Prompt
→ Extract goals, required actions, behavior rules, and success criteria

Generate Test Cases
→ Automatically create realistic user interaction scenarios

Run Tests
→ Simulate agent responses using an LLM acting as the Voice AI agent

Evaluate Responses
→ Assess whether the response satisfies defined success criteria

Optimize Prompt
→ Improve the original prompt based on detected failures

This pipeline forms a **closed-loop optimization system** for Voice AI prompts.


## Team of One Ownership

This project was built following a **Team of One model**, where a single engineer owns the full lifecycle of the product — including product thinking, design, engineering, and QA.

### Product

Defined the product workflow around the concept of a **Voice AI Validation Flywheel**, ensuring that the system clearly demonstrates how prompts are tested, evaluated, and optimized.

Key product decisions:

* Support both Copilot mode (fully automated pipeline) and step-by-step testing
* Visualize AI pipeline execution for clarity during demos
* Focus on developer-oriented feedback such as test results and prompt diffs

### Design

Designed a modern SaaS-style dashboard intended to resemble a **HighLevel marketplace app**.

Design goals:

* Clear AI workflow visualization
* Analytics-style results dashboard
* Prompt comparison interface
* Clean developer-focused UX

The color palette and layout were chosen to create a professional, production-grade interface suitable for AI workflow tools.

### Engineering

Built a modular backend architecture that separates:

* API routing
* AI pipeline services
* LLM integrations

This separation ensures the system is maintainable and extensible.

Concurrency was introduced in the test runner to improve performance when simulating multiple scenarios.

### QA

Validation was performed through:

* manual API testing
* pipeline output inspection
* simulated prompt optimization scenarios

## Functional vs Mocked Components

To balance realism with development speed, the system uses a mix of **real AI integrations** and **simulated Voice AI behavior**.

### Fully Functional Components

These parts of the system use real AI inference:

Prompt Analysis
LLM extracts structured goals and behavioral constraints from the agent prompt.

Test Case Generation
LLM generates realistic user interaction scenarios to test the agent.

Agent Simulation
The LLM acts as the Voice AI agent and produces responses based on the provided prompt.

Response Evaluation
LLM evaluates agent responses against defined success criteria.

Prompt Optimization
LLM generates an improved version of the original prompt based on failed tests.

### Mocked / Simulated Components

Voice Telephony Layer
Real voice calls, speech-to-text, and telephony integrations are not implemented.

Instead, conversations are simulated using text prompts to replicate how a Voice AI agent would respond.

HighLevel Platform Integration
The UI is designed to resemble a HighLevel marketplace app, but the actual HighLevel platform APIs are not integrated.

Database Persistence
Test runs and prompt versions are not stored persistently. Each run represents a temporary analysis session.

### Reasoning

The focus of this assignment is demonstrating the **AI-driven validation and optimization loop**, rather than building a full telephony or CRM integration.

The architecture is designed so these components could be added later without major refactoring.



