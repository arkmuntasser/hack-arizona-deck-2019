<template>
    <a
        :href="href"
        :target="target"
        :title="title"
        :rel="rel"
    >
        <slot>read more</slot>
    </a>
</template>

<script>
export default {
    props: {
        link: {
            type: Object,
            required: true
        }
    },
    computed: {
        href() {
            return this.link.url;
        },
        target() {
            return this.link.target ? this.link.target : '_self';
        },
        title() {
            return this.link.title;
        },
        rel() {
            return this.target === '_blank' ? 'noopener' : undefined;
        }
    }
}
</script>
