FROM node:20-alpine
WORKDIR /app

# FIXED: Use npm install instead of npm ci
COPY package.json .
RUN npm install --production --no-optional

COPY . .
EXPOSE $PORT

# FIXED: Correct start command
CMD ["node", "index.js"]
