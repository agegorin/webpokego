export default function setCameraSourceToVideoEl(videoEl) {
    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && navigator.mediaDevices.enumerateDevices) {

        let noRearCamera = true;
        navigator.mediaDevices.enumerateDevices()
            .then(function (devices) {
                devices.forEach(function (device) {
                    console.log(device.kind, ": ", device.label +
                        " id = " + device.deviceId);
                    if (device.kind === 'videoinput' && device.label.match(/back/)) {
                        noRearCamera = false;
                        navigator.mediaDevices.getUserMedia({
                            video: {
                                width: 720,
                                height: 1280,
                                deviceId: device.deviceId
                            }
                        }).then(function (stream) {
                            videoEl.src = window.URL.createObjectURL(stream);
                        });
                    }
                });
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });

        if (noRearCamera) {
            navigator.mediaDevices.getUserMedia({
                video: {
                    width: 720,
                    height: 1280,
                    facingMode: "environment"
                }
            }).then(function (stream) {
                videoEl.src = window.URL.createObjectURL(stream);
            });
        }
    } else {
        console.log('No mediaDevices.getUserMedia method. No camera access :(');
    }
}