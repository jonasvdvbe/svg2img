FROM node:18-alpine

WORKDIR /app

# Install fonts
RUN apk add --no-cache \
    fontconfig \
    ttf-dejavu \
    ttf-freefont \
    font-noto

COPY package.json ./
RUN npm install --production

COPY server.js ./

EXPOSE 8080
CMD ["node", "server.js"]