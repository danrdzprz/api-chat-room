# # Application Docker file Configuration
# # Visit https://docs.docker.com/engine/reference/builder/
# # Using multi stage build

# # Prepare the image when build
# # also use to minimize the docker image
# FROM node:20 as builder

# # Create and define the node_modules's cache directory.
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Build the image as production
# # So we can minimize the size
# FROM node:20

# WORKDIR /app
# COPY package*.json ./
# ENV PORT=4000
# ENV NODE_ENV=Production
# RUN npm install
# COPY --from=builder /app/dist ./dist
# EXPOSE ${PORT}
# # CMD ["npm", "run", "start"]
# CMD  npm run start:dev

FROM node:20 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:20 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
