import './styles.scss'

class ProgressBlock extends HTMLElement {
	render() {
		this.innerHTML = `
		
			<svg viewBox="0 0 36 36" class="circular-chart">
				<path
					class="circle-bg"
					d="M18 2.0845
								a 15.9155 15.9155 0 0 1 0 31.831
								a 15.9155 15.9155 0 0 1 0 -31.831"
				/>
				<path
					class="circle"
					stroke-dasharray="0, 100"
					d="M18 2.0845
								a 15.9155 15.9155 0 0 1 0 31.831
								a 15.9155 15.9155 0 0 1 0 -31.831"
				/>
			</svg>
	
	`
	}
	connectedCallback() {
		if (!this.rendered) {
			this.render()
			this.rendered = true
		}
	}
}

customElements.define('progress-block', ProgressBlock)

document.addEventListener('DOMContentLoaded', function () {
	const valueInput = document.getElementById('value')
	const animateCheckbox = document.getElementById('animate')
	const hideCheckbox = document.getElementById('hide')
	const progressBlock = document.querySelector('progress-block')
	const circle = document.querySelector('.circle')

	let animationFrameId
	let rotationDegree = 0
	let isAnimating = false

	function updateProgress(value) {
		const offset = ((100 - value) / 100) * 100
		circle.style.strokeDasharray = `${value}, 100`
	}

	function animate() {
		if (!isAnimating) return

		rotationDegree = (rotationDegree + 1) % 360
		progressBlock.style.transform = `rotate(${rotationDegree}deg)`

		animationFrameId = requestAnimationFrame(animate)
	}

	function startAnimation() {
		if (!isAnimating) {
			isAnimating = true
			// Smoothly transition into animation
			progressBlock.style.transition = 'transform 0.5s ease'
			requestAnimationFrame(() => {
				progressBlock.style.transition = ''
				animate()
			})
		}
	}

	function stopAnimation() {
		if (isAnimating) {
			isAnimating = false
			cancelAnimationFrame(animationFrameId)
			// Smoothly transition back to original position
			progressBlock.style.transition = 'transform 0.5s ease'
			progressBlock.style.transform = 'rotate(0deg)'
			setTimeout(() => {
				progressBlock.style.transition = ''
			}, 500)
		}
	}

	function toggleAnimation(isAnimated) {
		if (isAnimated) {
			startAnimation()
		} else {
			stopAnimation()
		}
	}

	function toggleVisibility(isHidden) {
		progressBlock.style.display = isHidden ? 'none' : 'block'
	}

	valueInput.addEventListener('input', function () {
		updateProgress(this.value)
	})

	animateCheckbox.addEventListener('change', function () {
		toggleAnimation(this.checked)
	})

	hideCheckbox.addEventListener('change', function () {
		toggleVisibility(this.checked)
	})

	// Initialize with default values
	updateProgress(valueInput.value)
	toggleAnimation(animateCheckbox.checked)
	toggleVisibility(hideCheckbox.checked)
})
