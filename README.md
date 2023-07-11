# holiday_planner

Trip planner

Build Setup

## install dependencies

`npm install`

## serve with hot reload at localhost:8080

`npm run serve`

## build for production with minification

`npm run build`

## Language:

JavaScript

## Framework:

Vue + Vuex (State management pattern + library)

## Database:

NoSQL

## Server:

Firebase (hosting, authentication, cloud firestore, storage)

## devDependencies:

cli, babel, eslint, router, vuex, sass, vuetify

## Short info:

SPA (Single-page application) that updates data in real time and is very easy to use. All it takes is to make a plan with password (no confirmation via email). Just share the plan name and password with your companions and you can start filling out the list of things you need for the trip at the same time. There is a list for ‘finished’ and ‘unfinished’ things as well as a 'complete' list. The advantage is that when your companions check that they have prepared something for the trip or if they have added something to the list, you will immediately receive this information.

Live demo https://holiday-planner-19683.web.app/

## Trobleshoting:

Moguci problemi:

OVO JE STANDARDNI DEO KOJI IDE U PACKAGE.JSON
"scripts": {
"serve": "vue-cli-service serve",
"build": "vue-cli-service build",
"lint": "vue-cli-service lint"
},

Da bi znali koju NODE verziju koriste stare aplikacije kako bi smo promenili trenutnu verziju koju koristimi idemo u fajl “package-lock.json” i tramo trazimo “@types/node” i “version”. Tu su smestene verzije za sve dependecies.

Probati i ovo za promenu NODE Verzije 16.11.0 ili 16.13.0 ili 14.17.6 ili videti koji node koristi aplikacija
Instalirati Node Menagment System - NVM (https://github.com/nvm-sh/nvm)
Show all the versions
nvm ls available

Instalirati Node verziju 14.17.6

Nvm use 14.17.6 za “npm run serve”, verovatno i za “npm run build”
Nvm use 16.13.0 za “firebase deploy”
