export default function (namespace, props) {
  const obj = {}
  props.forEach(key => {
    obj[key] = {
      get () {
        return this.$store.state[namespace][key]
      },
      set (value) {
        this.$store.dispatch(`${namespace}/update`, { value, key })
      }
    }
  })
  return obj
}
