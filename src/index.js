import 'aframe';
import { getLocationMap, handleGeolocationQuery } from './js/getmap';
import setCameraSourceToVideoEl from './js/getcamera';

window.addEventListener('load', () => {

    const cameraAndVideo = document.getElementById('cameraAndVideo');
    const camera = document.getElementById('camera');
    const secondCamera = document.getElementById('secondCamera');

    const cameraVideoEl = document.getElementById('cameraVideo');
    const displayVideoEl = document.getElementById('displayVideo');
    const mapPlane = document.getElementById('map');

    const pokemon = document.getElementById('pokemon');
    const pokemonAnimation = document.getElementById('pokemonAnimation');

    // mode === map
    const plane = document.querySelector('#plane');
    getLocationMap().then(function (image) {
        plane.setAttribute('src', image);
        plane.removeAttribute('color');
    });

    // mode === 'catch';
    function changeModeToCatch () {
        cameraAndVideo.setAttribute('look-controls','');
        // camera.setAttribute('active','false');
        secondCamera.setAttribute('active','true');
        displayVideoEl.setAttribute('visible', 'true');
        mapPlane.setAttribute('visible', 'false');
        pokemonAnimation.setAttribute('repeat', '0');
        setCameraSourceToVideoEl(cameraVideoEl);

        window.removeEventListener('click', changeModeToCatch);
    }

    window.addEventListener('click', changeModeToCatch);
    window.changeModeToCatch = changeModeToCatch;

});