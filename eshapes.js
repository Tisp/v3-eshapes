// EShapes.js
//
// Based on an idea, and some lines of code, by "thetoy"
//
//   This Javascript is provided by Mike Williams
//   Blackpool Community Church Javascript Team
//   http://www.blackpoolchurch.org/
//   http://econym.org.uk/gmap/
//
//   This work is licenced under a Creative Commons Licence
//   http://creativecommons.org/licenses/by/2.0/uk/
//
// Version 0.0 04/Apr/2008 Not quite finished yet
// Version 1.0 10/Apr/2008 Initial release

// Version 1.1 port for use with Google Maps API v3 (Scott Alexander & Rob Day-Reynolds) 

google.maps.Polyline.Shape = function(point,r1,r2,r3,r4,rotation,vertexCount,colour,weight,opacity,opts,tilt) {
    var rot     = -rotation*Math.PI/180,
        points  = [],
        latConv = google.maps.geometry.spherical.computeDistanceBetween(point, new google.maps.LatLng(point.lat()+0.1, point.lng()))*10,
        lngConv = google.maps.geometry.spherical.computeDistanceBetween(point, new google.maps.LatLng(point.lat(), point.lng()+0.1))*10,
        step    = (360/vertexCount)||10,
        flop    = -1,
        I1;

    if (tilt) {
        I1=180/vertexCount;
    } else {
        I1=0;
    }
    for(var i=I1; i<=360.001+I1; i+=step) {
        var r1a = flop?r1:r3;
        var r2a = flop?r2:r4;
        flop = -1-flop;
        var y = r1a * Math.cos(i * Math.PI/180);
        var x = r2a * Math.sin(i * Math.PI/180);
        var lng = (x*Math.cos(rot)-y*Math.sin(rot))/lngConv;
        var lat = (y*Math.cos(rot)+x*Math.sin(rot))/latConv;

        points.push(new google.maps.LatLng(point.lat()+lat,point.lng()+lng));
    }

	return new google.maps.Polyline({
        path         : points,
        strokeColor  : colour,
        strokeWeight : weight,
        strokeOpacity: opacity,
    });
};

google.maps.Polyline.Circle = function(point,radius,colour,weight,opacity,opts) {
    return google.maps.Polyline.Shape(point,radius,radius,radius,radius,0,100,colour,weight,opacity,opts);
};

google.maps.Polyline.RegularPoly = function(point,radius,vertexCount,rotation,colour,weight,opacity,opts) {
    rotation = rotation||0;
    var tilt = !(vertexCount&1);
    return google.maps.Polyline.Shape(point,radius,radius,radius,radius,rotation,vertexCount,colour,weight,opacity,opts,tilt);
};

google.maps.Polyline.Star = function(point,r1,r2,points,rotation,colour,weight,opacity,opts) {
    rotation = rotation||0;
    return google.maps.Polyline.Shape(point,r1,r1,r2,r2,rotation,points*2,colour,weight,opacity,opts);
};

google.maps.Polyline.Ellipse = function(point,r1,r2,rotation,colour,weight,opacity,opts) {
    rotation = rotation||0;
    return google.maps.Polyline.Shape(point,r1,r2,r1,r2,rotation,100,colour,weight,opacity,opts);
};

google.maps.Polygon.Shape = function(point,r1,r2,r3,r4,rotation,vertexCount, strokeColour,strokeWeight,Strokepacity,fillColour,fillOpacity,opts,tilt) {
    var rot     = -rotation*Math.PI/180,
        points  = [],
        latConv = google.maps.geometry.spherical.computeDistanceBetween(point, new google.maps.LatLng(point.lat()+0.1, point.lng()))*10,
        lngConv = google.maps.geometry.spherical.computeDistanceBetween(point, new google.maps.LatLng(point.lat(), point.lng()+0.1))*10,
        step    = (360/vertexCount)||10,
        flop    = -1,
        I1;

    if (tilt) {
        I1=180/vertexCount;
    } else {
        I1=0;
    }
    for(var i=I1; i<=360.001+I1; i+=step) {
        var r1a = flop?r1:r3;
        var r2a = flop?r2:r4;
        flop = -1-flop;
        var y = r1a * Math.cos(i * Math.PI/180);
        var x = r2a * Math.sin(i * Math.PI/180);
        var lng = (x*Math.cos(rot)-y*Math.sin(rot))/lngConv;
        var lat = (y*Math.cos(rot)+x*Math.sin(rot))/latConv;

        points.push(new google.maps.LatLng(point.lat()+lat,point.lng()+lng));
    }
	return new google.maps.Polygon({
        paths: points,
        strokeColor: strokeColour,
        strokeOpacity: Strokepacity,
        strokeWeight: strokeWeight,
        fillColor: fillColour,
        fillOpacity: fillOpacity
    });
};

function EOffset(point,easting,northing) {
    var latConv = point.distanceFrom(new google.maps.LatLng(point.lat()+0.1,point.lng()))*10;
    var lngConv = point.distanceFrom(new google.maps.LatLng(point.lat(),point.lng()+0.1))*10;
    return new google.maps.LatLng(point.lat()+northing/latConv,point.lng()+easting/lngConv);
};

google.maps.Polygon.Circle = function(point,radius,strokeColour,strokeWeight,Strokepacity,fillColour,fillOpacity,opts) {
    return google.maps.Polygon.Shape(point,radius,radius,radius,radius,0,100,strokeColour,strokeWeight,Strokepacity,fillColour,fillOpacity,opts);
};

google.maps.Polygon.RegularPoly = function(point,radius,vertexCount,rotation,strokeColour,strokeWeight,Strokepacity,fillColour,fillOpacity,opts) {
    rotation = rotation||0;
    var tilt = !(vertexCount&1);
    return google.maps.Polygon.Shape(point,radius,radius,radius,radius,rotation,vertexCount,strokeColour,strokeWeight,Strokepacity,fillColour,fillOpacity,opts,tilt);
};

google.maps.Polygon.Star = function(point,r1,r2,points,rotation,strokeColour,strokeWeight,Strokepacity,fillColour,fillOpacity,opts) {
    rotation = rotation||0;
    return google.maps.Polygon.Shape(point,r1,r1,r2,r2,rotation,points*2,strokeColour,strokeWeight,Strokepacity,fillColour,fillOpacity,opts);
}

google.maps.Polygon.Ellipse = function(point,r1,r2,rotation,strokeColour,strokeWeight,Strokepacity,fillColour,fillOpacity,opts) {
    rotation = rotation||0;
    return google.maps.Polygon.Shape(point,r1,r2,r1,r2,rotation,100,strokeColour,strokeWeight,Strokepacity,fillColour,fillOpacity,opts);
}



function EOffsetBearing(point,dist,bearing) {
    var latConv = point.distanceFrom(new google.maps.LatLng(point.lat()+0.1,point.lng()))*10;
    var lngConv = point.distanceFrom(new google.maps.LatLng(point.lat(),point.lng()+0.1))*10;
    var lat=dist * Math.cos(bearing * Math.PI/180)/latConv;
    var lng=dist * Math.sin(bearing * Math.PI/180)/lngConv;
    return new google.maps.LatLng(point.lat()+lat,point.lng()+lng);
};
