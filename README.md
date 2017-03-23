# Gauze

Gauze is a very simple JavaScript file that filters and sorts HTML elements.

## Usage

Start by adding `gauze.js` to your HTML document, and a little CSS (feel free
to move this to your own CSS file and customize as you like):

```html
<head>
  <script src="gauze.js"></script>
  <style>
    .filter-list .filterable.filter-visible {
      display: inline-block;
    }

    .filter-list .filterable.filter-hidden {
      display: none;
    }
  </style>
</head>
```

Now add some filter buttons (you can use anchors, or any clickable element):

```html
  <div class="filters">
    <button data-filter-type="all" type="button" class="filter-button">All food</button>
    <button data-filter-type="fruit" type="button" class="filter-button">Fruit</button>
    <button data-filter-type="vegetables" type="button" class="filter-button">Vegetables</button>
    <button data-filter-type="protein" type="button" class="filter-button">Protein</button>
  </div>
```

Finally add a list of `filterable` things inside a `filter-list` container
element. You can also give each item a `sort-priority` if you like, but it's
not mandatory:

```html
  <div class="filter-list">
    <div class="filterable" data-filter-type="fruit" data-sort-priority="3">
      Apple
    </div>
    <div class="filterable" data-filter-type="fruit" data-sort-priority="1">
      Banana
    </div>
    <div class="filterable" data-filter-type="fruit">
      Mangosteen
    </div>

    <div class="filterable" data-filter-type="vegetables">
      Broccoli
    </div>
    <div class="filterable" data-filter-type="vegetables">
      Carrot
    </div>
    <div class="filterable" data-filter-type="vegetables" data-sort-priority="1">
      Kale
    </div>

    <div class="filterable" data-filter-type="protein" data-sort-priority="1">
      Beef
    </div>
    <div class="filterable" data-filter-type="protein" data-sort-priority="3">
      Chicken
    </div>
    <div class="filterable" data-filter-type="protein" data-sort-priority="2">
      Tuna
    </div>
  </div>
```

If you want to see Gauze in action, check out the
[example](https://jamesmartin.github.io/gauze/).

## Footnotes

Gauze is less than 100 lines of JavaScript and has no dependencies on third
party libraries. It was designed to be approachable and easy to modify to suit
your needs, so please read the code and change it to suit your preferences.

Gauze uses some JavaScript directives that probably won't work on older
browsers like IE 6/7.
