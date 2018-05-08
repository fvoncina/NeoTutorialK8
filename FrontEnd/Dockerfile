FROM node:alpine
EXPOSE 5001/tcp

COPY . /var/app

RUN echo ‘Installing NPM dependencies’
WORKDIR /var/app
RUN npm i

# Entrypoint
CMD ["node", "/var/app/app.js"]