import * as interact from 'interactjs'

export default {
  mounted (el, binding, vnode) {
    const fn = binding.value
    let angle0 = 0
    interact(el)
      .draggable({
        listeners: {
          start (e) {
            fn('start', {
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0
            }, vnode.props.key)
          },
          move (e) {
            fn('move', {
              x: e.clientX - e.clientX0,
              y: e.clientY - e.clientY0,
              scale: 1,
              rotate: 0
            }, vnode.props.key)
          },
          end (e) {
            fn('end', {
              x: e.clientX - e.clientX0,
              y: e.clientY - e.clientY0,
              scale: 1,
              rotate: 0
            }, vnode.props.key)
          }
        }
      })
      .gesturable({
        listeners: {
          start (e) {
            angle0 = e.angle
            fn('start', {
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0
            }, vnode.props.key)
          },
          move (e) {
            fn('move', {
              x: e.clientX - e.clientX0,
              y: e.clientY - e.clientY0,
              scale: e.scale,
              rotate: e.angle - angle0
            }, vnode.props.key)
          },
          end (e) {
            fn('end', {
              x: e.clientX - e.clientX0,
              y: e.clientY - e.clientY0,
              scale: e.scale,
              rotate: e.angle - angle0
            }, vnode.props.key)
          }
        }
      })
      .on('tap', () => {
        fn('tap', null, vnode.props.key)
      })
  },
  unmounted (el, binding) {
    interact(el).off()
  }
}
