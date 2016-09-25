import 'aframe';
import { getLocationMap, handleGeolocationQuery } from './js/getmap';

window.addEventListener('load', () => {
    var plane = document.querySelector('#plane');
    getLocationMap().then(function (image) {
        plane.setAttribute('src', image);
        plane.removeAttribute('color');
    });
});