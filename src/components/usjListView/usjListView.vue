<template>
  <div class="usj-list-view" :class="[listActionsClass]">
    <slot></slot>
  </div>
</template>
<script>
const LIST_CLASS = 'usj-list-view-list'
const LIST_ACTIONS_CLASS = 'usj-list-actions'
const DETAILS_CLASS = 'usj-list-view-details'
const DETAILS_ACTIONS_CLASS = 'usj-details-actions'

export default {
  props: ['usjItems'],
  data() {
    return {
      listActionComponent: null,
      listComponent: null,
      detailsComponent: null
    }
  },
  mounted() {
    this.listComponent = this.$children.filter(child =>
      child.$el.classList.contains(LIST_CLASS)
    )[0]
    this.detailsComponent = this.$children.filter(child =>
      child.$el.classList.contains(DETAILS_CLASS)
    )[0]

    this.listActionComponent = this.$el.querySelectorAll(
      '.' + LIST_ACTIONS_CLASS
    )[0]
    this.detailsActionComponent = this.$el.querySelectorAll(
      '.' + DETAILS_ACTIONS_CLASS
    )[0]

    // add only <usj-list-actions> exists
    if (this.listActionComponent)
      this.listComponent.setBottomEl(this.listActionComponent)

    // add only <usj-details-actions> exists
    if (this.detailsActionComponent)
      this.detailsComponent.setBottomEl(this.detailsActionComponent)

    this.updateItems()
  },
  methods: {
    updateItems() {
      this.listComponent.items = this.usjItems || new Array(5)
    }
  },
  watch: {
    usjItems: function() {
      this.updateItems()
    }
  },
  computed: {
    listActionsClass: function() {
      return {
        'usj-list-view--has-list-actions': this.listActionComponent
      }
    }
  }
}
</script>
<style lang="scss">
  $placeholder-bg: rgba(0, 0, 0, .1);
  $item-hover-bg: #10253D;
  $border-color: rgba(135, 175, 195, .3);
  $scrollbar-width: 17px;
  $list-width: 300px;
  $bottom-background: #405974;
  $bottom-details-height: 66px;
  $bottom-list-height: 112px;

  .usj-list-view {
    $b: &;

    position: relative;
    height:100%;
    width:100%;

    &__list-wrapper {
      border-right: 1px $border-color solid;

      width: $list-width + $scrollbar-width;

      position:absolute;
      top:0;bottom:0;right:0;left:0;
      overflow-y:auto;

      > ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
    }

    &__details {
      //margin-left: $list-width;
      background:#F4F4F4;
      //width: 100%;

      position:absolute;
      top:0;bottom:0;right:0;left:$list-width;
      overflow-y:auto;
    }

    &__details-inner {
      overflow-y: auto;
      //padding: 10px;
    }

    &--has-list-actions {
      #{$b}__list-wrapper {
        bottom:75px;
      }

      #{$b}__list-bottom {
        height: $bottom-list-height;
        width: $list-width;
        bottom: 0;
        position: absolute;
        background:$bottom-background;
      }

      #{$b}__details-inner {
        position: absolute;
        bottom:$bottom-details-height;
        left: 0;
        right: 0;
        top: 0;
        overflow-y:auto;
      }

      #{$b}__details-bottom {
        height: $bottom-details-height;
        width: 100%;
        bottom: 0;
        position: absolute;
        paddding-right:30px;
        text-align:right;
        box-shadow: 0 -1px 10px 0 rgba(0, 0, 0, .2);
      }

      .usj-list-actions, .usj-details-actions {
        position: relative;
        margin-top: 6px;
      }
    }
  }

  .usj-list-view-item {
    border-bottom: 1px $border-color solid;
    cursor: pointer;
    min-height: 68px;
    padding: 10px 10px 10px 20px;
    transition-duration: .2s;
    transition-property: background-color;

    &:hover {
      background: $item-hover-bg;
    }

    &__line1 {
      margin: 0;

      &--placeholder {
        background: $placeholder-bg;
        border-radius: 2px;
        height: 15px;
        margin-bottom: 10px;
        width: 50%;
      }
    }

    &__line2 {
      margin: 0;

      &--placeholder {
        background: $placeholder-bg;
        border-radius: 5px;
        height: 15px;
        width: 80%;
      }
    }
  }
</style>
