<template>
  <div id="map">  </div>
</template>

<script>
import { bus } from '../bus';

export default {
  name: 'Map',
  data() {
    return {
      map: null,
      configs: null,
      startMarker: null,
      directionsDisplay: null,
      markers: [],
      center: null,
    };
  },
  methods: {
    drawTheRoute(data) {
      const service = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();

      this.directionsDisplay.setMap(this.map);
      console.log('DATA => ', data);
      const request = {
        origin: data.startPoint,
        destination: data.endPoint,
        waypoints: _.map(data.wayPoints, point => {
          return {
            location: point,
            stopover: true,
          };
        }),
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      };

      service.route(request, (result, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(result);
        }
      });
    },
    clearRoute() {
      this.directionsDisplay.setDirections(null);
    },
    initMap() {
      console.log('Call init map');
      this.center = new google.maps.LatLng(
        this.configs.center.lat,
        this.configs.center.lng
      );
      const startMarkerLocation = this.center;
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.center,
        zoom: 12,
      });
    },
  },
  mounted() {
    this.$http
      .get('configs')
      .then(response => {
        this.configs = response.body;
        console.log('Map:Mounted:getConfigs:result =>', response.body);
        this.initMap();
      })
      .catch(error => {
        console.log('Error in get configs => ', error);
      });
    bus.$on('createMarker', this.addMarker);
    bus.$on('removeMarker', this.removeMarker);
    bus.$on('drawTheRoute', this.drawTheRoute);
    bus.$on('clearRoute', this.clearRoute);
  },
};
</script>

<style scoped>
#map {
  height: 600px;
}
</style>
