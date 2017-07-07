var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;
var PostsListViewModel = require("../../shared/view-models/posts-list-view-model");
var frames = require("ui/frame");

var postsList = new PostsListViewModel([]);
var pageData = new observableModule.fromObject({
    postsList: postsList
});

exports.loaded = function (args) {
    page = args.object;
    var listView = page.getViewById("postsList");
    page.bindingContext = pageData;

    postsList.empty();
    pageData.set("isLoading", true);
    postsList.load().then(function () {
        pageData.set("isLoading", false);
        listView.animate({
            opacity: 1
            , duration: 1000
        });
    });
};

exports.onItemTap = function(e) {
    frames.topmost().navigate("views/detail/detail");
}