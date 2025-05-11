document.getElementById('reaction-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Retrieve input values
  const reactorType = document.getElementById('reactor-type').value;
  const temperature = parseFloat(document.getElementById('temperature').value);
  const temperatureUnit = document.getElementById('temperature-unit').value;
  const pressure = parseFloat(document.getElementById('pressure').value);
  const pressureUnit = document.getElementById('pressure-unit').value;
  const k = parseFloat(document.getElementById('k').value);
  const kUnit = document.getElementById('k-unit').value;
  const X = parseFloat(document.getElementById('X').value) / 100; // Convert percentage to fraction
  const v0 = parseFloat(document.getElementById('v0').value);
  const v0Unit = document.getElementById('v0-unit').value;

  // Unit conversions
  let k_SI = k;
  if (kUnit === '1/min') {
    k_SI = k / 60;
  } else if (kUnit === '1/hr') {
    k_SI = k / 3600;
  }

  let v0_SI = v0;
  if (v0Unit === 'L/s') {
    v0_SI = v0 / 1000;
  } else if (v0Unit === 'L/min') {
    v0_SI = v0 / 60000;
  }

  // Calculations
  let V = 0;
  let tau = 0;
  if (reactorType === 'PFR') {
    V = (v0_SI / k_SI) * Math.log(1 / (1 - X));
    tau = V / v0_SI;
  } else if (reactorType === 'CSTR') {
    V = (v0_SI * X) / (k_SI * (1 - X));
    tau = V / v0_SI;
  } else if (reactorType === 'Batch') {
    tau = (1 / k_SI) * Math.log(1 / (1 - X));
    V = 'N/A';
  }

  // Display results
  const resultsSection = document.getElementById('results');
  const outputParagraph = document.getElementById('output');
  resultsSection.classList.remove('hidden');

  document.getElementById('volume-btn').addEventListener('click', function() {
    outputParagraph.textContent = V !== 'N/A' ? `Required Volume: ${V.toFixed(4)} m³` : 'Volume calculation not applicable for Batch Reactor.';
  });

  document.getElementById('residence-time-btn').addEventListener('click', function() {
    outputParagraph.textContent = `Residence Time (τ): ${tau.toFixed(4)} s`;
  });
});
