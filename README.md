# Gauze

Gauze is a very simple JavaScript module that filters and sorts HTML elements.

## Usage

Start by adding `gauze.js` to your HTML document, along with a little CSS to
show and hide filtered elements (feel free to move this to your own CSS file
and customize as you like):

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

Then add a little JavaScript to bind Gauze to your filter buttons:


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

  <script>
    // Call the _gauze.bindFilterButtons() function when the document
    // is ready to be interacted with (the DOM is loaded). You can call this
    // inline or move it to an application initializer.
    document.onreadystatechange = function() {
      if (document.readyState === 'interactive') {
        window._gauze.bindFilterButtons()
      }
    }
  </script>
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

## Options

Gauze expects your HTML document to have a structure like the example above,
but it can be flexible too:

In this example we tell Gauze that it when it's looking for `triggerSelector`
(the element that triggers filtering) and `filterContainerSelector` (the
element that contains `filterable` items) that it should use our own custom
values:

```html
    <script>
      // When the document is ready, bind the filter buttons
      document.onreadystatechange = function() {
        if (document.readyState === 'interactive') {
          window._gauze.bindFilterButtons({
            triggerSelector: '.my-filters .filter-button',
            filterContainerSelector: '.my-filter-list'
          })
        }
      }
    </script>
```

**WARNING** Even though Gauze can be flexible, if you nest buttons and
filterables under the same container element then bad things will happen (your
buttons will be removed from the DOM when you first try filtering).

For example:

**GOOD**

Separate containers for buttons and filterables, happy days!

```html
<div class="my-filter-triggers">
  <button class="filter-trigger">Fox</button>
  <button class="filter-trigger">Rabbit</button>
  <button class="filter-trigger">Toad</button>
</div>

<div class="my-filter-container">
  <div class="filterable">Fox</div>
  <div class="filterable">Rabbit</div>
  <div class="filterable">Toad</div>
</div>
```

**BAD**

This won't work the way you hope!

```html
<div class="my-filter-container">
  <div class="my-filter-triggers">
    <button class="filter-trigger">Fox</button>
    <button class="filter-trigger">Rabbit</button>
    <button class="filter-trigger">Toad</button>
  </div>

  <div class="filterable">Fox</div>
  <div class="filterable">Rabbit</div>
  <div class="filterable">Toad</div>
</div>
```

## Footnotes

Gauze is less than 150 lines of JavaScript and has no dependencies on third
party libraries. Please read the code: It's approachable and easy to modify to
suit your needs.

Gauze uses some JavaScript that probably won't work on older browsers like IE
6/7.
