(function(){

	var _movingElement;
	var _moveContainer;

	CL.addEvent(document, 'mousedown', function (e) {
		var element = e.target;
		var movingElementId;
		var moveContainerId;

	    while (element) {
	    	movingElementId = element.getAttribute('data-movingElementId');
	    	moveContainerId = element.getAttribute('data-moveContainerId');

	    	if(movingElementId && moveContainerId){
	    		_movingElement = CL.getElementsByAttribute('data-elementId', movingElementId)[0];
	    		_moveContainer = CL.getElementsByAttribute('data-elementId', moveContainerId)[0];
	    		break;
	    	}
	        element = element.parentElement;
	    }
	});

	CL.addEvent(document, 'mouseup', function (e) {
	    _movingElement = undefined;
	    _moveContainer = undefined;
	});

	CL.addEvent(document, 'mousemove', function(e){
		if (_movingElement && _moveContainer) {
        	var moveContainerWidth = _moveContainer.offsetWidth;
        	var moveContainerHeight = _moveContainer.offsetHeight;

            var left = _movingElement.offsetLeft;
            var top = _movingElement.offsetTop;
            var height = _movingElement.offsetHeight;
            var width = _movingElement.offsetWidth;

            var destinationX = left + mouse.movementX;
            var destinationY = top + mouse.movementY;

            if(destinationX > 0 && destinationX + width < moveContainerWidth)
	            _movingElement.style.left = left + mouse.movementX + 'px';
	        if(destinationY > 0 && destinationY + height < moveContainerHeight)
	            _movingElement.style.top = top + mouse.movementY + 'px';
        }
        e.preventDefault();
	});

	// ToDo: add unbind
	window.movable = {
		bind: function(movingElement, moverElement, moveContainer){

			// Check if element has unique identifier, if not, set it
			var movingElementId = movingElement.getAttribute('data-elementId') || (function(){
				var newMovingElementId = CL.generateGuid();
				movingElement.setAttribute('data-elementId', newMovingElementId);
				return newMovingElementId;
			})();

			// Set movingElementId to moverElement
			if(!moverElement.getAttribute('data-movingElementId'))
				moverElement.setAttribute('data-movingElementId', movingElementId)

			// Check if element has unique identifier, if not, set it
			var moveContainerId = moveContainer.getAttribute('data-elementId') || (function(){
				var newMoveContainerId = CL.generateGuid();
				moveContainer.setAttribute('data-elementId', newMoveContainerId);
				return newMoveContainerId;
			})();

			// Set area where it must move in
			if(!moverElement.getAttribute('data-moveContainerId'))
				moverElement.setAttribute('data-moveContainerId', moveContainerId)
		}
	}

})();