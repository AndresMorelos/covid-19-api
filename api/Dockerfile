# Pull base image from stock node image.
FROM node:11.1.0

# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

#install PM2, reference: http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs
RUN npm install pm2 -g

RUN useradd --user-group --create-home --shell /bin/false appuser
ENV HOME=/home/appuser

COPY package.json $HOME/app/
RUN chown -R appuser:appuser $HOME/*

RUN chmod +x /wait

USER appuser

WORKDIR $HOME/app
RUN npm install

#Start APP with PM2, reference: http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs
CMD ["/wait"]

CMD ["pm2-dev", "pm2.process.yml"]