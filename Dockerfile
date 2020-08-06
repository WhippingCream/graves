FROM node:12

WORKDIR /app

COPY . .

#ENV PATH /app/node_modules/.bin:$PATH

RUN sed -i.bak 's/"proxy": "http:\/\/localhost:3000"/"proxy": "http:\/\/'"${CAMILLE_HOST}"':'"${CAMILLE_PORT}"'"/g' package.json

RUN npm install 
RUN npm install react-scripts@3.0.1 -g

EXPOSE 3000

CMD ["yarn", "start"]