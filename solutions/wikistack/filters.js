var marked = require('marked');

module.exports = function(swig) {
  // the page link filter
  var page_link = function (doc) {
    var link_name;
    if (typeof doc.title !== "undefined" && doc.title !== "") {
      link_name = doc.title
    } else {
      link_name = "Page "+doc.url_name;
    }
    return "<a href='"+doc.full_route+"'>"+link_name+"</a>";
  };
  page_link.safe = true;

  swig.setFilter('page_link', page_link);

  // the markdown filter
  // we wrap `marked` in a `markedFilter` function so we can set
  // markedFilter.safe as true, without modifying the `marked` function
  // directly.
  var markedFilter = function (body) {
    return marked(body);
  };
  markedFilter.safe = true;
  swig.setFilter('marked', markedFilter);
};
