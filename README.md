# Pallet
A super easy to use pallet to json system.

## Getting started
```pallet
! comments are like this

$version: 0.0.1
$name: name
$color = {
    element_name: #hexcode
    ! and so on...
}
```

```ts
// This is assuming you are getting the repo from github

const output = parsePallet("$color = { background: #CCCCFF }"); // background using Periwinkle
console.log(output)
// { "color": { "background": "#CCCCFF" } }