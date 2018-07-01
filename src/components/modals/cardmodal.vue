<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
        <textarea id="userInput" v-bind:value="newCardText" v-bind:style="{height: scrollHeight}" @keyup="setScrollHeight($event)" class="modal-input">
        </textarea>
        <div class="">
          Empty for score and hint
        </div>
          <div v-if="modalInfo.isNewCard == true" class="modal-footer">
            <select v-model="selectedList" name="selectedList">
              <option v-for="list in this.modalInfo.boardList" :key="list.id" :value="list.id">{{list.name}}</option>
            </select>
            <button type="button" class="btn btn-info" @click="addCard()">Add</button>
            <button type="button" class="btn btn-default" @click="$emit('close'), $emit('update')">Close</button>
          </div>
          <div class="modal-footer" v-else>
            <button type="button" class="btn btn-info" @click="updateCard(currentCard.id, newCardText)">Edit</button>
            <button type="button" class="btn btn-primary" @click="deleteCard(currentCard.id)">Delete</button>
            <button type="button" class="btn btn-default" @click="$emit('close'), $emit('update')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'cardModal',
    props: {
      currentCard: {
        type: Object,
        default: () => ({})
      },
      modalInfo: {
        type: Object,
        default: () => ({})
      }
    },
    data(){
      return{
        selectedList:"",
        newCard: true,
        scrollHeight: "",
        newCardText:"",
      }
    },
    methods: {
      addCard() {
        Trello.post(
          "/cards",
          {
            idList: this.selectedList,
            name: this.newCardText
          },
          result => {
            //success
            this.$emit('close')
            this.$emit('update')
            this.$swal({
              title: "Card successfully added to Trello",
              timer: 1000,
              type: "success",
              showConfirmButton: false,
              });
          },
          result => {
            //error
            alert("Add failed");
            console.log(result);
          }
        );
      },
      updateCard(id, text) {
        Trello.put(
          "/cards/" + id,
          { name: text },
          result => {
            //success
            this.$emit('close')
            this.$emit('update')

            this.$swal({
              title: "Card successfully updated",
              timer: 1000,
              type: "success",
              showConfirmButton: false,
              });
          },
          result => {
            //error
            alert("Update Failed");
            console.log(result);
          }
        );
      },
      deleteCard(id) {
        Trello.delete(
          "/cards/" + id,
          result => {
            //success
            this.$emit('close')
            this.$emit('update')
            this.$swal({
              title: "Card successfully deleted",
              timer: 1000,
              type: "success",
              showConfirmButton: false,
              });
          },
          result => {
            //error
            alert("Delete Failed");
            console.log(result);
          }
        );
      },
      setScrollHeight(e){
        var tx = document.getElementById('userInput');
        this.newCardText = e.srcElement.value;
        tx.style.height = 'auto';
        tx.style.height = (tx.scrollHeight) + 'px';

      }
    },
    mounted(){
      this.newCardText = this.currentCard.name;
    }
  };
</script>

<style>

.modal-input {
  height:auto;
  width:100%;
  outline: none;
  overflow-y: hidden;
  resize:none;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>