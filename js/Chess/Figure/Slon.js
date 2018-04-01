class Slon extends Figure {
    get type() {
        return 'SL';
    }
    calculateCanMoveCoord(){
        this.can_move_coord = {};

        this.checkMoveToTop(8);
        this.checkMoveBottom(8);
        this.checkMoveLeft(8);
        this.checkMoveRight(8);
    }
}
