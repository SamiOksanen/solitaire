# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbo
- `npm run build` - Build static site for production
- `npm run start` - Serve built static files on localhost:3000
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test:e2e` - Run Playwright end-to-end tests

## Project Architecture

This is a Next.js 15 solitaire game application with the following structure:

### Game Architecture
- **Multiple Game Types**: Klondike (normal/easy) and Spider solitaire variants
- **Card System**: Cards are managed through `CardInGame` objects with position tracking (`boardPosition`, `stackPosition`) and reveal state
- **Drag & Drop**: Uses `@hello-pangea/dnd` for card movement with custom validation logic
- **Game Logic**: Each game variant has its own utility module:
  - `src/app/klondike/klondike.util.ts` - Klondike-specific game rules
  - `src/app/spider/spider.util.ts` - Spider solitaire rules
  - `src/utils/cards.util.ts` - Common card operations and drag handling

### UI/Styling System
- **Responsive Design**: Custom breakpoint system using `ScreenHeight` and `ScreenWidth` enums
- **Dynamic Classes**: Card spacing, heights, and layouts adjust based on screen size via mapping objects (e.g., `cardHeightClasses`, `cardMarginTopClasses`)
- **Tailwind CSS**: All styling uses Tailwind with custom spacing values and responsive classes

### Key Components
- `src/components/Card.tsx` - Individual card rendering
- `src/components/stack/` - Stack components for different card piles
- `src/components/modal/` - Game modals (play again, alerts)
- `src/utils/validation.util.ts` - Card movement validation (suit colors, rank sequences)

### Static Export
- Configured for static site generation (`next build` + static hosting)
- Uses custom `start` script with http-server for local production testing

## Testing
- **E2E Tests**: Playwright tests require the built app running on localhost:3000
- Use `npx playwright install` to install browsers if needed
- Use `npx playwright codegen localhost:3000` to generate new tests