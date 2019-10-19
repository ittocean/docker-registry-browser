<template>
    <el-container class="main">
        <el-header>
            Registry Browser
        </el-header>
        <el-main>
            <el-col>
                <el-row>
                    <repository-search @output="filterChange"/>
                </el-row>
                <el-row>
                    <el-col :span="selected ? 12 : 24">
                        <repository-list :filter="searchFilter" @output="selectedChange"/>
                    </el-col>
                    <el-col v-show="!!selected" :span="12">
                        <image-view :selected="selected"/>
                    </el-col>
                </el-row>
            </el-col>
        </el-main>
    </el-container>
</template>

<script>
    import repositorySearch from './components/repositorySearch.vue';
    import repositoryList from './components/repositoryList.vue';
    import ImageView from "@/components/imageView";
    import imageService from './services/imageService'

    export default {
        name: 'app',
        components: {
            ImageView,
            repositoryList,
            repositorySearch
        },
        data() {
            return {
                searchFilter: "",
                selected: null
            }
        },
        methods: {
            filterChange(searchFilter) {
                this.searchFilter = searchFilter;
            },
            async selectedChange(selected) {
                this.selected = {base: selected, ...await imageService.getImageData(selected)};
            }
        }
    }
</script>

<style>
    body {
        font-family: "Helvetica Neue", sans-serif
    }

    .el-header {
        font-size: 32pt;
        color: #606266;
        font-weight: bolder;
        text-align: center;
        padding: 10px;
    }

    .repository-search {
        padding: 10px
    }

    .el-row {
        padding: 5px 0 5px 0;
    }
</style>
