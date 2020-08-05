FROM node:12.2.0-alpine

WORKDIR /app

COPY . .

#ENV PATH /app/node_modules/.bin:$PATH

sed -i.bak 's/"proxy": "http:\/\/localhost:3000"/"proxy": "http:\/\/'"${CAMILLE_HOST}"':'"${CAMILLE_PORT}"'"/g'

RUN npm install 
RUN npm install react-scripts@3.0.1 -g

EXPOSE 3000

CMD ["yarn", "start"]