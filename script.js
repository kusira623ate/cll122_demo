document.getElementById('reaction-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Retrieve input values
    const k = parseFloat(document.getElementById('k').value);
    const v0 = parseFloat(document.getElementById('v0').value);
    const X = parseFloat(document.getElementById('X').value);
    const reactorType = document.getElementById('reactor-type').value;
  
    let resultText = '';
  
    // Validate inputs
    if (isNaN(k) || isNaN(v0) || isNaN(X) || X <= 0 || X >= 1) {
      resultText = 'Please enter valid numerical values. Conversion (X) must be between 0 and 1 (exclusive).';
    } else {
      switch (reactorType) {
        case 'PFR':
          const V_PFR = (v0 / k) * Math.log(1 / (1 - X));
          resultText = `Required Volume for PFR: ${V_PFR.toFixed(4)} m³`;
          break;
        case 'CSTR':
          const V_CSTR = (v0 * X) / (k * (1 - X));
          resultText = `Required Volume for CSTR: ${V_CSTR.toFixed(4)} m³`;
          break;
        // case 'Batch':
        //   const t_batch = (1 / k) * Math.log(1 / (1 - X));
        //   resultText = `Required Time for Batch Reactor: ${t_batch.toFixed(4)} s`;
        //   break;
        default:
          resultText = 'Invalid reactor type selected.';
      }
    }
  
    // Display results
    const resultsSection = document.getElementById('results');
    const outputParagraph = document.getElementById('output');
    outputParagraph.textContent = resultText;
    resultsSection.classList.remove('hidden');
  });
  