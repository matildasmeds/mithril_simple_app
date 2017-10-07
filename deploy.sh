#!/bin/bash
declare -a build_files=("index.html"
			"styles.css"
			"bin/app.js")

eslint src &&
echo "eslint src passed" &&
eslint test &&
echo "eslint test passed" &&
npm test &&
npm build &&
for file in "${build_files[@]}"
do
    cp "$file" "${file}.deploy"
done &&
git checkout gh-pages &&
for file in "${build_files[@]}"
do
    mv "${file}.deploy" "$file"
done &&
echo "Done. Check changes and commit manually."

