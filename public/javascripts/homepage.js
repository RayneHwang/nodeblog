if (window.location.pathname == '/') {
	(function () {
		$('#addTopicBtn').click(function () {
			var flag = 0;
			$.ajax({
				'type': 'GET',
				//TODO Debugin on Chrome requires the IP of host
				'url': 'http://192.168.1.105:3000/users/isLoggedIn',
				'dataType': 'json',
				'async': false,
				'success': function (data) {
					flag = 1;
					if (data.status == 0) {
						alert('此操作需要登陆！');
						location.assign('/user/login');
					}
					else
						return;
				},
				'error': function () {
					alert('Failed!');
				}
			})
			while (flag == 0);
		})
	})();
}
