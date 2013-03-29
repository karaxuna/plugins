(function(){
	var _mouseMovement = {
		mouseDif: { x: 0, y: 0 },
		mouseOldLoc: null,

		calculateMovement: function(e){
			if(this.mouseOldLoc){
				this.mouseDif.x = e.pageX - this.mouseOldLoc.x;
		        this.mouseDif.y = e.pageY - this.mouseOldLoc.y;
	    	} else
	    		this.mouseOldLoc = {};

	        this.mouseOldLoc.x = e.pageX;
	        this.mouseOldLoc.y = e.pageY;
		}
	}

	CL.addEvent(window, 'load', function(){
		CL.addEvent(window.document, 'mousemove', function(e){
			
			if(e.webkitMovementX != undefined && e.webkitMovementY != undefined){
				e.movementX = e.webkitMovementX;
				e.movementY = e.webkitMovementY;
			} else {
				_mouseMovement.calculateMovement(e);
				e.movementX = _mouseMovement.mouseDif.x;
				e.movementY = _mouseMovement.mouseDif.y;
			}

			window.mouse = e;
		});
	});
})();