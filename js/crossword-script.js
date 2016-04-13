$(document).ready(function() {



    $("#answ-load").hide();
    $("#btn2").hide();
    $("#check").hide();
    $("#crossword-field").hide();
    $("#horizontal-quest").hide();
    $("#vertical-quest").hide();
    $("#finishB").hide();

    var IndexOfCrossword = 0;


    $.getJSON('../api/crossword-basis.json', function(data) {
        var jsonData = data;


        $("#btn2").click(function() { //Clear all the inputs RESET-BUTTON



            $(':input').val('');

            var arrayNumberHorizontal = jsonData[IndexOfCrossword].arrayNumberHorizontal;
            arrayNumberHorizontal.forEach(function(item, i, arr) {
                $(horizontalCells[item]).val(i);
            });

            var arrayNumberVertical = jsonData[IndexOfCrossword].arrayNumberVertical;
            arrayNumberVertical.forEach(function(item, i, arr) {
                $(horizontalCells[item]).val(i);
            });

        });

        //Cells grid basic
        for (var x = 0; x < 15; x++) {
            for (var i = 0; i < 15; i++) {
                $("#crossword-field").prepend('<input type="text" class="horizontal" size="1">');
            }

            $("#crossword-field").prepend('</br>');
        }

        var horizontalCells = $(".horizontal").toArray();
        //


        //Number of Crossword-Task

        $("#next").click(function() {

            $("#finishB").show();
            $('input').attr('maxlength', 1); //allows input to take only 1 symbol

            $("#answ-load").hide();
            $("#horizontal-answ ul").empty();

            $("#vertical-answ ul").empty();


            $("#horizontal-quest").show();
            $("#vertical-quest").show();

            $("#horizontal-quest ul").empty();

            $("#vertical-quest ul").empty();

            for (var t = 0; t < jsonData[IndexOfCrossword].questions_horizontal.length; t++) {
                $('#horizontal-quest ul').append('<li>' + jsonData[IndexOfCrossword].questions_horizontal[t] + '</li>');
            }

            for (var t1 = 0; t1 < jsonData[IndexOfCrossword].questions_vertical.length; t1++) {
                $('#vertical-quest ul').append('<li>' + jsonData[IndexOfCrossword].questions_vertical[t1] + '</li>');
            }

            $('#result-message').text('');

            $("#check").show();
            $("#crossword-field").show();
            $("#btn2").show();
            $("#next").text('Next');

            $("#header-topic").text(jsonData[IndexOfCrossword].topic); //Header of Crossword Changing



            $(':input').val(''); //clearing all the inputs


            /* GENERAL CROSSWORD BUILDING */
            //Forming outlook of the crossword

            var arrayCellsDisabled = [];

            for (var a = 0; a < 225; a++) {
                arrayCellsDisabled.push(a);
            }


            arrayCellsDisabled.forEach(function(item, i, arr) {
                $(horizontalCells[item]).css('background-color', '#93A3A3');
                $(horizontalCells[item]).prop('disabled', true);
            });


            /* SPECIFIC BUILDING */
            //Clothes-crossword

            /* answer cells outlook */
            var arrayCellsAbbled = jsonData[IndexOfCrossword].arrayCellsAbbled;

            arrayCellsAbbled.forEach(function(item, i, arr) {
                $(horizontalCells[item]).css('background-color', 'white');
                $(horizontalCells[item]).prop('disabled', false);
            });


            /* numbers of questions outlook */
            var arrayNumbers = jsonData[IndexOfCrossword].arrayNumbers;

            arrayNumbers.forEach(function(item, i, arr) {
                $(horizontalCells[item]).css('background-color', '#FCA54E');
            });

            var arrayNumberHorizontal = jsonData[IndexOfCrossword].arrayNumberHorizontal;
            arrayNumberHorizontal.forEach(function(item, i, arr) {
                $(horizontalCells[item]).val(i);
            });

            var arrayNumberVertical = jsonData[IndexOfCrossword].arrayNumberVertical;
            arrayNumberVertical.forEach(function(item, i, arr) {
                $(horizontalCells[item]).val(i);
            });






            $("#check").click(function() { //CHECK BUTTON


                $("#answ-load").show();



                for (var t3 = 0; t3 < jsonData[IndexOfCrossword].answers_horizontal.length; t3++) {
                    $('#horizontal-answ ul').append('<li>' + jsonData[IndexOfCrossword].answers_horizontal[t3] + '</li>');
                }

                for (var t4 = 0; t4 < jsonData[IndexOfCrossword].answers_vertical.length; t4++) {
                    $('#vertical-answ ul').append('<li>' + jsonData[IndexOfCrossword].answers_vertical[t4] + '</li>');
                }



                var wrongAnsw_horizontal = 0;
                var rightAnsw_horizontal = 0;

                var wrongAnsw_vertical = 0;
                var rightAnsw_vertical = 0;



                /* HORIZONTAL WORDS */

                var TRUEnumbOfCell = [];
                var TRUEvalOfCell;

                function isArraysEqual(arr1, arr2) {

                    var is_same = (arr1.length == arr2.length) && arr1.every(function(element, index) {
                        return element === arr2[index];
                    });

                    return is_same;
                }


                TRUEvalOfCell = jsonData[IndexOfCrossword].horizontal_words;


                var CUSTOMERvalOfCell = [];
                var x0 = [];
                x0 = jsonData[IndexOfCrossword].x_dir;

                console.log('New topic test opening');
                console.log(x0);

                //  CUSTOMERvalOfCell.push(tmp);



                function oneAnserRecord(arr) {
                    var oneWordAnswer = [];
                    arr.forEach(function(item, i, arr) {
                        var tmp = $(horizontalCells[item]).val();
                        oneWordAnswer.push(tmp);
                    });
                    return oneWordAnswer;
                }


                for (var z = 0; z < x0.length; z++) {
                    console.log(oneAnserRecord(x0[z]));
                    CUSTOMERvalOfCell.push(oneAnserRecord(x0[z]));

                }

                var resultArr = [];


                for (var c = 0; c < jsonData[IndexOfCrossword].horizontal_words.length; c++) {
                    resultArr.push(isArraysEqual(TRUEvalOfCell[c], CUSTOMERvalOfCell[c]));
                }

                console.log(TRUEvalOfCell);



                resultArr.forEach(function(item, i, arr) { ///Checking of horizontal answers
                    if (item === false) {
                        wrongAnsw_horizontal += 1;
                    } else {
                        rightAnsw_horizontal += 1;
                    }
                });



                /* VERTICAL WORDS */

                var TRUEnumbOfCell_vertical = [];
                var TRUEvalOfCell_vertical;


                TRUEvalOfCell_vertical = jsonData[IndexOfCrossword].vertical_words;


                var CUSTOMERvalOfCell_vertical = [];
                var y0 = [];
                y0 = jsonData[IndexOfCrossword].y_dir;

                //  CUSTOMERvalOfCell.push(tmp);






                for (var z2 = 0; z2 < y0.length; z2++) {
                    console.log(oneAnserRecord(y0[z2]));
                    CUSTOMERvalOfCell_vertical.push(oneAnserRecord(y0[z2]));

                }

                var resultArr2 = [];


                for (var d = 0; d < jsonData[IndexOfCrossword].vertical_words.length; d++) { //Comparing Customer answers and right ones

                    resultArr2.push(isArraysEqual(TRUEvalOfCell_vertical[d], CUSTOMERvalOfCell_vertical[d]));
                }

                console.log(TRUEvalOfCell_vertical);



                resultArr2.forEach(function(item, i, arr) { ///Checking of horizontal answers
                    if (item === false) {
                        wrongAnsw_vertical += 1;
                    } else {
                        rightAnsw_vertical += 1;
                    }
                });


                //Calcualting of total true/false answers
                var wrongAnsw = wrongAnsw_horizontal + wrongAnsw_vertical;
                var rightAnsw = rightAnsw_horizontal + rightAnsw_vertical;






                $('#result-message').text('You have given ' + rightAnsw + ' right answers and ' + wrongAnsw + ' wrong ones');

                IndexOfCrossword += 1;

            });



            if (IndexOfCrossword == 1) {
                $('#next').hide();
            }

            $("#finishB").click(function() {
                $('#crossword-warapper').empty();
                $('#crossword-warapper').text('Thanks for completing this test. Hope, you have enjoyed it!');
                $('#crossword-warapper').css("text-align", "center");
                $('#crossword-warapper').css("font-size", "30px");
                $('#crossword-warapper').css("padding", "10%");
            });


            if (IndexOfCrossword == jsonData.length) {
                IndexOfCrossword = 0;

            }

        });


    });

});
