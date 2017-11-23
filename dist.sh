mkdir dist || true

alias babel="npm-exec babel-cli"

$(npm bin)/babel index.js --out-file dist/deep-object-assign-with-reduce.js
$(npm bin)/uglifyjs dist/deep-object-assign-with-reduce.js -ecma=5 -o dist/deep-object-assign-with-reduce-min.js
