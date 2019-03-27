$(document).ready(function(){
	let form = $('#form'); let del = $('a.delete');

	$(del).each(function(){
		$(this).on('click', function(e){
			e.preventDefault(); 

			let link = $(this);
			let target = $(this).attr('href');

			// if(!confirm('Confirmez vous la suppression?')){
			// 	return false;
			// }

			Swal.fire({
				title: 'Confirmez vous la suppression?',
				text: 'Cette action est irréversible',
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Oui. Supprime!',
				cancelButtonText: 'Nooon!',
			}).then((result) => {
				if(result.value){

					fetch(target, {method: 'get'}).then(response => response.json()).then(message => {
						console.log(message);
						Swal.fire({
							title: 'Yeah !',
							html: '<p>'+message.success+'</p>',
							type: 'success',
						});

					});
					$(link).closest('tr').fadeOut();
				}
			}).catch(err => {
				console.log(err);
				Swal.fire({
					title: 'Oups!',
					text: 'Un erreur est survenue.',
					type: 'error',
				});
			});
		});
	});

	$(form).on('submit', function(e){
		e.preventDefault();
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			data: $(this).serialize(),
			dataType: 'json',
			success: function(response){
				console.log(response);
				if(response.errors){
					let errorString = '';
					$.each(response.errors, function(key, value){
						errorString += '<p>'+value+'</p>';
					});
					Swal.fire({
						title: 'Erreur!',
						html: errorString,
						type: 'error',
						confirmButtonText: 'Ok',
					});
				}

				if(response.success){
					Swal.fire({
						title: 'Succès!',
						text: response.success,
						type: 'success',
						confirmButtonText: 'Ok',
					}).then((result) => {
						if(result.value){
							document.location.reload(true);
						}
					});
				}
			},
			error: function(err){
				console.log(err);
			}
		});
	});
});