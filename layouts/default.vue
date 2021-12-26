<template>
  <Nuxt />
</template>

<script>
export default {
    layout: 'default',
    watch: {
        $route: {
            handler () {            
                
                if(!process.server) {
                    this.$mixpanel.track("page_view", {
                        path: this.$route.path
                    })
                }
            },
            immediate: true // fires this function immediately when the object has bound to the watcher
        }
    }
}
</script>