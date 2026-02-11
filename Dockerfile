FROM mcr.microsoft.com/playwright:v1.58.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx playwright test