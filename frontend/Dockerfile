# ###################
# # BUILD FOR LOCAL DEVELOPMENT
# ###################

FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY  package*.json ./

RUN npm ci

COPY  . .
## EXPOSE [Port you mentioned in the vite.config file]
#EXPOSE 5173
#CMD ["npm", "run", "dev"]

###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine As build

WORKDIR /usr/src/app 

COPY package*.json ./

COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

RUN npm run build


# ###################
# # PRODUCTION
# ###################

FROM nginx:1.22.1-alpine As production


COPY --from=build  /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
