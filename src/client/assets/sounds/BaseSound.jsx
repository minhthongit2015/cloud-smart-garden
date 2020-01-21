import SoundSrc from './SoundSrc';


export default class BaseSound extends SoundSrc {
  static runtimeSounds = {};

  static play(soundId, volume) {
    if (!this.runtimeSounds[soundId]) {
      this.runtimeSounds[soundId] = new Audio(soundId);
    }
    if (volume && !Number.isNaN(+volume)) {
      this.runtimeSounds[soundId].volume = +volume;
    }
    this.runtimeSounds[soundId].currentTime = 0;
    this.runtimeSounds[soundId].play()
      .catch(() => {
        // Just skip
      });
  }
}
