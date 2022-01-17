#!/bin/bash -e

api-extractor run

# A weird issue with API Extractor adds `_2` suffix to some function names.
# https://github.com/microsoft/rushstack/issues/2895
sed -i.bak 's/_2//g' tmp/api/tkt.api.json
cp tmp/api/tkt.api.json tkt.api.json