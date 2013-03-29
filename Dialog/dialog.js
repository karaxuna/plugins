(function() {

    var _defaultOptions = {
        parent: undefined,
        title: 'Default title',
        html: '<div style="width: 300px; height: 300px; margin-left: 10px;"> <h2>This is default header</h2> <p> This is default paragraph </p> </div>',
        culture: 'en-us',
        modal: false,
        resizable: false,
        movable: true
    };

    var _resources = {
        'en-us': {
            buttonConfirmText: 'OK'
        },
        'ka-ge': {
            buttonConfirmText: 'დადასტურება'
        }
    };

    // Preload image
    (new Image).src = './Dialog/dialog-icons.png';

    var Dialog = window.Dialog = function(options) {
        // Check dependencies
        if (!CL || !Resizable) {
            console.log('Dependent scripts not loaded');
            return false;
        }

        var self = this;
        options = self.options = CL.merge(_defaultOptions, options || { });
        var resources = _resources[options.culture];
        var resizeBorder = self.resizeBorder = {};

        // Dynamic properties
        self.resizable = options.resizable;
        self.modal = options.modal;

        // Create parent
        var parent = self.parent = options.parent || document.body;

        // Create modal background
        var modalBackground = self.modalBackground = document.createElement('div');
        modalBackground.className = 'dialog-modalBackground';
        self.setModal(options.modal);
        parent.appendChild(modalBackground);

        // Create outer frame
        var frameOuter;
        frameOuter = self.frameOuter = document.createElement('div');
        frameOuter.className = 'dialog-frameOuter';
        parent.appendChild(frameOuter);

        // Create top left resizeBorder
        var resizeBorderTopLeft = self.resizeBorder['TopLeft'] = document.createElement('div');
        resizeBorderTopLeft.className = 'dialog-resizeBorder dialog-resizeBorderTopLeft';
        frameOuter.appendChild(resizeBorderTopLeft);

        // Create top resizeBorder
        var resizeBorderTop = self.resizeBorder['Top'] = document.createElement('div');
        resizeBorderTop.className = 'dialog-resizeBorder dialog-resizeBorderTop';
        frameOuter.appendChild(resizeBorderTop);

        // Create top right resizeBorder
        var resizeBorderTopRight = self.resizeBorder['TopRight'] = document.createElement('div');
        resizeBorderTopRight.className = 'dialog-resizeBorder dialog-resizeBorderTopRight';
        frameOuter.appendChild(resizeBorderTopRight);

        // Create left resizeBorder
        var resizeBorderLeft = self.resizeBorder['Left'] = document.createElement('div');
        resizeBorderLeft.className = 'dialog-resizeBorder dialog-resizeBorderLeft';
        frameOuter.appendChild(resizeBorderLeft);

        // Create inner frame
        var frameInner;
        frameInner = self.frameInner = document.createElement('div');
        frameInner.className = 'dialog-frameInner';
        frameOuter.appendChild(frameInner);

        // Create header
        var header = self.header = document.createElement('div');
        header.className = 'dialog-header';
        frameInner.appendChild(header);

        // Create title
        var title = self.title = document.createElement('div');
        title.className = 'dialog-title';
        self.setTitle(options.title);
        header.appendChild(title);

        // Create title
        var buttons = self.buttons = document.createElement('div');
        buttons.className = 'dialog-buttons';
        header.appendChild(buttons);

        // Create close button
        var buttonClose = self.buttonClose = document.createElement('input');
        CL.addEvent(buttonClose, 'click', function() { self.remove.call(self); });
        buttonClose.type = 'button';
        buttonClose.className = 'dialog-button-close';
        buttons.appendChild(buttonClose);

        // Create body
        var body = self.body = document.createElement('div');
        body.className = 'dialog-body';
        self.setHtml(options.html);
        frameInner.appendChild(body);

        // Create right resizeBorder
        var resizeBorderRight = self.resizeBorder['Right'] = document.createElement('div');
        resizeBorderRight.className = 'dialog-resizeBorder dialog-resizeBorderRight';
        frameOuter.appendChild(resizeBorderRight);

        // Create bottom left resizeBorder
        var resizeBorderBottomLeft = self.resizeBorder['BottomLeft'] = document.createElement('div');
        resizeBorderBottomLeft.className = 'dialog-resizeBorder dialog-resizeBorderBottomLeft';
        frameOuter.appendChild(resizeBorderBottomLeft);

        // Create bottom resizeBorder
        var resizeBorderBottom = self.resizeBorder['Bottom'] = document.createElement('div');
        resizeBorderBottom.className = 'dialog-resizeBorder dialog-resizeBorderBottom';
        frameOuter.appendChild(resizeBorderBottom);

        // Create bottom right resizeBorder
        var resizeBorderBottomRight = self.resizeBorder['BottomRight'] = document.createElement('div');
        resizeBorderBottomRight.className = 'dialog-resizeBorder dialog-resizeBorderBottomRight';
        frameOuter.appendChild(resizeBorderBottomRight);

        // Set resizing
        //Resizable.bind(self.resizeBorder, self.body);
        self.setResizable(options.resizable);

        // Set movable
        self.setMovable(options.movable);
    };

    Dialog.prototype.setType = function(type) {
        var self = this;
        var icon = self.icon;
        icon.className = 'dialog-icon dialog-icon-' + type;
        self.type = type;
    };

    Dialog.prototype.setHtml = function(html) {
        var self = this;
        self.body.innerHTML = html;
    };

    Dialog.prototype.setTitle = function(title) {
        var self = this;
        self.title.innerHTML = title;
    };

    Dialog.prototype.remove = function() {
        var self = this;
        self.parent.removeChild(self.frameOuter);
    };

    Dialog.prototype.setResizable = function(value){
        var self = this;
        var resizeBorder = self.resizeBorder;
        for(var corner in resizeBorder)
            resizeBorder[corner].style.display = (value? 'block' : 'none');
        self.resizable = value;
    }

    Dialog.prototype.setMovable = function(value){
        var self = this;
        if(value)
            movable.bind(self.frameOuter, self.header, self.parent);
        else
            movable.unbind(self.frameOuter, self.header, self.parent);
        self.movable = value;
    }

    Dialog.prototype.setModal = function(value){
        var self = this;
        self.modalBackground.style.display = (value? 'block' : 'none');
        self.modal = value;
    }
})();