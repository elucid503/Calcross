function Particle(pos) {
	
	this.pos = pos || createVector(random(width), random(height));
	this.xV = random(-6,6);
	this.yV = random(-6,6);
	this.r = 5;

	this.offCanvas = false;

	this.update = function() {
		if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
			this.offCanvas = true;
		}
		this.pos.x += this.xV;
		this.pos.y += this.yV;
	};
}

var particles = [];
var shade;
var shadeMulti = 1;

function setup() {
	
	createCanvas(windowWidth, windowHeight);

	shade = Math.floor(random(0,100));

	for (i = 0; i < 50; i++) {
		var angle = Math.random() * 360;
		var newVec = createVector(windowWidth * 0.5 + (cos(angle) * windowWidth/8), windowHeight * 0.5 - (sin(angle) * windowWidth/8));
		particles.push(new Particle(newVec));
	}

	setTimeout(function() {
		for (i = 0; i < 100; i++) {
			var angle = Math.random() * 360;
			var newVec = createVector(windowWidth * 0.5 + (cos(angle) * windowWidth/4), windowHeight * 0.5 - (sin(angle) * windowWidth/4));
			particles.push(new Particle(newVec));
		}
	}, 2000);
}

function mouseDragged() {
	particles.push(new Particle(createVector(mouseX, mouseY)));
}

function draw() {
	if (255 <= shade) {
		shadeMulti = -1;
	} else if (0 >= shade) {
		shadeMulti = 1;
	}

	shade += shadeMulti;

	for (var i = particles.length-1; i >= 0; i--) {
		if (!particles[i].offCanvas) {
			for (var j = particles.length-1; j >= 0; j--) {
				if (particles[i] !== particles[j]) {
					var d = dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
					if (d < 100) {
						var strokeColour = color(shade, d/2);
						stroke(strokeColour);
						line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
					}
				}
			}

			particles[i].update();
		} else {
			particles.splice(i, 1);
		}
	}
}

function Buttons() { 

	gsap.registerPlugin(Physics2DPlugin);

document.querySelectorAll('.button').forEach(button => {

    const bounding = button.getBoundingClientRect()

    button.addEventListener('mousemove', e => {

        let dy = (e.clientY - bounding.top - bounding.height / 2) / -1
        let dx = (e.clientX - bounding.left - bounding.width / 2)  / 10

        dy = dy > 10 ? 10 : (dy < -10 ? -10 : dy);
        dx = dx > 4 ? 4 : (dx < -4 ? -4 : dx);

        button.style.setProperty('--rx', dy);
        button.style.setProperty('--ry', dx);

    });

    button.addEventListener('mouseleave', e => {

        button.style.setProperty('--rx', 0)
        button.style.setProperty('--ry', 0)

    });

    button.addEventListener('click', e => {
        button.classList.add('success');
        gsap.to(button, {
            '--icon-x': -3,
            '--icon-y': 3,
            '--z-before': 0,
            duration: .2,
            onComplete() {
                particles(button.querySelector('.emitter'), 100, -4, 6, -80, -50);
                gsap.to(button, {
                    '--icon-x': 0,
                    '--icon-y': 0,
                    '--z-before': -6,
                    duration: 1,
                    ease: 'elastic.out(1, .5)',
                    onComplete() {
                        button.classList.remove('success');
                    }
                });
            }
        });
    });

});

function particles(parent, quantity, x, y, minAngle, maxAngle) {
    let colors = [
        '#FFFF04',
        '#EA4C89',
        '#892AB8',
        '#4AF2FD',
    ];
    for(let i = quantity - 1; i >= 0; i--) {
        let angle = gsap.utils.random(minAngle, maxAngle),
            velocity = gsap.utils.random(70, 140),
            dot = document.createElement('div');
        dot.style.setProperty('--b', colors[Math.floor(gsap.utils.random(0, 4))]);
        parent.appendChild(dot);
        gsap.set(dot, {
            opacity: 0,
            x: x,
            y: y,
            scale: gsap.utils.random(.4, .7)
        });
        gsap.timeline({
            onComplete() {
                dot.remove();
            }
        }).to(dot, {
            duration: .05,
            opacity: 1
        }, 0).to(dot, {
            duration: 1.8,
            rotationX: `-=${gsap.utils.random(720, 1440)}`,
            rotationZ: `+=${gsap.utils.random(720, 1440)}`,
            physics2D: {
                angle: angle,
                velocity: velocity,
                gravity: 120
            }
        }, 0).to(dot, {
            duration: 1,
            opacity: 0
        }, .8);
    }
}

}