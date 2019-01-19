<template>
	<img v-if="enteredViewport" :src="…" :alt="…" />
	<div v-else class="spacer">
</template>

<script>
export default {
	data() {
		return {
			enteredViewport: false
		}
	},
	mounted() {
		const io = new IntersectionObserver((entries, i) => {
			const entry = entries[0];

			if (entry.intersectionRatio > 0) {
				this.enteredViewport = true;
				io.disconnect();
			}
		});

		io.observe(this.$el);
	}
}
</script>
