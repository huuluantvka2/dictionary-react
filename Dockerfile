FROM node:18.16.0 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .

CMD ["npm", "run","start"]