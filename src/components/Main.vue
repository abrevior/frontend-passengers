<template>
  <div class="goolgeMap">
    <div class="dropdowns-menu">
      <v-select :options="startPoint" label="name" v-model="selectedStartPoint"></v-select>
      <v-select :options="wayPoints"  label="name" multiple v-model="selectedWayPoints"></v-select>
      <v-select :options="endPoint"  label="name" v-model="selectedEndPoint"></v-select>
      <v-select :options="vehicleType" label="name" v-model="selectedVehicleType"></v-select>
      <v-select :options="startTime" label="startAt" v-model="selectedStartTime"></v-select>
      <v-select :options="countPlace" v-model="selectedCountPlace"></v-select>
      <div class="nav-aboutUs">
        <button @click="drawRoute">
          Побудувати маршрут
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import {bus} from '../bus';

export default {
  name: 'Main',
  data() {
    return {
      selectedStartPoint: null,
      selectedEndPoint: null,
      selectedVehicleType: null,
      selectedStartTime: null,
      selectedCountPlace: null,
      selectedWayPoints: [],
      points: [],
      vehicleType: [],
      startTime: [],
      countPlace: [],
    };
  },
  computed: {
    startPoint() {
      return _.difference(this.points, this.selectedWayPoints);
    },
    endPoint() {
      return _.difference(this.points, this.selectedWayPoints);
    },
    wayPoints() {
      return _.difference(this.points, this.selectedWayPoints);
    },
  },
  methods: {
    drawRoute() {
      bus.$emit('drawTheRoute', {
        startPoint: this.selectedStartPoint.location,
        endPoint: this.selectedEndPoint.location,
        wayPoints: _.map(this.selectedWayPoints, 'location'),
      });
    },
    loadConfigs() {
      this.$http
        .get('configs')
        .then(result => {
          console.log('result => ', result.body);
          this.vehicleType = result.body.typeVehicles;
          this.startTime = result.body.startTime;
          this.countPlace = result.body.countPlaces;
        })
        .catch(error => {
          console.log('Main:Error:getConfigs:', error);
        });
    },
    loadPoints() {
      this.$http
        .get('points')
        .then(result => {
          console.log('result => ', result.body);
          this.points = result.body.data;
          console.log(
            'points => ',
            _.difference(this.points, this.selectedWayPoints)
          );
        })
        .catch(error => {
          console.log('Error => ', error);
        });
    },
  },
  mounted() {
    this.loadConfigs();
    this.loadPoints();
  },
};
</script>

<style scoped>
.dropdowns-menu > div {
  margin: 20px;
}
</style>
