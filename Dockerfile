FROM node:16-alpine as development

ENV NODE_ENV production

# Create app directory
WORKDIR /app

# Install app dependencies
COPY .npmrc ./
COPY package*.json ./
COPY npm-shrinkwrap.json ./

RUN npm ci

# Bundle app source
COPY . .

EXPOSE 3000

CMD ["npm", "start"]

FROM development as builder

RUN npm run build

#FROM nginx:1.21-alpine as production
#
#COPY --from=builder /app/build /usr/share/nginx/html
