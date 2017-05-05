; (function(gauze, window, document, undefined) {
  var maxSafeInteger = function() {
    // Number.MAX_SAFE_INTEGER
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
    // Hard coded because Internet Explorer.
    return 9007199254740991
  }

  var allFilterables = function(filterContainerSelector) {
    var filterables = document.querySelectorAll(filterContainerSelector + ' .filterable')
    if (filterables.length === 0)
      console.warn('Config or markup problem:\n No filterable elements found using selector: "' + filterContainerSelector + ' .filterable"')
    return filterables
  }

  var updateAllFilterables = function(filterContainerSelector, fn) {
    allFilterables(filterContainerSelector).forEach(function(filterable) {
      fn(filterable)
    })
  }

  var show = function(filterable) {
    filterable.classList.add('filter-visible')
    filterable.classList.remove('filter-hidden')
  }

  var hide = function(filterable) {
    filterable.classList.add('filter-hidden')
    filterable.classList.remove('filter-visible')
  }

  var filters = function(filterable) {
    var parsedFilters = []
    try {
      parsedFilters = JSON.parse(filterable.dataset.filters)
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.warn("Gauze: there's a problem with your filters: ")
        console.warn(filterable.innerHTML)
        console.warn(filterable.dataset.filters)
      } else {
        console.warn("Gauze: Error parsing filters")
        console.warn(filterable)
        console.warn(e)
      }
    }
    return parsedFilters
  }

  var filterOfType = function(filterable, filterType) {
    return filters(filterable).find(function(filter) {
      return filter.type === filterType
    })
  }
  var filterTypes = function(filterable) {
    return filters(filterable).map(function(filter) {
      return filter.type
    })
  }

  var filterBy = function(filterType, filterContainerSelector) {
    if (filterType === 'all') {
      updateAllFilterables(filterContainerSelector, function(filterable) {
        show(filterable)
      })
    } else {
      updateAllFilterables(filterContainerSelector, function(filterable) {
        if (filterTypes(filterable).includes(filterType)) {
          show(filterable)
        } else {
          hide(filterable)
        }
      })
    }
  }

  var nullFilter = function(filterType) {
    return { type: filterType, sortPriority: maxSafeInteger() }
  }

  var populateFilterList = function(filterables, filterContainerSelector) {
    var container = document.querySelector(filterContainerSelector)
    var elements = document.createDocumentFragment()
    filterables.forEach(function(el) {
      var item = el.cloneNode(true)
      elements.appendChild(item)
    })
    container.innerHTML = null
    container.appendChild(elements)
  }

  var safeSortPriorityValue = function(filter) {
    return parseInt(filter.sortPriority) || maxSafeInteger()
  }

  var sortByPriority = function(items, filterType) {
    if (!filterType)
      return items

    return Array.prototype.slice.call(items).sort(function(a, b) {
      var aFilter = filterOfType(a, filterType) || nullFilter(filterType)
      var bFilter = filterOfType(b, filterType) || nullFilter(filterType)
      var aSortPriority = safeSortPriorityValue(aFilter)
      var bSortPriority = safeSortPriorityValue(bFilter)

      if (aSortPriority < bSortPriority) {
        return -1
      }
      if (aSortPriority > bSortPriority) {
        return 1
      }
      return 0
    })
  }

  var sortFilteredItems = function(filterType, filterContainerSelector) {
    var visibleItems = document.querySelectorAll(filterContainerSelector + ' .filterable.filter-visible')
    populateFilterList(
      sortByPriority(visibleItems, filterType),
      filterContainerSelector
    )
  }

  var defaultOptions = function() {
    return {
      triggerSelector: '.filters .filter-button',
      filterContainerSelector: '.filter-list'
    }
  }

  var config = function(options) {
    if (options === undefined)
      return defaultOptions()

    var finalConfig = {}
    Object.keys(defaultOptions()).forEach(function(key) {
      finalConfig[key] = options[key] || defaultOptions()[key]
    })
    return finalConfig
  }

  var bindFilterButtons = function(options) {
    var originalFilterables = allFilterables(config(options).filterContainerSelector)
    document.addEventListener('click', function(event) {
      if (event.target.matches(config(options).triggerSelector)) {
        var filterType = event.target.dataset.filterType
        if (filterType) {
          populateFilterList(originalFilterables, config(options).filterContainerSelector)
          filterBy(filterType, config(options).filterContainerSelector)
          sortFilteredItems(filterType, config(options).filterContainerSelector)
        }
      }
    })
  }

  // Public interface
  gauze.bindFilterButtons = bindFilterButtons
}(window._gauze = window._gauze || {}, window, document))

// Element.matches() polyfill (for Internet Explorer)
// https://developer.mozilla.org/en/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}
