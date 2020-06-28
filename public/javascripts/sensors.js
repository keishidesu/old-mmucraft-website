function get_stats() {
  $.ajax({
    type: 'get',
    url: '/sensors',
    success: function(data) {
      data = JSON.parse(data);
      $('#sensors-core0').html(data.core0);
      $('#sensors-core1').html(data.core1);
      $('#sensors-fanspeed').html(data.fanspeed);
    }
  });
}

window.addEventListener('load', function (){
  setInterval(function(){
    get_stats();
  }, 5000);
});