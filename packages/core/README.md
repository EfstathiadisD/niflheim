# Niflheim Core

This is the pure RxStore that has all Framework Agnostic Logic.

## How it works?

Let's see how we can setup a _Niflheim Store_ to work in our
Application. The instructions are Framework Agnostic. We will
dive deeper into the indiosyncrasies of each framework later on.

### Basic Setup

We start by importing the Lib from "@niflheim". We export
the `createStore` function in order to wire up the store.

```diff
+ import { createStore } from "@niflheim";
+
+ const store = createStore();
```

The `createStore` takes a Generic `TState` which can be used to
make us be certain that the code is complained with the state.

```diff
import { createStore } from "@niflheim"

+ type State = {
+   name: string;
+   occupation: ["Actor" | "Singer" | "Influencer"];
+   billionaire: {
+     status: true;
+     networth: number;
+   }
+   followers: {
+     twitter: number;
+     facebook: number;
+     instagram: number;
+   }
+ };

- const store = createStore();
+ const store = createStore<State>();
```

Then we can setup the Initial State for our Store. This is important
since our RxJS Store underneath takes a `BehaviorSubject` which
requires an initial value,

```diff
import { createStore } from "@niflheim"

type State = {
  name: string;
  occupation: ["Actor" | "Singer" | "Influencer"];
  billionaire: {
    status: true;
    networth: number;
  }
  followers: {
    twitter: number;
    facebook: number;
    instagram: number;
  }
};

+ const INITIAL_STATE: State = {
+   name: "Kim Kardashian",
+   occupation: ["Actor", "Singer", "Influencer"],
+   billionaire: {
+     status: false,
+     networth: 300_000_000
+   },
+   followers: {
+     twitter: 1_320_000,
+     facebook: 3_500_000,
+     instagram: 6_600_000,
+   },
+ };

- const store = createStore<State>();
+ const store = createStore<State>(INITIAL_STATE);
```

### Advanced Setup

That's all there is to it. Really. But if you want some more
extra goodies, let's see what we can do with it. Niflheim,
introduces also the concept of Plugins. They are very similar
to `Redux Middlewares`, `URQL Exchanges` and much more.

They give you the ability to move logic out of your codebase,
with performance in mind for very specific things.

Let's check out a very simpler example which allows us
to integrate `Redux DevTools` with Niflheim.

```diff
import { createStore } from "@niflheim";
import { reduxDevToolsPlugin } from "@niflheim/plugins";

type State = {
  name: string;
  occupation: ["Actor" | "Singer" | "Influencer"];
  billionaire: {
    status: true;
    networth: number;
  }
  followers: {
    twitter: number;
    facebook: number;
    instagram: number;
  }
}

const INITIAL_STATE: State = {
  name: "Kim Kardashian",
  occupation: ["Actor", "Singer", "Influencer"],
  billionaire: {
    status: false,
    networth: 300_000_000
  },
  followers: {
    twitter: 1_320_000,
    facebook: 3_500_000,
    instagram: 6_600_000,
  },
}

- const store = createStore<State>(INITIAL_STATE);
+ const store = createStore<State>(INITIAL_STATE, {
+  reduxDevToolsPlugin: {
+    name:  "KardashianStore",
+  }
+ });
```
