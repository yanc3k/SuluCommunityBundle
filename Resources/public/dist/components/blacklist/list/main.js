define(["jquery","underscore"],function(a,b){"use strict";return{stickyToolbar:!0,defaults:{templates:{overlayContainer:"<div/>",skeleton:'<div><div class="list-toolbar-container"/><div class="list-datagrid-container"/></div>',url:'/admin/api/blacklist-items<% if(typeof id !== "undefined") { %>/<%= id %><% } %>'},translations:{typeRequest:"community.blacklist.request",typeBlock:"community.blacklist.block"}},layout:{content:{width:"max"}},header:function(){return{noBack:!0,title:"community.blacklist.title",underline:!1,toolbar:{buttons:{add:{options:{callback:this.addHandler.bind(this)}},deleteSelected:{},"export":{options:{urlParameter:{flat:!0},url:this.templates.url()+".csv"}}}}}},initialize:function(){this.$el.html(this.templates.skeleton()),this.sandbox.sulu.initListToolbarAndList.call(this,"blacklist-items",this.templates.url({id:"fields"}),{el:this.$find(".list-toolbar-container"),template:"default",listener:"default",instanceName:"blacklist-item"},{el:this.$find(".list-datagrid-container"),url:"/admin/api/blacklist-items",resultKey:"items",searchFields:["pattern"],instanceName:"blacklist-item",viewOptions:{table:{editable:!0,editableOptions:{type:{values:{request:this.translations.typeRequest,block:this.translations.typeBlock}}}}}}),this.sandbox.on("sulu.toolbar.delete",function(){this.sandbox.emit("husky.datagrid.blacklist-item.items.get-selected",this.remove.bind(this))},this),this.sandbox.on("husky.datagrid.blacklist-item.number.selections",function(a){var b=a>0?"enable":"disable";this.sandbox.emit("husky.toolbar.header.item."+b,"deleteSelected",!1)}.bind(this))},addHandler:function(){this.sandbox.emit("husky.datagrid.blacklist-item.record.add",{id:"",pattern:"",type:"request"})},remove:function(c){a.ajax(this.templates.url(),{method:"DELETE",data:{ids:c.join(",")}}).then(function(){b.each(c,function(a){this.sandbox.emit("husky.datagrid.blacklist-item.record.remove",a)}.bind(this))}.bind(this))}}});