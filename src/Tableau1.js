class Tableau1 extends Phaser.Scene {


    preload() {
        // carré
        this.load.image('carre', 'Asset/carre.png')
        // cercle
        this.load.image('cercle', 'Asset/cercle.png')
    }

    create() {
        this.hauteur = 500
        this.largeur = 1000

        // Barre du haut
        this.haut = this.physics.add.image(0, 0,'carre').setOrigin(0, 0);
        this.haut.setDisplaySize(this.largeur,20)
        this.haut.body.setAllowGravity(false)
        this.haut.body.setImmovable(true)
        // Barre du bas
        this.bas = this.physics.add.image(0, this.hauteur-20,'carre').setOrigin(0,0);
        this.bas.setDisplaySize(this.largeur,20)
        this.bas.body.setAllowGravity(false)
        this.bas.setImmovable(true)

        // gauche
        this.gauche = this.physics.add.image(0,180,'carre').setOrigin(0,0);
        this.gauche.setDisplaySize(20,100)
        this.gauche.setImmovable(true)

        // droite
        this.droite = this.physics.add.image(980,180,'carre').setOrigin(0,0);
        this.droite.setDisplaySize(20,100)
        this.droite.setImmovable(true)

        // Balle
        this.balle = this.physics.add.image(this.largeur/2, this.hauteur/2,'cercle').setOrigin(0,0);
        this.balle.setDisplaySize(20,20)
        this.balle.body.setBounce(1.1,1.1)
        this.balle.setVelocity(250)
        this.balle.body.setMaxVelocity(500,500)
        this.physics.add.collider(this.balle,this.bas)
        this.physics.add.collider(this.balle,this.haut)
        this.physics.add.collider(this.balle,this.gauche)
        this.physics.add.collider(this.balle,this.droite)


        this.initKeyboard();
    }



    initKeyboard() {
        let me=this;
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.A:
                    me.gauche.setVelocityY(-200)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.gauche.setVelocityY(200)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.P:
                    me.droite.setVelocityY(-200)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.droite.setVelocityY(200)
                    break;
            }
     });
        this.input.keyboard.on('keyup', function(kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.A:
                    me.gauche.setVelocityY(0)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.gauche.setVelocityY(0)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.P:
                    me.droite.setVelocityY(0)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.M:
                    me.droite.setVelocityY(0)
                    break;
            }
        });
    }

    update() {
        if(this.balle.x > this.largeur){
            this.balle.x = 0
        }
        if (this.balle.y > this.hauteur){
            this.balle.y = this.hauteur
        }

    }
}