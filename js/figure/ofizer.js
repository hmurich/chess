class Ofizer extends Figure {
    constructor(side, x, y){
        super(side, x, y);
        this.type = 'OF';
    }
    calculateCanMove(game){
        this.game = game;
        this.can_move_cel = {};

        this.checkMoveToTopLeft(8);
        this.checkMoveToTopRight(8);
        this.checkMoveToBottomLeft(8);
        this.checkMoveToBottomRight(8);

        return this.can_move_cel;
    }

}
