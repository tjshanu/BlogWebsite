(function () {
	angular
		.module("Blog", [])
		.controller("BlogController", BlogController);

	function BlogController($scope, $http, $window) {
		$scope.createPost = createPost;
		$scope.deletePost = deletePost;
		$scope.editPost = editPost;
		$scope.updatePost = updatePost;
		$scope.postComment = postComment;
		$scope.shareButton = shareButton;

		init = () => {
			getPosts();	
		}
		
		init();

		function getPosts() {
			$http.get("/blogpost")
				.success( function(posts) { 
					$scope.posts = posts; 
				});
		}

		function shareButton(post) {
			var metas = document.getElementsByTagName('meta'); 
			console.log(metas);
		    for (var i=0; i<metas.length; i++) { 
		      	if (metas[i].getAttribute("property") == "og:description") { 
					console.log(metas[i].getAttribute("content")) ; 
					metas[i].setAttribute("content",post.body);
					console.log(metas[i].getAttribute("content")) ; 
      			} 
      			if (metas[i].getAttribute("property") == "og:title") { 
					console.log(metas[i].getAttribute("content")) ; 
					metas[i].setAttribute("content",post.title);
					console.log(metas[i].getAttribute("content")) ; 
      			} 
   			} 
		};

		function createPost(post) {
			$http.post("/blogpost", post)
				.success(getPosts);
			$scope.post = {};
		};

		function deletePost(postId) {
			$http.delete("/blogpost/" + postId)
			.success(getPosts);
		};

		function editPost(post) {			
			$scope.editing = true;
			$window.scrollTo(0, 0);	
			$http.get("/blogpost/" + post._id)
			.success( function(post) {
				console.log(post);
				$scope.post = post;		
			});
		};

		function updatePost(post) {
			console.log("now")
			console.log(post)
			$scope.editing = false;
			$http.put("/blogpost/" + post._id, post)
			.success(getPosts);			
			$scope.post = {};
		};

		function postComment(post) {
			console.log(post);
			$http.put("/blogpost/comment/" + post._id, post)
			.success(getPosts);
		};
	}

}) ();