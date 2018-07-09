<template>
    <div>
        <h4>无人车运行管理</h4>
        <div class="add">
            <div class="inquire">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="无人车ID">
                        <el-input size="mini" v-model="formInline.carId"></el-input>
                    </el-form-item>
                    <el-form-item label="位置点类型">
                        <el-input size="mini"  v-model="formInline.addressType"></el-input>
                    </el-form-item>
                    <el-form-item label="执行状态">
                        <el-input size="mini" v-model="formInline.executeStatus"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <vue-datepicker-local v-model="startTime" clearable format="YYYY-MM-DD HH:mm:ss"/>
                        <!--<el-input size="mini"  placeholder="格式为0000-00-00 00:00:00" v-model="formInline.startTime"></el-input>-->
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <vue-datepicker-local v-model="endTime" clearable  format="YYYY-MM-DD HH:mm:ss"/>
                        <!--<el-input width="100" size="mini"  placeholder="格式为0000-00-00 00:00:00" v-model="formInline.endTime"></el-input>-->
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
                    height="500"
                    :data="tableData"
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
                        fixed
                        width="180"
                        prop="id"
                        label="ID">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="carId"
                        label="无人车ID"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="boxId"
                        label="箱柜ID">
                </el-table-column>
                <el-table-column
                        prop="expressId"
                        label="快递ID">
                </el-table-column>
                <el-table-column
                        prop="addressType"
                        label="位置点类型">
                </el-table-column>
                <el-table-column
                        prop="addressName"
                        label="运行点名称">
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="arriveTime"
                        label="到达提货点时间">
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="leaveTime"
                        label="离开提货点时间">
                </el-table-column>
                <el-table-column
                        width="100"
                        prop="setterCode"
                        label="设置人编号">
                </el-table-column>
                <el-table-column
                        prop="setterTel"
                        label="设置人电话">
                </el-table-column>
                <el-table-column
                        prop="setterName"
                        label="设置人姓名">
                </el-table-column>
                <el-table-column
                        prop="executeStatus"
                        label="执行状态">
                </el-table-column>
                <el-table-column
                        prop="location"
                        label="坐标">
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
                        label="更新时间">
                </el-table-column>
                <el-table-column
                        prop="updator"
                        label="更新人">
                </el-table-column>
                <el-table-column fixed="right" width="200px" label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
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

            <el-dialog title="无人车运行管理" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item :required="true"  label="ID" :label-width="formLabelWidth">
                        <el-input placeholder="必填项" v-model="form.id" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :required="true" label="无人车ID" :label-width="formLabelWidth">
                        <el-input placeholder="必填项"  v-model="form.carId" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="箱柜ID" :label-width="formLabelWidth">
                        <el-input v-model="form.boxId" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="快递ID" :label-width="formLabelWidth">
                        <el-input v-model="form.expressId" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :required="true" label="位置点类型" :label-width="formLabelWidth">
                        <el-input placeholder="必填项" v-model="form.addressType" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :required="true" label="运行点名称" :label-width="formLabelWidth">
                        <el-input placeholder="必填项" v-model="form.addressName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="到达提货点时间" :label-width="formLabelWidth">
                        <el-input placeholder="请输入时间,格式为0000-00-00 00:00:00" v-model="form.arriveTime" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="离开提货点时间" :label-width="formLabelWidth">
                        <el-input placeholder="请输入时间,格式为0000-00-00 00:00:00" v-model="form.leaveTime" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="设置人编号" :label-width="formLabelWidth">
                        <el-input v-model="form.setterCode" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="设置人电话" :label-width="formLabelWidth">
                        <el-input v-model="form.setterTel" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="设置人姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.setterName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :required="true" label="执行状态" :label-width="formLabelWidth">
                        <el-input placeholder="必填项" v-model="form.executeStatus" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :required="true" label="坐标" :label-width="formLabelWidth">
                        <el-input placeholder="必填项" v-model="form.location" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :required="true"  label="创建时间" :label-width="formLabelWidth">
                        <el-input  placeholder="请输入时间,格式为0000-00-00 00:00:00" v-model="form.createTime" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :required="true" label="创建人" :label-width="formLabelWidth">
                        <el-input placeholder="必填项" v-model="form.creator" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="更新时间" :label-width="formLabelWidth">
                        <el-input placeholder="请输入时间,格式为0000-00-00 00:00:00" v-model="form.updateTime" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="更新人" :label-width="formLabelWidth">
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
                formLabelWidth: '150px',
                dialogFormVisible: false,
                tableData: [],
                form: {},
                type: '',
                formInline:{},
                currentPage2:0,
                totalSize:0,
                page:10

            }
        },
        methods: {
            ajaxData(data) {
                const thif = this
                thif.$_ajax('dpai-web/admin/loadAllAddressAction.action', "POST", data)
                    .then((res) => {
                        if (res.status === 200) {
                            this.tableData = res.data.date
                            if(this.tableData.index === 0){
                                return alert('没有数据')
                            }
                            this.totalSize = res.data.total*res.data.rows
                            this.tableData.forEach(function (v, i) {
                                let creatTime = v.createTime
                                let updateTime = v.updateTime
                                let arriveTime = v.arriveTime
                                let leaveTime = v.leaveTime
                                v.createTime = thif.$url.timeFormat(Number(creatTime));
                                if (updateTime) {
                                    v.updateTime = thif.$url.timeFormat(Number(updateTime));
                                }
                                if (arriveTime) {
                                    v.arriveTime = thif.$url.timeFormat(Number(arriveTime));
                                }
                                if (leaveTime) {
                                    v.leaveTime = thif.$url.timeFormat(Number(leaveTime));
                                }
                            })
                        }
                    })
            },
            handleSelectionChange(val) {
                console.log(val)
            },
            handleEdit(index, row) {
                this.type = '2'
                this.form = {
                    addressName: row.addressName,
                    addressType: row.addressType,
                    arriveTime: row.arriveTime,
                    boxId: row.boxId,
                    carId: row.carId,
                    id: row.id,
                    createTime: row.createTime,
                    creator: row.creator,
                    executeStatus: row.executeStatus,
                    expressId: row.expressId,
                    leaveTime: row.leaveTime,
                    location: row.location,
                    setterCode: row.setterCode,
                    setterName: row.setterName,
                    setterTel: row.setterTel,
                    updateTime: row.updateTime,
                    updator: row.updator,
                }
                this.dialogFormVisible = true
            },
            handleDelete(index, row) {
                let id = row.id
                this.$_ajax('dpai-web/admin/addressOperatorAction.action', 'POST', JSON.stringify({
                    id: id,
                    operatorType: "3"
                }))
                    .then((res) => {
                        if (res.data.success) {
                            alert('删除成功')
                            this.ajaxData()
                        }
                    })
            },
            add() {
                this.form = {}
                this.type = "1"
                this.dialogFormVisible = true
            },
            confirm() {
                this.dialogFormVisible = false
                this.form.operatorType = this.type
                this.$_ajax('dpai-web/admin/addressOperatorAction.action', 'POST', JSON.stringify(this.form))
                    .then((res) => {

                        if (res.data.success) {
                            if (this.type === '1') {
                                alert('添加成功')
                            }
                            if (this.type === '2') {
                                alert('修改成功')
                            }
                            this.ajaxData()
                        } else {
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
    .demo-form-inline {
        font-size: 0;
    }
    .block {
        display: inline-block;
        margin-left: 50%;
        transform: translateX(-50%);
    }
</style>