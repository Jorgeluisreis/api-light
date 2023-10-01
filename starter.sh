#!/bin/bash
if ! screen -ls | grep -q api ; then
    echo "Stating bot..."
    sleep 1
	screen -r -S 'api' -X quit;  
    screen -dmS api node index.js
fi