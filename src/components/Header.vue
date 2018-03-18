<template>
  <div class="hero-section">
		<header>
			<div class="nav-container">
				<div class="logo-container">
					<a href="javascript:void(0);" class="logo">
						<img src="static/assets/images/logo.png" alt="Logo">
						<img src="static/assets/images/trucking.png" alt="logoName">
					</a>
				</div>
				<nav>
					<ul>
						<li>
							<a href="#" class="active">Головна</a>
						</li>
						<li>
							<a href="#map">Ваш маршрут</a>
						</li>
						<li>
							<a href="#about">Про нас</a>
						</li>
						<li>
							<a href="#footer">Контакти</a>
						</li>
					</ul>
				</nav>
				<div class="nav-social-media">
					<a href="javascript:void(0);">
						<img src="assets/images/gmail.png">
					</a>
				</div>
			</div>
		</header>
		<div class="head-text">
			<img src="assets/images/rectangle.png">
			<p>НАДIЙНА СЛУЖБА
				<br/> ПЕРЕВЕЗЕНЬ
			</p>
		</div>
		<div class="nav-aboutUs">
			<button @click="openAdminMode">Про нас</button>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    openAdminMode() {
      this.$emit('openAdminMode');
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>

</style>
