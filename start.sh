#!/bin/bash

sed -i "s^__DATABASE_URI__^$DATABASE_URI^g" /ideaGarden/build/config.js
sed -i "s^__DATABASE_USER__^$DATABASE_USER^g" /ideaGarden/build/config.js
sed -i "s^__DATABASE_PASS__^$DATABASE_PASS^g" /ideaGarden/build/config.js
sed -i "s^__HASH_SECRET__^$HASH_SECRET^g" /ideaGarden/build/config.js
sed -i "s^__EMAIL_HOST__^$EMAIL_HOST^g" /ideaGarden/build/config.js
sed -i "s^__EMAIL_FROM__^$EMAIL_FROM^g" /ideaGarden/build/config.js
sed -i "s^__EMAIL_USER__^$EMAIL_USER^g" /ideaGarden/build/config.js
sed -i "s^__EMAIL_PASS__^$EMAIL_PASS^g" /ideaGarden/build/config.js
sed -i "s^__EMAIL_PORT__^$EMAIL_PORT^g" /ideaGarden/build/config.js
sed -i "s^__PORT__^$PORT^g" /ideaGarden/build/config.js

cd /ideaGarden
./node_modules/.bin/gulp run
