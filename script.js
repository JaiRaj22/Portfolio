window.addEventListener('load', () => {
	document.querySelectorAll('a').forEach(element => {
		element.addEventListener('mouseenter', event => {
			animateCipher(event, true)
		})
		element.addEventListener('mouseleave', event => {
			animateCipher(event, false)
		})

		if(window.matchMedia("(hover: none)").matches) {
			setInterval(() => {
				element.dispatchEvent(new MouseEvent('mouseenter'))
				element.classList.toggle('animate')
				setTimeout(() => {
					element.classList.toggle('animate')
					element.dispatchEvent(new MouseEvent('mouseleave'))
				}, 5000)
			}, 10000)
		}
	})
})

window.addEventListener('mousemove', (event) => {
	document.body.style.setProperty('--mouse-x', event.clientX + 'px')
	document.body.style.setProperty('--mouse-y', event.clientY + 'px')
})

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function animateCipher(event, isRightward) {
	const element = event.target
	if (!element) return
	const isAnimating = element.getAttribute("is-animating")
	if (!element || isAnimating == "true") return
	element.setAttribute("is-animating", "true")
	const target = element.innerText
	let iterations = 0
	if(!isRightward) iterations = target.length
	const interval = setInterval(() => { 	
		element.innerText = element.innerText.split("").map((char, index) => {
			if(isRightward && index < iterations || !isRightward && index > iterations) return target[index]
			else return alphabet[Math.floor(Math.random() * 26)]
		}).join("");
		if(iterations >= target.length && isRightward || iterations < 0 && !isRightward) {
			clearInterval(interval)
			element.setAttribute("is-animating", "false")
		}
		if(isRightward) iterations += 1 / 2
		else iterations -= 1/2
	}, 500 / target.length / 2)
}

particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});
