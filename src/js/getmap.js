export function getLocationMap() {
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(
            function(position){
                resolve(handleGeolocationQuery(position));
            },
            function(error){
                reject(handleErrors(error));
            }
        );
    });
}

function handleErrors(error){
    switch(error.code){
        case error.PERMISSION_DENIED: console.log('user did not share geolocation data');
            break;
        case error.POSITION_UNAVAILABLE: console.log('could not detect current position');
            break;
        case error.TIMEOUT: console.log('retrieving position timed out');
            break;
        default: console.log('unknown error');
            break;
    }
}

function getMapQuery(position, size){
    return 'https://maps.google.com/maps/api/staticmap?center=' + position.coords.latitude + ',' +
        position.coords.longitude + '&zoom=14&size=' + size + 'x' + size;
}

function handleGeolocationQuery(position){
    var size = 512;
    var google_tile = getMapQuery(position, size);

    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    var returnPromise = new Promise(function(resolve, reject){
        imageObj.onload = function(){
            context.drawImage(imageObj, 0, 0);
            resolve(canvas.toDataURL());
        }
    });
    imageObj.crossOrigin = '';
    imageObj.src = google_tile;

    return returnPromise;
}
