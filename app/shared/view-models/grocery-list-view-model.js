var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

function GroceryListViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.load = function () {
        return fetch(config.hotUrl)
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                data.forEach(function (post) {
            console.log("2222222222222");
                    viewModel.push({
                        title: post.title
                        , description: post.description
                    });
                });
            });
    };

    viewModel.empty = function () {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = GroceryListViewModel;