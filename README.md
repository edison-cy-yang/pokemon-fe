# PokemonFe

Angular application setup with NX and standalone components

## Prerequisites

- [Node.js](https://nodejs.org/) (Ensure you have the correct version by running `nvm use`)

## Getting Started

### 1. Install Dependencies

First, make sure you have all the required dependencies installed:

```bash
npm install
```

### 2. Run locally

Start the backend server at [https://github.com/edison-cy-yang/pokemon-api]

To run the app in development mode

```bash
npm run start-pokemon-fe
```

and go to `http://localhost:4200`

## Monorepo structure

### Apps

`apps/src` More apps can be configured here.

- `pokemon-fe` - The only app for this project

### Libs

- `libs/features/{feature_name}` - Structure for feature lib
- `libs/utils` - Lib for all utility stuff.
  - pagination interface and helper functions
  - environement helper function if custom environment variables need to be set
- `libs/features/pokemons` - Contains the following libs:
  - `api` Typescript interfaces, services, and NgRX state management files go here
    - Each "entity" has two states, its own entity state, and the pagination entity state for it
    - Keeps track of the current page, and use that to query for the pokemon entities that are on that page
  - `pages` All page components that are linked to a route go here
  - `shared` All components that are shared by the pages in this feature or other features

## Thins that could be further improved

### UI Kit

Create `ui-kit` lib under `libs/ui-kit` that contains the image component and other presentational components

### Local Storage

Implementation of IndexedDB. I did not get to implement it, but have experience with it. Here's how I would do it:

- Configure IndexedDB module in `app.config.ts`
- Create a `indexeddb.service.ts` to handle `saveState`, `loadState`, and `clearState`
- create a `storageMetaReducer` to listen to every action and save it to the storage
- Setup an effect to listen to `ngrx/store/init` action, then call `loadState`

The benefit would be faster page reload. The tradeoff is we will need to implement data expiry logic to re-fetch from the API

### Virtual Scroll

Implement virtual scroll on pokemons list to avoid having to render items that are out of view.

After virtual scroll is implemented, infinite scroll can be integrated to have infinite virtual scroll
