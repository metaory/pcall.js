#!/bin/bash

[[ -n $(git status -u --porcelain) ]] && \
  echo -e "\e[31m❌dirty git\e[0m" && exit 1

BUMP="${1:-prerelease}"
VER="$(npm version "$BUMP")"

rm -rf ./dist

npm run build
npm run publish

git commit -am "$BUMP : $VER"
git push --all
