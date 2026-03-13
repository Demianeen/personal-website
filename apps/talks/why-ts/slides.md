---
theme: default
title: Why TypeScript?
info: |
  A talk for TypeScript London
  By Demian Netliukh
class: text-center
drawings:
  persist: false
transition: slide-left
---

# Why TypeScript?

From hating it to not writing JS for years

<img src="/ts-logo.png" class="mx-auto mt-8 h-32" />

<div class="abs-br m-6 text-sm opacity-50">
TypeScript London
</div>

---

# Hi, I'm Demian Netliukh 👋

<v-clicks>

- I'm 20 years old
- Full-stack developer, almost 3 years of experience
- Worked across 3 different startups, all TypeScript

</v-clicks>

---

# Why am I here?

At the last TypeScript London meetup, I met David.

David was trying TypeScript and couldn't understand why people use it when JavaScript is so much simpler.

<v-click>

And I actually used to feel the exact same way. I hated TypeScript for 6 months before falling in love with it.

Now, I haven't written a single line of pure JavaScript for years by this point and use TypeScript all the time.

</v-click>

<v-click>

Today I want to share **why it clicked for me**, and let you decide.

</v-click>

---

# What we'll cover

<v-clicks>

1. How JavaScript grew way beyond what it was designed for
2. Why TypeScript was created and how it works
3. The pain points
4. The moments where it clicks
5. Why TypeScript matters even more in the age of AI

</v-clicks>

---
layout: section
---

# Part 1
## How did we get here?

---

# JavaScript: A 10-day miracle

<v-clicks>

- **1995**: Brendan Eich creates JavaScript in 10 days for Netscape
- It was meant to be a simple glue language to make HTML interactive
- It was never designed for what we use it for today

</v-clicks>

<v-click>

<img src="/everything-js.jpg" class="mx-auto mt-4 h-48 rounded" />

</v-click>

---

# JavaScript grows up (whether it wanted to or not)

<v-clicks>

- **1996-2005**: Browser wars, Microsoft makes JScript, compatibility chaos
- **2005**: Ajax arrives. Load data without full page reloads, real web apps become possible
- **2008**: Google launches Chrome with V8 engine. JavaScript gets fast
- **2009**: Node.js. JavaScript escapes the browser
- **2015**: ES6 finally modernizes the language

</v-clicks>

<v-click>

A language built in 10 days for simple page interactions is now powering **massive applications**.

</v-click>

---

# The problem

```js
// api.js — someone renamed "username" to "name" last week
function getUser() {
  return { id: 1, name: "David", email: "david@ts.london" }
}
```

<v-click>

```js
// profile.js — nobody told this file
function renderProfile(user) {
  return `<h1>${user.username}</h1>`  // undefined. No error. Just blank.
}
```

</v-click>

<v-click>

JavaScript won't tell you. Your users will.

<img src="/this-is-fine.jpg" class="mx-auto mt-4 h-36 rounded" />

</v-click>

---
layout: section
---

# Part 2
## Enter TypeScript

---

# TypeScript is born (2012)

**Anders Hejlsberg**, the creator of C# and Turbo Pascal, starts TypeScript at Microsoft.

<v-clicks>

- JavaScript had succeeded at a scale few languages ever reach
- Teams were building apps far larger than dynamic typing could support
- His goal: make large-scale JavaScript development sane
- He thought 25% adoption would be a success

</v-clicks>

<v-click>

In 2025, TypeScript became the **#1 most-used language on GitHub**, overtaking both JavaScript and Python.

</v-click>

---

# The key design decision

TypeScript is a **superset** of JavaScript.

```ts
// This is valid TypeScript:
const name = "David"
console.log(name)
```

<v-clicks>

- Any JavaScript program is already a valid TypeScript program
- You don't rewrite anything. You just start adding types
- You can adopt it gradually, file by file
- **But** to get the real benefits of TypeScript, you want `strict` mode on, which makes TypeScript catch more bugs. But it can be quite painful to do the initial migration

</v-clicks>

---

# The same function, but now you can reason about it

```ts {1-5|all}
interface User {
  id: string
  name: string
  email: string
}

function getUser(id: string): User | undefined {
  // Now everyone knows:
  // - id is a string
  // - it returns a User or undefined
  // - the shape of User is documented right here
}
```

<v-click>

And remember `user.username`? TypeScript catches it immediately:

