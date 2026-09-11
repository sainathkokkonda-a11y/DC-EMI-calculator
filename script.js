function calculateGlobalEMI() {
  const p = parseFloat(document.getElementById('loanAmount').value);
  const rAnnual = parseFloat(document.getElementById('interestRate').value);
  const years = parseInt(document.getElementById('tenureYears').value) || 0;
  const months = parseInt(document.getElementById('tenureMonths').value) || 0;
  const feePercent = parseFloat(document.getElementById('processingFee').value) || 0;
  const curr = document.getElementById('currencySymbol').value;

  const totalMonths = (years * 12) + months;

  if (isNaN(p) || isNaN(rAnnual) || p <= 0 || rAnnual < 0 || totalMonths <= 0) {
    return;
  }

  const r = rAnnual / 12 / 100;
  const n = totalMonths;

  let emi = 0;
  if (r === 0) {
    emi = p / n;
  } else {
    emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPay = emi * n;
  const totalInt = totalPay - p;
  const procFeeVal = (p * feePercent) / 100;

  const formatNumber = (num) => {
    return curr + ' ' + Math.round(num).toLocaleString('en-IN');
  };

  document.getElementById('monthlyEMI').innerText = formatNumber(emi);
  document.getElementById('principalAmount').innerText = formatNumber(p);
  document.getElementById('totalInterest').innerText = formatNumber(totalInt);
  document.getElementById('procFeeAmount').innerText = formatNumber(procFeeVal);
  document.getElementById('totalPayment').innerText = formatNumber(totalPay);

  const principalPercent = (p / totalPay) * 100;
  const interestPercent = (totalInt / totalPay) * 100;
  document.getElementById('barPrincipal').style.width = principalPercent + '%';
  document.getElementById('barInterest').style.width = interestPercent + '%';
}

// పేజ్ లోడ్ అయిన వెంటనే ఆటోమేటిక్‌గా ఫలితాలు చూపడానికి
window.onload = calculateGlobalEMI;
