npm init 
npm install express body-parser sequelize mysql2 config

criando instancia do BD pelo console
mysql -u root -h 127.0.0.1 -p 
u = user
h = host
p = password prompt

mysql> create database petshop
show databases;
show tables;
--apos execucao do Sequelize
describe petshop.fornecedores;

npx nodemon index.js
--matar processo windows
npx kill-port 9229
netstat -ano | findstr 9229

taskkill /PID <PID> /F
