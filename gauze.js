; (function(gauze, window, document, undefined) {
  var filtering = gauze.filtering = gauze.filtering || (function() {
    var maxSafeInteger = function() {
      // Number.MAX_SAFE_INTEGER
      // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
      // Hard coded because Internet Explorer.
      return 9007199254740991
    }

    var allFilterables = function() {
      return document.querySelectorAll('.filter-list .filterable')
    }

    var updateAllFilterables = function(fn) {
      allFilterables().forEach(function(filterable) {
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

    var filterBy = function(filterType) {
      if (filterType === 'all') {
        updateAllFilterables(function(filterable) {
          show(filterable)
        })
      } else {
        updateAllFilterables(function(filterable) {
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

    var populateFilterList = function(filterables) {
      var container = document.querySelector('.filter-list')
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

    var sortFilteredItems = function(filterType) {
      var visibleItems = document.querySelectorAll('.filter-list .filterable.filter-visible')
      populateFilterList(
        sortByPriority(visibleItems, filterType)
      )
    }

    var bindFilterButtons = function() {
      var originalFilterables = allFilterables()
      document.addEventListener('click', function(event) {
        if (event.target.matches('.filters .filter-button')) {
          var filterType = event.target.dataset.filterType
          if (filterType) {
            populateFilterList(originalFilterables)
            filterBy(filterType)
            sortFilteredItems(filterType)
          }
        }
      })
    }

    return {
      bindFilterButtons: bindFilterButtons
    }
  })()
}(window._gauze = window._gauze || {}, window, document))
