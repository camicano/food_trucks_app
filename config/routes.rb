FoodTruckApp::Application.routes.draw do
	devise_for :users

	get '/trucks', :to => 'trucks#index'
	get '/trucks/filter', :to => 'trucks#filter'
	root :to => 'trucks#index'
end
