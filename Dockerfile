FROM node:14-alpine

# Set timezone
RUN apk add --no-cache tzdata
ENV TZ=Asia/Kuala_Lumpur
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime

# Create app directory
WORKDIR /usr/src/app

RUN npm install pm2 -g
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
ADD package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
ADD . .

EXPOSE 3001
CMD [ "pm2-runtime", "index.js" ]
