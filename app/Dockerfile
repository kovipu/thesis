FROM node:18 as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Build the app
COPY . .
RUN npm run build

FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --production

COPY --from=builder /usr/src/app/build ./build

CMD [ "node", "build/index.js" ]