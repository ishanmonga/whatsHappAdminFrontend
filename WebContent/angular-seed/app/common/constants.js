angular.module('myApp.constant', [])

.constant('RESOURCE_DOMAIN','http://localhost:8080/WhatsHappBackend/rest/')
.constant(
		'RESOURCE_CONFIG', {
			headers : {
				'Content-Type' : 'application/json'
			}
		})
.constant('RESOURCE_DOMAIN_FRONTEND', 'http://localhost:8080/whatsHappFrontend/images/tmpFiles/');
//.constant('API_SOCIAL_NETWORKS', RESOURCE_DOMAIN + '/api/social');
