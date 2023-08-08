FROM node:16-alpine AS base

RUN apk add --no-cache git curl
RUN apk add openssl

ADD http://gitlab.itauchile.cl/architecture-center-of-excellence/api-connect/certificates/-/raw/main/itauchile/CAPrivate.crt "/usr/local/share/ca-certificates/CAPrivate.crt"
#RUN echo CAPrivate.crt >> /etc/ssl/certs/ca-certificates.conf && update-ca-certificates
WORKDIR /usr/local/share/ca-certificates/
RUN head -29 /usr/local/share/ca-certificates/CAPrivate.crt > ca_1.crt
RUN sed -n 30,50p /usr/local/share/ca-certificates/CAPrivate.crt > ca_2.crt
RUN rm -r /usr/local/share/ca-certificates/CAPrivate.crt
RUN update-ca-certificates
ADD http://gitlab.itauchile.cl/architecture-center-of-excellence/api-connect/certificates/-/raw/main/itauchile/CAPrivate.crt "/usr/local/share/ca-certificates/CAPrivate.crt"
RUN openssl x509 -in /usr/local/share/ca-certificates/ca_1.crt -out /usr/local/share/ca-certificates/ca.pem
RUN openssl x509 -in /usr/local/share/ca-certificates/ca_2.crt -out /usr/local/share/ca-certificates/cert.pem
FROM base AS development

WORKDIR /usr/src/app
COPY package*.json ./
#RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
#RUN unzip awscliv2.zip
#RUN ./aws/install
RUN npm install --only=development --loglevel verbose


FROM development AS builder

COPY . .
RUN npm run build

FROM base AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production

COPY . .
COPY --from=builder /usr/src/app/dist ./dist
CMD ["node", "dist/main"]

