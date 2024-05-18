window.onload = function() {
  let  form = document.getElementById('survey-form');
  let resultTable = document.getElementById('result');

  // Add table headers
  let row = resultTable.insertRow();
  let fields = ['First Name', 'Last Name', 'Email', 'Address', 'Pincode', 'State', 'Country', 'Gender', 'Food', 'Comments'];
  fields.forEach(function(field) {
    let cell = row.insertCell();
      cell.innerHTML = field;
  });

  form.addEventListener('submit', function(event) { // Corrected event type
      event.preventDefault();

      let values = [];
      fields.forEach(function(field) {
          if (field === 'Gender') {
            let value = document.querySelector('input[name="gender"]:checked').value;
              if (!value) {
                  alert('Please select a gender.');
                  return;
              }
              values.push(value);
          } else if (field === 'Food') {
            let selectedFoods = [];
            let checkboxes = document.querySelectorAll('input[name="food"]:checked');
              if (checkboxes.length < 2) { // Corrected condition
                  alert('Please select at least two foods.');
                  return;
              }
              for (let i = 0; i < checkboxes.length; i++) {
                  selectedFoods.push(checkboxes[i].value);
              }
              values.push(selectedFoods.join(', '));
          } else {
            let value = document.querySelector('#' + field.toLowerCase().replace(' ', '-')).value;
              if (!value) {
                  alert('Please fill out all fields.');
                  return;
              }
              values.push(value);
          }
      });

      let row = resultTable.insertRow();
      for (let i = 0; i < values.length; i++) {
        let cell = row.insertCell();
          cell.innerHTML = values[i];
      }

      // Clear the form for the next entry
      form.reset();
  });
}
