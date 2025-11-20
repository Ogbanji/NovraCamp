# Launchly Landing Page - Handoff Document

This document outlines the implementation details for the redesigned Launchly landing page.

## 1. Updated Copy

### Hero Section
*   **Headline:** LAUNCH CAMPAIGNS THAT DRIVE REAL USER GROWTH
*   **Subhead:** Community-powered campaigns for tokenized growth — multi-chain, measurable, and creator-friendly.
*   **Primary CTA:** Start a Campaign
*   **Secondary CTA:** Join as Creator

### Social Proof / Stats
*   10K+ Creators
*   30+ Projects
*   98% Satisfaction
*   Trusted by teams on Ethereum, Polygon, Arbitrum, Base, and Solana.

### How It Works
*   **Step 1: Create:** Design and launch your campaign in minutes.
*   **Step 2: Engage:** Activate your community with on-chain and off-chain tasks.
*   **Step 3: Track:** Monitor your campaign's performance and reward your users.

### Powerful Features
*   **Multi-chain Campaigns:** Run campaigns across multiple blockchains seamlessly.
*   **Auto Reward Distribution:** Automate on-chain payouts to creators.
*   **Dashboard Analytics:** Real-time data for smarter campaign decisions.
*   **Creator Management System:** Empower creators to track, manage, and grow.

### Testimonials
*   “Launchly transformed how we run community campaigns — reward distribution and analytics are flawless.” - Sarah Chen, Community Lead at Web3DAO
*   “The best platform for decentralized community building. The multi-chain support is a game-changer.” - Alex Martinez, Founder of NFTogether
*   “We've seen a 300% increase in engagement since using Launchly. The creator management tools are top-notch.” - Emily Wang, Marketing Director at DeFi Solutions

### Footer
*   **Newsletter Signup:** Join 10K+ creators growing with Launchly.

## 2. Interaction Specifications

### Hero Section
*   **Animated Background:**
    *   **Type:** Looping gradient animation.
    *   **Trigger:** On page load.
    *   **Duration:** 15s per loop.
    *   **Easing:** `ease`.
    *   **Implementation:** CSS animation on the `animated-gradient-background` class.
*   **Headline Entrance:**
    *   **Type:** Fade-up.
    *   **Trigger:** On page load.
    *   **Duration:** 0.6s.
    *   **Easing:** `ease-out`.
    *   **Implementation:** Tailwind CSS `animate-fade-up` class with `animation-delay`.

### Social Proof / Stats
*   **Number Count-Up:**
    *   **Type:** Numbers animate from 0 to the target value.
    *   **Trigger:** On scroll into view.
    *   **Duration:** 2s.
    *   **Implementation:** `StatsCard` component with `useOnScreen` hook.

### How It Works
*   **Card Hover:**
    *   **Type:** Scale up.
    *   **Trigger:** On hover.
    *   **Duration:** 0.2s.
    *   **Easing:** `ease-in-out`.
    *   **Implementation:** Tailwind CSS `hover:scale-105` and `transition-transform`.

### Powerful Features
*   **Card Hover:**
    *   **Type:** Icon scale and soft gradient highlight.
    *   **Trigger:** On hover.
    *   **Duration:** 0.3s.
    *   **Easing:** `ease`.
    *   **Implementation:** Custom CSS classes `feature-card` and `feature-icon`.

### Testimonials
*   **Carousel:**
    *   **Type:** Autoplaying and manually navigable carousel.
    *   **Trigger:** Autoplays on load, manual navigation with previous/next buttons.
    *   **Note:** Autoplay is not implemented as it requires an additional dependency (`embla-carousel-autoplay`). The carousel is currently manually navigable.

### Sticky CTA
*   **Appearance:**
    *   **Type:** Fades in.
    *   **Trigger:** 8 seconds of page idle time.
    *   **Duration:** 0.5s.
    *   **Implementation:** `StickyCTA` component with `useEffect` and `useState`.
*   **Pulse Animation:**
    *   **Type:** Subtle pulse.
    *   **Trigger:** On component visibility.
    *   **Duration:** 2s per loop.
    *   **Implementation:** Tailwind CSS `animate-pulse` class.

### Reduced Motion
*   All animations and transitions are disabled when the user has the `prefers-reduced-motion` media query enabled.

## 3. Dev Handoff Notes

### CSS Variables
The core color palette and design tokens are defined as CSS variables in `src/index.css`.

#### Colors
*   `--background`: Main background color.
*   `--foreground`: Main text color.
*   `--card`: Card background color.
*   `--primary`: Primary accent color (orange).
*   `--secondary`: Secondary accent color (deep orange).
*   `--accent`: Accent color for gradients (bright orange).
*   `--muted`: Muted background color.
*   `--muted-foreground`: Muted text color.

#### Gradients
*   `--gradient-primary`: Primary gradient used for text and elements.
*   `--gradient-glow`: Radial gradient for hover effects.

#### Shadows
*   `--shadow-glow`: Glow effect shadow.
*   `--shadow-card`: Standard card shadow.

### Dark Mode
Dark mode is implemented using `next-themes` and Tailwind CSS's `dark` class strategy. The theme is toggled using the sun/moon icon in the navigation bar. The color variables for the dark theme are defined in the `.dark` class in `src/index.css`.

### New Components
*   `StatsCard.tsx`: Animates numbers when they scroll into view.
*   `StickyCTA.tsx`: A floating CTA that appears after a delay.
*   `ThemeProvider.tsx`: Wraps the application to provide theme context.
