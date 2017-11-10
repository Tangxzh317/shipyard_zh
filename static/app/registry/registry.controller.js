(function(){
	'use strict';

	angular
		.module('shipyard.registry')
		.controller('RegistryController', RegistryController);

	RegistryController.$inject = ['resolvedRepositories', 'RegistryService', '$state', '$stateParams', '$timeout'];
	function RegistryController(resolvedRepositories, RegistryService, $state, $stateParams, $timeout) {
            var vm = this;
            vm.registryId = $stateParams.id;
            vm.repositories = resolvedRepositories;
            vm.refresh = refresh;
	    vm.selectedImage = "";
            vm.selectedRepository = null;
            vm.showRemoveRepositoryDialog = showRemoveRepositoryDialog;
	    vm.showDownloadImageDialog = showDownloadImageDialog;
            vm.removeRepository = removeRepository;
	    vm.downloadImage = downloadImage;

            function refresh() {
                RegistryService.listRepositories(vm.registryId)
                    .then(function(data) {
                        vm.repositories = data; 
                    }, function(data) {
                        vm.error = data;
                    });
                vm.error = "";
            };

            function showRemoveRepositoryDialog(repo) {
                vm.selectedRepository = repo;
                if (vm.selectedRepository === undefined || vm.selectedRepository === null) {
                    console.error("Could not select repository")
                } else {
                    $('.ui.small.remove.modal').modal('show');
                }
            };
	
	    function showDownloadImageDialog(img) {
                if(img.registryUrl.substring(0,5) == 'https') {
                    vm.selectedImage = img.registryUrl.substr(8) + '/' + img.name + ':' + img.tag;
                }else{
                    vm.selectedImage = img.registryUrl.substr(7) + '/' + img.name + ':' + img.tag;
                }

                $('#downloadImage-modal').modal('show');
            }
		
	    function downloadImage() {
                oboe({
                    url: '/images/create?fromImage=' + vm.selectedImage,
                    method: "POST",
                    withCredentials: true,
                    headers: {
                        'X-Access-Token': localStorage.getItem("X-Access-Token")
                    }
                });
                vm.selectedImage = "";

            }

            function removeRepository() {
                RegistryService.removeRepository(vm.registryId, vm.selectedRepository)
                    .then(function(data) {
                        vm.refresh();
                    }, function(data) {
                        vm.error = data;
                    });
            }
	}
})();
