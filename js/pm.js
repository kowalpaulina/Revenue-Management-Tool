$(document).ready(function(){
    localstorage_getValue();
    buttonCLick();
    uncorrect_high_unGuarantee(); 
});


function uncorrect_high_unGuarantee(){ 
    $('.guarantee').change(function(){
        if ($('.guarantee').val() > 40) {
                $('.validation-comment').append("<p>Zagwarantuj niegwaranty i wróć ponownie</p>");    
            }
        });
    }


function buttonCLick(){
    var button = $('.questionButton');
   
    $(button).click(function(){
        clearSuggest();
        localstorage_setValue();
        validation();      
    });
    }
  
function clearSuggest(){
    $("p").remove();
     $("span").remove();
    }


function validation(){
    
    var occ = $('.occ');
    var price = $('.price');
    var lowcompetition = $('.lowcompetition');
    var highcometition = $('.highcometition');
    var uncorrect_flag = 0;
    var array = [occ, price, lowcompetition, highcometition];
    
    for(i=0; i<array.length; i++){
        var empty = array[i].val() == "";
        var notAnumber = isNaN(array[i].val());
        var uncorrect = empty || notAnumber;
        if(uncorrect){
            var array = [occ, price, lowcompetition, highcometition];
            var result = $('.result');
            $(result).append("<p></p>");
            var uncorrect_flag = uncorrect_flag+1;
            console.log("result= "+uncorrect_flag);
            
            
            switch(array[i]){
            case array[0]: $('.validation-comment').append("<p>Uzupełnij dane dotyczące obłożenia</p>");
                break;
            case array[1]: $('.validation-comment').append("<p>Uzupełnij dane dotyczące Twojej ceny</p>");
                break;
            case array[2]: $('.validation-comment').append("<p>Uzupełnij dane dotyczące niskiej konkurencji</p>");
                break;
            case array[3]: $('.validation-comment').append("<p>Uzupełnij dane dotyczące wysokiej konkurencji</p>");
                break;
            }
            }
        }
    
    if(uncorrect_flag == 0){
        showSuggest();
        console.log("result= "+uncorrect_flag);
    }
    }


function showSuggest(){
    
        var occ = $('.occ').val();
        var price = $('.price').val();
        var lowcompetition = $('.lowcompetition').val();
        var highcometition = $('.highcometition').val();
        var NonGuarantee = $('.guarantee').val();
        var result = $('.result');
    
        var veryHighOcc = occ >= 80;
        var highOcc = occ >= 40 && occ < 80;
        var notHighOcc = occ> 25 && occ < 40;
        var lowOcc = occ <= 25;
        var highNonGuarantee = NonGuarantee > 40;
        var EUR = "<span>EUR</span>";
    
        var highcompetition_level = 80;
    
        var price_level1 = "<span>65EUR</span>"
        var price_level2 = "<span>70EUR</span>"
        var price_level3 = "<span>80EUR</span>"
        var price_level4 = "<span>85EUR</span>"

    
    if(veryHighOcc){
        if(highcometition >= highcompetition_level){
            var newprice_level1 = parseInt(highcometition)+10;
            $(result).append("<p>Przy bardzo wysokim OCC wznieś się ponad konkurencję i podnieś cenę do: " + newprice_level1 + EUR +"</p>");
        }else{
            $(result).append("<p>Przy bardzo wysokim OCC podnieś cenę do:" +price_level4 + "</p>");  
        }
    }
    
    if(highOcc){
        if(highcometition >= highcompetition_level){
            var newprice_level3 = parseInt(highcometition);
            $(result).append("<p>Ustaw cenę na </span>"+ newprice_level3 + EUR + "</p>");
        }else{
            $(result).append("<p>Ustaw cene na " + price_level3 + "</p>");  
        }
    }
    
    if(notHighOcc){
        if(lowcompetition < price && highcometition < price){
            $(result).append("<p>Obniż cenę do " + price_level1 + "</p>");
        }else
            $(result).append("<p>Pozostań przy </p>" + price_level2 + "</p>");
        }
    
    if(lowOcc){
        var newprice_level2 = parseInt(lowcompetition)+5;
        $(result).append("<p>Ustaw cenę na poziomie " + newprice_level2 + EUR + "</p>");
    }  
}
    
function localstorage_setValue(){
    var guarantee = $('.guarantee').val();
    var occ = $('.occ').val();
    var price = $('.price').val();
    var lowcompetition = $('.lowcompetition').val();
    var highcometition = $('.highcometition').val();
    
    localStorage.setItem("gwarantowane", guarantee);
    localStorage.setItem("obłożenie", occ);
    localStorage.setItem("cena", price);
    localStorage.setItem("niska_cena_konkurencji", lowcompetition);
    localStorage.setItem("wysoka_cena_konkurencji", highcometition);
}

function localstorage_getValue(){
    var new_guarantee = localStorage.getItem("gwarantowane");
    var new_occ = localStorage.getItem("obłożenie");
    var new_price = localStorage.getItem("cena");
    var new_lowcompetition = localStorage.getItem("niska_cena_konkurencji");
    var new_highcompetition = localStorage.getItem("wysoka_cena_konkurencji");
    
    $('.guarantee').val(new_guarantee);
    $('.occ').val(new_occ);
    $('.price').val(new_price);
    $('.lowcompetition').val(new_lowcompetition);
    $('.highcometition').val(new_highcompetition);
}

