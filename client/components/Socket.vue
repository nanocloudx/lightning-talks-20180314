<template>

</template>

<script>
  function connect() {
    if (!window.io) {
      return
    }
    const socket = window.io.connect()
    socket.on('info', (data, callback) => {
      console.log(data.message)
      callback('clientInfo::connected')
    })
  }

  export default {
    beforeMount() {
      connect()
    }
  }
</script>
