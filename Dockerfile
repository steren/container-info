FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
# CMD [ "node", "--max-old-space-size=8192", "index.js" ]
CMD [ "node", "index.js" ]
