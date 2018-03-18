<template>
  <div v-bind:class="[{activeClass: isActive}, {adminClass: true}]">
		<div class='form-overlay'></div>
      <div class="add-point">
				<h3>Add new point</h3>
				<label for="pointName">Input point name :</label>
				<input type="text" name="pointName" v-model="point.name">
				<br>
				<label for="pointAddress">Input point address :</label>
				<input type="text" name="pointAddress" v-model="point.address">
				<br>
        <label for="pointRate">Input point rate (0-10) :</label>
				<input type="text" name="pointRate" v-model="point.rate">
				<input type="button" name="Create point" value="Save" @click="createPoint">
      </div>
			<input type="button" value="exit" @click="exitAdminMode">
  </div>
</template>

<script>
export default {
  name: 'Admin',
  props: ['admin'],
  data() {
    return {
      point: {
        name: null,
        address: null,
        location: {
          lat: null,
          lng: null,
        },
        rate: null,
      },
    };
  },
  computed: {
    isActive() {
      return this.admin;
    },
  },
  methods: {
    createPoint() {
      const geocoder = new google.maps.Geocoder();

      new Promise((resolve, reject) => {
        geocoder.geocode(
          {
            address: this.point.address,
          },
          function(results, status) {
            if (status === 'OK') {
              console.log('This customer location => ', this.point);
              console.log('Location =>', results[0].geometry.location.lat());
              resolve(results);
            } else {
              console.log('Failed => ', results);
              reject(new Error('Failed to find location'));
            }
          }
        );
      })
        .then(results => {
          this.point.location.lat = results[0].geometry.location.lat();
          this.point.location.lng = results[0].geometry.location.lng();

          return this.$http.post('points', this.point);
        })
        .then(result => {
          this.$notify({
            group: 'foo',
            title: 'Point success created',
            type: 'success',
          });
        })
        .catch(error => {
          console.log('Error:createPoint:', error);
        });
    },
    exitAdminMode() {
      this.$emit('closeAdminMode');
    },
  },
};
</script>

<style scoped>
.adminClass {
  position: fixed;
  padding: 10px;
  z-index: 3;
  overflow: hidden;
  width: 100%;
  height: 100%;
  opacity: 1;
  top: 0;
  background-color: white;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
}

.activeClass {
  display: block;
}
</style>
