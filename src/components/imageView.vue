<template>
    <div>
        <el-card class="box-card" v-loading="!this.selected">
            <el-row>
                <span v-if="selected" id="selected-image-name">
                    {{selected.base}}
                </span>
            </el-row>
            <el-row>
                <div class="command-content">
                    <span>docker pull {{}}/</span>
                    <span v-if="selected">{{selected.base}}/</span>
                    <span>{{currentTag || 'TAG'}}</span>
                </div>
            </el-row>
            <el-row>
                <el-table
                        v-if="selected && selected.tags.length > 0"
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        :row-class-name="getRowClass"
                        :data="selected.tags"
                        style="width: 100%">
                    <el-table-column
                            prop="tag"
                            label="Tag"/>
                    <el-table-column
                            prop="id"
                            label="Image ID"/>
                    <el-table-column
                            prop="created"
                            label="Created"/>
                    <el-table-column
                            prop="dockerVersion"
                            label="Docker Version"/>
                </el-table>
            </el-row>
        </el-card>
    </div>
</template>

<script>

    export default {
        name: 'imageView',
        data() {
            return {
                currentTag: this.selected && this.selected.tags.length > 0 && this.selected.tags[0].tag,
                address: process.env.VUE_APP_REGISTRY_ADDRESS
            };
        },
        props: {
            selected: {
                type: Object,
                default: null
            },
        },

        methods: {
            handleCurrentChange(current) {
                this.currentTag = current ? current.tag : '';
            },
            getRowClass() {
                return 'choosable';
            },
            getImageHeader() {
                return this.selected ? `${this.selected.base.split('/')[0]}/${this.selected.base.split('/')[1]}` : '';
            },
            getPullCmd() {
                return this.selected ? `${this.selected.base.split('/')[0]}/${(this.selected.base).split('/')[1]}` : '';
            }
        },
    }
</script>

<style scoped>
    #selected-image-name {
        font-size: 18pt;
        color: #606266;
        font-weight: bolder;
    }

    .box-card {
        height: 80vh;
    }

    >>>.choosable {
        cursor: pointer;
    }

    .command-content {
        font-family: Consolas, sans-serif;
        font-size: 11pt;
        padding: 10px 0 0 5px;
        background: #d3dce6;
        border-radius: 4px;
        min-height: 28px;
    }
</style>