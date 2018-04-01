class Action {
    constructor (game) {
        this.game = game;
        this.x = false;
        this.y = false;

        this.selected_figure_x = false;
        this.selected_figure_y = false;

    }
    click (x, y){
        this.x = x;
        this.y = y;

        let click_ceil = this.game.board.click_ceil;
        let selected_ceil = this.game.board.selected_figure;

        if (selected_ceil == null){ // невыбрана фигуру
            if (click_ceil != null && this.game.side == click_ceil.side){ // выбрать фигуру
                // селект фигуры
                this.selected_figure_x = this.x;
                this.selected_figure_y = this.y;
                this.game.dom.selectFigure(click_ceil);

                // селект возможных клеток
                this.game.dom.activeCanMoveCeil(click_ceil);

                console.warn('выбрать фигуру');
            }
        }
        else {
            if (selected_ceil === click_ceil){ // отозвать фигуру
                this.selected_figure_x = false;
                this.selected_figure_y = false;
                this.game.dom.unselectFigure(click_ceil);

                // unselect возможных клеток
                this.game.dom.inactiveCanMoveCeil();

                console.warn('отозвать фигуру');
            }
            else { // ходить фигуру
                this.move();
                console.warn('ходить фигуру');
            }
        }
    }

    eat(){
        this.game.dom.clearCeil(this.x, this.y);
        this.game.board.clearCeil(this.x, this.y);
    }
    move(){
        let click_ceil = this.game.board.click_ceil;
        let figure = this.game.board.selected_figure;

        if (this.game.action_shah.is_shah && !this.game.action_shah.checkClose(this.x, this.y, figure)){
            console.warn('can`t shah note close');
            return false;
        }


        if (figure.can_move_coord[this.x] == undefined || figure.can_move_coord[this.x][this.y] == undefined) {
            console.error('can note move to that');
            return false;
        }

        if (click_ceil != null)
            this.eat();

        figure.count_move++;

        // figure move
        this.game.board.moveFigure(figure, this.x, this.y);
        this.game.dom.moveFigure(figure, this.x, this.y);

        this.selected_figure_x = false;
        this.selected_figure_y = false;

        if (figure instanceof Peshka && (parseInt(this.y) == 8 || parseInt(this.y) == 0))
            this.modifyPeshka(figure);

        this.game.changeSide();

        // unselect возможных клеток
        this.game.dom.inactiveCanMoveCeil();
    }

    modifyPeshka(figure){
        let x = figure.x;
        let y = figure.y;
        let side = figure.side;
        let type = prompt('Для ферзя нажмите 1, для слона 2, для офицера 3 или будет выбран конь', 1);

        this.eat();
        this.game.generator.generateFromPeshka(x, y, side, type);
        //console.log(result);

    }
}
