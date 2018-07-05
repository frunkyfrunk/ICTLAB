<template>
    <div>
        <h3>Step 2: Select a board</h3>
        <div class="row">
            <div class="col-md-3"
            v-for="board in boards" 
            :key="board.id"
            @click="selectBoard(board, board.id)">
                <div class="panel panel-default"
                >
                    <div class="panel-body board" v-bind:style="{ 'background-image': 'url(' + board.prefs.backgroundImage + ')' }">
                        <h5>{{board.name}}</h5>
                        Last Activity
                        {{board.dateLastActivity | lastDate}}
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>
<script>
export default {
    name: "steptwo",
    data() {
        return {
            boards:[],
        }
    },
    filters: {
        lastDate(date) {
            if (date != null) {
                date = date.substring(0, 9);
                return date;
            }
        }
    },
    methods:{
        selectBoard(board, id){
            this.$emit("selectBoard", {id: board.id, board: board})
            this.$emit("updateStep", 3)
            this.$emit("updateLoading", true)
        },
        getAllBoards() {
            let $self = this;
            Trello.members.get(
                "me/boards",
                result => {
                //success
                this.boards = result;
                $self.$emit("updateLoading", false)
                },
                result => {
                //error
                alert(result);
                }
            );
        }
    },
    created(){
        this.getAllBoards()
    }
};
</script>