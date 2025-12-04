FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm ci --only=production --no-optional
COPY . .
EXPOSE $PORT
CMD ["sh", "-c", "npm start"]
