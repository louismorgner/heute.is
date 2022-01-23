<template>
    <div v-if="showModal" class="fixed w-full h-full z-50 flex text-center justify-center items-center" style="background: #00000082">
        <div class="max-w-lg rounded-lg p-14" style="background:black">
            <h3 class="text-2xl mb-7 text-white">What would you like to add to your inbox?</h3>
            <input ref="inputInbox" v-model="inboxText" type="text" placeholder="Inbox item..." class="input input-bordered w-full" @keyup.enter="addInboxItem">
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            showModal: false,
            inboxText: ""
        }
    },
    mounted() {
        window.addEventListener("keydown", e => {
            if(e.metaKey && e.key === "i") {
                this.showModal = true;
                this.$nextTick(function(){
                    try {
                        this.$refs.inputInbox.focus()
                    } catch(e) {
                        console.log(e);
                    }
                });
            }
            if(e.key === "Escape") {
                this.showModal = false;
                this.inboxText = "";
            }
        });
    },
    methods: {
        addInboxItem() {
            this.$store.commit("tasks/addInbox", this.inboxText);

            this.showModal = false;
            this.inboxText = "";
        }
    }
}
</script>
