# mch-huelben-website [WIP]

[![CI](https://github.com/SheepCreativeSoftware/mch-huelben-website/actions/workflows/ci.yml/badge.svg)](https://github.com/SheepCreativeSoftware/mch-huelben-website/actions/workflows/ci.yml)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?hosted_button_id=RG6PSXR828X94)

This project is currently work in progress. The current code base is partly a proof of concept and will possibly changed in future.

## Description
This project is focused on a redesign of the website from [mch-huelben.de](https://old.mch-huelben.de), which I made back in 2013.  
This page was original created using PHP with a connection to a MySQL Database. There was also a administrative page to add and update the content etc..
The idea is to level up this project using lot of skills I gain over time and also exploring new ones.  

This project runs on a node/express HTTP server which is making use of a MariaDB Database using typeorm.  
Site rendering is done using Vue 3 and Pinia. The project is fully able to render on server side (The webpage can be completely visited without javascript running in the browser / Which also helps in terms of possible crawling).
The Vue based Site is able to hydrate the rendering state and render additional pages directly on client side.  
This overall improves the performance by a lot.  
Hovewer the initial idea was to have a light weight component structured template engine that can also be easily used for adminstration purpuses to edit the pages etc.. And therefore Vue with SSR and CSR is quite a perfect fit even thouhg it features full TypeSript support.  
For CSR there exists a own HTTP API controller which is using the same services as SSR side rendering is using.  
This provides a consistent rendering process on both sites.
The curent state of the site can be viewed under [staging.mch-huelben.de](https://staging.mch-huelben.de)

## Installation
Node >=20.0.0 and yarn as package manager, as well as mariaDB need to be installed.  
To install all necessary packages run yarn:
```bash
yarn install
```

## Build
For final usage on a server you would need to run:
```bash
yarn build
```
This runs a build in 3 steps for each of the parts:
- The main HTTP server
- The client site renderer with vue components and its assets
- The ssr server site entry for use with HTTP server

## Preview Server
You need to setup enviroment variables to run the server, which can be found in  the `.env` file  
For local testing you can setup a `.env.local` file and run the project using
```bash
yarn preview
```
OR when enviroment variables are set otherwise then using:
```bash
node dist/app.mjs
```

# Development Setup
The project features a `.env` file which can be used as a base.
You can run the development server using:
```bash
yarn dev
```
The server automaticaly restarts when files are changing. Except for changes on SSR.
Changes on SSR are automatically hot replaced by the integrated `vite` build server (except for site effect imported modules - this requires a restart).

## Linting
The project can be linted using:
```bash
yarn lint
```
This runs `eslint` (on code and vue files), `prettier` (other files e.g. .json/xml) and the `TypeScript compiler` (without emitting).
The linters can be run individually by adding a colon and the tool name (e.g. `yarn lint:eslint`) with additional fix command for `eslint` and `prettier` by adding a colon with `fix` (e.g. `yarn lint:eslint:fix`)

## Testing
The project uses `node's test runner` for testing purposes which can be run using:
```bash
yarn test
```

Further details can be seen in the `package.json`.

### License
Copyright (c) 2024 Marina Egner - Sheep Creative Studios. All rights reserved.

This software is released under a proprietary license.
You must not copy, modify, distribute, make publicly available, or execute
its contents or parts thereof without express permission by the copyright
holder, unless otherwise permitted by law.
