# 89 — Hackathon

## What I Did

- Built a `Hackathon` contract that stores projects and their ratings.
- Created a `Project` struct with:
  - `title`
  - `ratings`
- Stored all projects inside a `Project[] projects` array.
- Used `newProject()` to create new projects.
- Used `rate()` to add ratings to a specific project.
- Built `findWinner()` to:
  - loop through every project
  - skip projects with no ratings
  - add all ratings for the current project
  - calculate its average
  - compare that average with the best one found so far
  - remember the winning project's index
  - return the winning `Project`
- Ran the Hardhat tests successfully.
- All 3 tests passed.

---

## What I Expected

I expected:

- `newProject()` to add a new project to the array.
- a new project to start with an empty ratings array.
- `rate()` to add a rating to the selected project.
- `findWinner()` to check all projects.
- the project with the highest average rating to be returned.
- projects with no ratings to be skipped so division by zero does not happen.

---

## What Actually Happened

The contract behaved as expected.

The full test suite passed:

```text
Hackathon
  with a single project
    ✔ should award the sole participant
  with multiple projects
    and a single judge
      ✔ should award the highest rated
    and multiple judges
      ✔ should award the highest average

3 passing
```

The tests confirmed:

- one project can win by itself
- multiple projects can be compared
- multiple ratings can be added together
- averages can be calculated
- the project with the highest average is returned

---

## What Confused Me

- I confused `i` with `winnerIndex`.
- I needed to understand that:
  - `i` = project currently being checked
  - `winnerIndex` = project currently winning
- I confused `total`, `average`, and `bestAverage`.
- I first mixed up `.length` with an index like `j`.
- I forgot that array indexes start at `0`.
- I first put the `average` calculation inside the inner ratings loop.
- I learned that the average should only be calculated after all ratings for that project have been added.
- I forgot to declare:

```solidity
Project[] projects;
```

- I also needed to understand what this means:

```solidity
projects[i].ratings[j]
```

---

## What I Think I Understand Now

### Project Struct

Each project stores:

```solidity
struct Project {
    string title;
    uint[] ratings;
}
```

So a project has:

```text
title
+
list of ratings
```

Example:

```text
Project "Alpha"
ratings = [2, 4, 3]
```

---

### projects Array

All projects are stored in:

```solidity
Project[] projects;
```

If:

```text
projects[0] = Alpha
projects[1] = Beta
projects[2] = MoonShot
```

then:

```text
projects.length = 3
```

`projects.length` means how many projects exist.

---

### newProject()

The function:

```solidity
function newProject(string calldata _title) external {
    projects.push(Project(_title, new uint[](0)));
}
```

creates a new project.

This part:

```solidity
new uint[](0)
```

means the project starts with an empty ratings array:

```text
ratings = []
ratings.length = 0
```

---

### rate()

The function:

```solidity
function rate(uint _idx, uint _rating) external {
    projects[_idx].ratings.push(_rating);
}
```

means:

```text
_idx = which project
_rating = score to add
```

Example:

```solidity
rate(1, 5);
```

means:

```text
find project at index 1
→ add rating 5
```

---

### Outer Loop

The outer loop:

```solidity
for (uint i = 0; i < projects.length; i++)
```

goes through every project.

I read:

```text
i = which project am I checking right now?
```

---

### Inner Loop

The inner loop:

```solidity
for (uint j = 0; j < projects[i].ratings.length; j++)
```

goes through every rating inside the current project.

I read:

```text
i = which project
j = which rating inside that project
```

So:

```solidity
projects[i].ratings[j]
```

means:

> rating `j` inside project `i`

---

### Running Total

For every new project:

```solidity
uint total = 0;
```

Then each rating is added:

```solidity
total += projects[i].ratings[j];
```

Example:

```text
ratings = [2, 4, 3]

total = 0
0 + 2 = 2
2 + 4 = 6
6 + 3 = 9

final total = 9
```

---

### Average

After the inner loop finishes:

```solidity
uint average = total / projects[i].ratings.length;
```

