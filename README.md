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
    <div class="filterable" data-filters='[ { "type":"fruit", "sortPriority":"3" }, { "type":"vegetables", "sortPriority":"2" } ]'>
      Apple
    </div>
    <div class="filterable" data-filters='[ { "type":"fruit", "sortPriority":"1" } ]'>
      Banana
    </div>
    <div class="filterable" data-filters='[ { "type":"fruit"} ]'>
      Mangosteen
    </div>

    <div class="filterable" data-filters='[ { "type":"vegetables" } ]'>
      Broccoli
    </div>
    <div class="filterable" data-filters='[ { "type":"vegetables" } ]'>
      Carrot
    </div>
    <div class="filterable" data-filters='[ { "type":"vegetables", "sortPriority":"1" }, { "type":"fruit", "sortPriority":"2" } ]'>
      Kale
    </div>

    <div class="filterable" data-filters='[ { "type":"protein", "sortPriority":"1" } ]'>
      Beef
    </div>
    <div class="filterable" data-filters='[ { "type":"protein", "sortPriority":"3" } ]'>
      Chicken
    </div>
    <div class="filterable" data-filters='[ { "type":"protein", "sortPriority":"2" } ]'>
      Tuna
    </div>
  </div>
```

Notice that items can belong to any number of type categories, each with their
own sort priority: See `Apple` and `Kale` above, which belong in both fruit and
vegetables for some reason. Act like a Victorian scientist and concoct whatever
taxonomy makes sense to you.

If you want to see Gauze in action, check out the
[example](https://jamesmartin.github.io/gauze/).

## Footnotes

Gauze is less than 150 lines of JavaScript and has no dependencies on third
party libraries. It's approachable and easy to modify to suit your needs, so
please read the code and change it to suit your preferences.

Gauze uses some JavaScript that probably won't work on older browsers like IE
6/7.
