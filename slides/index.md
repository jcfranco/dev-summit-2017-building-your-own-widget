<!-- .slide: data-background="../reveal.js/img/title.png" class="center" -->

# Building Your own Widget with ArcGIS API for JavaScript

### Matt Driscoll – [@driskull](https://twitter.com/driskull)
### JC Franco – [@arfncode](https://twitter.com/arfncode)

---

# Agenda

- About Widgets
- Prerequisites
- Widget framework
- Theming
- DO IT!
- Tips & tricks

<img src="images/agenda.gif" width="400">

---

# About Widgets

- What?
  - Encapsulated
  - Cohesive
  - Single-purpose pieces of functionality
- Why?
  - Reusable
  - Interchangeable
- How?
  - Different frameworks are available

---

# Prerequisites

- Accessor
- TypeScript

<img src="images/holdup.gif" width="400">

---

## Accessor

- JavaScript API Foundation
- Consistent developer experience
- TypeScript support

---

## Accessor - Unified Object Constructor

```js
var view = new MapView({
  container: "viewDiv",
  map: map
});

var symbol = new SimpleMarkerSymbol({
  style: "square",
  color: "blue"
});

var widget = new BasemapToggle({
  view: view,
  nextBasemap: "hybrid"
});
```

---

## Accessor - Defining Properties (getters + setters)

```js
var Foo = Accessor.createSubclass({
  properties: {

    // read-only
    foo: { readOnly: true, value: new Foo() },

    // aliased
    bar: { aliasOf: "foo" },

    // autocast
    baz: { type: SomeClass }
  }
});
```

---

## Accessor - Property watching

```js
// watch for changes using a property chain
view.watch("map.basemap.title", handleTitleChange);

// watch for changes to multiple properties
view.watch("stationary, interacting", handleViewPropChange);
```

---

# TypeScript

- Superset of JavaScript
- Compiled to JavaScript
- Statically type-checked
- Syntactic sugar... sweet!
  - Use ES6 syntax while targeting ES5 environments

<img src="images/typescript.png" width="250">

---

# TS = type safety

```ts
let view: MapView | SceneView;

// ...

/*
 * TS2322: Type '"not-a-view"' is not assignable
 * to type 'MapView | SceneView'.
 */
view = "not-a-view";
```

<img src="images/blocked.gif" width="350">

---

# Typings!

Help describe what things are:

```ts
type PresenterNames = "Alan" | "Matt" | "JC";

interface Person {
  name: string;
  age: number;
}

interface Presenter extends Person {
  name: PresenterNames;
}
```

---

# Decorators!

- Enhance classes, properties, methods, parameters

```ts
class Foo extends declared(Accessor) {

  // read-only
  @property({ readOnly: true })
  foo = new Foo();

  // aliased
  @property({ aliasOf: "foo" })
  bar;

  // autocast
  @property({ type: SomeClass })
  baz;
}
```

---

# TypeScript IDE Support

- Visual Studio
  - 2015/2013
  - Code
- WebStorm
- Sublime Text
- Atom
- Eclipse
- Emacs
- Vim

<img src="images/choices.gif" width="300">

---

# TypeScript + JS API 4

- Set up TS
- JavaScript API typings

---

# Key `Accessor` decorators

- `subclass`
- `declared`
- `property`

---

# Widget framework

- JSX
- Lifecycle
- Properties
- Methods
- Events

---

# Framework: About

`esri/widgets/Widget`: Our new widget framework

- Accessor-based
- Built with TypeScript

<img src="images/about.gif" width="400">

---

# Framework: JSX

- JavaScript extension **syntax**
- Looks similar to HTML
- Can use JS inline!

```xml
<div class={classLookup.hello} onclick={this._handleClick}
     tabIndex={0}>Hello</div>
```

---

# Framework: Lifecycle

  - constructor
  - postInitialize
  - render
  - destroy

---

# Framework: Properties

  - watching
  - renderable
  - Types
  - dependsOn
  - readOnly
  - set()
  - get()
  - aliasOf
  - vmEvent

---

# Framework: ViewModels

todo: matt

---

# Framework: Views

todo: matt

---

# Framework: Methods

todo: matt

---

# Framework: Events

todo: matt

---

# Theming

- How to style widgets
- Out of the box themes
- SASS
- BEM

<img src="images/theming.gif" width="400">

---

# Theming: Out of the box

todo: matt
[Styles](https://developers.arcgis.com/javascript/latest/guide/styling/index.html)

<img src="images/outofbox.gif" width="300">

---

# Theming: SASS

todo: matt

---

# Theming: BEM

todo: matt

---

# DO IT!

Build a widget!

<img src="images/random.gif" width="400">

---

# Tips & Tricks

- collections
- Accessibility
- i18n

<img src="images/tricks.gif" width="400">

---

## Additional Resources

- [Styling](https://developers.arcgis.com/javascript/latest/guide/styling/index.html)
- [Implementing Accessor](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html)
- [Setting up TypeScript](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)
- [Widget Development](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
- [JavaScript Sessions at DevSummit](https://devsummit.schedule.esri.com/#search/sessions/q:javascript)
- [Documentation - 4.3](https://developers.arcgis.com/javascript/)

<img src="images/additional.gif" width="200">

---

# Use the source luke

## [esriurl.com/buildwidgets2017](http://esriurl.com/buildwidgets2017)

<img src="images/source.gif" width="400">

---

# Please Take Our Survey!

1. Download the Esri Events app and go to DevSummit
2. Select the session you attended
3. Scroll down to the "Feedback" section
4. Complete Answers, add a Comment, and Select "Submit"

<img src="images/rate.gif" width="400">

---

# Questions?

<img src="images/questions.gif" width="400">

---

# Thank you!

![Thank you!](images/thanks.gif)

---

<!-- .slide: data-background="../reveal.js/img/end.png" -->
