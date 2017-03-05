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

- TypeScript
- Accessor

<img src="images/holdup.gif" width="400">

---

# TypeScript

- Superset of JavaScript
- Compiled to JavaScript
- Statically type-checked

---

# TypeScript

## Type safety

```
view: MapView | SceneView;

// ...

view = "not-a-view"; //TS2322: Type '"not-a-view"' is not assignable to type 'MapView | SceneView'.
```

---

# TypeScript

## Decorators

```
@property()
view: View;
```

---

# TypeScript Environment

- Visual Studio Code
- IntelliJ IDEA/WebStorm
- Text editor + command line

---

# TypeScript + JS API 4

- Set up TS
- JavaScript API typings

---

# Accessor

- Foundation for JavaScript API

---

# Accessor

## Unified constructor

```ts
view = new View({
  // ... properties are set on instance
});
```

---

# Accessor

## Getters/Setters

```ts
console.log(view.map);
```

```ts
view.map = someMap;
```

---

# Accessor

## Watch properties

```ts
view.watch("size", function (newValue, oldValue, propName, target) {
  // ...
})
```

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
- i18n

---

# Framework: About

- ~~dijit/_WidgetBase~~
- TypeScript

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

TBD

---

# Framework: Views

TBD

---

# Framework: Methods

TBD

---

# Framework: Events

TBD

---

# Framework: i18n

TBD

---

# Theming

- Out of the box
- SASS

<img src="images/theming.gif" width="400">

---

# Theming: Out of the box

TBD

<img src="images/outofbox.gif" width="300">

---

# Theming: SASS

TBD

---

# Theming: BEM

TBD

---

# DO IT!

Build a widget!

<img src="images/random.gif" width="400">

---

# Tips & Tricks

- CSS class object
- collections
- handleRegistry
- accessibleHandler

<img src="images/tricks.gif" width="400">

---

# Tips & Tricks: TBD

TBD

---

## Additional Resources

- [Widget Development](http://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
- [TypeScript Tutorial](https://www.typescriptlang.org/docs/tutorial.html)
- [Implementing Accessor](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html)
- [`esri/core/accessorSupport/decorators`](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-accessorSupport-decorators.html)
- [`esri/widgets/support/widget`](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-support-widget.html)
- [JavaScript Sessions at DevSummit](https://devsummit.schedule.esri.com/#search/sessions/q:javascript)
- [Documentation - 4.0 beta](https://developers.arcgis.com/javascript/beta/)

<img src="images/additional.gif" width="200">

---

# Use the source luke

[GitHub Code](https://github.com/ArcGIS/presentations-devsummit-2017)

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

![Thank you!](images/thanks.gif)

---

<!-- .slide: data-background="../reveal.js/img/end.png" -->
