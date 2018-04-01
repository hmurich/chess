class Kon extends Figure {
    get type() {
        return 'K';
    }
    calculateCanMoveCoord(){
        this.can_move_coord = {};

        let y = parseInt(this.y);
        let x = parseInt(this.x);
        let let_x = 0;
        let let_y = 0;

        // bottom left
        let_x = x - 2;
        let_y = y - 1;
        this.addMoveCoord(let_x, let_y);
        let_x = x - 1;
        let_y = y - 2;
        this.addMoveCoord(let_x, let_y);

        // top left
        let_x = x - 2;
        let_y = y + 1;
        this.addMoveCoord(let_x, let_y);
        let_x = x - 1;
        let_y = y + 2;
        this.addMoveCoord(let_x, let_y);

        // top right
        let_x = x + 2;
        let_y = y + 1;
        this.addMoveCoord(let_x, let_y);
        let_x = x + 1;
        let_y = y + 2;
        this.addMoveCoord(let_x, let_y);

        // bottom right
        let_x = x + 2;
        let_y = y - 1;
        this.addMoveCoord(let_x, let_y);
        let_x = x + 1;
        let_y = y - 2;
        this.addMoveCoord(let_x, let_y);
    }
}
