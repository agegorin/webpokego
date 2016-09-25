import 'aframe';
import { getLocationMap, handleGeolocationQuery } from './js/getmap';
import setCameraSourceToVideoEl from './js/getcamera';

window.addEventListener('load', () => {
    const plane = document.querySelector('#plane');
    getLocationMap().then(function (image) {
        plane.setAttribute('src', image);
        plane.removeAttribute('color');
    });

    //setCameraSourceToVideoEl(document.getElementById('displayVideo'));
    setCameraSourceToVideoEl(document.getElementById('cameraVideo'));

});