class ActionShah {
    constructor(game) {
        this.game = game;
        this.is_shah = false;
    }
    check(){
        this.side = this.game.side;
        this.enemy_side = this.game.getEnemySide();

        this.king = this.game.board.getKing(this.side);

        if (this.game.board.can_move_coord[this.enemy_side][this.king.x] == undefined ||
            this.game.board.can_move_coord[this.enemy_side][this.king.x][this.king.y] == undefined){

            if (Object.keys(this.game.board.can_move_coord[this.side]).length < 1){
                this.game.pat();
                return true;
            }

            return true;
        }

        this.is_shah = true;
        this.ar_attack = this.game.board.can_move_coord[this.enemy_side][this.king.x][this.king.y];

        this.check_coord = {};
        this.run_coord = {};

        this.can_run = false;
        this.can_eat = false;
        this.can_defense = false;

        this.checkEat();
        this.checkRun();
        this.checkDefense();

        if (!this.can_run && !this.can_eat && !this.can_defense){
            this.game.mat();
            return true;
        }

        console.log(this);
    }
    checkClose(x, y, figure){
        x = parseInt(x);
        y = parseInt(y);

        console.log(x, y, figure);
        console.log(this.run_coord);
        console.log(this.check_coord);

        if (figure instanceof Korol){
            if (this.run_coord[x] == undefined && this.run_coord[x][y] == undefined)
                return false;
        }
        else if (this.check_coord[x] == undefined || this.check_coord[x][y] == undefined) {
            return false;
        }

        this.is_shah = false;
        return true;
    }

    checkRun(){
        if (Object.keys(this.king.can_move_coord).length == 0)
            return false;

        this.can_run = true;

        let before_x = this.king.x;
        let before_y = this.king.y;

        // double check for king

        for(let key in this.ar_attack){
            let attack = this.ar_attack[key];
            if (attack instanceof Peshka)
                continue;

            let x = this.king.x;
            let y = this.king.y;

            if (this.king.x == attack.x || this.king.y == attack.y){ // should defense  horizontal or vertical line
                if (this.king.x == attack.x){ // should defense  horizontal
                    if (this.king.y > attack.y) // should defense  right horizontal
                        y++;
                    else // should defense  left horizontal
                        y--;
                }
                else { // should defense  vertical
                    if (this.king.x > attack.x) // should defense  vertical top
                        x++;
                    else // should defense  vertical bottom
                        x--;
                }
            }
            else {// should defense from diagonal line
                if (this.king.x > attack.x){ // should defense  right diagonal
                    if (this.king.y > attack.y){// should defense  top right diagonal
                        y++;
                        x++;
                    }
                    else{ // should defense  bottom right diagonal
                        y--;
                        x++;
                    }
                }
                else { // should defense  left diagonal
                    if (this.king.y > attack.y){// should defense  top left diagonal
                        y++;
                        x--;
                    }
                    else{ // should defense  bottom left diagonal
                        y--;
                        x--;
                    }
                }
            }

            if (this.king.can_move_coord[x] != undefined && this.king.can_move_coord[x][y] != undefined){
                delete this.king.can_move_coord[x][y];
                if (Object.keys(this.king.can_move_coord[x]).length == 0)
                    delete this.king.can_move_coord[x];
            }

        }

        for (let x in this.king.can_move_coord){
            for (let y in this.king.can_move_coord[x]){
                if (this.run_coord[x] == undefined)
                    this.run_coord[x] = {};

                this.run_coord[x][y] = 1;
            }
        }
    }
    checkEat(){
        if (this.ar_attack.length > 1)
            return false;

        let attack = this.ar_attack[0];

        if (this.game.board.can_move_coord[this.side][attack.x] == undefined ||
            this.game.board.can_move_coord[this.side][attack.x][attack.y] == undefined){
            return false;
        }

        if (this.check_coord[attack.x] == undefined)
            this.check_coord[attack.x] = {};

        this.check_coord[attack.x][attack.y] = 1;

        this.can_eat = true;
    }
    checkDefense(){
        if (this.ar_attack.length > 1)
            return false;

        let attack = this.ar_attack[0];

        let x = parseInt(attack.x);
        let y = parseInt(attack.y);

        let max_step = Math.sqrt(Math.pow((parseInt(this.king.x) - x), 2)  + Math.pow((parseInt(this.king.y) - y), 2));
        if (max_step % 1 !== 0){
            max_step = Math.ceil(max_step / 1.414213562373095);
        }
        max_step = max_step - 1;

        for (let i = 1; i <= max_step; i++){
            if (this.king.x == attack.x || this.king.y == attack.y){ // should defense  horizontal or vertical line
                if (this.king.x == attack.x){ // should defense  horizontal
                    if (this.king.y > attack.y) // should defense  right horizontal
                        y++;
                    else // should defense  left horizontal
                        y--;
                }
                else { // should defense  vertical
                    if (this.king.x > attack.x) // should defense  vertical top
                        x++;
                    else // should defense  vertical bottom
                        x--;
                }
            }
            else {// should defense from diagonal line
                if (this.king.x > attack.x){ // should defense  right diagonal
                    if (this.king.y > attack.y){// should defense  top right diagonal
                        y++;
                        x++;
                    }
                    else{ // should defense  bottom right diagonal
                        y--;
                        x++;
                    }
                }
                else { // should defense  left diagonal
                    if (this.king.y > attack.y){// should defense  top left diagonal
                        y++;
                        x--;
                    }
                    else{ // should defense  bottom left diagonal
                        y--;
                        x--;
                    }
                }
            }



            if (this.king.x == x && this.king.y == y)
                break;

            if (this.game.board.can_move_coord[this.side][x] == undefined ||
                this.game.board.can_move_coord[this.side][x][y] == undefined){
                continue;
            }

            if (this.check_coord[x] == undefined)
                this.check_coord[x] = {};

            this.check_coord[x][y] = 1;

            this.can_defense = true;
        }


    }


}
