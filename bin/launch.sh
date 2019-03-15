#! /bin/bash

realpath=$(realpath $0)
filepath=$(dirname ${realpath})
echo $filepath
cd ${filepath}/../src
electron app.js &

echo "run youdao success"