<template>
<div>
  <p v-if="label" class="theme--light v-label">{{ label }}</p>
  <div class="input-container rounded" :class="[isCenter, isCircle]" @click="pickFile">
    <img v-if="file" :src="file" alt=""/>
    <div class="upload-photo">
      <div class="upload-photo-change" :class="showUpload">
        <i class="fas fa-camera"></i>
        <br>
        Subir
      </div>
      <!-- <div v-if="imageBase64" class="upload-photo-del" @click="delFile">
        <i class="fas fa-times"></i>
        Quitar
      </div> -->
    </div>
    <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ImageInput',

  props: {
    label: {
      type: String,
      default: ''
    },
    defaultImage: String,
    centered: Boolean,
    circle: Boolean
  },

  computed: {
    ...mapGetters({
      file: 'file/file',
      status: 'file/status'
    }),

    showUpload() {
      return {
        hide: !!this.file
      }
    },

    isCenter() {
      return {
        centered: this.centered
      }
    },

    isCircle() {
      return {
        circle: this.circle
      }
    }
  },

  created() {
    this.$store.commit('file/okFile', this.defaultImage)
  },

  methods: {
    pickFile() {
      this.$refs.image.click()
      this.rejectSize = false
    },

    onFilePicked(e) {
      const image = e.target.files[0];
      /*
      Es necesario eliminar el valor del campo input[file]
      Ya que se desea que el evento onChange siga disparandose
      en caso de volver a subir la misma imagen
      */
      e.target.value = null;

      // Imagen no superior a 10MB
      if (image.size >= 10485760) {
        this.rejectSize = true;
      }
      else {
        const fileReader = new FileReader()

        if (image !== undefined) {
          this.imageName = image.name;
          if (this.imageName.lastIndexOf('.') <= 0) {
            return;
          }

          fileReader.readAsDataURL(image);
          fileReader.onloadend = (event) => {
            this.$store.commit('file/okFile', fileReader.result)
          }
        }
      }
    },

    delFile() {
      this.rejectSize = false;
      this.$store.commit('file/clear')
    },
  },
}
</script>

<style lang="scss" scoped>
.input-container {
  background-color: #ddd;
  display: block;
  height: 15rem;
  overflow: hidden;
  position: relative;
  width: 15rem;
  transition: all 100ms;

  &:hover {
    cursor: pointer;
    .upload-photo-change,
    .upload-photo-del {
      color: white;
      display: inline;
    }

    img {
      filter: brightness(0.55);
    }
  }

  img {
    display: block;
    height: 100%; 
    object-fit: cover;
    -o-object-fit: cover;
    width: 100%;
    transition: all 100ms;
  }
}

.upload-photo .input-container {
  opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	color: #fff;
	padding: 15px;
	-moz-transition: all 0.4s ease-in-out 0s;
	-webkit-transition: all 0.4s ease-in-out 0s;
	-ms-transition: all 0.4s ease-in-out 0s;
	transition: all 0.4s ease-in-out 0s;
}

.upload-photo-change {
  text-align: center;
  font-size: 1.3rem;
  position: absolute;
  color: #666;
  top: 50%;
  left: 50%;
  -moz-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  transition: all 100ms;

  i {
    font-size: 3rem;
  }
}

.upload-photo-del {
  height: 20%;
  width: 10rem;
  text-align: center;
  font-size: 0.8rem;
  display: none;
  position: absolute;
  color: white;
  top: 90%;
  left: 50%;
  -moz-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  transition: all 100ms;
  z-index: 1000;
  padding-top: 0.3rem;

  &:hover {
    background-color: rgba(255, 45, 45, 0.9);
  }
}

.centered {
  margin: auto;
}

.circle {
  border-radius: 100%;
}

.hide {
  display: none;
}
</style>