Example:

```text
total = 9
ratings.length = 3

average = 9 / 3 = 3
```

I need to remember that Solidity integer division drops decimals.

Example:

```text
5 / 2 = 2
```

not:

```text
2.5
```

---

### bestAverage

This variable:

```solidity
uint bestAverage = 0;
```

remembers:

> the highest average found so far

Example:

```text
project averages = 3, 1, 5

bestAverage:
0 → 3 → 3 → 5
```

Final:

```text
bestAverage = 5
```

---

### winnerIndex

This variable:

```solidity
uint winnerIndex = 0;
```

remembers:

> which project currently has the highest average

Example:

```text
Project 0 → average 3
Project 1 → average 1
Project 2 → average 5
```

Final:

```text
bestAverage = 5
winnerIndex = 2
```

---

### Updating the Winner

The comparison is:

```solidity
if (average > bestAverage) {
    bestAverage = average;
    winnerIndex = i;
}
```

I read it as:

```text
if current project score is better
→ remember the new best score
→ remember which project got it
```

Important difference:

```text
i = project being checked now
winnerIndex = project winning so far
```

---

### Returning the Winner

At the end:

```solidity
return projects[winnerIndex];
```

If:

```text
winnerIndex = 2
```

then:

```solidity
projects[winnerIndex]
```

means:

```solidity
projects[2]
```

and returns the actual `Project` stored at index `2`.

It does not just return the number `2`.

---

## Security Thoughts

### Division by Zero

A project can exist with no ratings:

```text
ratings.length = 0
```

This would be dangerous:

```solidity
total / projects[i].ratings.length
```

because it could become:

```text
0 / 0
```

and revert.

So I added:

```solidity
if (projects[i].ratings.length == 0) {
    continue;
}
```

`continue` means:

> skip this project and move to the next project

Auditor question:

> Can the denominator ever become zero?

---

### Integer Division

Solidity integer division removes decimals.

Example:

```text
5 / 2 = 2
```

This can affect winner selection.

Example:

```text
Project A real average = 2.5
Project B real average = 2.0
```

Using integer division, both may become:

```text
2
```

So two different real averages can look equal.

Auditor question:

> Does integer truncation change the intended business logic?

---

### Tie Behavior

The contract uses:

```solidity
average > bestAverage
```

not:

```solidity
average >= bestAverage
```

So if two projects both have average `5`, the first project that reached `5` remains the winner.

Example:

```text
Project 0 average = 5
Project 1 average = 5

winnerIndex = 0
```

Auditor question:

> What should happen when two projects have the same score?

---

### Unbounded Loops

`findWinner()` loops through:

- every project
- every rating inside every project

If the arrays became very large, this could become expensive.

Even though `findWinner()` is `view`, another smart contract calling it on-chain would still be limited by gas.

Auditor question:

> Can user-controlled array growth make this function too expensive to execute?

---

### No Projects / No Rated Projects

If there are no projects, or if every project has zero ratings, the function still ends with:

```solidity
return projects[winnerIndex];
```

This is an edge case I should think about because `winnerIndex` starts at `0`.

Auditor question:

> What happens if there is no valid winner at all?

---

## What I Need to Remember Later

- `projects.length` → number of projects.
- `projects[i]` → current project.
- `projects[i].ratings.length` → number of ratings for current project.
- `projects[i].ratings[j]` → one rating inside current project.
- `total` → sum of the current project's ratings.
- `average` → current project's average.
- `bestAverage` → highest average found so far.
- `winnerIndex` → index of the project currently winning.
- `continue` → skip current loop iteration and move to the next one.
- `return projects[winnerIndex];` → return the actual winning `Project`.
- Solidity integer division removes decimals.

---

## Questions I Still Have

- What is the best way to compare averages without losing decimals?
- What should `findWinner()` do if every project has zero ratings?
- What should happen if there are no projects at all?
- Should tied projects return the first winner, last winner, or something else?
- How could this design avoid very large loops if thousands of projects and ratings existed?
