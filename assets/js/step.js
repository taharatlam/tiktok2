var form = $("#contact");
form.validate({
    errorPlacement: function errorPlacement(error, element) { element.before(error); },
    rules: {
        ques1 : {
            required: true
        },
        ques2 : {
            required: true
        },
        ques3 : {
            required: true
        },
        ques4 : {
            required: true
        },
        ques5 : {
            required: true
        },
        ques6 : {
            required: true
        },
        ques7 : {
            required: true
        },
        ques8 : {
            required: true
        },
        ques9 : {
            required: true
        },
        ques10 : {
            required: true
        },
        ques11 : {
            required: true
        },
        ques12 : {
            required: true
        },
        ques13 : {
            required: true
        },
        ques14 : {
            required: true
        },
        ques15 : {
            required: true
        },
        ques16 : {
            required: true
        },
    }
});
var numFlag = 0;
var finalScore;

form.children("div").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "slideLeft",
    onStepChanging: function (event, currentIndex, newIndex)
    {
        
        form.validate().settings.ignore = ":disabled,:hidden";
        // var percent = (newIndex+1) / $('section.body').length * 100;
        var percent = newIndex / $('section.body').length * 100;
        if(form.valid()){
            if(numFlag < percent){
                moveCircle(percent)
                numFlag = percent
            }
        }else{
            var tt = $('section.body')[currentIndex]
            var temp = `<div class="er-box">Please Check All Questions</div>`;
            if($(tt).find('.er-box').length){
               
            }else{
                $(tt).find('.questions-wrapper').prepend(temp)
                setTimeout(() => {
                    $(tt).find('.er-box').fadeOut(300, function(){
                        $(this).remove();
                    })
                }, 2000);
            }
        }
        return form.valid();
    },
    onFinishing: function (event, currentIndex)
    {
        form.validate().settings.ignore = ":disabled";
        if(!form.validate()){
            var tt = $('section.body')[currentIndex]
            var temp = `<div class="er-box">Please Check All Questions</div>`;
            if($(tt).find('.er-box').length){
               
            }else{
                $(tt).find('.questions-wrapper').prepend(temp)
                setTimeout(() => {
                    $(tt).find('.er-box').fadeOut(300, function(){
                        $(this).remove();
                    })
                }, 2000);
            }
        }
        return form.valid();
    },
    onFinished: function (event, currentIndex, newIndex)
    {
        finalScore = calculateScore();
        
        $('.step-tool-main').addClass('d-none');
        $('.tool-form').removeClass('d-none');
    },
    labels:{
        next: "Next",
        finish: "Next",
    },
});

// var percent = 1 / $('section.body').length * 100;
// if(numFlag < percent){
//     moveCircle(percent)
//     numFlag = percent
// }

function moveCircle(num){
    var val = 651 * num / 100;
    $('.pr-circle').attr('style', `--offset:${651-val};`);
    $('.circle-prcnt').text(num.toFixed()+"%")
}

function moveCircle2(num){
    var val = 651 * num / 100;
    $('.pr-circle2').attr('style', `--offset:${651-val};`);
    $('.circle-prcnt2').text(num.toFixed()+"%")
}

$.sum = function(arr) {
    var r = 0;
    $.each(arr, function(i, v) {
        r += +v;
    });
    return r;
}

var score = [];
var sumSc = [];

function calculateScore(){
    $('.ques').each(function(){
        var vl =  $(this).data('score');
        sumSc.push(vl);
        var vlInput = $(this).find('input:checked').val();
        var sc = vl * vlInput / 100;
        score.push(sc); 
    })
    var defScore = $.sum(sumSc);
    var sumscore = $.sum(score);
    var prcnt = sumscore / defScore * 100
    
    return prcnt;
}

// $('.tool-main-form').submit(function(e){
//     e.preventDefault();
    
//     setTimeout(() => {
//         moveCircle2(finalScore)
//         renderTxt(finalScore);
//     }, 1000);

//     $('.tool-form').remove();
//     $('.tool-success').removeClass('d-none');
// })

function renderTxt(num){
    num = num.toFixed();
    if( num < 25){
        renTx("It looks like you need help! You are a Novice", "Get best financial insights from CFO Partners to upscale your business insights");  
    }else if(num >= 26 && num <= 50){
        renTx("You are an Advanced Begineer. ", "Identify areas for improvement and create a plan for success with CFO Bridge"); 
    }else if(num >= 51 && num <= 65){
        renTx("You are Proficient. ", "Reach out to CFO Bridge for an expert guidance."); 
    }else if(num >= 65 && num <= 85){
        renTx("You are an Expert", "You are almost there, with little assistance you can become a financially sound organization. Let’s Get In Touch."); 
    }else if(num >= 86){
        renTx("You are a financially sound organization.", "Keep maintaining such high standards. If you still want to get in touch, you can always reach out to us."); 
    }else{
        renTx("Default", "Default"); 
    }
}

function renTx(text1, text2){
    // console.log("text", text1, text2, $('.succ-txt1').find('h3'))
    $('.succ-txt1').find('h3').text(text1);
    $('.succ-txt1').find('p').text(text2);
}