export default function (namespace, props) {
  const obj = {}
  props.forEach(key => {
    obj[key] = {
      get () {
        console.log(this.$store.state[namespace])
        return this.$store.state[namespace][key]
      },
      set (value) {
        console.log(value, key)
        this.$store.dispatch(`${namespace}/update`, { value, key })
      }
    }
  })
  return obj
}
