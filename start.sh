#!/bin/bash

sed -i "s^__DATABASE_URI__^$DATABASE_URI^g" /ideaGarden/build/config.js
sed -i "s^__DATABASE_USER__^$DATABASE_USER^g" /ideaGarden/build/config.js
sed -i "s^__DATABASE_PASS__^$DATABASE_PASS^g" /ideaGarden/build/config.js
sed -i "s^__HASH_SECRET__^$HASH_SECRET^g" /ideaGarden/build/config.js

cd /ideaGarden
./node_modules/.bin/gulp run