```ts {2}
function renderProfile(user: User) {
  return `<h1>${user.username}</h1>`  // ❌ Property 'username' does not exist on type 'User'
}
```

</v-click>

---
layout: section
---

# Part 3
## The pain points

---

# Yes, TypeScript can be painful

<v-clicks>

- **Config hell**: `tsconfig.json` has dozens of options and it's not obvious what you need
- **Advanced types**: generics, discriminated unions, guards, template literal types. The type system can require a bit of learning
- **The `any` temptation**: especially when you just want to get something working (and then it never gets fixed)
- **Library types**: sometimes the types for third-party packages are wrong or missing
- **The learning curve**: utility types like `Partial<Pick<Omit<T, K>, U>>` are intimidating

</v-clicks>

<v-click>

So let's talk about why it's getting better.

</v-click>

---

# But it's getting better

<v-clicks>

- **Config hell** → frameworks like Next.js, Vite ship with good defaults now
- **Advanced types** → you rarely need the crazy stuff in app code, and AI can help when you do
- **The `any` temptation** → AI tools can often figure out the right type for you
- **Library types** → almost every major package ships types natively now
- **The learning curve** → basic types get you 80% of the value. You don't need to master it all at once
- **Escape hatches** → `any`, `@ts-ignore` are always there. You can opt out when you need to

</v-clicks>

---
layout: section
---

# Part 4
## Why it clicked for me

---

# 1. You run your code to see if it works as intended, not to see if it works

<Tweet id="1261331455034171393" scale="0.65" />

<v-click>

Before TypeScript: run, crash, debug, fix, repeat.

After TypeScript: the editor catches it **before you even save the file**.

</v-click>

---

# 2. Refactoring without fear

<v-click>

Rename a field in an interface.

TypeScript immediately tells you every file that's now broken.

Follow the red squiggles. Done.

</v-click>

<v-click>

Without types? You grep, you pray, you find the bug in production.

</v-click>

<v-click>

> Airbnb found that **38% of all bugs** in their codebase could have been prevented with TypeScript.
>
> *Brie Bunge, "Adopting TypeScript at Scale", JSConf Hawaii 2019*

</v-click>

---

# 3. Types are documentation that never goes stale

```ts
// This tells you more than any comment ever could:
function createOrder(
  items: CartItem[],
  customer: Customer,
  discount?: DiscountCode
): Promise<Order>
```

<v-click>

Comments lie. Types don't.

</v-click>

---
layout: section
---

# Part 5
## Why TypeScript matters even more today

---

# AI is writing more and more code

<v-clicks>

- Claude, ChatGPT, GitHub Copilot... AI generates code every day
- But AI can hallucinate. It can generate plausible-looking code that's subtly wrong.
- Types are the **guardrails** that catch AI mistakes at compile time
- Types are documentation that **both humans and machines** can read

</v-clicks>

---

# The shift: from assistant to coworker

<img src="/reviewing-ai-code.jpeg" class="mx-auto mt-2 h-52 rounded" />

<v-click>

Anders Hejlsberg on AI and TypeScript:

> AI started out as the assistant. Now it's doing the work, and you're supervising.

</v-click>

<v-click>

When AI agents are autonomously writing and modifying code, types become the **contract** that keeps things from silently breaking.

</v-click>

<v-click>

Whether it's you or an AI writing the code, types give you **confidence** that things actually work the way they should.

</v-click>

---

# The numbers speak

<img src="/github-top-languages-2025.jpg" class="mx-auto mt-2 h-72 rounded" />

<v-clicks>

- TypeScript is now the **#1 language on GitHub** (2025)
- Overtook both JavaScript and Python
- Over **1 million new contributors** in one year (66% growth)
- Every major framework scaffolds with TypeScript by default

</v-clicks>

---
layout: section
---

# So, David...

---

# If you're here, or anyone who feels like David did

<v-clicks>

- Yes, the learning curve is real
- Yes, advanced types can be quite overwhelming at first
- Yes, `tsconfig.json` is a bit of a nightmare at first

</v-clicks>

<v-click>

But once it clicks, and it will, you'll never want to go back.

</v-click>

<v-click>

Give it a second chance. Not because I'm asking you to.

Because in 6 months, you'll be glad you did.

<img src="/buff-doge.jpg" class="mx-auto mt-4 h-40 rounded" />

</v-click>

---
layout: center
class: text-center
---

# Thank you

Demian Netliukh

<div class="text-sm opacity-75 mt-4">

TypeScript London

</div>
