window.Menu = function(options){
	var self = this;

	// Check dependencies
    if (!CL) {
        console.log('Dependent scripts not loaded');
        return false;
    }

	self.defaultOptions = {
        frame: undefined,
        datas: [
        	{ 
        		text: 'User Management',
                href: '#',
        		sub: [
        			{
        				text: 'Organization List',
        				href: 'javascript:alert("navigated");'
        			},
        			{
        				text: 'Role List',
        				href: 'javascript:alert("navigated");',
        				selected: true
        			}
        		]
        	},
        	{ 
        		text: 'System Settings',
                href: 'javascript:alert("navigated");',
        		sub: []
        	}
        ]
    };

    self.options = CL.merge(self.defaultOptions, options || {});

    // Create frame
    self.frame = self.options.frame;
    self.frame.className += ' menu-frame';

    // Create parent items
    self.frame.parentItems = [];
    for(var i = 0; i < self.options.datas.length; i++)
        self.createParentItem(self.options.datas[i]);
}

Menu.prototype.createParentItem = function(data){
    var self = this;

    var parentItem = document.createElement('div');
    parentItem.className = 'menu-item-parent';
    self.frame.parentItems.push(parentItem);
    self.frame.appendChild(parentItem);

    parentItem.link = document.createElement('a');
    parentItem.link.href = data.href;
    parentItem.link.innerHTML = data.text;
    parentItem.link.className = 'menu-item-parent-text menu-item-link';
    parentItem.appendChild(parentItem.link);

    parentItem.selectedChildText = document.createElement('div');
    parentItem.selectedChildText.className = 'menu-item-selected-child-text';
    parentItem.appendChild(parentItem.selectedChildText);

    parentItem.childrenFrame = document.createElement('div');
    parentItem.childrenFrame.className = 'menu-item-childrenFrame';
    parentItem.appendChild(parentItem.childrenFrame);

    parentItem.childItems = [];
    for(var i = 0; i < data.sub.length; i++)
        self.createChildItem(parentItem, data.sub[i], i);
}

Menu.prototype.createChildItem = function(parentItem, data, no){
    var self = this;

    var childItem = document.createElement('a');
    childItem.className = 'menu-item-child-text menu-item-link';
    childItem.innerHTML = data.text;
    childItem.href = data.href;
    childItem.setAttribute('data-no', no);

    if(data.selected)
        self.setParentItemSelected(parentItem, data, no);

    parentItem.childItems.push(childItem);
    parentItem.childrenFrame.appendChild(childItem);
}

Menu.prototype.setParentItemSelected = function(parentItem, childData, childNo){
    var self = this;

    for(var i = 0; i < self.frame.parentItems.length; i++)
        parentItem.removeAttribute('data-selected');
    parentItem.setAttribute('data-selected', childNo);
    parentItem.selectedChildText.innerHTML = childData.text;
}