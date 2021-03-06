$.when(
  $.getJSON(quizData), // get json with quastions
  $.get("templ/simple-test-quastions.html"), // get template with quastions page
  $.ajax("templ/simple-test-final.html") // get template with final page
  )
  .then(renderPage)
  .fail(function(){console.log("Error");
});


function renderPage(DataRequest, qTmplRequest, finTmplRequest) {

  var quastions = DataRequest[0][0]; // quastion from parsed JSON
  var analytics = DataRequest[0][1]; // analytics from parsed JSON
  var qTmpl = qTmplRequest[0];  // template with quastions page
  var finTmpl = finTmplRequest[0];  // template with final page

console.log(analytics[3])

  var simpleQuiz = $('#simple-quiz'); // container for rendered info
  var quastionCounter = 0; // number of current quastion
  var correctAnswers = 0; //counter of the correct answers

  var quastionPageTmpl = _.template(qTmpl);  // underscore template for quastion page
  var finalnPageTmpl = _.template(finTmpl);  // underscore template for final page

  // render function for quastion page
  function renderQuastionPage(template, arr, index) {
    var info = template({
                        quastion: arr[index].quastion,
                        options: arr[index].option
                       });
    $('#simple-quiz').html(info);
  }

  // render function for final page
  function renderFinalPage(template, arr) {
    var info = template({ 
                        result: correctAnswers,
                        totalQuastion: arr.length,
                        percent: Math.round(correctAnswers / quastions.length * 100),
                        summary: getSummary()
                       });
    $('#simple-quiz').html(info);
  }

  function getSummary() {
    var percentage = Math.round(correctAnswers / quastions.length * 100);
    switch (true) {
      case (percentage < 25):
        return analytics[0]
        break
      case (percentage < 50):
        return analytics[1]
        break
      case (percentage < 75):
        return analytics[2]
        break
      default:
        return analytics[3]
    }

  }

  // event function when click option
  function optionChooseEvent() {

    var optionId = ( ($(this).attr('id')) ); // ID that is clicked on

    if (optionId == quastions[quastionCounter].correct) {
      $(this).addClass('option-correct'); //make it green
      $(this).children().removeClass('glyphicon-unchecked').addClass('glyphicon-ok'); //change icon;
      $(this).siblings().addClass('option-not-active'); //make other options not active
      correctAnswers++;
      console.log(correctAnswers);
    } else {
      $(this).addClass('option-wrong');
      $(this).siblings().addClass('option-not-active'); //make other options not active
      $(this).children().removeClass('glyphicon-unchecked').addClass('glyphicon-remove');
      $("#" + quastions[quastionCounter].correct).removeClass('option-not-active').addClass('option-correct'); //make it green
      $("#" + quastions[quastionCounter].correct).children().removeClass('glyphicon-unchecked').addClass('glyphicon-ok');
    }

    $( "#simple-quiz").undelegate( '#options li', 'click', optionChooseEvent); //undelegate event
  }

  function renderBar() {
    console.log(5);
    var percent = Math.round(correctAnswers / quastions.length * 100);
    console.log(percent)
    $(".prog-result").width(percent + "%");
    $(".percent").css("margin-top", 0 + "px");
  }

  // event function when click next button
  function nextPageEvent() {
    $( "#simple-quiz").undelegate( '#options li', 'click', optionChooseEvent); //undelegate event
    quastionCounter++;
    if (quastionCounter < quastions.length) {
      // delegate click event each time new page is loaded
      $( "#simple-quiz").delegate( '#options li', 'click', optionChooseEvent);
      //simpleQuiz.html(''); // if add this one we receive empty table at the end 
      renderQuastionPage(quastionPageTmpl, quastions, quastionCounter);
    } else {
      renderFinalPage(finalnPageTmpl, quastions);
      renderBar();
    }
  }

  // choose option event
  $( "#simple-quiz").delegate( '#options li', 'click', optionChooseEvent);
  // next button event
  $( "#simple-quiz").delegate( ".next-button", 'click', nextPageEvent);

  renderQuastionPage(quastionPageTmpl, quastions, quastionCounter);
}