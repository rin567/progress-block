import './progressBlock/progressBlock.js'
import './styles.scss'

document.addEventListener('DOMContentLoaded', function () {
	const valueInput = document.getElementById('value')
	const animateCheckbox = document.getElementById('animate')
	const hideCheckbox = document.getElementById('hide')
	const progressBlock = document.querySelector('progress-block')

	valueInput.addEventListener('keypress', function (e) {
		if (!/[0-9]/.test(e.key)) {
			e.preventDefault()
		}
	})
	valueInput.addEventListener('input', function () {
		this.value = Math.min(this.value, 100)
		progressBlock.setAttribute('value', this.value)
	})

	animateCheckbox.addEventListener('change', function () {
		if (this.checked) {
			progressBlock.setAttribute('animate', '')
		} else {
			progressBlock.removeAttribute('animate')
		}
	})

	hideCheckbox.addEventListener('change', function () {
		if (this.checked) {
			progressBlock.setAttribute('hide', '')
		} else {
			progressBlock.removeAttribute('hide')
		}
	})
})
