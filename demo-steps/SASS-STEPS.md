# Sass

## Add Sass Variables

```
$icon_size: 24px;
$button_size: 40px;
$button_radius: 20px;
$icon_fill: #fff;
$listening_bg: #7e4cde;
```

## Add Mixin

```
@mixin flex {
  display: -webkit-flex;
  display: flex;
}
```

## Add Widget base class

```
.demo-yo-esri {
  width: $button_size;
  height: $button_size;
  @include flex;
  border-radius: $button_radius;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, fill 0.3s;
}
```

## Add Icon class

```
&__icon {
    width: $icon_size;
    height: $icon_size;
    transition: all 0.15s ease-in-out;
  }
```

## Add listening modifier class

```
&--listening {
  background-color: $listening_bg;
  .demo-yo-esri__icon {
    fill: $icon_fill;
  }
}
```

## Add disabled modifier class

```
&--disabled {
  opacity: 0.5;
  cursor: auto;
}
```

## Complete SASS should be:

```
$icon_size: 24px;
$button_size: 40px;
$button_radius: 20px;
$icon_fill: #fff;
$listening_bg: #7e4cde;

@mixin flex {
  display: -webkit-flex;
  display: flex;
}

.demo-yo-esri {
  width: $button_size;
  height: $button_size;
  @include flex;
  border-radius: $button_radius;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, fill 0.3s;
  &__icon {
    width: $icon_size;
    height: $icon_size;
    transition: all 0.15s ease-in-out;
  }
  &--listening {
    background-color: $listening_bg;
    .demo-yo-esri__icon {
      fill: $icon_fill;
    }
  }
  &--disabled {
    opacity: 0.5;
    cursor: auto;
  }
}
```

## Compile Sass

```
sass YoEsri.scss YoEsri.css
```

