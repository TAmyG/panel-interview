###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node package*.json ./

RUN npm ci
# If you are building your code for production
#RUN npm ci  --only=production

# Bundle app source
COPY --chown=node:node . .

#EXPOSE 3000

# Creates a "dist" folder with the production build
#RUN npm run build

USER node

#CMD ["npm", "run", "start:dev"]

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

# Create app directory
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################
FROM node:18-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]