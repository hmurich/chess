class Dom {
    constructor(game){
        this.game = game;
        this.html = document.querySelector(game.selector);
        this.createBoard();
    }
    createBoard(){
        let y = 8;
        while (y >= 1) {
            let x = 1;
            while (x <= 8){
                this.createBoardCeil(x, y);
                x++;
            }
            y--;
        }
    }
    createBoardCeil(x, y){
        let dom_el = document.createElement("div");
        dom_el.classList.add("cell");
        if (x & 1) {
            if (y & 1)
                dom_el.classList.add("cell_white");
            else
                dom_el.classList.add("cell_black");
        } else {
            if (y & 1)
                dom_el.classList.add("cell_black");
            else
                dom_el.classList.add("cell_white");
        }

        dom_el.classList.add("x_"+x);
        dom_el.classList.add("y_"+y);
        dom_el.id = "cell_"+x+"_"+y+"";

        dom_el.dataset.x =  x;
        dom_el.dataset.y =  y;

        this.html.appendChild(dom_el);

        let action = this.game.action;
        dom_el.onclick = function(){
            action.click(this.dataset.x, this.dataset.y);
        };
    }
    setFigure(figure){
        let dom_el = document.createElement("div");
        dom_el.classList.add("figure");
        dom_el.classList.add("figure_" + figure.side);
        dom_el.classList.add("figure_type_" + figure.type);
        //dom_el.innerHTML = figure.side + '_' + figure.type;

        let ceil = this.getCeil(figure.x, figure.y);
        ceil.appendChild(dom_el);
    }
    getCeil(x, y){
        return document.querySelector('.x_'+x+'.y_'+y+'');
    }
    selectFigure(figure){
        let ceil = this.getCeil(figure.x, figure.y);
        ceil.classList.add("cell_active");
    }
    unselectFigure(figure){
        let ceil = this.getCeil(figure.x, figure.y);
        ceil.classList.remove("cell_active");
    }
    activeCanMoveCeil(figure){
        let can_move_coord = figure.can_move_coord;
        for (let x in can_move_coord) {
            for (let y in can_move_coord[x]){
                let ceil_dom = document.querySelector('.x_'+x+'.y_'+y+'');

                ceil_dom.classList.add("cell_active");
            }
        }
    }
    inactiveCanMoveCeil(){
        let ceils_dom = document.querySelectorAll(".cell_active");

        ceils_dom.forEach(function( ceil ){
            ceil.classList.remove("cell_active");
        });
    }
    moveFigure(figure, move_x, move_y){
        this.clearCeil(figure.x, figure.y);
        figure.x = parseInt(move_x);
        figure.y = parseInt(move_y);

        this.setFigure(figure);
    }
    clearCeil(x, y){
        let ceil = this.getCeil(x, y);
        let figure_dom = ceil.childNodes[0];

        ceil.removeChild(figure_dom);
    }
}
