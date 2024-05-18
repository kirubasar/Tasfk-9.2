window.onload = function() {
  var form = document.getElementById('survey-form');
  var resultTable = document.getElementById('result');

  // Add table headers
  var row = resultTable.insertRow();
  var fields = ['First Name', 'Last Name', 'Email', 'Address', 'Pincode', 'State', 'Country', 'Gender', 'Food', 'Comments'];
  fields.forEach(function(field) {
      var cell = row.insertCell();
      cell.innerHTML = field;
  });

  form.addEventListener('submit', function(event) { // Corrected event type
      event.preventDefault();

      var values = [];
      fields.forEach(function(field) {
          if (field === 'Gender') {
              var value = document.querySelector('input[name="gender"]:checked').value;
              if (!value) {
                  alert('Please select a gender.');
                  return;
              }
              values.push(value);
          } else if (field === 'Food') {
              var selectedFoods = [];
              var checkboxes = document.querySelectorAll('input[name="food"]:checked');
              if (checkboxes.length < 2) { // Corrected condition
                  alert('Please select at least two foods.');
                  return;
              }
              for (var i = 0; i < checkboxes.length; i++) {
                  selectedFoods.push(checkboxes[i].value);
              }
              values.push(selectedFoods.join(', '));
          } else {
              var value = document.querySelector('#' + field.toLowerCase().replace(' ', '-')).value;
              if (!value) {
                  alert('Please fill out all fields.');
                  return;
              }
              values.push(value);
          }
      });

      var row = resultTable.insertRow();
      for (var i = 0; i < values.length; i++) {
          var cell = row.insertCell();
          cell.innerHTML = values[i];
      }

      // Clear the form for the next entry
      form.reset();
  });
}
