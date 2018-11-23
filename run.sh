#!/bin/sh

# RUN clean.php
php /home/alexa-vm/Desktop/goliath/asterisk_alexa_agi/demo/deleteAll.php

# RUN data sync
node /home/alexa-vm/Desktop/goliath/necti_client_service/simulation/pcpro/SyncDataService.js &

# RUN server
node /home/alexa-vm/Desktop/goliath/necti_client_service/src/server.js &
