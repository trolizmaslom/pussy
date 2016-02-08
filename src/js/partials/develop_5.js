$(document).ready(function(){
    $('#scroll-pane').jScrollPane({showArrows: false, autoReinitialise:true,verticalDragMaxHeight:10, contentWidth: '0px', verticalDragMaxHeight:20});
     googleMap('mapInit');
});

$(window).load(function(){

});

$(window).resize(function(){

});

function googleMap(mapWrap){
    function initialize() {
        var myLatlng = new google.maps.LatLng(cordX,cordY);

        var myOptions = {
            zoom: 11,
            center: myLatlng,
            draggable: true,
            zoomControl: true,
            scrollwheel: false,
            disableDefaultUI: false, //без управляющих елементов
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControlOptions: {
               position: google.maps.ControlPosition.LEFT_BOTTOM
            }
        }
        var map = new google.maps.Map(document.getElementById(mapWrap), myOptions);

        var contentString = '<div class="marker-test">'+googleText+'</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Мы тут',
            optimized: false,
            visible: true,
            flat: true,
            icon: {
                scale: 4,
                fillColor: '#fff',
                fillOpacity: 1,
                strokeColor: '#FF3232',
                strokeWeight: 10
            },
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });

    }
    initialize();
}
