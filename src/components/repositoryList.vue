<template>
    <div>
        <div class="infinite-list" v-infinite-scroll="more" infinite-scroll-distance="10px">
            <div class="infinite-list-item" :key="repo.fullName" v-for="repo in filtered" v-on:click="setSelected(repo)">
                <el-card class="box-card" v-bind:class="{marked: repo.fullName === marked}" >
                    <span class="repo-prefix">{{ repo.prefix }}</span>
                    <span class="repo-matched">{{filter}}</span>
                    <span class="repo-suffix">{{ repo.suffix }}</span>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "repositoryList",
        data() {
            return {
                marked: null,
                repositories: [],
                size: 10,
                address: process.env.VUE_APP_REGISTRY_ADDRESS
            }
        },
        props: {
            filter: {
                type: String,
                default() {
                    return "";
                }
            },
        },
        methods: {
            more() {
                this.size += 5
            },
            load() {
                const n = 100;
                let last;
                if (this.repositories.length > 0) {
                    last = this.repositories[this.repositories.length - 1].fullName;
                }
                axios
                    .get(`http://${this.address}/v2/_catalog`, {params: {n, last}})
                    .then(response => {
                        const result = response.data.repositories.map(r => {
                            return {
                                fullName: r,
                                username: r.split("/")[0],
                                imageName: r.split("/")[1]
                            }
                        });
                        this.repositories.push(...result);
                        if (response.headers.link) {
                            this.load();
                        }
                    });
            },
            setSelected(repo) {
                this.marked = this.marked !== repo.fullName ? repo.fullName : null;
                this.$emit('output', this.marked);
            }
        },
        mounted() {
            this.load();
        },
        computed: {
            filtered() {
                return this.repositories
                    .filter(r => r.fullName.includes(this.filter))
                    .map(r => {
                        return {
                            fullName: r.fullName,
                            username: r.username,
                            imageName: r.imageName,
                            prefix: r.fullName.substring(0, r.fullName.indexOf(this.filter)),
                            suffix: r.fullName.substring(r.fullName.indexOf(this.filter) + this.filter.length)
                        }
                    })
                    .slice(0, this.size);
            }
        },
        watch: {
            filter() {
                this.size = this.$el.clientHeight / 64 + 1;
            }
        },
        events: ['output']
    }
</script>

<style scoped>
    .infinite-list {
        height: 80vh;
        overflow-y: scroll;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        background: #F5F7FA;
    }

    .infinite-list-item {
        padding: 5px;
    }

    .el-card {
        cursor: pointer;
    }

    .box-card:hover {
        background: #F5F7FA;
    }

    .marked {
        background: #ECF5FF;
    }

    .repo-matched {
        background-color: #409EFF;
        color: white;
    }
</style>