function addScript(url) {
    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = url;
    document.head.appendChild(script);
}
addScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');


function captureDivAsPDF(){
  var element = document.getElementById('beat-board');
  var opt = {
    margin:       1,
    filename:     'myfile.pdf',
    // html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
  };

  // New Promise-based usage:
  html2pdf().set(opt).from(element).save();
}