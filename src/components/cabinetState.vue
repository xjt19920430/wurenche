<template>
    <div>
        <h4>无人车管理</h4>
        <div class="add">
            <div class="inquire">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="无人车id">
                        <el-input size="mini"  v-model="formInline.carId"></el-input>
                    </el-form-item>
                    <el-form-item label="开合状态">
                        <el-input size="mini" v-model="formInline.boxStatus"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <vue-datepicker-local v-model="startTime" clearable format="YYYY-MM-DD HH:mm:ss"/>
                        <!--<el-input size="mini"  placeholder="格式为0000-00-00 00:00:00" v-model="formInline.startTime"></el-input>-->
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <vue-datepicker-local v-model="endTime" clearable  format="YYYY-MM-DD HH:mm:ss"/>
                        <!--<el-input size="mini"  placeholder="格式为0000-00-00 00:00:00" v-model="formInline.endTime"></el-input>-->
                    </el-form-item>
                    <el-form-item>
                        <el-button size="mini" type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-button @click="add" size="mini" type="primary">新增</el-button>
        <div class='table'>
            <el-table
                    :data="tableData"
                    height="400"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        fixed
                        label="序号"
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="carId"
                        label="无人车ID"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="boxNum"
                        label="箱柜编号"
                        >
                </el-table-column>
                <el-table-column
                        prop="boxStatus"
                        label="开合状态">
                </el-table-column>
                <el-table-column
                        prop="expressId"
                        label="派送快递ID">
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="createTime"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        prop="creator"
                        label="创建人">
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="updateTime"
                        label="修改时间">
                </el-table-column>
                <el-table-column
                        prop="updator"
                        label="修改人">
                </el-table-column>
                <el-table-column width="200px" label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage2"
                        :page-sizes="10"
                        :page-size="10"
                        layout="sizes, prev, pager, next"
                        :total="totalSize">
                </el-pagination>
            </div>

            <el-dialog title="无人车管理" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="无人车ID" :label-width="formLabelWidth">
                        <el-input v-model="form.carId" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="箱柜编号" :label-width="formLabelWidth">
                        <el-input v-model="form.boxNum" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="开合状态" :label-width="formLabelWidth">
                        <el-input v-model="form.boxStatus" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="派送快递ID" :label-width="formLabelWidth">
                        <el-input v-model="form.expressId" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间" :label-width="formLabelWidth">
                        <el-input v-model="form.createTime" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人" :label-width="formLabelWidth">
                        <el-input v-model="form.creator" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="修改时间" :label-width="formLabelWidth">
                        <el-input v-model="form.updateTime" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="修改人" :label-width="formLabelWidth">
                        <el-input v-model="form.updator" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="confirm">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import VueDatepickerLocal from 'vue-datepicker-local'
    export default {
        components:{
            VueDatepickerLocal,
        },
        data() {
            return {
                startTime:"",
                endTime:'',
                formLabelWidth:'150px',
                dialogFormVisible:false,
                tableData: [],
                form: {
                    boxNum: '',
                    boxStatus: '',
                    id: '',
                    createTime: '',
                    creator: '',
                    expressId: '',
                    updateTime: '',
                    updator: '',
                },
                type:'',
                formInline:{},
                currentPage2:0,
                totalSize:0,
                page:10
            }
        },
        methods:{
            ajaxData(data) {
                const thif = this
                thif.$_ajax('dpai-web/admin/loadAllBoxAction.action', "POST", data)
                    .then((res) => {
                        if (res.status === 200) {
                            this.tableData = res.data.date
                            this.totalSize = res.data.total*res.data.rows
                            this.tableData.forEach(function (v, i) {
                                let creatTime = v.createTime
                                let updateTime = v.updateTime
                                v.createTime = thif.$url.timeFormat(Number(creatTime));
                                if (updateTime) {
                                    v.updateTime = thif.$url.timeFormat(Number(updateTime));
                                }
                            })
                        }
                    })
            },
            handleSelectionChange(val){
                console.log(val)
            },
            handleEdit(index,row){
                this.type = '2'
                this.form = {
                    boxNum: row.boxNum,
                    boxStatus: row.boxStatus,
                    carId: row.carId,
                    id:row.id,
                    createTime: row.createTime,
                    creator: row.creator,
                    expressId: row.expressId,
                    updateTime: row.updateTime,
                    updator: row.updator
                }
                this.dialogFormVisible = true
            },
            handleDelete(index,row){
                let id = row.id
                this.$_ajax('dpai-web/admin/boxOperatorAction.action', 'POST', JSON.stringify({
                    id: id,
                    operatorType: "3"
                }))
                    .then((res) => {
                        if (res.data.success) {
                            alert('删除成功')
                            this.ajaxData()
                        }else {
                            alert('操作失败')
                        }
                    })
            },
            add(){
                this.form = {}
                this.type = '1'
                this.dialogFormVisible = true
            },
            confirm(){
                this.dialogFormVisible = false
                this.form.operatorType = this.type
                this.$_ajax('dpai-web/admin/boxOperatorAction.action', 'POST', JSON.stringify(this.form))
                    .then((res) => {

                        if (res.data.success) {
                            if (this.type === '1') {
                                alert('添加成功')
                            }
                            if (this.type === '2') {
                                alert('修改成功')
                            }
                            this.ajaxData()
                        }else {
                            alert('操作失败')
                        }
                    })
                this.form = {}
            },
            onSubmit() {
                if(this.startTime) {
                    this.formInline.startTime = this.$url.timeFormat(this.startTime);
                }
                if(this.endTime) {
                    this.formInline.endTime = this.$url.timeFormat(this.endTime);
                }
                this.ajaxData(this.formInline)
            },
            handleSizeChange(val){
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.formInline.page = val
                this.formInline.rows = this.page
                this.ajaxData(this.formInline)
            }
        },
        created() {
            this.ajaxData()
        }
    }
</script>

<style lang="scss" scoped>
    .table {
        margin-top: 10px;
    }
    .add {
        margin: 10px 10px;
    }
    .block {
        display: inline-block;
        margin-left: 50%;
        transform: translateX(-50%);
    }
</style>