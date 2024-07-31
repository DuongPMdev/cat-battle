// window.addEventListener("load", function () {
    // if ("serviceWorker" in navigator) {
      // navigator.serviceWorker.register("ServiceWorker.js");
    // }
  // });
  var unityInstanceRef;
  var unsubscribe;
  var container = document.querySelector("#unity-container");
  var canvas = document.querySelector("#unity-canvas");
  var loadingBar = document.querySelector("#unity-loading-bar");
  var progressBarFull = document.querySelector("#unity-progress-bar-full");
  var warningBanner = document.querySelector("#unity-warning");

  // Shows a temporary message banner/ribbon for a few seconds, or
  // a permanent error message on top of the canvas if type=='error'.
  // If type=='warning', a yellow highlight color is used.
  // Modify or remove this function to customize the visually presented
  // way that non-critical warnings and error messages are presented to the
  // user.
  function unityShowBanner(msg, type) {
    function updateBannerVisibility() {
      warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }
    var div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    if (type == 'error') div.style = 'background: red; padding: 10px;';
    else {
      if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
      setTimeout(function() {
        warningBanner.removeChild(div);
        updateBannerVisibility();
      }, 5000);
    }
    updateBannerVisibility();
  }

  var buildUrl = "Build";
  var loaderUrl = buildUrl + "/WebGL.loader.js";
  var config = {
    dataUrl: buildUrl + "/WebGL.data.unityweb",
    frameworkUrl: buildUrl + "/WebGL.framework.js.unityweb",
    codeUrl: buildUrl + "/WebGL.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "CatB",
    productName: "Cat Battle",
    productVersion: "1.0.3",
    showBanner: unityShowBanner,
	cacheControl: function (url) {
     return "no-store";
   },
  };

  // By default Unity keeps WebGL canvas render target size matched with
  // the DOM size of the canvas element (scaled by window.devicePixelRatio)
  // Set this to false if you want to decouple this synchronization from
  // happening inside the engine, and you would instead like to size up
  // the canvas DOM size and WebGL render target sizes yourself.
  // config.matchWebGLToCanvasSize = false;

  render();

  loadingBar.style.display = "block";

  var script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
      progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance) => {
      unityInstanceRef = unityInstance;
      loadingBar.style.display = "none";
    }).catch((message) => {
      alert(message);
    });
  };
  document.body.appendChild(script);
  
  // Resize
  function render() {
	  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
		// Mobile device style: fill the whole browser client area with the game canvas:
		var meta = document.createElement('meta');
		meta.name = 'viewport';
		meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
		document.getElementsByTagName('head')[0].appendChild(meta);
	  }
	  else{
		var ratio = 1080/2160;

		canvas.style.width  = window.innerHeight * ratio + "px";
		canvas.style.height = "100%";

		canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		canvas.width = canvas.height * ratio;
		canvas.style.position = "fixed";
		canvas.style.left = ((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / 2 - canvas.width / 2) + "px";
	  }
	};
		
	function resizeCanvas() {
	  var width = canvas.clientWidth;
	  var height = canvas.clientHeight;
	  if (canvas.width != width ||
		  canvas.height != height) {
		canvas.width = width;
		canvas.height = height;
			  
		// in this case just render when the window is resized.
		render();
	  }
	}

	window.addEventListener('resize', resizeCanvas);
