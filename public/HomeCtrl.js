angular.module("postApp",[])

.controller("homeCtrl",['$scope','$http',function($scope,$http){
    $scope.flag = 1
    $scope.spinner = false
    $scope.addSpinner = false
    $scope.getPosts = function(){
    $scope.spinner = true
        $http({
            method: 'GET',
            url: "/list",
            headers: {
                "Content-Type": "text/plain",
                "X-Login-Ajax-call": 'true',
                "Access-Control-Allow-Origin": null
            }
        }).then(function(response) {
            $scope.spinner = false
            // console.log("get",response)
            if(response.status == 200){
                $scope.list = response.data
                console.log("orgdrop",response.data)
            }else{
                console.log("error");
            }
        }).catch(function(err){
            $scope.spinner = false        

            console.log("err",err)
        })
    }
    $scope.getPosts()
    $scope.list = [{name :"1",createdOn : new Date(),votes : 1}]

    $scope.addPost = function(){
        $scope.addSpinner = true        
        $http.post("/add",{name: $scope.post,votes : 0,createdOn : new Date()},{
            headers: {
                "Content-Type": "application/json",
                "X-Login-Ajax-call": 'true',
                "Access-Control-Allow-Origin": '*'
            }
		}).then(function(response){
            $scope.addSpinner = false        
            $scope.getPosts()
            console.log("add",response)
        }).catch(function(err){
            $scope.addSpinner = false        
            console.log(err)
        })
    }

    $scope.upVote = function(item){
        console.log("test item",item)
        $scope.spinner = true
        $http.put('/edit',{_id: item._id, votes : ++item.votes},{
            headers: {
                "Content-Type": "application/json",
                "X-Login-Ajax-call": 'true',
                "Access-Control-Allow-Origin": '*'
            }
		}).then(function(response){
            console.log("edit",response)
            $scope.spinner = false
            $scope.getPosts()
        }).catch(function(err){
            $scope.spinner = false
            console.log(err)
        })
    }

}])

