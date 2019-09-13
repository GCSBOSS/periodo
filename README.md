# [Periodo](https://gitlab.com/GCSBOSS/periodo)

A library for parsing and generating a convenient string representation of a time period.

## Get Started

Install with: `npm i periodo`

In your code:

```js
const periodo = require('periodo');

// Get milliseconds from string representation.
var p = periodo('2y8m');
console.log(p.time);
```

Suported time units are:
- *y* Years
- *m* Months
- *w* Weeks
- *d* Days
- *h* Hours
- *mn* Minutes
- *s* Seconds
- *ms* Milliseconds

```js
const periodo = require('periodo');

// Get string representation from milliseconds
var p1 = periodo(7777777);
console.log(p1.time);

// Works with negatives
var p2 = periodo(-7777777);
console.log(p2.time);

// Define precision time unit
var p3 = periodo(-7777777, 'h');
console.log(p3.time);

// Get difference between two dates
var p4 = periodo.diffDates('2012-12-12', new Date());
console.log(p4.time);
```

## Reporting Bugs
If you have found any problems with this module, please:

1. [Open an issue](https://gitlab.com/GCSBOSS/periodo/issues/new).
2. Describe what happened and how.
3. Also in the issue text, reference the label `~bug`.

We will make sure to take a look when time allows us.

## Proposing Features
If you wish to get that awesome feature or have some advice for us, please:
1. [Open an issue](https://gitlab.com/GCSBOSS/periodo/issues/new).
2. Describe your ideas.
3. Also in the issue text, reference the label `~proposal`.

## Contributing
If you have spotted any enhancements to be made and is willing to get your hands
dirty about it, fork us and
[submit your merge request](https://gitlab.com/GCSBOSS/periodo/merge_requests/new)
so we can collaborate effectively.
