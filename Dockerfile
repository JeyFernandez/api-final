FROM node
COPY . /api
WORKDIR /api
RUN npm install
CMD ["npm", "run", "start:dev"]