$(function() {
  $('#beat-board').sortable({
    handle: '.drag-handle',
    stop: function(event, ui) {
      const x = ui.position.left;
      const y = ui.position.top;
      ui.item.data('x', x);
      ui.item.data('x', y);
    }
  });

  $('#add-beat').click(function() {
    const newBeat = $('<div class="beat"><div class="drag-handle"></div><h2 contentEditable="true">Beat Title</h2><p contentEditable="true">Beat Body</p></div>');
    newBeat.css('position', 'absolute');
    newBeat.css('left', '10px');
    newBeat.css('top', '10px');
    $('#beat-board').append(newBeat);
  });

  $('#beat-board').on('mouseenter', '.beat', function() {
    $(this).draggable({
      handle: '.drag-handle',
      containment: 'parent',
      stop: function(event, ui) {
        var position = ui.position;
        var $beat = $(this);
        var $beatBoard = $("#beat-board");
        var x = position.left - $beatBoard.offset().left;
        var y = position.top - $beatBoard.offset().top;
        $(this).data('x', x);
        $(this).data('y', y);
      }
    });
  });

  $('#beat-board').on('mouseleave', '.beat', function() {
    $(this).draggable('destroy');
  });

  $('#beat-board').on('mousedown', '.beat', function() {
    bringToFront(this);
  });



  $('#export-button').click(function() {
    exportBeatBoard();
  });

  $('#import-button').click(function() {
    var beatBoardJson = prompt('Enter the JSON representation of the beat board:');
    importBeatBoard(beatBoardJson);
  });


  function bringToFront(beat) {
    // Find the highest z-index value among all beats
    var maxZ = 0;
    $('.beat').each(function() {
      var z = parseInt($(this).css('z-index'));
      if (z > maxZ) {
        maxZ = z;
      }
    });
    // Set the z-index of the selected beat to one higher than the highest z-index
    $(beat).css('z-index', maxZ + 1);
  }

  // Function to export the beat board as a JSON object
  function exportBeatBoard() {
    var beats = [];
    $('.beat').each(function() {
      var beat = {};
      beat.position = $(this).position();
      beat.title = $(this).find('h2').text();
      beat.description = $(this).find('p').text();
      beats.push(beat);
    });
    var json = JSON.stringify(beats);
    console.log(json);
  }

  // Function to import a JSON object and update the beat board
  function importBeatBoard(json) {
    var beats = JSON.parse(json);
    $('#beat-board').empty();
    beats.forEach(function(beat) {
      var $beat = $('<div class="beat"><div class="drag-handle"></div><h2 contentEditable="true"></h2><p contentEditable="true"></p></div>');
      $beat.find('h2').text(beat.title);
      $beat.find('p').text(beat.description);
      $beat.css('left', beat.position.left);
      $beat.css('top', beat.position.top);
      $('#beat-board').append($beat);
    });
  }






});