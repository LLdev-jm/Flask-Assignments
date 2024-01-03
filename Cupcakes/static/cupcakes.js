const BASE_URL = "http://127.0.0.1:5000/api";

// Function to generate HTML for a cupcake based on cupcake data
function generateCupcakeHTML(cupcake) {
  return `
    <div data-cupcake-id=${cupcake.id}>
      <li>
        ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
        <button class="delete-button">X</button>
      </li>
      <img class="Cupcake-img" src="${cupcake.image}"alt="(no image provided)">
    </div>
  `;
}


// Get and display initial cupcakes from the server
async function showInitialCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);

  for (let cupcakeData of response.data.cupcakes) {
    console.log(`response.data: ${JSON.stringify(response.data)}`);
    console.log(`response.data.cupcakes: ${JSON.stringify(response.data.cupcakes)}`);
    let newCupcake = $(generateCupcakeHTML(cupcakeData));
    $("#cupcakes-list").append(newCupcake);
  }
}

// Event handler for form submission to create a new cupcake 
$("#new-cupcake-form").on("submit", async function (evt) {
  evt.preventDefault();
// collect form input values
  let flavor = $("#form-flavor").val();
  let rating = $("#form-rating").val();
  let size = $("#form-size").val();
  let image = $("#form-image").val();

// Send POST request to create a new cupcake
  const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    rating,
    size,
    image
  });
  console.log(newCupcakeResponse)
  
// Append new cupcake to the existing list of cupcakes and reset form 
  let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
  $("#cupcakes-list").append(newCupcake);
  $("#new-cupcake-form").trigger("reset");
});

// Event handler to delete cupcake
$("#cupcakes-list").on("click", ".delete-button", async function (evt) {
  evt.preventDefault();

  // Find the cupcake element and get its ID
  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-cupcake-id");

  // Send a DELETE request to remove the cupcake from the server
  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
  $cupcake.remove();
});

// Display initial cupcakes when the page loads
$(showInitialCupcakes);