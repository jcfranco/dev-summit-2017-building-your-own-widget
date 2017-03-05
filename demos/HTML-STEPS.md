# HTML Steps

## Setup Dojo config

```
<script>
  var href = location.href;
  var demoLocation = href.slice(0, href.lastIndexOf("/"));
  var dojoConfig = {
    async: true,

    packages: [
      {
        name: "demo",
        location: demoLocation + "/app"
      },
      {
        name: "annyang",
        location: demoLocation + "/../libs",
        main: "annyang"
      }
    ]
  };
</script>
```

## Add stylesheet for widget styles

```
<link rel="stylesheet" href="css/YoEsri.css">
```

## Require new widget

```
"esri/Map",
"esri/views/MapView",
"demo/YoEsri",
"dojo/domReady!"
```

```
Map,
MapView,
YoEsri
```

## Setup new widget

```
var yoEsri = new YoEsri({
  view: view
});

view.ui.add(yoEsri, "bottom-right");
```