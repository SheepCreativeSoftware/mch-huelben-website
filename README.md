# mch-huelben-website [WIP]
This project is currently work in progress

## Description
This project is focused on a redesign of the website from [mch-huelben](https://old.mch-huelben.de), which I made back in 2013.  
This page was created using PHP with a connection to a MySQL Database. There was also a administrative page to add and update the content etc..

### The plan
The basic plan for this project:
- Completely redesign the pages using Figma
- Use node.js as a new server platform
- Use express.js for routing pages and for creating and API to manage the content
- The managment of the side should be done completlely on client side to have a well separated front- and back-end
- Use ejs as a template engine for server to create the pages / maybe also usable on client side
- Use MariaDB/MySQL (already available on the server)
- Use MagicLink as a login system (easy solution, which should be a good choice for this type of site)



### Enviroment Variables
This variables need to be defined to run this on a server.

#### General
**NODE_ENV** production  
**HOST** Hostname (e.g. example.com)  
**URL** http://example.com  
**SERVER_PORT** 3000  

#### MariaDB Database
**DATABASE_HOST** localhost  
**DATABASE_PORT** 3306  
**DATABASE_USER** root  
**DATABASE_PASSWORD** supersecretpassword  
**DATABASE_NAME** database  

#### Session
SESSION_SECRET supersecretpassword  

#### Authentification via Mail
**SMTP_HOST** example.com  
**SMTP_PORT** 465  
**SMTP_USER** noreply@example.com  
**SMTP_PASSWORD** supersecretpassword  
**SMTP_SENDER** noreply@example.com  
**SMTP_ADMIN_EMAIL** webmaster@example.com  
**JWT_SECRET** supersecretpassword  
