<template>
  <picture v-if="enteredViewport">
    <source v-for="size in sourceSizes"
      :srcset="getImageSrc(size)"
      :media="'(min-width: ' + size + 'px)'"
    >
    <img :src="getImageSrc(default)" alt="…"/>
  </picture>
  <div v-else class="spacer"></div>
</template>

<script>
export default {
	props: ['resource', 'sizes'],
	data() { … },
	mounted() { … },
	computed: {
		sourceSizes() {
			return sizes['srcset'];
		},
		default() {
			return sizes['default'];
		}
	},
	methods: {
		getImageSrc(size) {
			return this.resource.getUrl(size);
		}
	}
}
</script>
