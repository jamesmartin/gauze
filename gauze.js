function maxSafeInteger() {
  // Number.MAX_SAFE_INTEGER
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
  // Hard coded because Internet Explorer.
  return 9007199254740991
}

function allFilterables() {
  return document.querySelectorAll('.filter-list .filterable')
}

function updateAllFilterables(fn) {
  allFilterables().forEach(function(filterable) {
    fn(filterable)
  })
}

function show(filterable) {
  filterable.classList.add('filter-visible')
  filterable.classList.remove('filter-hidden')
}

function hide(filterable) {
  filterable.classList.add('filter-hidden')
  filterable.classList.remove('filter-visible')
}

function filters(filterable) {
  return JSON.parse(filterable.dataset.filters) || []
}

function filterOfType(filterable, filterType) {
  return filters(filterable).find(function(filter) {
    return filter.type === filterType
  })
}
function filterTypes(filterable) {
  return filters(filterable).map(function(filter) {
    return filter.type
  })
}

function filterBy(filterType) {
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

function nullFilter(filterType) {
  return { type: filterType, sortPriority: maxSafeInteger() }
}

function populateFilterList(filterables) {
  var container = document.querySelector('.filter-list')
  var elements = document.createDocumentFragment()
  filterables.forEach(function(el) {
    var item = el.cloneNode(true)
    elements.appendChild(item)
  })
  container.innerHTML = null
  container.appendChild(elements)
}

function safeSortPriorityValue(filter) {
  return parseInt(filter.sortPriority) || maxSafeInteger()
}
function sortByPriority(items, filterType) {
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

function sortFilteredItems(filterType) {
  var visibleItems = document.querySelectorAll('.filter-list .filterable.filter-visible')
  populateFilterList(
    sortByPriority(visibleItems, filterType)
  )
}

function bindFilterButtons() {
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

document.onreadystatechange = function() {
  if (document.readyState === 'interactive') {
    bindFilterButtons()
  }
}
