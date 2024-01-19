# Stage 1: Build the React app
FROM node:alpine3.16 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# config for install dependencies from itau-one
RUN npm set strict-ssl false

# Install dependencies
RUN npm ci

# Copy the rest of the app files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine3.17

ADD ./config/default.conf /etc/nginx/conf.d/default.conf

# Copy the build artifacts from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 8082
EXPOSE 8082

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html

#ENV REACT_APP_BASE_URL=${REACT_APP_BASE_URL}
#ENV REACT_APP_CLIENT_ID=${REACT_APP_CLIENT_ID}
#ENV REACT_APP_JWT_SECRET=${REACT_APP_JWT_SECRET}
#ENV REACT_APP_ENV_STATUS=${REACT_APP_ENV_STATUS}
#ENV PORT=${PORT}

# Copy .env file and shell script to container
#WORKDIR /usr/share/nginx/html

COPY --from=build /app/env.sh .
COPY --from=build /app/.environment .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod a+x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]