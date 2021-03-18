import Vue from "vue";

export default function(comp, props) {
  var vm = new Vue({
    render: (h) => h(comp, { props }),
  });
  vm.$mount()
  return vm.$el
}
