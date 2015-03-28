app.initializeAutofill = function(field, data) {
  $(field).keyup(function(e) {

    fill();

    // var fillIt = setTimeout(fill, 250);
    // $(field).on('keydown', cancelFill);
    //
    // function cancelFill() {
    //   clearTimeout(fillIt);
    //   $(field).off('keydown', cancelFill);
    // }

    function fill() {
      if (!((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 32 || e.keyCode === 189)) {
        return;
      }

      var term = $(field).val();
      var searchTerm = term.toLowerCase();
      var index = -1;

      for (var i = 0; i < data.length; ++i) {
        if (data[i].name.toLowerCase().indexOf(searchTerm) === 0) {
          index = i;
          break;
        }
      }

      if (index === -1) {
        return;
      }

      // $(field).off('keydown', cancelFill);

      field.value = term + data[index].name.slice(term.length);
      field.setSelectionRange(term.length, data[index].name.length);
    }
  });
};
