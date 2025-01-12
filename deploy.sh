#!/bin/bash

if [ -d "Frontend" ]; then

    npm install --prefix Frontend && npm run build --prefix Frontend || exit 1

    if [ -d "Frontend/dist" ]; then
        echo " Frontend/dist "
    else
        echo " Frontend/dist no "
        exit 1
    fi
else
    echo "Frontend no existed"
    exit 1
fi


if [ -d "Backend" ]; then

    npm install --prefix Backend && npm start --prefix Backend || exit 1
else
    echo "Backend no existed"
    exit 1
fi
