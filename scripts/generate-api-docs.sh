#!/bin/bash -e

api-extractor run

# A weird issue with API Extractor adds `_2` suffix to some function names.
# https://github.com/microsoft/rushstack/issues/2895
sed -i.bak 's/_2//g' tmp/api/tkt.api.json

api-documenter yaml -i tmp/api -o tmp/api-yaml
api-documenter-yaml-to-antora-asciidoc asciidoc -i tmp/api-yaml