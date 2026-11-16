class PcmCaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super()
    this.packetSize = 2048
    this.packet = new Float32Array(this.packetSize)
    this.offset = 0
  }

  process(inputs, outputs) {
    const input = inputs[0]?.[0]
    const output = outputs[0]?.[0]

    if (output) output.fill(0)
    if (input?.length) {
      let inputOffset = 0
      while (inputOffset < input.length) {
        const length = Math.min(input.length - inputOffset, this.packetSize - this.offset)
        this.packet.set(input.subarray(inputOffset, inputOffset + length), this.offset)
        inputOffset += length
        this.offset += length

        if (this.offset === this.packetSize) {
          let sumSquares = 0
          for (let index = 0; index < this.packet.length; index += 1) {
            sumSquares += this.packet[index] * this.packet[index]
          }
          const samples = this.packet
          this.packet = new Float32Array(this.packetSize)
          this.offset = 0
          this.port.postMessage(
            { samples, level: Math.min(1, Math.sqrt(sumSquares / samples.length) * 5) },
            [samples.buffer],
          )
        }
      }
    }

    return true
  }
}

registerProcessor('pcm-capture-processor', PcmCaptureProcessor)
