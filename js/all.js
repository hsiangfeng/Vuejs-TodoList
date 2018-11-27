var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: [{
            id: '0',
            title: '範例代辦事項',
            completed: false
        }],
        cacheTodo: {},
        cacheTitle: '',
        status: 'all'
    },
    methods: {
        //新增todo
        addTodo: function () {
            //trim 去除空白
            var value = this.newTodo.trim();
            var timetamp = Math.floor(Date.now());
            if (!value) { return };
            console.log(value, timetamp);
            //使用push到陣列
            this.todoList.push({
                id: timetamp,
                title: value,
                completed: false
            })
            this.newTodo ='';
        },
        removeTodo: function (todo) {
            var newIndex = '';
            var vm = this;
            vm.todoList.forEach(function (item, key) {
                if (todo.id == item.id) {
                    newIndex = key;
                }
            })
            this.todoList.splice(newIndex, 1);
        },
        editTodo: function (item) {
            this.cacheTodo = item;
            this.cacheTitle=item.title;
        },
        canceEdit: function () {
            this.canceTodo = {}
        },
        doneEdit: function (item) {
            item.title = this.cacheTitle;
            this.cacheTitle = '';
            this.cacheTodo = {};
        },
        removeAll:function(){
            this.todoList=[];
        }
    }, computed: {
        filteredTodo: function () {
            if (this.status == 'all') {
                return this.todoList;
            } else if (this.status == 'active') {
                var newTodoList = [];
                this.todoList.forEach(function (item) {
                    if (!item.completed) {
                        newTodoList.push(item);
                    }
                });
                return newTodoList;
            } else if (this.status == 'completed') {
                var newTodoList = [];
                this.todoList.forEach(function (item) {
                    if (item.completed) {
                        newTodoList.push(item);
                    }
                });
                return newTodoList;
            }
        },
        todoListCount:function(){
            return this.todoList.length;
        }
    }
});