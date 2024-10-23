const app = {

    config : {
        borderPixel : 1,
        colorBorderPixel : "DimGray",
        colorPixel : "#0fbcf9"
    },

    init: function() {

        app.createConfigForm();
        app.createBoard();
        app.parentElem = document.querySelector("#board");
        
    },

    createConfigForm: function() {
        // Get form with class "configuration"
        app.configElem = document.querySelector("form.configuration");

        // Input : nPixels
        app.labelInputPixelsElem = document.createElement("label");
        app.labelInputPixelsElem.setAttribute("for", "n-pixels");
        app.labelInputPixelsElem.textContent = "Nombre de pixels";

        app.configElem.appendChild(app.labelInputPixelsElem);
        
        app.inputPixelsElem = document.createElement("input");
        app.inputPixelsElem.id = "n-pixels";
        app.inputPixelsElem.name = "n-pixels";
        app.inputPixelsElem.className = "input-config";
        app.inputPixelsElem.setAttribute("placeholder", "Nombre de pixels");
        app.inputPixelsElem.setAttribute("type", "number");
        app.inputPixelsElem.setAttribute("min", 0);

        app.configElem.appendChild(app.inputPixelsElem);

        // Input : sizePixel
        app.labelInputSizePixelElem = document.createElement("label");
        app.labelInputSizePixelElem.setAttribute("for", "size-pixels");
        app.labelInputSizePixelElem.textContent = "Taille des pixels (en px)";

        app.configElem.appendChild(app.labelInputSizePixelElem);

        app.inputSizePixelElem = document.createElement("input");
        app.inputSizePixelElem.id = "size-pixel";
        app.inputSizePixelElem.name = "size-pixel";
        app.inputSizePixelElem.className = "input-config";
        app.inputSizePixelElem.setAttribute("placeholder", "Taille des pixels");
        app.inputSizePixelElem.setAttribute("type", "number");

        app.configElem.appendChild(app.inputSizePixelElem);
        
        // Button : Validate
        app.buttonConfirmElem = document.createElement("button");
        app.buttonConfirmElem.textContent = "Valider";

        app.configElem.appendChild(app.buttonConfirmElem);
        app.configElem.addEventListener("submit", app.handleChangeConfig);

        // Color selector
        app.labelColorSelectorElem = document.createElement("label");
        app.labelColorSelectorElem.setAttribute("for", "colorSelector");
        app.labelColorSelectorElem.textContent = "Couleur de pixel";

        app.configElem.appendChild(app.labelColorSelectorElem);

        app.colorSelectorElem = document.createElement("input");
        app.colorSelectorElem.id = 'colorSelector';
        app.colorSelectorElem.name = 'colorSelector';
        app.colorSelectorElem.type = 'color';
        app.colorSelectorElem.value = app.config.colorPixel;
        app.colorSelectorElem.addEventListener('change',app.handleChangeColor);

        app.configElem.appendChild(app.colorSelectorElem);

        // Export button
        app.exportButtonElem = document.createElement("button");
        app.exportButtonElem.id = "exportButton";
        app.exportButtonElem.innerHTML = '<i class="fas fa-file-export"></i> Exporter';
        app.exportButtonElem.type = "button"; // Prevent form submission
        app.exportButtonElem.addEventListener("click", app.handleExport);

        app.configElem.appendChild(app.exportButtonElem);   
    },

    createBoard: function(nPixel = 10, sizePixel = 20) {

        app.boardElem = document.querySelector("#board");

        for (let y = 0; y < nPixel; y++) {
            // Creation of one row
            app.rowElem = document.createElement("div");
            app.rowElem.className = "row";
            // nPixels per row
            for (let x = 0; x < nPixel; x++) {
                    app.pixelElem = document.createElement("div");
                    app.pixelElem.classList.add("pixel");
                    app.pixelElem.style.height = sizePixel - 2 * app.config.borderPixel + "px"; // sizePixel = content + border
                    app.pixelElem.style.width = sizePixel - 2 * app.config.borderPixel + "px";
                    app.pixelElem.style.border = `${app.config.borderPixel}px solid ${app.config.colorBorderPixel}`;
                    app.pixelElem.style.backgroundColor = app.config.colorPixel;

                    app.rowElem.appendChild(app.pixelElem);                 
                }
            app.boardElem.appendChild(app.rowElem);
        }
        app.boardElem.addEventListener("click", app.handleClickBoard);
    },

    resetPage: function() {
        // Clear form
        app.configElem = document.querySelector("form.configuration");
        app.configElem[0].value = "";
        app.configElem[1].value = "";
        // Clear board
        app.boardElem = document.querySelector("#board");
        app.boardElem.innerHTML = ""; 
    },

    handleChangeConfig: function(event) {
        event.preventDefault();
        app.config.nPixel = event.target['n-pixels'].value;
        app.config.sizePixel = event.target['size-pixel'].value;

        app.resetPage();   
        app.createBoard(app.config.nPixel, app.config.sizePixel);
    },

    handleChangeColor : function(event){
        app.config.colorPixel = event.target.value;
    },

    handleClickBoard: function(event) {
        app.pixelClickedElem = event.target;
        if(app.pixelClickedElem.classList.contains('pixel'))
            app.pixelClickedElem.style.backgroundColor = app.config.colorPixel;
    },

    handleExport: function() {
        html2canvas(app.boardElem).then(function(canvas) {
            const link = document.createElement('a');
            
            // Get current date and time
            const now = new Date();
            const dateString = now.toISOString().slice(0,19).replace(/[-:]/g, "").replace("T", "_");
            
            // Set the filename
            link.download = `pixelart_${dateString}.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    }
}  

// DOMcontentLoaded, permet d'attendre que l'html soit chargé avant de lancer le callback passé en paramètre
document.addEventListener("DOMContentLoaded", app.init);


