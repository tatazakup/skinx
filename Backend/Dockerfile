FROM node:14

WORKDIR /Backend

# RUN echo 'const path = require("path"); \
# \n\nmodule.exports = { \
# \n  config: path.resolve("dist", "configs", "sequelize.config.js"), \
# \n  "migrations-path": path.resolve("dist", "db", "migrations"), \
# \n  "models-path": path.resolve("dist", "db", "models"), \
# \n  "seeders-path": path.resolve("dist", "db", "seeders"), \
# \n};' > .sequelizerc


COPY package.json .
RUN npm install

COPY . .
RUN npm uninstall bcrypt

COPY . .
RUN npm i bcrypt

COPY . .
RUN npm run build

# COPY . .
# RUN npm run migrate

# COPY . .
# RUN npm run seed

COPY . .
CMD npm start

RUN git clone https://github.com/vishnubob/wait-for-it.git