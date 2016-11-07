$(document).ready(function(){
    localstorage_getValue();
    buttonCLick();
    uncorrect_high_unGuarantee(); 
});


function uncorrect_high_unGuarantee(){ 
    $('.guarantee').change(function(){
        if ($('.guarantee').val() > 40) {
                $('.validation-comment6').append("<p class=\"error\">Pamiętaj, aby zagwarantować niegwaranty!</p>");    
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
    var standardPrice = $('.standardprice');
    var incorrect_flag = 0;
    var array = [occ, price, lowcompetition, highcometition, standardPrice];
    
    for(i=0; i<array.length; i++){
        console.log(i);
        var empty = array[i].val() == "";
        var notAnumber = isNaN(array[i].val());
        var negative_number = array[i].val() <0;
        var incorrect = empty || notAnumber || negative_number;
        if(incorrect){
            array = [occ, price, lowcompetition, highcometition, standardPrice];
            var result = $('.result');
            $(result).append("<p></p>");
            var incorrect_flag =+1;
            console.log("result= "+incorrect_flag);
            
            var comment = array[i];
            var komentarz =array[i] + i;
            console.log("kom: " + komentarz)
            $(comment).addClass(comment+i);
            
            switch(array[i]){
            case array[0]: $('.validation-comment1').append("<p class=\"error\">Uzupełnij dane dotyczące obłożenia</p>");
                break;
            case array[1]: $('.validation-comment2').append("<p class=\"error\">Uzupełnij dane dotyczące Twojej ceny</p>");
                break;
            case array[2]: $('.validation-comment3').append("<p class=\"error\">Uzupełnij dane dotyczące niskiej konkurencji</p>");
                break;
            case array[3]: $('.validation-comment4').append("<p class=\"error\">Uzupełnij dane dotyczące wysokiej konkurencji</p>");
                break;
            case array[4]: $('.validation-comment5').append("<p class=\"error\">Uzupełnij dane dotyczące Twojej standardowej ceny dnia</p>");
                break;
            }
        }
    }
    
    if(array[0].val() <0 || array[1].val() <0 || array[2].val() <0 || array[3].val() <0 || array[4].val() <0){
                $('.validation-comment').append("<p>Pamiętaj, że podane liczby muszą być dodatnie</p>");
        }
    
    if(incorrect_flag == 0){
        showSuggest();
        console.log("result= "+incorrect_flag);
    }
    }


function showSuggest(){
    
        occ = $('.occ').val();
        price = $('.price').val();
        lowcompetition = $('.lowcompetition').val();
        highcometition = $('.highcometition').val();
        var NonGuarantee = $('.guarantee').val();
        standardPrice = $('.standardprice').val();
        var result = $('.result');
        var highNonGuarantee = NonGuarantee > 40;
        var EUR = "<span>EUR</span>";
    
        var veryHighOcc = occ >= 85;
        var highOcc = occ >= 70 && occ < 84;
        var mediumOcc = occ >= 60 && occ < 69;
        var averageOcc = occ >= 50 && occ < 60;
        var notHighOcc = occ> 25 && occ < 50;
        var lowOcc = occ <= 25;
    
        var highcompetition_level = 80;
    
        var price_level1 = parseInt(standardPrice)-5;
        var price_level2 = parseInt(standardPrice); 
        var price_level2_1 = parseInt(standardPrice)+5; 
        var price_level3 = parseInt(standardPrice)+10; 
        var price_level4 = parseInt(standardPrice)+15; 
        
        var newprice_level1 = parseInt(lowcompetition)+5;
        var newprice_levelx2 = parseInt(highcometition)-10;
        var newprice_level2 = parseInt(highcometition);
        var newprice_level3 = parseInt(highcometition)+10;

    
    if(veryHighOcc){
        if(highcometition >= highcompetition_level){
            
            $(result).append("<p>Przy bardzo wysokim OCC wznieś się ponad konkurencję i podnieś cenę do: " + newprice_level3 + EUR +"</p>");
        }else{
            $(result).append("<p>Przy bardzo wysokim OCC podnieś cenę do:" +price_level4 + EUR + "</p>");  
        }
    }
    
    if(highOcc){
        if(highcometition >= highcompetition_level){
            $(result).append("<p>Ustaw cenę na </span>"+ newprice_level2 + EUR + "</p>");
        }else{
            $(result).append("<p>Ustaw cene na " + price_level3 + EUR + "</p>");  
        }
    }
    
    
    if(mediumOcc){
        if(highcometition > 90 && highcometition < 105){
            $(result).append("<p>Ustaw cenę na "+ newprice_levelx2 + EUR + "</p>");
        } else{
            $(result).append("<p>Ustaw cenę na "+ price_level2 + EUR + "</p>");
        }
    }
    
    if(averageOcc){
        if(highcometition >= 90 && lowcompetition >= 65) {
            $(result).append("<p>Ustaw cenę na "+ price_level3 + EUR + "</p>");
        } else if (highcometition < 90 && lowcompetition < 65) {
            $(result).append("<p>Skontaktuj się aby uzyskać pełen dostęp</p>");
            //$(result).append("<p>Ustaw cenę na </span>"+ price_level2 + "</p>");
    } else {
        $(result).append("<p>Ustaw cenę na "+ price_level2 + EUR + "</p>");
    }
    }
    
    
    if(notHighOcc){
        if(lowcompetition < price && highcometition < price){
            $(result).append("<p>Obniż cenę do " + price_level1 + "</p>");
        }else
            $(result).append("<p>Pozostań przy " + price_level2 + "</p>");
        }
    
    if(lowOcc){
        
        $(result).append("<p>Ustaw cenę na poziomie " + price_level1 + EUR + "</p>");
    }  
}
    
function localstorage_setValue(){
    guarantee = $('.guarantee').val();
    occ = $('.occ').val();
    price = $('.price').val();
    lowcompetition = $('.lowcompetition').val();
    highcometition = $('.highcometition').val();
    standardPrice = $('.standardprice').val();
    
    localStorage.setItem("gwarantowane", guarantee);
    localStorage.setItem("obłożenie", occ);
    localStorage.setItem("cena", price);
    localStorage.setItem("niska_cena_konkurencji", lowcompetition);
    localStorage.setItem("wysoka_cena_konkurencji", highcometition);
    localStorage.setItem("standardowa_cena", standardPrice);
}

function localstorage_getValue(){
    new_guarantee = localStorage.getItem("gwarantowane");
    new_occ = localStorage.getItem("obłożenie");
    new_price = localStorage.getItem("cena");
    new_lowcompetition = localStorage.getItem("niska_cena_konkurencji");
    new_highcompetition = localStorage.getItem("wysoka_cena_konkurencji");
    new_standardPrice = localStorage.getItem("standardowa_cena");
    
    $('.guarantee').val(new_guarantee);
    $('.occ').val(new_occ);
    $('.price').val(new_price);
    $('.lowcompetition').val(new_lowcompetition);
    $('.highcometition').val(new_highcompetition);
    $('.standardprice').val(new_standardPrice);
}

