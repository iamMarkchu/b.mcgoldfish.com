webpackJsonp([15],{rLvE:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o("aA9S"),l=o.n(i),a=o("s8Ph"),r={name:"category_edit",props:["dialogFormVisible","category"],data:function(){return{visible:!1,formLabelWidth:"120px",form:{category_name:"",display_order:99}}},methods:{handleClose:function(){this.$emit("update:dialogFormVisible",!1)},handleSubmit:function(){var e=this;Object(a.c)(this.form).then(function(t){e.form=l()(e.form,t.data.content),e.$emit("updateForm",e.form),e.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3}),e.$emit("update:dialogFormVisible",!1)}).catch(function(e){console.log(e)})}},watch:{dialogFormVisible:function(e){this.visible=e},category:function(e){this.form=l()({},e)}}},n={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-dialog",{attrs:{title:"编辑类别",visible:e.visible},on:{"update:visible":function(t){e.visible=t},close:e.handleClose}},[o("el-form",{attrs:{model:e.form}},[o("el-form-item",{attrs:{label:"类别名称","label-width":e.formLabelWidth}},[o("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.category_name,callback:function(t){e.$set(e.form,"category_name",t)},expression:"form.category_name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"排序","label-width":e.formLabelWidth}},[o("el-input",{model:{value:e.form.display_order,callback:function(t){e.$set(e.form,"display_order",t)},expression:"form.display_order"}})],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("确 定")])],1)],1)},staticRenderFns:[]},s=o("/Xao")(r,n,!1,null,null,null);t.default=s.exports}});