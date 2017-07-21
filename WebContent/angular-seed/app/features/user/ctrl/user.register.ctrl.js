(function () {
    'use strict';

    angular
        .module('myapp.user')
        .controller('registerController', RegisterController);

    RegisterController.$inject = ['userService', '$location', '$rootScope'];
    function RegisterController(userService, $location, $rootScope) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            userService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                      //  FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                      //  FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
