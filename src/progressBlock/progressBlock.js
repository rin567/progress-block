import './progressBlock.scss'

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
	static get observedAttributes() {
		return ['value', 'animate', 'hide']
	}

	attributeChangedCallback(name, oldValue, newValue) {
		const circle = document.querySelector('.circle')
		switch (name) {
			case 'value':
				let value = newValue
				if (!newValue) {
					value = 0
				}
				circle.style.strokeDasharray = `${value}, 100`
				break
			case 'hide':
				this.style.display = newValue === '' ? 'none' : 'block'
				break
			case 'animate':
				circle.classList.toggle('animate')
				break
		}
	}
}

customElements.define('progress-block', ProgressBlock)
