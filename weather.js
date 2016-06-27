$(document).ready(function(){

  alert("Your location is: " + geoplugin_countryName() + ", " + geoplugin_region() + ", " + geoplugin_city());
// alert(geoplugin_request());

  $(".farenheit").click(function(){
    $(".celsius").removeClass("active");
    if(!$(this).hasClass("active")){
      $(this).addClass("active");
      $(".temp").html(c_to_f($(".temp").html()));
      $(".max").html(c_to_f($(".max").html()));
      $(".min").html(c_to_f($(".min").html()));
      $(".temp_sym").html("°F");
    }
  });

  $(".celsius").click(function(){
    $(".farenheit").removeClass("active");
    if(!$(this).hasClass("active")){
      $(this).addClass("active");
      $(".temp").html(f_to_c($(".temp").html()));
      $(".max").html(f_to_c($(".max").html()));
      $(".min").html(f_to_c($(".min").html()));$(".sym").html("°C");
      $(".temp_sym").html("°C");
    }
  });

  $(".button_getWeather").click(function(e){
    debugger;
    var city = $("#city_zip").val().trim();
    var jqxhr = $.getJSON( "http://api.openweathermap.org/data/2.5/weather?q="+city+"&mode=json&appid=9414f7febab7c99913a21f114cc2cdb8", function(jsondata) {
      // console.log( "success" );
      // console.log(jsondata.weather[0].description);
      debugger;
      temperature = parseFloat(jsondata.main.temp);
      city_names = city.charAt(0).toUpperCase() + city.slice(1);
      $(".city_name").html(city_names);
      $(".humid").html(jsondata.main.humidity);
      $(".wind").html(jsondata.wind.speed);
      icon = jsondata.weather[0].icon;
      $(".weather_img").attr("src","http://openweathermap.org/img/w/"+icon+".png");
      if($(".farenheit").hasClass("active")){
        // debugger;
        temperature = k_to_f(temperature);
        $(".temp").html(temperature);
        $(".temp_sym").html("°F");
      }else{
        // debugger;
        temperature = k_to_c(temperature);
        $(".temp").html(temperature);
        $(".temp_sym").html("°C");
      }
      console.log(jsondata.main.temp);
    })
    .done(function(data) {
      // return temperature;
      console.log( "second success" );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });


    var jqxhra = $.getJSON( "http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&mode=json&units=metric&cnt=1&appid=9414f7febab7c99913a21f114cc2cdb8", function(jsondata1) {
      // console.log( "success" );
      // console.log(jsondata1);
      var max_temp = parseInt(jsondata1.list[0].temp.max);
      var min_temp = parseInt(jsondata1.list[0].temp.min);
      // $(".city").html(city);
      $(".max").html(max_temp);
      $(".min").html(min_temp);
    })
    .done(function(data) {
      // console.log( "second success" );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      // console.log( "complete" );
    });

    // getMinMaxClimate();
    // if($(".farenheit").hasClass("active")){
    //   getFarenheit();
    // }else{
    //   getCelsius();
    // }
    e.preventDefault();
  });




//   e.preventDefault();
// });

  // function getFarenheit(){
  //   console.log("farenheit details");
  // }
  //
  // function getCelsius(){
  //   console.log("celsius details");
  // }
  //
  // function getCurrentClimate(){
  //   debugger;
  //

    // return temperature;
  // }
  //

  function k_to_c(value){
      return (value - 273.15).toFixed(2);
  }

  function k_to_f(value){
    return parseFloat(value * (9/5) - 459.67).toFixed(2)
  }

  function f_to_c(value){
    debugger;
    // console.log("V: "+value);
    current_temp_celsius = parseFloat(value);
    // console.log(current_temp_celsius);
    // T(°C) = (T(°F) - 32) / 1.8
    temp_f = parseFloat((current_temp_celsius-32)/1.8).toFixed(1);
    // console.log(temp_f);
    return temp_f;
  }

  function c_to_f(value){
    // console.log("V: "+value);
    current_temp_celsius = parseFloat(value);
    // console.log(current_temp_celsius);
    temp_f = parseFloat((current_temp_celsius*1.8)+32).toFixed(1);
    // console.log(temp_f);
    return temp_f;
  }
});
