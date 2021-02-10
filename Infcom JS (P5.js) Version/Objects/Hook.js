class Hook {
    constructor(x, y, angle, direction, player) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.player = player
        this.startpoint = direction;

        this.pullAngle = null;
        this.firstCollision = false;
        this.playerGetsPulled = false

        this.twoHookMode = false;
        this.hookTwo;
        this.twoHookPull = false
        this.getMeshed = true;
        this.pullObject1;
        this.pullObject2;
        this.twoHookPullAngle;


        //for collision detection
        this.body = Bodies.circle(this.x, this.y, height / 120, {
            isStatic: true
        });
    }


    update() {
        this.x = this.body.position.x;
        this.y = this.body.position.y;


        if (this.twoHookMode) {
            this.twoHooks();
        } else if (this.playerGetsPulled) {

            this.pullAngle = atan2(this.y - player.body.position.y, this.x - player.body.position.x - this.startpoint);
            this.pullPlayer(this.pullAngle)
            player.fly = true
        } else {
            this.shoot();
        }
        this.mesh();
    }




    collidedAny(collObstacle, returnIt) {
        //collided obstacle of certain type
        for (let i = 0; i < collObstacle.length; i++) {
            let collision = Matter.SAT.collides(this.body, collObstacle[i].body);
            if (collision.collided) {
                if (returnIt == null) {
                    //if Hook Collided
                    return true;
                } else {
                    //return Collided obstacle
                    return collObstacle[i].body
                }
            }
        }
    }




    shoot() {
        //if Hook didn't collide yet
        this.x += cos(this.angle) * 10 * height / 593;
        this.y += sin(this.angle) * 10 * height / 593;
        Body.setPosition(this.body, {
            x: this.x,
            y: this.y
        });
    }







    pullPlayer(angle) {
        Body.applyForce(this.player.body, {
            x: this.player.x,
            y: this.player.y
        }, {
            x: cos(angle) * 0.035 * (height / 593),
            y: sin(angle) * 0.035 * (height / 593)
        })
    }



    //twoHook
    twoHooks() {
        //put Hook at the center of unstatic objects
        if (!this.pullObject1.isStatic) {
            Body.setPosition(this.body, this.pullObject1.position)
        }
        //if second Hook got shot yet
        if (this.hookTwo) {
            //if second Hook got shot but didn't collide yet
            if (!this.twoHookPull) {
                this.hookTwo.shoot();
                //collision of 2nd Hook
                if (this.hookTwo.collidedAny(unstatics)) {
                    this.twoHookPull = true;
                    this.pullObject2 = this.hookTwo.collidedAny(unstatics, "return")
                    shotTwice = true;
                }
                if (this.hookTwo.collidedAny(targets)) {
                    this.twoHookPull = true
                    this.pullObject2 = this.hookTwo.collidedAny(targets, "return")
                    shotTwice = true;
                }

            } 
            //2nd Hook collided (Pulling)
            else {
                let pDirect; //Direction of the pull (depending on which object got hit first, unstatic or Target)
                if (!this.pullObject2.isStatic) {
                    //put 2nd Hook at center of unstatic obstacle
                    Body.setPosition(this.hookTwo.body, this.pullObject2.position);
                    this.twoHookPullAngle = atan2(this.y - this.hookTwo.body.position.y, this.x - this.hookTwo.body.position.x);
                    pDirect = 1;
                }
                if (this.pullObject2.isStatic) {
                    //if 2nd Object is static, first object has to be unstatic -> Hook to center
                    Body.setPosition(this.body, this.pullObject1.position);
                    this.twoHookPullAngle = atan2(this.hookTwo.body.position.y - this.y, this.hookTwo.body.position.x - this.x);
                    pDirect = -1;
                }

                //pull
                Body.applyForce(this.pullObject1, this.pullObject1.position, {
                    x: -cos(this.twoHookPullAngle) * 0.02 * pDirect * (height / 593),
                    y: -sin(this.twoHookPullAngle) * 0.02 * pDirect * (height / 593)
                })
                Body.applyForce(this.pullObject2, this.pullObject2.position, {
                    x: cos(this.twoHookPullAngle) * 0.02 * pDirect * (height / 593),
                    y: sin(this.twoHookPullAngle) * 0.02 * pDirect * (height / 593)
                })
            }

            //mesh 2nd Hook 
            //But without line to player (getMeshed = false)
            this.hookTwo.mesh();

        }
    }


    mesh() {
        fill(0);
        circle(this.body.position.x, this.body.position.y, height / 60)

        if (this.twoHookMode && this.hookTwo) {
            line(this.x, this.y, this.hookTwo.body.position.x, this.hookTwo.body.position.y);
        } else if (this.getMeshed == true) {
            line(this.body.position.x, this.body.position.y, this.player.body.position.x + this.startpoint, this.player.body.position.y)
        }
    }


    delete(world) {
        World.remove(world, this.body)
        this.player.hook = null;
        this.player.fly = false

    }


}