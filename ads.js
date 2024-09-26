
  function showBanner(type)
  {
	  var data = JSON.parse(type);
	  console.log("TUK data" + data.blockId);
	  console.log("TUK data type" + data.type);
	  const BannerAdController = window.Adsgram.init({ blockId: "3491" });
	  if(BannerAdController)
	  {
		  BannerAdController.show().then((result) => {
			// user watch ad till the end
			// your code to reward user
			console.log("TUK" + result);
			console.log("TUK isDone:" + result.done);
			console.log("TUK JSON:" + JSON.stringify(result));
			console.log("TUK JSON:" + JSON.stringify(result, null, 4));
			if(unityInstanceRef)
			{
				unityInstanceRef.SendMessage("MegaADHandler", "OnRewardCompleted", JSON.stringify(data.type));
			}
			}).catch((result) => {
				// user get error during playing ad or skip ad
				// do nothing or whatever you want
				console.log("TUK false:" + result);
				if(unityInstanceRef)
				{
					unityInstanceRef.SendMessage("MegaADHandler", "OnRewardCompleted", JSON.stringify(data.type));
				}
		  })
	  }
  }
  
  function showReward(type)
  {
	  var data = JSON.parse(type);
	  console.log("TUK data" + data.blockId);
	  console.log("TUK data type" + data.type);
	  const BannerAdController = window.Adsgram.init({ blockId: "3491" });
	  if(BannerAdController)
	  {
		  BannerAdController.show().then((result) => {
			// user watch ad till the end
			// your code to reward user
			console.log("TUK" + result);
			console.log("TUK isDone:" + result.done);
			console.log("TUK JSON:" + JSON.stringify(result));
			console.log("TUK JSON:" + JSON.stringify(result, null, 4));
			if(unityInstanceRef)
			{
				unityInstanceRef.SendMessage("MegaADHandler", "OnRewardCompleted", JSON.stringify(data.type));
			}
			}).catch((result) => {
				// user get error during playing ad or skip ad
				// do nothing or whatever you want
				console.log("TUK false:" + result);
				if(unityInstanceRef)
				{
					unityInstanceRef.SendMessage("MegaADHandler", "OnRewardCompleted", JSON.stringify(data.type));
				}
		  })
	  }
  }
