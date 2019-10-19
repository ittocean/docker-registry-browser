<template>
    <div>
        <el-input
                placeholder="Search for images"
                prefix-icon="el-icon-search"
                v-model="input"
                @input="changeHandler">
        </el-input>
    </div>
</template>

<script>
    export default {
        name: "repositorySearch",
        data() {
            return {
                input: ""
            }
        },
        methods: {
            changeHandler() {
                this.$emit('output', this.input);
            }
        },
        events: ['output']
    }
</script>

<style scoped>

</style>