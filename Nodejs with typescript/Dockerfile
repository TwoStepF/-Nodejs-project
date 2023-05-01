    # Dockerfile  
    FROM node:12  
    WORKDIR /
    COPY package.json /
    COPY tsconfig.json /
    RUN npm install  
    RUN npm install -g ts-node
    COPY . /
    EXPOSE 8084  
    CMD [ "npm", "run", "dev"]