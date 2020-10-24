FROM node:12

COPY . .

RUN npm install

CMD ["node", "-r", "esm", "src/index.js"]
