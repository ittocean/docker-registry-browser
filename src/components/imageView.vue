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
                    <span id="pull-command">
                        {{getPullCommand()}}
                    </span>
                    <span id="pull-copy-btn" class="el-icon-document-copy" @click="copyPullCommand"/>
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
            getPullCommand() {
                return `docker pull ${this.address}/${this.selected ? this.selected.base : ''}:${this.currentTag || 'TAG'}`;
            },
            copyPullCommand() {
                const range = document.createRange();
                range.selectNode(document.getElementById('pull-command'));
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
            }
        }
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

    >>> .choosable {
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

    #pull-copy-btn {
        font-size: 20pt;
        float: right;
        margin: -3px 6px 0 0;
        cursor: pointer;
    }

    #pull-copy-btn:hover {
        color: #409EFF;
    }
</style>