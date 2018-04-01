class Chess {
    constructor(selector){
        this.selector = selector;

        this.side = 'white';

        this.board = new Board(this);
        this.action = new Action(this);
        this.dom = new Dom(this);
        this.generator = new FigureGenerator(this);
        this.action_shah = new ActionShah(this);

        this.board.calculateCanMoveCoord();
    }
    changeSide(){
        if (this.side == 'white')
            this.side = 'black';
        else
            this.side = 'white';

        this.board.calculateCanMoveCoord();
        this.action_shah.check();
    }
    getEnemySide(){
        if (this.side == 'white')
            return 'black';
        return 'white';
    }
    mat(){
        this.mat = true;
        console.warn('mat');
        alert('MAT');
    }
    pat(){
        this.pat = true;
        console.warn('pat');
        alert('PAT');
    }
}
