;var map=(function(locations){
    var mapCenter={lat: 37.7411277794, lng: -122.4192810059};
    //var mapCenter={ lat:37.8036031,lng:-122.2723818};
    var markers=[];
    var map;

    var defaultIcon,selectedIcon,highlightedIcon;
    /**
     * map initial function
     */
    var initMap=function() { 
        // Create a map object and specify the DOM element for display.
        map = new google.maps.Map(document.getElementById('map'), {
            center: mapCenter,
            zoom: 11
        }); 

        // Style the markers a bit. This will be our listing marker icon.
        defaultIcon = makeMarkerIcon('0091ff');
        selectedIcon = makeMarkerIcon('FF0000');
        // Create a "highlighted location" marker color for when the user
        // mouses over the marker.
        highlightedIcon = makeMarkerIcon('FFFF24');
        
        locations.forEach( item => {
            // Get the position from the location array.
            // var position = locations[i].location;
            // var title = locations[i].title;

            const {location,title,id}=item;
            // Create a marker per location, and put into markers array.
            var marker = new google.maps.Marker({
                position: location,
                title: title,
                animation: google.maps.Animation.DROP,
                icon: defaultIcon,
                id: id
            });
            // Push the marker to our array of markers.
            markers.push(marker);
            // Create an onclick event to open the large infowindow at each marker.
            marker.addListener('click', function() {
                populateInfoWindow(this, largeInfowindow);
            });
            // Two event listeners - one for mouseover, one for mouseout,
            // to change the colors back and forth.
            marker.addListener('mouseover', function() {  
                this.lastIcon=this.getIcon();
                highlightMarker(this);
            });
            marker.addListener('mouseout', function() {  
                setMarkerIcon(this,this.lastIcon);
            });

            
        });

        showMarkers(markers);
    }

    /**
     * refesh the locations on map
     * @param {*} locations 
     */
    var refresh=function(locations){  
        hideMarkers(markers);
        showMarkers(markers.filter(item=> {
            return locations.findIndex(loc=>loc.id===item.id)>=0
        }));
    }

    var selected=function(location){ 
        markers.forEach(t=> defaultedMarker(t));
        selectedMarker(markers.find(item=>item.id===location.id))
    }

    // This function takes in a COLOR, and then creates a new marker
    // icon of that color. The icon will be 21 px wide by 34 high, have an origin
    // of 0, 0 and be anchored at 10, 34).
    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21,34));
        return markerImage;
    }

    function hideMarkers(localMarkers) {
        localMarkers.forEach(item=>item.setMap(null));
    } 

    function showMarkers(localMarkers) {
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        localMarkers.forEach(item=>{
            item.setMap(map);
            bounds.extend(item.position);
        });
        map.fitBounds(bounds);
    }

    /* ================================== */
    /**
     *  change marker's icon
     */
    var selectedMarker=function(marker){
        setMarkerIcon(marker,selectedIcon);
    }
    var highlightMarker=function(marker){ 
        setMarkerIcon(marker,highlightedIcon);
    }
    var defaultedMarker=function(marker){
        setMarkerIcon(marker,defaultIcon);
    }
    var setMarkerIcon=function(marker,icon){ 
        marker && marker.setIcon(icon);
    }
    /* ================================== */

    return {
        initMap,
        refresh,
        selected 
    }
})(locations);