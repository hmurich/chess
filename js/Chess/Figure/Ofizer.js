class Ofizer extends Figure {
    get type() {
        return 'OF';
    }
    calculateCanMoveCoord(){
        this.can_move_coord = {};

        this.checkMoveToTopLeft(8);
        this.checkMoveToTopRight(8);
        this.checkMoveToBottomLeft(8);
        this.checkMoveToBottomRight(8);
    }
}
