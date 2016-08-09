if (window.location.pathname == '/') {
	(function () {
		var flag=0;
		var posted=0;
		$('#addTopicBtn').click(function () {
			$.ajax({
				'type': 'GET',
				//TODO Debugin on Chrome requires the IP of host
				'url': '/users/isLoggedIn',
				'dataType': 'json',
				'async': false,
				'success': function (data) {
					if (data.status == 0) {
						flag=1;
						alert('此操作需要登陆！');
						location.assign('/user/login');
					}
					else{
						flag=1;
						return;
					}
				},
				'error': function () {
					alert('Failed!');
				}
			});
			posted=1;
			while(flag == 0 && posted == 1){};
		});


	})();
}
