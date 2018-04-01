class Figure {
    constructor(side, x, y){
        this.side = side;
        this.count_move = 0;
        this.x = x;
        this.y = y;
    }
    checkMove(x, y, game){
        this.move_x = x;
        this.move_y = y;
        this.game = game;

        if (this.can_move_cel[this.move_x] == undefined || this.can_move_cel[this.move_x][this.move_y] == undefined) {
            console.error('can note move to that');
            return false;
        }

        this.initMoveCeil();

        if (this.move_ceil == null)
            this.game.action.moveFigure(this);
        else
            this.game.action.eatFigure(this, this.move_ceil);
    }
    setCanMoveCeil(x, y){
        if (this.can_move_cel[x]== undefined)
            this.can_move_cel[x] = {};

        this.can_move_cel[x][y] = 1;
    }
    initMoveCeil(){
        this.move_ceil = this.game.board['table'][parseInt(this.move_x)][parseInt(this.move_y)];
    }
    checkMoveCeil(){
        if (this.move_ceil != null && this.move_ceil.side == this.side){
            return false;
        }

        return true;
    }
    checkMoveToTop(max_step, can_eat = true){
        let y = parseInt(this.y);
        let x = parseInt(this.x)
        for (let i = 1; i <= max_step; i++){
            y++;
            if (!this.fillMoveCeil(x, y, can_eat))
                break;
        }
    }
    checkMoveBottom(max_step, can_eat = true){
        let y = parseInt(this.y);
        let x = parseInt(this.x)
        for (let i = 1; i <= max_step; i++){
            y--;
            if (!this.fillMoveCeil(x, y, can_eat))
                break;
        }
    }
    checkMoveLeft(max_step){
        let y = parseInt(this.y);
        let x = parseInt(this.x)
        for (let i = 1; i <= max_step; i++){
            x--;
            if (!this.fillMoveCeil(x, y))
                break;
        }
    }
    checkMoveRight(max_step){
        let y = parseInt(this.y);
        let x = parseInt(this.x)
        for (let i = 1; i <= max_step; i++){
            x++;
            if (!this.fillMoveCeil(x, y))
                break;
        }
    }
    checkMoveToTopLeft(max_step){
        let y = parseInt(this.y);
        let x = parseInt(this.x);
        for (let i = 1; i <= max_step; i++){
            y++;
            x--;
            if (!this.fillMoveCeil(x, y))
                break;
        }
    }
    checkMoveToTopRight(max_step){
        let y = parseInt(this.y);
        let x = parseInt(this.x)
        for (let i = 1; i <= max_step; i++){
            y++;
            x++;
            if (!this.fillMoveCeil(x, y))
                break;
        }
    }
    checkMoveToBottomLeft(max_step){
        let y = parseInt(this.y);
        let x = parseInt(this.x)
        for (let i = 1; i <= max_step; i++){
            y--;
            x--;
            if (!this.fillMoveCeil(x, y))
                break;
        }
    }
    checkMoveToBottomRight(max_step){
        let y = parseInt(this.y);
        let x = parseInt(this.x)
        for (let i = 1; i <= max_step; i++){
            y--;
            x++;
            if (!this.fillMoveCeil(x, y))
                break;
        }
    }
    fillMoveCeil(x, y, can_eat = true){
        if (y < 1 || y > 8 || x < 1 || x > 8)
            return false;

        this.move_x = x;
        this.move_y = y;
        this.initMoveCeil();

        if (this.game.board['table'][x][y] != null){
            if (!this.checkMoveCeil())
                return false;

            if (can_eat)
                this.setCanMoveCeil(x, y);

            return false;
        }
        else
            this.setCanMoveCeil(x, y);

        return true;
    }
}
