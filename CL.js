CL = {
    // Temp. Implement recursive merge
	merge: function (a, b) {
        var copy = {};
        for (var prop in a) {
            copy[prop] = a[prop];
        }
        for (var prop in b) {
            copy[prop] = b[prop];
        }
        return copy;
    },

    extend: function(a, b){
    	for(var prop in b){
    		a[prop] = b[prop];
    	}
    },

    generateGuid: function () {
        var S4 = function () {
            return Math.floor(Math.random() * 0x10000).toString(16);
        };
        return (S4() + S4() + "-" +
                    S4() + "-" +
                    S4() + "-" +
                    S4() + "-" +
                    S4() + S4() + S4());
    },

    addEvent: function(element, event, fn){
        if(element.addEventListener)
            element.addEventListener(event, fn);
        else if(element.attachEvent)
            element.attachEvent('on' + event, fn);
    },

    getElementsByAttribute: function(name, value, container){
        var seachedElements = [];
        var allElements = (container || document).getElementsByTagName('*');

        for(var i = 0; i < allElements.length; i++){
            var element = allElements[i];
            if(value === undefined && element.getAttribute(name) !== undefined ||
               value !== undefined && element.getAttribute(name) === value)
                    seachedElements.push(element);
        }
        return seachedElements;
    }
}