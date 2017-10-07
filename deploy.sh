#!/bin/bash
declare -a build_files=("index.html"
			"styles.css"
			"bin/app.js")

eslint src &&
echo "eslint src passed" &&
eslint test &&
echo "eslint test passed" &&
#npm test &&
for file in "${build_files[@]}"
do
    cp "$file" "${file}.deploy"
done &&
git checkout gh-pages &&
for file in "${build_files[@]}"
do
    mv "${file}.deploy" "$file"
done &&
for file in "${build_files[@]}"
do
    git add "$file"
done &&
git commit -m 'Deploy' &&
git push -f



